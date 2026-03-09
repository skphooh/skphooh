"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard, { ProjectType } from "./ProjectCard";

/** プロジェクトデータ - 実際の使用技術と詳細な説明 */
const projects: ProjectType[] = [
    {
        title: "Wear-Cast",
        description:
            "日々のコーディネートと天気を記録し、他のユーザーの投稿と交流できるSNS型ライフスタイルアプリ。天気に基づいたおすすめの服装提案機能も搭載。",
        features: ["コーディネート記録", "ソーシャルフィード", "天気連動レコメンド", "プロフィール管理"],
        techStack: ["Next.js", "React", "Tailwind CSS", "Supabase"],
        liveUrl: "https://wear-cast.vercel.app/",
        status: "live",
        image: "/api/assets/wearcast",
    },
    {
        title: "Meguri24",
        description:
            "AIが24時間の生活リズムを分析し、最適な行動パターンを提案する生活習慣改善アプリ。円形の24時間時計UIでタスク管理、睡眠分析、日記機能を提供。",
        features: ["24時間時計UI", "AI生活リズム分析", "タスク管理", "日記・ふりかえり"],
        techStack: ["Next.js", "Clerk", "Supabase", "Tailwind CSS", "AI"],
        liveUrl: "https://meguri24.vercel.app/",
        status: "live",
        image: "/api/assets/meguri24",
    },
    {
        title: "skphooh.dev",
        description:
            "このポートフォリオサイト自体。Next.js 16 + Framer Motionを使い、パーティクルエフェクトやタイピングアニメーションなどの洗練されたインタラクションを実装。",
        features: ["パーティクル背景", "タイピングアニメーション", "スクロール進捗バー", "レスポンシブ対応"],
        techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
        githubUrl: "https://github.com/skphooh/skphooh",
        status: "live",
    },
];

/**
 * 全プロジェクトから重複なしの技術タグリストを取得
 */
function getAllTags(items: ProjectType[]): string[] {
    const set = new Set<string>();
    items.forEach((p) => p.techStack.forEach((t) => set.add(t)));
    return Array.from(set);
}

/**
 * プロジェクトセクション
 * フィルタータグ付き。技術スタックでプロジェクトを絞り込める
 */
export default function Projects() {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const allTags = getAllTags(projects);

    const filtered = activeFilter
        ? projects.filter((p) => p.techStack.includes(activeFilter))
        : projects;

    return (
        <section id="projects" className="py-32 relative z-10">
            <div className="container px-6 mx-auto max-w-7xl">
                {/* セクションタイトル */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-blue-400 font-medium mb-4 block">
                        Portfolio
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Selected{" "}
                        <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-gray-500 text-sm max-w-xl mx-auto mt-4">
                        Next.js × Supabase × AI を中心に、実際にデプロイ済みのプロダクトです
                    </p>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6" />
                </motion.div>

                {/* フィルタータグ */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    <button
                        onClick={() => setActiveFilter(null)}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 cursor-pointer ${activeFilter === null
                            ? "bg-white text-black"
                            : "text-gray-400 ring-1 ring-white/10 hover:ring-white/20 hover:text-white"
                            }`}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() =>
                                setActiveFilter(activeFilter === tag ? null : tag)
                            }
                            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 cursor-pointer ${activeFilter === tag
                                ? "bg-white text-black"
                                : "text-gray-400 ring-1 ring-white/10 hover:ring-white/20 hover:text-white"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </motion.div>

                {/* プロジェクトグリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
