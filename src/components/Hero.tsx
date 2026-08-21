"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import PoolCanvas from "./pool/PoolCanvas";

/** タイピングアニメーションで表示するフレーズ */
const phrases = [
    "Next.js × Supabase で構築",
    "圧倒的インパクトを、Webに",
    "常識を壊すUIデザイン",
    "アイデアを形にする爆速開発",
];

/** スタート合図が「位置について」から「号砲」に切り替わるまでの時間(ms) */
const START_SIGNAL_DELAY = 1800;

/**
 * ヒーローセクション (50m POOL / START)
 *
 * 飛び込み台から水面を見下ろした画。水のグラデーションの上に
 * PoolCanvas でコースティクスと泡を重ね、プール底のレーンライン
 * と T マークを透かしている。
 */
export default function Hero() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [started, setStarted] = useState(false);

    /** スタート合図: 入場直後に「TAKE YOUR MARKS」から「GO」へ切り替える */
    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), START_SIGNAL_DELAY);
        return () => clearTimeout(timer);
    }, []);

    /** タイピングアニメーション。
     *  状態更新はすべて setTimeout の中で行い、effect 内での
     *  同期的な setState を避けている。 */
    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting) {
            if (displayText.length < currentPhrase.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                }, 80);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 2000);
            }
        } else if (displayText.length > 0) {
            timeout = setTimeout(() => {
                setDisplayText(displayText.slice(0, -1));
            }, 40);
        } else {
            timeout = setTimeout(() => {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
            }, 400);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, phraseIndex]);

    /** スムーズスクロール */
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="top"
            className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
        >
            {/* 水。水面から深部へのグラデーション */}
            <div className="absolute inset-0 bg-gradient-to-b from-pool-shallow via-pool-water to-pool-abyss" />

            {/* プール底のレーンライン。中央の T マークと左右のライン */}
            <div className="pointer-events-none absolute inset-0 flex justify-center opacity-25">
                <div className="h-full w-[3px] bg-pool-line" />
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-[12%] w-[3px] bg-pool-line opacity-15" />
            <div className="pointer-events-none absolute inset-y-0 right-[12%] w-[3px] bg-pool-line opacity-15" />
            {/* T マークの横棒。壁の手前を示す */}
            <div className="pointer-events-none absolute bottom-24 left-1/2 h-[3px] w-40 -translate-x-1/2 bg-pool-line opacity-25" />

            {/* 水面の光と泡 */}
            <div className="absolute inset-0">
                <PoolCanvas depth={0.25} density={1} />
            </div>

            <div className="container relative z-10 mx-auto max-w-5xl px-6 text-center">
                {/* スタート合図 */}
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                    className="mb-10 inline-block"
                >
                    <span className="led-board inline-flex items-center gap-3 px-5 py-2">
                        <span
                            className={`relative z-10 h-3 w-3 rounded-full ${
                                started
                                    ? "animate-pulse-lamp bg-[#00e676] shadow-[0_0_10px_#00e676]"
                                    : "bg-rope-red shadow-[0_0_10px_var(--color-rope-red)]"
                            }`}
                        />
                        <span className="led-text relative z-10 text-xs tracking-[0.2em] sm:text-sm">
                            {started ? "GO — OPEN FOR COLLABORATION" : "TAKE YOUR MARKS"}
                        </span>
                    </span>
                </motion.div>

                {/* メインタイトル */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h1 className="mb-8 font-display text-7xl leading-[0.9] tracking-tight text-white sm:text-8xl md:text-[11rem] [text-shadow:0_6px_0_rgba(1,42,74,0.55)]">
                        skphooh
                    </h1>
                </motion.div>

                {/* タイピング表示。大会の電光掲示板に見立てる */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-12 flex justify-center"
                >
                    <p className="led-board flex min-h-[3.5rem] items-center px-6 py-3">
                        <span className="led-text relative z-10 text-base sm:text-xl md:text-2xl">
                            {displayText}
                        </span>
                        <span className="animate-blink relative z-10 ml-2 inline-block h-6 w-[3px] bg-led-amber" />
                    </p>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col items-center justify-center gap-6 sm:flex-row"
                >
                    <button
                        onClick={() => scrollTo("projects")}
                        className="pool-btn w-full px-10 py-5 text-lg sm:w-auto"
                    >
                        Dive In
                    </button>
                    <button
                        onClick={() => scrollTo("contact")}
                        className="pool-btn w-full bg-white px-10 py-5 text-lg sm:w-auto"
                    >
                        Touch the Wall
                    </button>
                </motion.div>

                {/* スクロールインジケーター */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", delay: 0.8 }}
                    className="mt-20 inline-block"
                >
                    <button
                        onClick={() => scrollTo("entry")}
                        className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-4 border-pool-line bg-white/90 shadow-[var(--shadow-pool-sm)] transition-all hover:translate-y-1 hover:shadow-none"
                        aria-label="次のセクションへ"
                    >
                        <ArrowDown className="h-8 w-8 stroke-[3] text-pool-line" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
