"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown, Flame } from "lucide-react";

/** タイピングアニメーションで表示するフレーズ */
const phrases = [
    "Next.js × Supabase で構築",
    "圧倒的インパクトを、Webに",
    "常識を壊すUIデザイン",
    "アイデアを形にする爆速開発",
];

/**
 * ヒーローセクションコンポーネント (Neo-Brutalism)
 * 太いフォント、ネオンカラー、はっきりした影を特徴とする
 */
export default function Hero() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    /** タイピングアニメーションロジック */
    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        let timeout: NodeJS.Timeout;

        if (!isDeleting) {
            if (displayText.length < currentPhrase.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                }, 80);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 2000);
            }
        } else {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 40);
            } else {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
            }
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
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
            {/* 装飾の幾何学シェイプ */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-[var(--color-neo-pink)] border-4 border-black shadow-[8px_8px_0_#000] animate-spin-slow" />
                <div className="absolute bottom-[20%] right-[10%] w-40 h-40 bg-[var(--color-neo-blue)] border-4 border-black rounded-full shadow-[8px_8px_0_#000] animate-bounce" style={{ animationDuration: '3s' }}/>
                <div className="absolute top-[60%] left-[80%] w-24 h-24 bg-[var(--color-neo-green)] border-4 border-black shadow-[6px_6px_0_#000] rotate-45" />
            </div>

            <div className="container px-6 mx-auto relative z-10 text-center max-w-5xl">
                {/* ステータスバッジ */}
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                    className="mb-10 inline-block"
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 text-sm font-black text-black bg-[var(--color-neo-yellow)] border-4 border-black shadow-[4px_4px_0_#000] uppercase tracking-wider">
                        <Flame className="w-5 h-5 fill-red-500" />
                        Open for Collaboration
                    </span>
                </motion.div>

                {/* メインタイトル */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[1.0] uppercase">
                        <span className="block text-stroke mb-4 text-black">Hi, I&apos;m</span>
                        <span className="block bg-[var(--color-neo-blue)] text-black border-4 border-black shadow-[8px_8px_0_#000] px-6 py-4 inline-block -rotate-2 hover:rotate-2 transition-transform duration-300">
                            skphooh
                        </span>
                    </h1>
                </motion.div>

                {/* タイピングアニメーション */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-16 flex items-center justify-center mb-12"
                >
                    <p className="text-xl md:text-3xl text-black font-black bg-white border-4 border-black px-6 py-3 shadow-[6px_6px_0_#000] inline-flex items-center">
                        {displayText}
                        <span className="inline-block w-[4px] h-8 bg-[var(--color-neo-red)] ml-2 animate-blink" />
                    </p>
                </motion.div>

                {/* CTAボタン */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <button
                        onClick={() => scrollTo("projects")}
                        className="neo-brutal-btn px-10 py-5 text-lg w-full sm:w-auto bg-[var(--color-neo-yellow)]"
                    >
                        プロジェクトを見る
                    </button>
                    <button
                        onClick={() => scrollTo("contact")}
                        className="neo-brutal-btn px-10 py-5 text-lg w-full sm:w-auto bg-white hover:bg-gray-100"
                    >
                        お問い合わせ
                    </button>
                </motion.div>

                {/* スクロールインジケーター */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", delay: 0.8 }}
                    className="mt-24 inline-block"
                >
                    <button
                        onClick={() => scrollTo("projects")}
                        className="group flex items-center justify-center w-16 h-16 bg-[var(--color-neo-pink)] border-4 border-black rounded-full shadow-[4px_4px_0_#000] hover:translate-y-1 hover:shadow-[2px_2px_0_#000] transition-all cursor-pointer"
                    >
                        <ArrowDown className="w-8 h-8 stroke-[3]" />
                    </button>
                </motion.div>
            </div>

            {/* マーキーエフェクト（バナー） */}
            <div className="absolute bottom-0 left-0 right-0 bg-black text-[var(--color-neo-yellow)] py-3 border-t-4 border-black overflow-hidden whitespace-nowrap z-20">
                <div className="inline-block animate-marquee whitespace-nowrap font-black text-xl uppercase tracking-widest">
                    <span>WEB DEVELOPMENT • UI/UX DESIGN • NEO-BRUTALISM • FULLSTACK • NEXT.JS • REACT • </span>
                    <span>WEB DEVELOPMENT • UI/UX DESIGN • NEO-BRUTALISM • FULLSTACK • NEXT.JS • REACT • </span>
                    <span>WEB DEVELOPMENT • UI/UX DESIGN • NEO-BRUTALISM • FULLSTACK • NEXT.JS • REACT • </span>
                    <span>WEB DEVELOPMENT • UI/UX DESIGN • NEO-BRUTALISM • FULLSTACK • NEXT.JS • REACT • </span>
                </div>
            </div>
        </section>
    );
}
