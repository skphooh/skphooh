"use client";

import { motion } from "framer-motion";

/** スキル。4 泳法に対応させている */
const skills = [
    {
        stroke: "BUTTERFLY",
        name: "Fullstack Development",
        desc: "フロントエンドからバックエンドまで一貫して設計・実装する",
    },
    {
        stroke: "BACKSTROKE",
        name: "AI Integration",
        desc: "AIを活用した機能設計とプロンプトエンジニアリング",
    },
    {
        stroke: "BREASTSTROKE",
        name: "Auth & Security",
        desc: "セキュアな認証基盤の構築と脆弱性の観点からの設計",
    },
    {
        stroke: "FREESTYLE",
        name: "Rapid Prototyping",
        desc: "アイデアからデプロイまでを最短距離で走らせる",
    },
];

/** 使用技術 */
const techStack = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "WebGL",
    "Supabase",
    "Neon",
    "Clerk",
    "FastAPI",
    "PostgreSQL",
    "Vercel",
];

/**
 * About と Skills (LAP 03)
 */
export default function About() {
    return (
        <section id="about" className="relative z-10 bg-surface py-24 sm:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <span className="lap-label">LAP 03</span>
                    <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-6xl">
                        ABOUT
                    </h2>
                </motion.div>

                {/* 本文 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-2xl space-y-6 text-base leading-loose text-ink-soft"
                >
                    <p>
                        Next.js や React を中心としたモダンなフロントエンド技術と、Supabase・Neon・Clerk
                        といったサーバーレスDBやBaaSを組み合わせ、Webアプリケーションを構築しています。
                    </p>
                    <p>
                        AIとの協働開発により、ロジックの複雑さに時間を奪われることなく「どのような価値を届けるか」
                        「どれだけ良い体験を作るか」に集中する。アイデアを形にするまでの距離を、できるだけ短くしています。
                    </p>
                </motion.div>

                {/* スキル */}
                <div className="mt-20 grid gap-px overflow-hidden rounded-[3px] bg-hairline sm:grid-cols-2">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="bg-surface p-8 transition-colors duration-300 hover:bg-canvas"
                        >
                            <span className="font-led text-[0.65rem] tracking-[0.22em] text-pool-light">
                                {skill.stroke}
                            </span>
                            <h3 className="mt-3 font-display text-xl tracking-tight text-ink">
                                {skill.name}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                                {skill.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* 技術スタック */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6 }}
                    className="mt-16"
                >
                    <span className="lap-label">TECH STACK</span>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <span key={tech} className="tag bg-surface">
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
