"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, ChevronRight } from "lucide-react";
import ProjectCard, { ProjectType } from "./ProjectCard";

/** プロジェクトデータ */
const projects: ProjectType[] = [
    {
        title: "Wear-Cast",
        description:
            "日々のコーディネートと天気を記録し、\n他のユーザーの投稿と交流できるSNS型ライフスタイルアプリ。\n天気に基づいたおすすめの服装提案機能も搭載。",
        features: ["コーディネート記録", "ソーシャルフィード", "天気連動レコメンド", "プロフィール管理"],
        techStack: ["Next.js", "React", "Tailwind CSS", "Supabase"],
        liveUrl: "https://wear-cast.vercel.app/",
        status: "live",
        iframePreview: true,
        image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1470&auto=format&fit=crop",
        details: "Wear-Castは、毎日の気象データと連動してユーザーの服装記録をサポートするSNSアプリケーションです。\n洗練されたUIとスムーズなトランジションで、ストレスのない記録体験を提供します。",
    },
    {
        title: "Meguri24",
        description:
            "AIが24時間の生活リズムを分析し、\n最適な行動パターンを提案する生活習慣改善アプリ。\n円形の24時間時計UIでタスク管理、睡眠分析、日記機能を提供。",
        features: ["24時間時計UI", "AI生活リズム分析", "タスク管理", "日記・ふりかえり"],
        techStack: ["Next.js", "Clerk", "Supabase", "Tailwind CSS", "AI"],
        liveUrl: "https://meguri24.vercel.app/",
        status: "live",
        iframePreview: true,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
        details: "Meguri24は、独自の円形UIを採用した新しい形のタスク・生活管理アプリです。\nAIを活用し、日々の記録からより良い習慣形成をサポートします。\nClerkによる安全な認証基盤を備えています。",
    },
    {
        title: "skphooh.dev",
        description:
            "このポートフォリオサイト自体。\nNeo-Brutalismデザインを採用し、\n圧倒的なインパクトと個性を表現したフロントエンド体験。",
        features: ["Neo-Brutalism UI", "タイピング・マーキー", "カスタムカーソル(予定)", "レスポンシブ対応"],
        techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
        liveUrl: "https://skphooh.vercel.app/",
        githubUrl: "https://github.com/skphooh/skphooh",
        status: "live",
        iframePreview: true,
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1470&auto=format&fit=crop",
    },
];

function getAllTags(items: ProjectType[]): string[] {
    const set = new Set<string>();
    items.forEach((p) => p.techStack.forEach((t) => set.add(t)));
    return Array.from(set);
}

