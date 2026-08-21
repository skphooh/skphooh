"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Swimmer from "./Swimmer";

/* ------------------------------------------------------------------
 * 尺
 *
 * 初回はスタート台での構えから全部見せる。同じセッションで 2 回目
 * 以降は蹴り出しから始めて短くする。何度も行き来するときに毎回
 * フルで待たされないようにするため。
 * ------------------------------------------------------------------ */

interface Timing {
    /** 台の上で構えている時間 */
    crouch: number;
    /** 蹴り出しから入水まで */
    flight: number;
    /** 水が画面を覆いきるまで */
    cover: number;
    /** 覆いきってから引き始めるまでの溜め */
    hold: number;
    /** 水が引ききるまで */
    drain: number;
}

const FULL: Timing = { crouch: 0.38, flight: 0.68, cover: 0.58, hold: 0.22, drain: 0.58 };
const SHORT: Timing = { crouch: 0, flight: 0.4, cover: 0.38, hold: 0.1, drain: 0.42 };

/** 入水の瞬間 */
const splashAt = (t: Timing) => t.crouch + t.flight * 0.92;
/** 水が覆いきる瞬間 = 遷移する時刻 */
const coverAt = (t: Timing) => splashAt(t) + t.cover * 0.55;
/** 演出全体の長さ */
const totalOf = (t: Timing) => coverAt(t) + t.hold + t.drain;

/** 飛び込みの開始点。ビューポート座標(px) */
export interface DiveOrigin {
    x: number;
    y: number;
}

interface DiveContextValue {
    dive: (href: string, origin: DiveOrigin) => void;
}

const DiveContext = createContext<DiveContextValue | null>(null);

export function useDive() {
    const ctx = useContext(DiveContext);
    if (!ctx) throw new Error("useDive must be used inside <DiveProvider>");
    return ctx;
}

interface DiveState {
    /** 再マウントして演出を頭から流すためのキー */
    key: number;
    origin: DiveOrigin;
    /** 入水点 */
    entry: DiveOrigin;
    timing: Timing;
}

/** 入水点から飛び散るしぶき */
const DROPLETS = Array.from({ length: 16 }, (_, i) => {
    const angle = (-165 + i * 10) * (Math.PI / 180);
    const distance = 50 + ((i * 41) % 90);
    return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance * 0.8,
        size: 3 + ((i * 13) % 5),
        delay: 0.02 * (i % 5),
    };
});

/** スイマーを追う気泡 */
const TRAIL = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    dx: (i % 3) * 14 - 14,
    size: 3 + ((i * 7) % 6),
    delay: 0.05 * i,
}));

/**
 * 飛び込みによる画面遷移。
 *
 * オーバーレイをレイアウト直下に常駐させることで、ページが
 * 切り替わっても演出が途切れない。水が画面を覆いきった瞬間に
 * router.push し、水が引くと新しいページが現れる。
 *
 * スイマーはレーンのスタート台と同じ位置・同じ大きさから飛ぶ。
 * 一覧に立っていた子がそのまま飛んだように見せるため。
 */
export default function DiveProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [state, setState] = useState<DiveState | null>(null);
    const [draining, setDraining] = useState(false);
    /** このセッションで一度でも飛び込んだか */
    const divedOnce = useRef(false);

    const dive = useCallback(
        (href: string, origin: DiveOrigin) => {
            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion) {
                router.push(href);
                return;
            }

            const timing = divedOnce.current ? SHORT : FULL;
            divedOnce.current = true;

            // 台から前下方へ跳んで入水する
            const entry = {
                x: Math.min(origin.x + 170, window.innerWidth - 60),
                y: window.innerHeight * 0.66,
            };

            setDraining(false);
            setState({ key: Date.now(), origin, entry, timing });

            window.setTimeout(() => {
                router.push(href);
                setDraining(true);
            }, coverAt(timing) * 1000);

            window.setTimeout(() => setState(null), totalOf(timing) * 1000);
        },
        [router]
    );

    return (
        <DiveContext.Provider value={{ dive }}>
            {children}
            <DiveOverlay state={state} draining={draining} />
        </DiveContext.Provider>
    );
}

