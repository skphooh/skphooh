"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface DiveTransitionProps {
    /** 飛び込みを始める */
    active: boolean;
    /** 入水する横位置(0-1)。クリックした場所に合わせる */
    originX?: number;
    /** 水が画面を覆いきった瞬間。この裏で中身を差し替える */
    onReveal: () => void;
    /** 水が引ききって演出が終わった */
    onDone: () => void;
}

/** 水が立ち上がって画面を覆いきるまで(ms) */
const RISE_MS = 620;
/** 覆いきってから引き始めるまでの溜め(ms) */
const HOLD_MS = 260;
/** 水が引ききるまで(ms) */
const DRAIN_MS = 620;

type Phase = "rise" | "drain";

/** 流線姿勢のスイマー */
function Swimmer({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 104 24" className={className} fill="currentColor">
            {/* 前へ伸ばした腕 */}
            <path d="M0 12 Q 13 10.4 26 11.1 L26 12.9 Q 13 13.6 0 12 Z" />
            {/* 頭 */}
            <circle cx="32.5" cy="12" r="5.4" />
            {/* 胴 */}
            <path d="M28 12 Q 43 4.2 64 8.6 L64 15.4 Q 43 19.8 28 12 Z" />
            {/* 脚 */}
            <path d="M62 9.2 L94 11.3 L102 12 L94 12.7 L62 14.8 Z" />
        </svg>
    );
}

/** 入水点から飛び散るしぶき。角度と距離をばらけさせる */
const DROPLETS = Array.from({ length: 14 }, (_, i) => {
    const angle = (-160 + i * 11) * (Math.PI / 180);
    const distance = 70 + ((i * 37) % 90);
    return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance * 0.85,
        size: 3 + ((i * 13) % 5),
        delay: 0.02 * (i % 5),
    };
});

/** スイマーを追う気泡 */
const TRAIL = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    offset: (i % 3) * 14 - 14,
    size: 4 + ((i * 7) % 7),
    delay: 0.06 * i,
}));

/**
 * プロダクトを選んだときの画面遷移。
 *
 *   1. 水が下から立ち上がり、画面を覆いきる
 *      同時にスイマーが弧を描いて入水し、気泡の尾を引く
 *   2. 覆いきった裏側で詳細を差し替える (onReveal)
 *   3. 水位が下がって、水中から詳細が現れる
 *
 * 覆っている間に中身を入れ替えるので、切り替わりの瞬間が
 * 見えない。ページ遷移そのものを水で隠す作りになっている。
 */
export default function DiveTransition({
    active,
    originX = 0.5,
    onReveal,
    onDone,
}: DiveTransitionProps) {
    // 呼び出し側が飛び込みごとに key を変えて再マウントするため、
    // ここで "rise" に戻す必要はない。
    const [phase, setPhase] = useState<Phase>("rise");

    useEffect(() => {
        if (!active) return;

        // 覆いきったところで中身を差し替え、少し溜めてから引かせる
        const revealTimer = setTimeout(() => {
            onReveal();
            setPhase("drain");
        }, RISE_MS);

        const doneTimer = setTimeout(onDone, RISE_MS + HOLD_MS + DRAIN_MS);

        return () => {
            clearTimeout(revealTimer);
            clearTimeout(doneTimer);
        };
    }, [active, onReveal, onDone]);

    const entryLeft = `${originX * 100}%`;
    const draining = phase === "drain";

    return (
        <AnimatePresence>
            {active && (
                <div className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden">
                    {/* 水。立ち上がって覆い、溜めのあと引いていく */}
                    <motion.div
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-pool-light via-pool to-pool-deep"
                        initial={{ height: "0%" }}
                        animate={{ height: draining ? "0%" : "100%" }}
                        transition={{
                            duration: draining ? DRAIN_MS / 1000 : RISE_MS / 1000,
                            delay: draining ? HOLD_MS / 1000 : 0,
                            ease: draining ? [0.6, 0, 0.35, 1] : [0.4, 0, 0.2, 1],
                        }}
                    />

                    {/* 水面のふち。白い泡の線 */}
                    <motion.div
                        className="absolute inset-x-0 h-[2px] bg-white/80"
                        initial={{ bottom: "0%" }}
                        animate={{ bottom: draining ? "0%" : "100%" }}
                        transition={{
                            duration: draining ? DRAIN_MS / 1000 : RISE_MS / 1000,
                            delay: draining ? HOLD_MS / 1000 : 0,
                            ease: draining ? [0.6, 0, 0.35, 1] : [0.4, 0, 0.2, 1],
                        }}
                    />

                    {/* 立ち上がり中のみ: 弧を描いて入水するスイマー */}
                    {!draining && (
                        <>
                            {/* 気泡の尾 */}
                            {TRAIL.map((b) => (
                                <motion.span
                                    key={b.id}
                                    className="absolute rounded-full border border-white/70"
                                    style={{
                                        left: entryLeft,
                                        width: b.size,
                                        height: b.size,
                                        marginLeft: b.offset,
                                    }}
                                    initial={{ top: "40%", opacity: 0 }}
                                    animate={{ top: "8%", opacity: [0, 0.9, 0] }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.24 + b.delay,
                                        ease: "easeOut",
                                    }}
                                />
                            ))}

                            <motion.div
                                className="absolute w-40 text-white sm:w-56"
                                style={{ left: entryLeft, marginLeft: "-7rem" }}
                                initial={{ top: "-20%", rotate: -16, opacity: 0 }}
                                animate={{
                                    top: ["-20%", "24%", "76%"],
                                    rotate: [-16, 36, 78],
                                    opacity: [0, 1, 1],
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeIn",
                                    times: [0, 0.45, 1],
                                }}
                            >
                                <Swimmer className="w-full drop-shadow-[0_4px_14px_rgba(1,34,62,0.5)]" />
                            </motion.div>

                            {/* しぶき */}
                            {DROPLETS.map((d) => (
                                <motion.span
                                    key={d.id}
                                    className="absolute rounded-full bg-white"
                                    style={{
                                        left: entryLeft,
                                        top: "56%",
                                        width: d.size,
                                        height: d.size,
                                    }}
                                    initial={{ x: 0, y: 0, opacity: 0 }}
                                    animate={{
                                        x: d.x,
                                        y: [0, d.y, d.y + 90],
                                        opacity: [0, 0.95, 0],
                                    }}
                                    transition={{
                                        duration: 0.75,
                                        delay: 0.5 + d.delay,
                                        ease: "easeOut",
                                        times: [0, 0.4, 1],
                                    }}
                                />
                            ))}

                            {/* 入水点の波紋 */}
                            {[0, 1, 2].map((i) => (
                                <motion.span
                                    key={`ring-${i}`}
                                    className="absolute top-[56%] block h-24 w-24 rounded-full border-2 border-white/70"
                                    style={{ left: entryLeft, marginLeft: "-3rem" }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: [0, 2.4 + i * 0.9], opacity: [0.8, 0] }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.5 + i * 0.08,
                                        ease: "easeOut",
                                    }}
                                />
                            ))}
                        </>
                    )}
                </div>
            )}
        </AnimatePresence>
    );
}
