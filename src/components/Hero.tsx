"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown, Sparkles } from "lucide-react";

/** タイピングアニメーションで表示するフレーズ */
const phrases = [
    "AIと共に創るWeb開発",
    "Vibe Codingで加速する実装",
    "美しいUIを、圧倒的スピードで",
    "アイデアを形にする最短ルート",
];

/**
 * ヒーローセクションコンポーネント
 * タイピングアニメーション、フローティングオーブ、CTAボタンを含む
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
                /* 一文字ずつ追加 */
                timeout = setTimeout(() => {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                }, 80);
            } else {
                /* フレーズ完成後、少し待ってから削除開始 */
                timeout = setTimeout(() => setIsDeleting(true), 2000);
            }
        } else {
            if (displayText.length > 0) {
                /* 一文字ずつ削除 */
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 40);
            } else {
                /* 全削除後、次のフレーズへ */
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
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* フローティングオーブ */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[15%] left-[15%] w-[30rem] h-[30rem] bg-blue-600/15 rounded-full blur-[120px] animate-pulse-glow" />
                <div
                    className="absolute bottom-[15%] right-[15%] w-[25rem] h-[25rem] bg-purple-600/15 rounded-full blur-[120px] animate-pulse-glow"
                    style={{ animationDelay: "2s" }}
                />
                <div
                    className="absolute top-[50%] left-[50%] w-[20rem] h-[20rem] bg-pink-600/10 rounded-full blur-[120px] animate-pulse-glow"
                    style={{ animationDelay: "4s" }}
                />
            </div>

            <div className="container px-6 mx-auto relative z-10 text-center max-w-4xl">
                {/* ステータスバッジ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full ring-1 ring-blue-500/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        Open for Collaboration
                    </span>
                </motion.div>

                {/* メインタイトル */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
                        <span className="text-white">Hi, I&apos;m</span>
                        <br />
                        <span className="text-gradient">skphooh</span>
                    </h1>
                </motion.div>

                {/* タイピングアニメーション */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-10 flex items-center justify-center mb-10"
                >
                    <p className="text-lg md:text-xl text-gray-400 font-light">
                        {displayText}
                        <span className="inline-block w-[2px] h-5 bg-blue-400 ml-1 animate-blink" />
                    </p>
                </motion.div>

                {/* CTAボタン */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => scrollTo("projects")}
                        className="group px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium text-sm hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                        プロジェクトを見る
                    </button>
                    <button
                        onClick={() => scrollTo("contact")}
                        className="px-8 py-3.5 text-gray-300 rounded-full font-medium text-sm ring-1 ring-white/10 hover:ring-white/30 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer"
                    >
                        お問い合わせ
                    </button>
                </motion.div>

                {/* スクロールインジケーター */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-20"
                >
                    <button
                        onClick={() => scrollTo("projects")}
                        className="group flex flex-col items-center text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                    >
                        <span className="text-xs uppercase tracking-[0.2em] mb-3">
                            Scroll
                        </span>
                        <ArrowDown className="w-4 h-4 animate-bounce" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
