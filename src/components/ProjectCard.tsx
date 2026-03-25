"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

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

const statusConfig: Record<ProjectStatus, { label: string; color: string; dot: string }> = {
    live: {
        label: "LIVE",
        color: "bg-[var(--color-neo-green)] text-black",
        dot: "bg-black",
    },
    development: {
        label: "IN DEV",
        color: "bg-[var(--color-neo-yellow)] text-black",
        dot: "bg-black",
    },
    archived: {
        label: "ARCHIVED",
        color: "bg-gray-300 text-black",
        dot: "bg-black",
    },
};

/**
 * プロジェクトカード (Neo-Brutalism)
 */
export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
    const status = project.status || "live";
    const badge = statusConfig[status];

    // ランダムな色をカードの背景に適用してみる
    const cardBgColors = ["bg-white", "bg-[#fffbcc]", "bg-[#f5e6fd]", "bg-[#e6fbfd]"];
    const bgColorClass = cardBgColors[index % cardBgColors.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1, type: "spring" }}
            className={`neo-brutal-box p-4 gap-4 flex flex-col cursor-pointer ${bgColorClass} hover:bg-white group overflow-hidden`}
            onClick={onClick}
        >
            {/* 画像 / iframe プレビューエリア */}
            <div className="relative h-56 w-full overflow-hidden shrink-0 border-4 border-black bg-white">
                {/* ステータスバッジ */}
                <div className="absolute top-3 right-3 z-20">
                    <span
                        className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-black shadow-[2px_2px_0_#000] ${badge.color}`}
                    >
                        <span className={`w-2 h-2 ${badge.dot} animate-pulse`} />
                        {badge.label}
                    </span>
                </div>

                {project.iframePreview && project.liveUrl ? (
                    <div className="absolute inset-0 bg-white overflow-hidden">
                        <div
                            className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left pointer-events-none bg-white scale-[0.25]"
                        >
                            <iframe
                                src={project.liveUrl}
                                className="w-full h-full border-0 select-none"
                                title={`${project.title} Preview`}
                                loading="lazy"
                                scrolling="no"
                                tabIndex={-1}
                            />
                        </div>
                        {/* 透過レイヤーを重ねてiframe上のクリックイベントを無効化 */}
                        <div className="absolute inset-0 z-10 bg-transparent group-hover:bg-white/10 transition-colors pointer-events-auto" />
                    </div>
                ) : project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out border-b-4 border-black"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[var(--color-neo-yellow)] border-b-4 border-black">
                        <span className="text-4xl font-black text-black opacity-20 transform -rotate-12">
                            {project.title}
                        </span>
                    </div>
                )}
            </div>

            {/* カード本体 */}
            <div className="pt-4 pb-2 relative z-20 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-black uppercase tracking-tighter w-[80%] leading-none">
                        {project.title}
                    </h3>
                    <div className="w-10 h-10 bg-[var(--color-neo-pink)] border-2 border-black flex items-center justify-center shadow-[4px_4px_0_#000] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                        <ArrowUpRight className="w-6 h-6 stroke-[3]" />
                    </div>
                </div>
                
                <p className="text-black/80 font-bold text-sm mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                </p>

                {/* 技術タグ */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.techStack.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="neo-brutal-tag px-3 py-1 text-[10px] font-black uppercase bg-white text-black"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 3 && (
                        <span className="neo-brutal-tag px-3 py-1 text-[10px] font-black uppercase bg-white text-black">
                            +{project.techStack.length - 3}
                        </span>
                    )}
                </div>

                {/* リンク群 */}
                <div className="flex items-center gap-4 pt-4 border-t-4 border-black mt-auto">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 text-center py-2 bg-black text-white font-black text-sm uppercase hover:bg-[var(--color-neo-yellow)] hover:text-black border-2 border-black transition-colors"
                        >
                            SOURCE
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 text-center py-2 bg-[var(--color-neo-blue)] text-black font-black text-sm uppercase border-2 border-black shadow-[4px_4px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                        >
                            VISIT
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
