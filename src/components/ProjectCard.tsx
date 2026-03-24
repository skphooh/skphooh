"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ChevronRight } from "lucide-react";

/** プロジェクトのステータス */
type ProjectStatus = "live" | "development" | "archived";

export interface ProjectType {
    title: string;
    description: string;
    features?: string[];
    image?: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    status?: ProjectStatus;
    iframePreview?: boolean;
    details?: string;
}

interface ProjectCardProps {
    project: ProjectType;
    index: number;
    onClick: () => void;
}

/** ステータスバッジの表示設定 */
const statusConfig: Record<ProjectStatus, { label: string; color: string; dot: string }> = {
    live: {
        label: "Live",
        color: "bg-emerald-500/20 text-emerald-400 ring-emerald-500/30",
        dot: "bg-emerald-400",
    },
    development: {
        label: "In Dev",
        color: "bg-amber-500/20 text-amber-400 ring-amber-500/30",
        dot: "bg-amber-400",
    },
    archived: {
        label: "Archived",
        color: "bg-gray-500/20 text-gray-400 ring-gray-500/30",
        dot: "bg-gray-400",
    },
};

/**
 * プロジェクトカード
 * ホバー時のグロウエフェクト、ステータスバッジ、機能リスト表示付き
 */
export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
    const status = project.status || "live";
    const badge = statusConfig[status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl overflow-hidden glass hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)] flex flex-col cursor-pointer"
            onClick={onClick}
        >
            {/* 画像 / プレースホルダー / iframe */}
            <div className="relative h-48 w-full overflow-hidden shrink-0 border-b border-white/5 bg-[#0a0a0a]">
                {/* 画像下部に向かってわずかなグラデーション（暗すぎないように調整） */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent z-10 pointer-events-none" />

                {/* ステータスバッジ */}
                <div className="absolute top-3 right-3 z-20">
                    <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full ring-1 ${badge.color}`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot} animate-pulse`} />
                        {badge.label}
                    </span>
                </div>

                {/* ライブサイトのiframeプレビュー */}
                {project.iframePreview && project.liveUrl ? (
                    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
                        {/* デスクトップ幅でレンダリングさせ、カードに収まるようにCSS transformで縮小表示 */}
                        <div
                            className="absolute top-0 left-0 w-[1280px] h-[800px] origin-top-left pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500 bg-[#0a0a0a]"
                            style={{ transform: "scale(0.35)" }}
                        >
                            <iframe
                                src={project.liveUrl}
                                className="w-full h-full border-0 select-none bg-[#0a0a0a]"
                                title={`${project.title} Preview`}
                                loading="lazy"
                                scrolling="no"
                                tabIndex={-1}
                            />
                        </div>
                    </div>
                ) : project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
                        {/* 抽象パターンプレースホルダー */}
                        <div className="relative w-16 h-16 mb-3">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10 rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 ring-1 ring-white/10 -rotate-3 group-hover:-rotate-6 transition-transform duration-500 flex items-center justify-center">
                                <span className="text-2xl font-light text-white/40">
                                    {project.title.charAt(0)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* カード本体 */}
            <div className="p-6 relative z-20 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {project.title}
                </h3>
                <p className="text-gray-400 mb-4 font-light text-sm leading-relaxed whitespace-pre-wrap">
                    {project.description}
                </p>

                {/* 主な機能リスト */}
                {project.features && project.features.length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {project.features.map((feature) => (
                                <span
                                    key={feature}
                                    className="flex items-center gap-1 text-[11px] text-gray-500"
                                >
                                    <ChevronRight className="w-3 h-3 text-blue-400/60" />
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* 技術タグ */}
                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-0.5 text-[11px] font-medium text-blue-300 bg-blue-500/10 rounded-full ring-1 ring-blue-500/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* リンク（イベント伝播を停止してカード全体のクリックと分離） */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors relative z-30"
                            aria-label={`${project.title} GitHub Repository`}
                        >
                            <Github className="w-4 h-4" />
                            <span>Source</span>
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors ml-auto group/link relative z-30"
                            aria-label={`${project.title} Live Site`}
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>Visit Site</span>
                            <ChevronRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
