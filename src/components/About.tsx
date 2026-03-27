"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Code2, Globe, Database, Lock, Palette, Server, Zap } from "lucide-react";

/** スキルデータ */
const skills = [
    {
        name: "FULLSTACK DEV",
        icon: Code2,
        desc: "フロントエンドからバックエンドまで一貫した開発",
        color: "bg-[var(--color-neo-blue)]",
    },
    {
        name: "AI INTEGRATION",
        icon: BrainCircuit,
        desc: "AIを活用した機能設計とプロンプトエンジニアリング",
        color: "bg-[var(--color-neo-pink)]",
    },
    {
        name: "AUTH & SECURITY",
        icon: Lock,
        desc: "Clerk等を用いたセキュアなユーザー認証基盤の構築",
        color: "bg-[var(--color-neo-yellow)]",
    },
    {
        name: "RAPID PROTOTYPING",
        icon: Zap,
        desc: "アイデアからデプロイまでの圧倒的なスピード",
        color: "bg-[var(--color-neo-green)]",
    },
];

/** 使用技術スタック */
const techStack = [
    { name: "Next.js", icon: Globe },
    { name: "React", icon: Code2 },
    { name: "TypeScript", icon: Code2 },
    { name: "Tailwind CSS", icon: Palette },
    { name: "Framer Motion", icon: Zap },
    { name: "Supabase", icon: Database },
    { name: "Neon", icon: Database },
    { name: "Clerk", icon: Lock },
    { name: "Vercel", icon: Server },
    { name: "PostgreSQL", icon: Database },
];

/** 経験のハイライト */
const highlights = [
    { label: "Projects", value: "3+", sub: "DEPLOYED APPS", color: "bg-[var(--color-neo-yellow)]" },
    { label: "Stack", value: "10+", sub: "TECHNOLOGIES", color: "bg-[var(--color-neo-green)]" },
    { label: "Focus", value: "AI", sub: "× WEB DEVELOPMENT", color: "bg-[var(--color-neo-pink)]" },
];

/**
 * Aboutセクション (Neo-Brutalism)
 */
export default function About() {
    return (
        <section id="about" className="py-32 relative z-10 bg-[var(--color-neo-blue)] border-b-4 border-black">
            <div className="container px-6 mx-auto max-w-6xl">
                {/* セクションタイトル */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="inline-block bg-white text-black border-4 border-black shadow-[6px_6px_0_#000] px-6 py-2 mb-6 transform rotate-2">
                        <span className="text-xl font-black uppercase tracking-widest">
                            About Me
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 uppercase">
                        <span className="bg-black text-white px-4 py-2 inline-block shadow-[8px_8px_0_var(--color-neo-yellow)] transform -rotate-1">
                            ABOUT &
                        </span>
                        <br />
                        <span className="bg-white text-black border-4 border-black px-4 py-2 mt-4 inline-block shadow-[8px_8px_0_#000] transform rotate-1">
                            SKILLS
                        </span>
                    </h2>
                </motion.div>

                {/* プロフィール + ハイライト */}
                <div className="grid md:grid-cols-5 gap-12 items-start mb-24">
                    {/* テキスト */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-3 bg-white border-4 border-black p-8 shadow-[8px_8px_0_#000]"
                    >
                        <h3 className="text-3xl font-black mb-6 text-black uppercase border-b-4 border-black pb-4">
                            テクノロジーで価値を届ける
                        </h3>
                        <p className="text-black font-bold leading-relaxed mb-6 text-lg">
                            Next.js や React を中心としたモダンなフロントエンド技術と、Supabase・Neon・Clerk といったサーバーレスDBやBaaSを組み合わせ、高品質なWebアプリケーションを構築しています。
                        </p>
                        <p className="text-black font-bold leading-relaxed text-lg bg-[var(--color-neo-yellow)] p-4 border-2 border-black">
                            AIとの協働開発スタイルにより、ロジックの複雑さに囚われることなく「どのような価値を届けるか」「どれだけ美しい体験を作るか」というクリエイティブな部分に集中。アイデアを驚異的なスピードで形にします。
                        </p>
                    </motion.div>

                    {/* 数値ハイライト */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:col-span-2 grid grid-cols-1 gap-6"
                    >
                        {highlights.map((h, i) => (
                            <motion.div
                                key={h.label}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                                className={`${h.color} border-4 border-black p-6 shadow-[6px_6px_0_#000] text-center transform hover:-translate-y-1 transition-transform`}
                            >
                                <div className="text-5xl font-black text-black mb-2 tracking-tighter">{h.value}</div>
                                <div className="text-sm font-black text-black/80 uppercase">{h.sub}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* スキルカード */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                            className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_#000] hover:-translate-y-2 hover:shadow-[10px_10px_0_#000] transition-all group flex flex-col"
                        >
                            <div className={`w-14 h-14 ${skill.color} border-2 border-black shadow-[4px_4px_0_#000] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <skill.icon className="w-8 h-8 text-black stroke-[2.5]" />
                            </div>
                            <h4 className="text-lg font-black text-black mb-4 uppercase leading-none">
                                {skill.name}
                            </h4>
                            <p className="text-sm font-bold text-gray-700 leading-relaxed mt-auto border-t-2 border-black pt-4">
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
                    className="bg-white border-4 border-black p-10 shadow-[8px_8px_0_#000]"
                >
                    <h3 className="text-center text-3xl font-black uppercase text-black mb-10 inline-block bg-[var(--color-neo-yellow)] px-4 py-2 border-2 border-black shadow-[4px_4px_0_#000] -rotate-1 relative left-1/2 -translate-x-1/2">
                        TECH STACK
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.05 * index }}
                                className="flex items-center gap-3 px-6 py-3 bg-black text-white font-black text-sm uppercase border-2 border-black hover:bg-[var(--color-neo-green)] hover:text-black hover:shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-all cursor-crosshair"
                            >
                                <tech.icon className="w-5 h-5 stroke-[2.5]" />
                                {tech.name}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
