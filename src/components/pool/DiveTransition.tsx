"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface DiveTransitionProps {
    /** 飛び込み中かどうか */
    active: boolean;
    /** 入水する横位置(0-1)。クリックした場所に合わせる */
    originX?: number;
    /** 演出が終わったときに呼ぶ */
    onComplete: () => void;
}

/** 水面が上がりきってから中身を出すまでの合計時間(ms) */
const DURATION = 1150;

/**
 * 流線姿勢のスイマー。頭・腕・胴・脚を分けず、
 * ひとつながりのシルエットとして読ませる。
 */
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

/**
 * プロダクトを選んだときに挟む飛び込み演出。
 *
 *   1. 水面が下から立ち上がる
 *   2. スイマーが弧を描いて入水する
 *   3. 入水点から波紋が広がる
 *
 * prefers-reduced-motion のときは呼び出し側が丸ごと省略する前提。
 */
export default function DiveTransition({
    active,
    originX = 0.5,
    onComplete,
}: DiveTransitionProps) {
    useEffect(() => {
        if (!active) return;
        const timer = setTimeout(onComplete, DURATION);
        return () => clearTimeout(timer);
    }, [active, onComplete]);

    const entryLeft = `${originX * 100}%`;

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    {/* 立ち上がる水面 */}
                    <motion.div
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-pool-light to-pool-deep"
                        initial={{ height: "0%" }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
                    />

                    {/* 水面のふち。白い泡の線 */}
                    <motion.div
                        className="absolute inset-x-0 h-[3px] bg-white/70"
                        initial={{ bottom: "0%" }}
                        animate={{ bottom: "100%" }}
                        transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
                    />

                    {/* 弧を描いて入水するスイマー */}
                    <motion.div
                        className="absolute w-40 text-white sm:w-56"
                        style={{ left: entryLeft, marginLeft: "-7rem" }}
                        initial={{ top: "-18%", rotate: -18, opacity: 0 }}
                        animate={{
                            top: ["-18%", "26%", "78%"],
                            rotate: [-18, 34, 76],
                            opacity: [0, 1, 1],
                        }}
                        transition={{ duration: 0.72, ease: "easeIn", times: [0, 0.45, 1] }}
                    >
                        <Swimmer className="w-full drop-shadow-[0_4px_12px_rgba(1,34,62,0.45)]" />
                    </motion.div>

                    {/* 入水点の波紋 */}
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute top-[58%] h-24 w-24 rounded-full border-2 border-white/60"
                            style={{ left: entryLeft, marginLeft: "-3rem" }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 2.6 + i * 0.9], opacity: [0.75, 0] }}
                            transition={{
                                duration: 0.85,
                                delay: 0.62 + i * 0.09,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