function DiveOverlay({
    state,
    draining,
}: {
    state: DiveState | null;
    draining: boolean;
}) {
    /** 演出中はページを動かさない */
    useEffect(() => {
        if (!state) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [state]);

    return (
        <AnimatePresence>
            {state && (
                <div
                    key={state.key}
                    aria-hidden="true"
                    className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden"
                >
                    <DiveScene state={state} draining={draining} />
                </div>
            )}
        </AnimatePresence>
    );
}

function DiveScene({ state, draining }: { state: DiveState; draining: boolean }) {
    const { origin, entry, timing } = state;

    const waterDuration = draining ? timing.drain : timing.cover;
    const waterDelay = draining ? timing.hold : splashAt(timing);
    const waterEase = draining
        ? ([0.6, 0, 0.35, 1] as const)
        : ([0.4, 0, 0.2, 1] as const);

    // 台からの相対移動量。放物線に見えるよう 3 点で刻む
    const dx = entry.x - origin.x;
    const dy = entry.y - origin.y;

    return (
        <>
            {/* 水。立ち上がって覆い、溜めのあと引いていく */}
            <motion.div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-pool-light via-pool to-pool-deep"
                initial={{ height: "0%" }}
                animate={{ height: draining ? "0%" : "100%" }}
                transition={{ duration: waterDuration, delay: waterDelay, ease: waterEase }}
            />
            <motion.div
                className="absolute inset-x-0 h-[2px] bg-white/80"
                initial={{ bottom: "0%" }}
                animate={{ bottom: draining ? "0%" : "100%" }}
                transition={{ duration: waterDuration, delay: waterDelay, ease: waterEase }}
            />

            {!draining && (
                <>
                    {/* 号砲の閃光 */}
                    {timing.crouch > 0 && (
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.35, 0] }}
                            transition={{ duration: 0.2, delay: timing.crouch * 0.8 }}
                        />
                    )}

                    {/* 気泡の尾 */}
                    {TRAIL.map((b) => (
                        <motion.span
                            key={b.id}
                            className="absolute rounded-full border border-white/70"
                            style={{
                                left: entry.x + b.dx,
                                top: entry.y,
                                width: b.size,
                                height: b.size,
                            }}
                            initial={{ y: 0, opacity: 0 }}
                            animate={{ y: -170, opacity: [0, 0.9, 0] }}
                            transition={{
                                duration: 0.7,
                                delay: splashAt(timing) + b.delay,
                                ease: "easeOut",
                            }}
                        />
                    ))}

                    {/* スイマー。レーンの台と同じ大きさから飛び、落ちながら少し大きくなる */}
                    <motion.div
                        className="absolute h-14 w-14"
                        style={{ left: origin.x, top: origin.y }}
                        initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                        animate={{
                            x: [0, dx * 0.45, dx],
                            y: [0, dy * 0.28, dy],
                            rotate: [0, 34, 84],
                            scale: [1, 1.5, 2],
                        }}
                        transition={{
                            duration: timing.crouch + timing.flight,
                            ease: "easeIn",
                            times: [
                                0,
                                timing.crouch / (timing.crouch + timing.flight) + 0.32,
                                1,
                            ],
                        }}
                    >
                        <Swimmer
                            pose="dive"
                            className="h-full w-full drop-shadow-[0_4px_10px_rgba(1,34,62,0.4)]"
                            duration={timing.flight}
                            delay={timing.crouch}
                        />
                    </motion.div>

                    {/* しぶき */}
                    {DROPLETS.map((d) => (
                        <motion.span
                            key={d.id}
                            className="absolute rounded-full bg-white"
                            style={{
                                left: entry.x,
                                top: entry.y,
                                width: d.size,
                                height: d.size,
                            }}
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{
                                x: d.x,
                                y: [0, d.y, d.y + 110],
                                opacity: [0, 0.95, 0],
                            }}
                            transition={{
                                duration: 0.8,
                                delay: splashAt(timing) + d.delay,
                                ease: "easeOut",
                                times: [0, 0.35, 1],
                            }}
                        />
                    ))}

                    {/* 入水点の波紋 */}
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={`ring-${i}`}
                            className="absolute block h-20 w-20 rounded-full border-2 border-white/70"
                            style={{ left: entry.x - 40, top: entry.y - 40 }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 2.4 + i], opacity: [0.85, 0] }}
                            transition={{
                                duration: 0.8,
                                delay: splashAt(timing) + i * 0.08,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </>
            )}
        </>
    );
}
