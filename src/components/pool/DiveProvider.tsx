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
 * 初回はスタート台のクラウチングから全部見せる。同じセッションで
 * 2 回目以降は蹴り出しから始めて短くする。何度も行き来するときに
 * 毎回フルで待たされないようにするため。
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

const FULL: Timing = { crouch: 0.42, flight: 0.72, cover: 0.62, hold: 0.24, drain: 0.6 };
const SHORT: Timing = { crouch: 0, flight: 0.4, cover: 0.4, hold: 0.1, drain: 0.42 };

/** 水が覆いきる瞬間 = 遷移する時刻 */
const coverAt = (t: Timing) => t.crouch + t.flight * 0.72 + t.cover * 0.35;
/** 演出全体の長さ */
const totalOf = (t: Timing) => coverAt(t) + t.hold + t.drain;

interface DiveContextValue {
    /** 指定の URL へ飛び込む */
    dive: (href: string, originX: number, lane: number) => void;
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
    originX: number;
    lane: number;
    timing: Timing;
}

/** 入水点から飛び散るしぶき */
const DROPLETS = Array.from({ length: 16 }, (_, i) => {
    const angle = (-165 + i * 10) * (Math.PI / 180);
    const distance = 60 + ((i * 41) % 100);
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
    offset: (i % 3) * 16 - 16,
    size: 4 + ((i * 7) % 7),
    delay: 0.05 * i,
}));

/**
 * 飛び込みによる画面遷移。
 *
 * オーバーレイをレイアウト直下に常駐させることで、ページが
 * 切り替わっても演出が途切れない。水が画面を覆いきった瞬間に
 * router.push し、水が引くと新しいページが現れる。
 */
export default function DiveProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [state, setState] = useState<DiveState | null>(null);
    const [draining, setDraining] = useState(false);
    /** このセッションで一度でも飛び込んだか */
    const divedOnce = useRef(false);

    const dive = useCallback(
        (href: string, originX: number, lane: number) => {
            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion) {
                router.push(href);
                return;
            }

            const timing = divedOnce.current ? SHORT : FULL;
            divedOnce.current = true;

            setDraining(false);
            setState({ key: Date.now(), originX, lane, timing });

            // 水が覆いきったところで遷移し、そのあと水位を下げる
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
    const { originX, lane, timing } = state;
    const left = `${originX * 100}%`;
    const waterDuration = draining ? timing.drain : timing.cover;
    const waterDelay = draining ? timing.hold : timing.crouch + timing.flight * 0.72;

    return (
        <>
            {/* 水。立ち上がって覆い、溜めのあと引いていく */}
            <motion.div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-pool-light via-pool to-pool-deep"
                initial={{ height: "0%" }}
                animate={{ height: draining ? "0%" : "100%" }}
                transition={{
                    duration: waterDuration,
                    delay: waterDelay,
                    ease: draining ? [0.6, 0, 0.35, 1] : [0.4, 0, 0.2, 1],
                }}
            />
            <motion.div
                className="absolute inset-x-0 h-[2px] bg-white/80"
                initial={{ bottom: "0%" }}
                animate={{ bottom: draining ? "0%" : "100%" }}
                transition={{
                    duration: waterDuration,
                    delay: waterDelay,
                    ease: draining ? [0.6, 0, 0.35, 1] : [0.4, 0, 0.2, 1],
                }}
            />

            {!draining && (
                <>
                    {/* スタート台。選んだレーンの番号を出す */}
                    <motion.div
                        className="absolute"
                        style={{ left, marginLeft: "-5.5rem", top: "6%" }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: [0, 1, 1, 0], y: 0 }}
                        transition={{
                            duration: timing.crouch + timing.flight,
                            times: [0, 0.18, 0.6, 1],
                        }}
                    >
                        <StartBlock lane={lane} />
                    </motion.div>

                    {/* 号砲の閃光 */}
                    <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.22, delay: timing.crouch * 0.85 }}
                    />

                    {/* 気泡の尾 */}
                    {TRAIL.map((b) => (
                        <motion.span
                            key={b.id}
                            className="absolute rounded-full border border-white/70"
                            style={{
                                left,
                                width: b.size,
                                height: b.size,
                                marginLeft: b.offset,
                            }}
                            initial={{ top: "45%", opacity: 0 }}
                            animate={{ top: "10%", opacity: [0, 0.9, 0] }}
                            transition={{
                                duration: 0.7,
                                delay: timing.crouch + timing.flight * 0.4 + b.delay,
                                ease: "easeOut",
                            }}
                        />
                    ))}

                    {/* スイマー。放物線を描いて入水する */}
                    <motion.div
                        className="absolute w-48 sm:w-64"
                        style={{ left, marginLeft: "-6rem" }}
                        initial={{ top: "8%", rotate: 0, opacity: 0 }}
                        animate={{
                            top: ["8%", "10%", "34%", "72%"],
                            rotate: [0, 8, 46, 88],
                            opacity: [1, 1, 1, 1],
                        }}
                        transition={{
                            duration: timing.crouch + timing.flight,
                            ease: "easeIn",
                            times: [0, timing.crouch / (timing.crouch + timing.flight), 0.72, 1],
                        }}
                    >
                        <Swimmer
                            className="w-full drop-shadow-[0_6px_16px_rgba(1,34,62,0.45)]"
                            duration={timing.flight}
                            delay={timing.crouch}
                        />
                    </motion.div>

                    {/* しぶき */}
                    {DROPLETS.map((d) => (
                        <motion.span
                            key={d.id}
                            className="absolute rounded-full bg-white"
                            style={{ left, top: "62%", width: d.size, height: d.size }}
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{
                                x: d.x,
                                y: [0, d.y, d.y + 110],
                                opacity: [0, 0.95, 0],
                            }}
                            transition={{
                                duration: 0.8,
                                delay: timing.crouch + timing.flight * 0.92 + d.delay,
                                ease: "easeOut",
                                times: [0, 0.35, 1],
                            }}
                        />
                    ))}

                    {/* 入水点の波紋 */}
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={`ring-${i}`}
                            className="absolute top-[62%] block h-24 w-24 rounded-full border-2 border-white/70"
                            style={{ left, marginLeft: "-3rem" }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 2.5 + i], opacity: [0.8, 0] }}
                            transition={{
                                duration: 0.8,
                                delay: timing.crouch + timing.flight * 0.92 + i * 0.08,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </>
            )}
        </>
    );
}

/** スタート台 */
function StartBlock({ lane }: { lane: number }) {
    return (
        <svg viewBox="0 0 176 96" className="w-44 sm:w-52">
            {/* 台座 */}
            <rect x="34" y="34" width="108" height="52" rx="3" fill="#01223e" />
            {/* 上面。後ろが高い傾斜 */}
            <path d="M28 34 L150 34 L150 22 L28 30 Z" fill="#f4f8fa" />
            {/* 蹴り板 */}
            <rect x="128" y="18" width="16" height="20" rx="2" fill="#0077b6" />
            {/* レーン番号 */}
            <text
                x="88"
                y="70"
                textAnchor="middle"
                fill="#ffb703"
                fontSize="26"
                fontFamily="var(--font-share-tech-mono), monospace"
            >
                {String(lane).padStart(2, "0")}
            </text>
            {/* プールサイド */}
            <rect x="0" y="86" width="176" height="10" fill="#cfeaf3" opacity="0.5" />
        </svg>
    );
}