/**
 * プロジェクトセクション (Neo-Brutalism)
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
        <section id="projects" className="py-32 relative z-10 bg-white border-y-4 border-black">
            <div className="container px-6 mx-auto max-w-7xl">
                {/* セクションタイトル */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className="mb-16"
                >
                    <div className="inline-block bg-[var(--color-neo-pink)] text-black border-4 border-black shadow-[6px_6px_0_#000] px-6 py-2 mb-6 transform -rotate-2">
                        <span className="text-xl font-black uppercase tracking-widest">
                            Portfolio
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 uppercase text-stroke-sm">
                        Selected
                        <br />
                        <span className="bg-[var(--color-neo-yellow)] px-4 py-2 border-4 border-black shadow-[8px_8px_0_#000] inline-block mt-4 transform rotate-1">
                            Projects
                        </span>
                    </h2>
                    <p className="text-black font-bold text-lg md:text-xl max-w-2xl mt-10 border-l-4 border-black pl-6 py-2">
                        個人開発で制作した、これまでの代表的なプロダクトです。
                    </p>
                </motion.div>

                {/* フィルタータグ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex flex-wrap gap-4 mb-16"
                >
                    <button
                        onClick={() => setActiveFilter(null)}
                        className={`px-6 py-2 text-sm font-black uppercase border-2 border-black transition-all cursor-pointer ${activeFilter === null
                            ? "bg-black text-white shadow-[4px_4px_0_var(--color-neo-pink)] translate-x-[-2px] translate-y-[-2px]"
                            : "bg-white text-black shadow-[4px_4px_0_#000] hover:bg-gray-100"
                            }`}
                    >
                        ALL
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() =>
                                setActiveFilter(activeFilter === tag ? null : tag)
                            }
                            className={`px-6 py-2 text-sm font-black uppercase border-2 border-black transition-all cursor-pointer ${activeFilter === tag
                                ? "bg-black text-white shadow-[4px_4px_0_var(--color-neo-blue)] translate-x-[-2px] translate-y-[-2px]"
                                : "bg-white text-black shadow-[4px_4px_0_#000] hover:bg-[var(--color-neo-blue)] hover:shadow-[4px_4px_0_#000]"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </motion.div>

                {/* プロジェクトグリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 50 }}
                            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white border-4 border-black shadow-[16px_16px_0_#000] flex flex-col pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* モーダル閉じるボタン */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-[110] p-3 bg-[var(--color-neo-pink)] border-4 border-black text-black shadow-[4px_4px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
                            >
                                <X className="w-6 h-6 stroke-[3]" />
                            </button>

                            {/* モーダルのヘッダー領域 */}
                            <div className="relative w-full h-[50vh] min-h-[400px] bg-[var(--color-neo-yellow)] border-b-4 border-black shrink-0 overflow-hidden group">
                                {selectedProject.iframePreview && selectedProject.liveUrl ? (
                                    <div className="absolute inset-0 w-full h-full pointer-events-auto bg-white overflow-hidden">
                                        <div 
                                           className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left flex items-center justify-center scale-[0.5]"
                                        >
                                            <iframe
                                                src={selectedProject.liveUrl}
                                                className="w-full h-full border-0"
                                                title={`${selectedProject.title} Live Demo`}
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                ) : selectedProject.image ? (
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover border-b-4 border-black"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-6xl font-black uppercase text-black/20 transform -rotate-12">
                                            {selectedProject.title}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* モーダルのコンテンツ */}
                            <div className="p-8 sm:p-12 relative z-10 bg-white">
                                <div className="flex flex-wrap items-end gap-6 mb-8 border-b-4 border-black pb-8">
                                    <h3 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tighter">
                                        {selectedProject.title}
                                    </h3>
                                    {selectedProject.status && (
                                        <span className="px-4 py-2 text-sm font-black uppercase tracking-wider bg-[var(--color-neo-green)] border-2 border-black shadow-[4px_4px_0_#000] transform rotate-2">
                                            {selectedProject.status}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-3 mb-10">
                                    {selectedProject.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 text-xs font-black uppercase bg-black text-white border-2 border-transparent shadow-[4px_4px_0_var(--color-neo-blue)]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="prose prose-lg max-w-none text-black font-medium leading-relaxed mb-10">
                                    <h4 className="text-2xl font-black uppercase inline-block bg-yellow-300 border-2 border-black px-4 py-1 mb-6 shadow-[4px_4px_0_#000]">OVERVIEW</h4>
                                    <p className="whitespace-pre-wrap border-l-4 border-black pl-6 py-2 bg-gray-50 text-lg">
                                        {selectedProject.details || selectedProject.description}
                                    </p>

                                    {selectedProject.features && selectedProject.features.length > 0 && (
                                        <div className="mt-12">
                                            <h4 className="text-2xl font-black uppercase inline-block bg-[var(--color-neo-pink)] border-2 border-black px-4 py-1 mb-6 shadow-[4px_4px_0_#000]">FEATURES</h4>
                                            <ul className="grid sm:grid-cols-2 gap-6 list-none pl-0">
                                                {selectedProject.features.map((feature) => (
                                                    <li key={feature} className="flex items-center gap-4 bg-white border-4 border-black p-4 shadow-[4px_4px_0_#000]">
                                                        <span className="w-8 h-8 flex items-center justify-center bg-black text-white font-black">✓</span>
                                                        <span className="font-bold">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* リンクアクション */}
                                <div className="flex flex-col sm:flex-row items-center gap-6 mt-12 pt-12 border-t-4 border-black">
                                    {selectedProject.liveUrl && (
                                        <a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="neo-brutal-btn w-full sm:w-auto px-10 py-5 bg-[var(--color-neo-blue)] flex items-center justify-center gap-3"
                                        >
                                            VISIT SITE
                                            <ExternalLink className="w-6 h-6 stroke-[3]" />
                                        </a>
                                    )}
                                    {selectedProject.githubUrl && (
                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="neo-brutal-btn w-full sm:w-auto px-10 py-5 bg-white flex items-center justify-center gap-3"
                                        >
                                            <Github className="w-6 h-6" />
                                            SOURCE CODE
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
