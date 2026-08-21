"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import WaterSurface from "./pool/WaterSurface";
import LaneRope from "./pool/LaneRope";

/** タイピングで切り替えるフレーズ */
const phrases = [
    "Next.js × Supabase で構築",
    "アイデアを形にする爆速開発",
    "研究とプロダクトを行き来する",
];

/** 「位置について」から号砲までの時間(ms) */
const START_SIGNAL_DELAY = 1800;

/**
 * ヒーローセクション (START)
 *
 * 画面いっぱいの水。中央に名前だけを置き、装飾は足さない。
 * 面白さは水そのもの（コースティクス・泡・クリックの波紋）と、
 * 下端のレーンロープが担う。
 */
export default function Hero() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [started, setStarted] = useState(false);

    /** スタート合図 */
    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), START_SIGNAL_DELAY);
        return () => clearTimeout(timer);
    }, []);

    /** タイピング。状態更新はすべて setTimeout の中で行う */
    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting) {
            if (displayText.length < currentPhrase.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                }, 80);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 2200);
            }
        } else if (displayText.length > 0) {
            timeout = setTimeout(() => {
                setDisplayText(displayText.slice(0, -1));
            }, 35);
        } else {
            timeout = setTimeout(() => {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
            }, 400);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, phraseIndex]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="top"
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
        >
            {/* 水 */}
            <WaterSurface depth={0.12} density={1} />

            {/* プール底のレーンライン。ごく薄く敷いて奥行きだけ出す */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/20" />
                <div className="absolute inset-y-0 left-[18%] w-px bg-white/10" />
                <div className="absolute inset-y-0 right-[18%] w-px bg-white/10" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
                {/* スタート合図 */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 inline-flex items-center gap-3"
                >
                    <span
                        className={`h-2 w-2 rounded-full ${
                            started
                                ? "animate-pulse-lamp bg-[#3ddc84]"
                                : "bg-rope-red"
                        }`}
                    />
                    <span className="font-led text-[0.7rem] tracking-[0.3em] text-white/80 sm:text-xs">
                        {started ? "OPEN FOR COLLABORATION" : "TAKE YOUR MARKS"}
                    </span>
                </motion.div>

                {/* 名前 */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.2, 0.7, 0.3, 1] }}
                    className="font-display text-[3.5rem] leading-[0.92] tracking-tight text-white sm:text-8xl md:text-[9rem]"
                >
                    skphooh
                </motion.h1>

                {/* タイピング */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="mt-8 flex min-h-[2rem] items-center justify-center text-base text-white/85 sm:text-lg"
                >
                    {displayText}
                    <span className="animate-blink ml-1 inline-block h-5 w-px bg-white/70" />
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <button
                        onClick={() => scrollTo("projects")}
                        className="btn btn-on-water w-full sm:w-auto"
                    >
                        プロジェクトを見る
                    </button>
                    <button
                        onClick={() => scrollTo("contact")}
                        className="w-full cursor-pointer rounded-[3px] border border-white/40 px-8 py-[0.95rem] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto"
                    >
                        お問い合わせ
                    </button>
                </motion.div>
            </div>

            {/* スクロール誘導 */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                onClick={() => scrollTo("entry")}
                className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
                aria-label="次のセクションへ"
            >
                <span className="font-led text-[0.65rem] tracking-[0.25em]">SCROLL</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
            </motion.button>

            {/* 水面の終わり */}
            <div className="absolute inset-x-0 bottom-0 z-10">
                <LaneRope onWater />
            </div>
        </section>
    );
}
