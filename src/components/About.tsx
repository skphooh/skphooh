"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Cpu, Sparkles, Zap, Code2, Globe, Database, Lock, Palette, Server } from "lucide-react";

/** スキルデータ - 実際のプロジェクトで使用している技術に基づく */
const skills = [
    {
        name: "フルスタック開発",
        icon: Code2,
        desc: "フロントエンドからバックエンドまで一貫した開発",
        color: "from-blue-500 to-cyan-400",
    },
    {
        name: "AI統合",
        icon: BrainCircuit,
        desc: "AIを活用した機能設計とプロンプトエンジニアリング",
        color: "from-purple-500 to-pink-400",
    },
    {
        name: "認証・セキュリティ",
        icon: Lock,
        desc: "Clerk等を用いたセキュアなユーザー認証基盤の構築",
        color: "from-amber-500 to-orange-400",
    },
    {
        name: "高速プロトタイピング",
        icon: Zap,
        desc: "アイデアからデプロイまでの圧倒的なスピード",
        color: "from-green-500 to-emerald-400",
    },
];

/** 使用技術スタック */
const techStack = [
    { name: "Next.js", icon: Globe, category: "frontend" },
    { name: "React", icon: Code2, category: "frontend" },
    { name: "TypeScript", icon: Code2, category: "frontend" },
    { name: "Tailwind CSS", icon: Palette, category: "frontend" },
    { name: "Framer Motion", icon: Sparkles, category: "frontend" },
    { name: "Supabase", icon: Database, category: "backend" },
    { name: "Clerk", icon: Lock, category: "backend" },
    { name: "Vercel", icon: Server, category: "infra" },
    { name: "PostgreSQL", icon: Database, category: "backend" },
];

/** 経験のハイライト */
const highlights = [
    { label: "Projects", value: "3+", sub: "デプロイ済みアプリ" },
    { label: "Stack", value: "10+", sub: "使用技術" },
    { label: "Focus", value: "AI", sub: "× Web開発" },
];

/**
 * Aboutセクション
 * プロフィール、ハイライト数値、スキルカード、使用技術を表示する
 */
export default function About() {
    return (
        <section id="about" className="py-32 relative z-10">
            <div className="container px-6 mx-auto max-w-6xl">
                {/* セクションタイトル */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-blue-400 font-medium mb-4 block">
                        About Me
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        About &{" "}
                        <span className="text-gradient">Skills</span>
                    </h2>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                {/* プロフィール + ハイライト */}
                <div className="grid md:grid-cols-5 gap-12 items-start mb-24">
                    {/* テキスト */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-3"
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-white">
                            テクノロジーで価値を届ける
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-6 font-light text-[15px]">
                            Next.js や React を中心としたモダンなフロントエンド技術と、Supabase・Clerk といったBaaS（Backend as a Service）を組み合わせ、高品質なWebアプリケーションを構築しています。
                        </p>
                        <p className="text-gray-400 leading-relaxed font-light text-[15px]">
                            AIとの協働開発スタイルにより、ロジックの複雑さに囚われることなく「どのような価値を届けるか」「どれだけ美しい体験を作るか」というクリエイティブな部分に集中。アイデアを驚異的なスピードで形にします。
                        </p>
                    </motion.div>

                    {/* 数値ハイライト */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:col-span-2 grid grid-cols-1 gap-4"
                    >
                        {highlights.map((h, i) => (
                            <motion.div
                                key={h.label}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                                className="glass p-5 rounded-2xl text-center"
                            >
                                <div className="text-3xl font-bold text-gradient mb-1">{h.value}</div>
                                <div className="text-xs text-gray-500">{h.sub}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* スキルカード */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                            className="glass p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 group relative overflow-hidden"
                        >
                            {/* グラデーションアクセント */}
                            <div
                                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            />
                            <skill.icon
                                className="w-8 h-8 text-blue-400 mb-4 group-hover:text-purple-400 transition-colors duration-300"
                                strokeWidth={1.5}
                            />
                            <h4 className="text-base font-semibold text-white mb-2">
                                {skill.name}
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {skill.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* 使用技術 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-center text-sm uppercase tracking-[0.2em] text-gray-500 font-medium mb-8">
                        Tech Stack
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.05 * index }}
                                className="flex items-center gap-2 px-4 py-2.5 glass rounded-full text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 group"
                            >
                                <tech.icon className="w-4 h-4 group-hover:text-blue-400 transition-colors" strokeWidth={1.5} />
                                {tech.name}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
