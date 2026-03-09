"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, ChevronRight } from "lucide-react";
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
        iframePreview: true,
        image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1470&auto=format&fit=crop", // Wear-Castの代替えデモ
        details: "Wear-Castは、毎日の気象データと連動してユーザーの服装記録をサポートするSNSアプリケーションです。洗練されたUIとスムーズなトランジションで、ストレスのない記録体験を提供します。",
    },
    {
        title: "Meguri24",
        description:
            "AIが24時間の生活リズムを分析し、最適な行動パターンを提案する生活習慣改善アプリ。円形の24時間時計UIでタスク管理、睡眠分析、日記機能を提供。",
        features: ["24時間時計UI", "AI生活リズム分析", "タスク管理", "日記・ふりかえり"],
        techStack: ["Next.js", "Clerk", "Supabase", "Tailwind CSS", "AI"],
        liveUrl: "https://meguri24.vercel.app/",
        status: "live",
        iframePreview: true,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop", // Meguri24の代替えデモ
        details: "Meguri24は、独自の円形UIを採用した新しい形のタスク・生活管理アプリです。AIを活用し、日々の記録からより良い習慣形成をサポートします。Clerkによる安全な認証基盤を備えています。",
    },
    {
        title: "skphooh.dev",
        description:
            "このポートフォリオサイト自体。Next.js 16 + Framer Motionを使い、パーティクルエフェクトやタイピングアニメーションなどの洗練されたインタラクションを実装。",
        features: ["パーティクル背景", "タイピングアニメーション", "スクロール進捗バー", "レスポンシブ対応"],
        techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
        liveUrl: "https://skphooh.vercel.app/",
        githubUrl: "https://github.com/skphooh/skphooh",
        status: "live",
        iframePreview: true,
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1470&auto=format&fit=crop", // skphooh.devの代替えデモ
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
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
    const allTags = getAllTags(projects);

    const filtered = activeFilter
        ? projects.filter((p) => p.techStack.includes(activeFilter))
        : projects;

    // モーダルオープン時のスクロール制御
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedProject]);

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
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            </div>

            {/* プロジェクト詳細モーダル */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-24 pb-6 sm:p-6 sm:pt-28 sm:pb-8"
                        onClick={() => setSelectedProject(null)}
                    >
                        {/* 背景のブラー */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                            className="relative w-full max-w-4xl max-h-full overflow-y-auto glass rounded-2xl shadow-2xl ring-1 ring-white/10 flex flex-col pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* モーダル閉じるボタン */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-[110] p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* モーダルのヘッダー領域（iframe または 画像 または タイトル） */}
                            <div className="relative w-full h-64 sm:h-96 bg-[#0a0a0a] shrink-0 overflow-hidden border-b border-white/5">
                                {selectedProject.iframePreview && selectedProject.liveUrl ? (
                                    <div className="absolute inset-0 w-full h-full pointer-events-auto">
                                        <iframe
                                            src={selectedProject.liveUrl}
                                            className="w-full h-full border-0"
                                            title={`${selectedProject.title} Live Demo`}
                                            loading="lazy"
                                        />
                                    </div>
                                ) : selectedProject.image ? (
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-purple-900/40">
                                        <span className="text-4xl text-white/30 font-light">{selectedProject.title}</span>
                                    </div>
                                )}
                                {/* ダークグラデーションのオーバーレイ（iframe下部へのフェードアウト効果） */}
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
                            </div>

                            {/* モーダルのコンテンツ */}
                            <div className="p-6 sm:p-10 relative z-10 -mt-10 sm:-mt-16">
                                <div className="flex flex-wrap items-end gap-4 mb-4">
                                    <h3 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-md">
                                        {selectedProject.title}
                                    </h3>
                                    {selectedProject.status && (
                                        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ring-1 bg-white/10 text-white ring-white/20 mb-2">
                                            {selectedProject.status}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedProject.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full ring-1 ring-blue-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <h4 className="text-lg font-semibold text-white mb-2">概要</h4>
                                    <p className="text-gray-300 leading-relaxed mb-8">
                                        {selectedProject.details || selectedProject.description}
                                    </p>

                                    {selectedProject.features && selectedProject.features.length > 0 && (
                                        <>
                                            <h4 className="text-lg font-semibold text-white mb-4">主な機能</h4>
                                            <div className="grid sm:grid-cols-2 gap-3 mb-8">
                                                {selectedProject.features.map((feature) => (
                                                    <div key={feature} className="flex items-start gap-2 text-gray-400 bg-white/5 p-3 rounded-lg ring-1 ring-white/10">
                                                        <ChevronRight className="w-5 h-5 text-blue-400 shrink-0" />
                                                        <span className="text-sm">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* リンクアクション */}
                                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 pt-8 border-t border-white/10">
                                    {selectedProject.liveUrl && (
                                        <a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium text-sm hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                                        >
                                            サイトを開く
                                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </a>
                                    )}
                                    {selectedProject.githubUrl && (
                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto px-8 py-3.5 text-gray-300 rounded-xl font-medium text-sm ring-1 ring-white/10 hover:ring-white/30 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <Github className="w-4 h-4" />
                                            ソースコード
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
