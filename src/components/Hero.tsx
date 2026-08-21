"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import WaterSurface from "./pool/WaterSurface";
import LaneRope from "./pool/LaneRope";
import { projects } from "@/data/projects";
import { awards, seasonLog } from "@/data/records";

/** 名前の下に固定で置く肩書き */
const TAGLINE = "SECURITY × WEB ENGINEERING";

/** タイピングで切り替えるフレーズ */
const phrases = [
    "作る側から、壊れ方を知る側へ",
    "脆弱性診断とプロダクト開発、その両方から",
    "設計から守りまで、一貫して考える",
];

/** 「位置について」から号砲までの時間(ms) */
const START_SIGNAL_DELAY = 1800;

const NAME = "skphooh";

/** 掲示板に出す実績。すべて実データから数える */
const stats = [
    { value: projects.length, label: "PRODUCTS" },
    {
        value: seasonLog.filter((e) => e.kind === "conference").length,
        label: "TALKS",
    },
    { value: awards.length, label: "AWARDS" },
];

/**
 * ヒーローセクション (START)
 *
 * 画面いっぱいの水の上に、名前・肩書き・実績を重ねる。
 * 名前は 1 文字ずつ水面から浮き上がり、その下に反射が映る。
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
                timeout = setTimeout(() => setIsDeleting(true), 2400);
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
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="top"
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
        >
            {/* 水 */}
            <WaterSurface depth={0.12} density={1} />

            {/* プール底のレーンライン */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/20" />
                <div className="absolute inset-y-0 left-[18%] w-px bg-white/10" />
                <div className="absolute inset-y-0 right-[18%] w-px bg-white/10" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-28 text-center">
                {/* スタート合図 */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 inline-flex items-center gap-3"
                >
                    <span
                        className={`h-2 w-2 rounded-full ${
                            started ? "animate-pulse-lamp bg-[#3ddc84]" : "bg-rope-red"
                        }`}
                    />
                    <span className="font-led text-[0.7rem] tracking-[0.3em] text-white/80">
                        {started ? "OPEN FOR COLLABORATION" : "TAKE YOUR MARKS"}
                    </span>
                </motion.div>

                {/* 名前。1 文字ずつ浮き上がる */}
                <h1 className="font-display text-[3.5rem] leading-[0.92] tracking-tight text-white sm:text-8xl md:text-[9rem]">
                    <span className="sr-only">{NAME}</span>
                    <span aria-hidden="true" className="inline-flex">
                        {NAME.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.1 + i * 0.055,
                                    ease: [0.2, 0.7, 0.3, 1],
                                }}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                </h1>

                {/* 水面に映る反射 */}
                <motion.span
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.22 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="-mt-3 block select-none font-display text-[3.5rem] leading-[0.92] tracking-tight text-white blur-[3px] sm:text-8xl md:text-[9rem]"
                    style={{
                        transform: "scaleY(-1)",
                        maskImage: "linear-gradient(to top, transparent 15%, black 85%)",
                        WebkitMaskImage:
                            "linear-gradient(to top, transparent 15%, black 85%)",
                    }}
                >
                    {NAME}
                </motion.span>

                {/* 肩書き */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.55 }}
                    className="mt-6 flex flex-col items-center gap-4"
                >
                    <span className="font-led text-xs tracking-[0.28em] text-white sm:text-sm">
                        {TAGLINE}
                    </span>
                    <span className="block w-40">
                        <LaneRope onWater />
                    </span>
                </motion.div>

                {/* タイピング */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-7 flex min-h-[2rem] items-center justify-center text-sm text-white/85 sm:text-base"
                >
                    {displayText}
                    <span className="animate-blink ml-1 inline-block h-4 w-px bg-white/70" />
                </motion.p>

                {/* 実績カウント */}
                <motion.dl
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.85 }}
                    className="mx-auto mt-12 flex max-w-md justify-center divide-x divide-white/20"
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex-1 px-5 sm:px-8">
                            <dd className="font-display text-3xl leading-none text-white sm:text-4xl">
                                {stat.value}
                            </dd>
                            <dt className="mt-2 font-led text-[0.6rem] tracking-[0.2em] text-white/60">
                                {stat.label}
                            </dt>
                        </div>
                    ))}
                </motion.dl>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
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
                transition={{ duration: 0.6, delay: 1.2 }}
                onClick={() => scrollTo("entry")}
                className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
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
