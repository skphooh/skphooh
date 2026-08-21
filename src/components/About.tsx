"use client";

import { motion } from "framer-motion";

/**
 * スキル。4 泳法に対応させている。
 * 個人メドレーの泳順（バタフライ→背泳ぎ→平泳ぎ→自由形）に合わせ、
 * 第一泳法にいま一番力を入れている領域を置く。
 */
const skills = [
    {
        stroke: "BUTTERFLY",
        name: "Security",
        desc: "Webアプリケーションの脆弱性診断。攻撃者の視点から設計を見直す",
    },
    {
        stroke: "BACKSTROKE",
        name: "Web Application",
        desc: "Next.js / React を軸にしたフロントエンドとバックエンドの実装",
    },
    {
        stroke: "BREASTSTROKE",
        name: "AI Integration",
        desc: "AIを活用した機能設計とプロンプトエンジニアリング",
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
                        大学院で研究を進めながら、Next.js や React を中心に Web
                        アプリケーションを個人開発しています。作ったものは、すべて公開して動かし続けることにしています。
                    </p>
                    <p>
                        いま一番の関心は
                        <strong className="font-medium text-ink">セキュリティ</strong>
                        です。現在は LINEヤフー株式会社でセキュリティエンジニアとして
                        Web アプリケーションの脆弱性診断に取り組んでいます。自分で作ってきたからこそ、
                        どこが壊れやすいのかを実装の側から考えられる——
                        <strong className="font-medium text-ink">
                            作る視点と壊す視点の両方を持つこと
                        </strong>
                        を、これからの軸にしたいと考えています。
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
                            className="group relative bg-surface p-8 transition-colors duration-300 hover:bg-canvas"
                        >
                            {/* ホバーで左端に水が差す */}
                            <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-pool-light transition-transform duration-400 ease-out group-hover:scale-y-100" />
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
                        {techStack.map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, y: 6 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.03 }}
                                className="tag"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
