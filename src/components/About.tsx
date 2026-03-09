"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Cpu, Sparkles, Zap, Code2, Globe } from "lucide-react";

/** スキルデータ */
const skills = [
    {
        name: "Vibe Coding",
        icon: Sparkles,
        desc: "AIツールを駆使した高速プロトタイピングと実装",
        color: "from-blue-500 to-cyan-400",
    },
    {
        name: "Prompt Engineering",
        icon: BrainCircuit,
        desc: "AIのポテンシャルを最大限に引き出す対話と指示",
        color: "from-purple-500 to-pink-400",
    },
    {
        name: "Modern Stack",
        icon: Zap,
        desc: "Next.js, React, Tailwind CSSによるモダンなUI構築",
        color: "from-amber-500 to-orange-400",
    },
    {
        name: "Rapid Development",
        icon: Cpu,
        desc: "アイデアからデプロイまでの圧倒的なスピード",
        color: "from-green-500 to-emerald-400",
    },
];

/** 技術スタック */
const techStack = [
    { name: "Next.js", icon: Globe },
    { name: "React", icon: Code2 },
    { name: "TypeScript", icon: Code2 },
    { name: "Tailwind CSS", icon: Sparkles },
    { name: "Framer Motion", icon: Zap },
    { name: "Vercel", icon: Globe },
];

/**
 * Aboutセクション
 * プロフィール、スキルカード、使用技術を表示する
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

                {/* プロフィール */}
                <div className="grid md:grid-cols-5 gap-12 items-start mb-24">
                    {/* アバタープレースホルダー */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-2 flex justify-center"
                    >
                        <div className="relative">
                            <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10 flex items-center justify-center overflow-hidden">
                                <span className="text-6xl md:text-7xl font-light text-white/30">
                                    s
                                </span>
                            </div>
                            {/* デコレーション */}
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500/20 rounded-full blur-sm" />
                            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-purple-500/20 rounded-full blur-sm" />
                        </div>
                    </motion.div>

                    {/* テキスト */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-3"
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-white">
                            AIと共に創るWeb開発
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-6 font-light text-[15px]">
                            私は「Vibe Coding（AIとの協働コーディング）」をメインのスタイルとして、Webアプリケーションを構築しています。自ら全てを記述するのではなく、AIという強力なパートナーと対話しながら、アイデアを驚異的なスピードで形にします。
                        </p>
                        <p className="text-gray-400 leading-relaxed font-light text-[15px]">
                            最新のAIツールを活用することで、ロジックの複雑さに囚われることなく「どのような価値を届けるか」「どれだけ美しい体験を作るか」というクリエイティブな部分にリソースを集中させています。
                        </p>
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
                                className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                            >
                                <tech.icon className="w-4 h-4" strokeWidth={1.5} />
                                {tech.name}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
