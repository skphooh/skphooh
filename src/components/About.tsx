"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layout, Smartphone } from "lucide-react";

const skills = [
    { name: "Frontend Development", icon: Layout, desc: "React, Next.js, TypeScript, Tailwind CSS" },
    { name: "Backend Integration", icon: Database, desc: "Node.js, Firebase, Supabase, REST APIs" },
    { name: "UI/UX Design", icon: Smartphone, desc: "Figma, Framer Motion, Responsive Design" },
    { name: "Clean Architecture", icon: Code2, desc: "SOLID Principles, Refactoring, Testing" },
];

export default function About() {
    return (
        <section id="about" className="py-24 relative z-10">
            <div className="container px-4 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">About & Skills</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-white">エンジニアとしての歩み</h3>
                        <p className="text-gray-400 leading-relaxed mb-6 font-light">
                            モダンなWeb技術に情熱を注ぎ、ユーザー視点に立ったUI/UXの設計と、堅牢なアーキテクチャの構築に取り組んできました。「圧倒的にビジュアルがいい」だけでなく、パフォーマンスやアクセシビリティにも妥協しないプロダクト開発を心がけています。
                        </p>
                        <p className="text-gray-400 leading-relaxed font-light">
                            Appleのようなミニマリズムと、ユーザーの操作に呼応するダイナミックなインタラクションを組み合わせることで、記憶に残るデジタル体験の創造を目指しています。
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                className="glass p-6 rounded-2xl hover:bg-white/5 transition-colors group"
                            >
                                <skill.icon className="w-8 h-8 text-blue-400 mb-4 group-hover:text-purple-400 transition-colors" strokeWidth={1.5} />
                                <h4 className="text-lg font-medium text-white mb-2">{skill.name}</h4>
                                <p className="text-sm text-gray-500">{skill.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
