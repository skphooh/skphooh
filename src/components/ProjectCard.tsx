"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

/** プロジェクトのステータス */
type ProjectStatus = "live" | "development" | "archived";

export interface ProjectType {
    title: string;
    description: string;
    image?: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    status?: ProjectStatus;
}

interface ProjectCardProps {
    project: ProjectType;
    index: number;
}

/** ステータスバッジの表示設定 */
const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
    live: { label: "Live", color: "bg-emerald-500/20 text-emerald-400 ring-emerald-500/30" },
    development: { label: "In Dev", color: "bg-amber-500/20 text-amber-400 ring-amber-500/30" },
    archived: { label: "Archived", color: "bg-gray-500/20 text-gray-400 ring-gray-500/30" },
};

/**
 * プロジェクトカード
 * ホバー時のグロウエフェクトとステータスバッジ付き
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
    const status = project.status || "live";
    const badge = statusConfig[status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl overflow-hidden glass hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]"
        >
            {/* 画像 / プレースホルダー */}
            <div className="relative h-52 w-full overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />

                {/* ステータスバッジ */}
                <div className="absolute top-4 right-4 z-20">
                    <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full ring-1 ${badge.color}`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${status === "live" ? "bg-emerald-400" : status === "development" ? "bg-amber-400" : "bg-gray-400"
                            }`} />
                        {badge.label}
                    </span>
                </div>

                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
                        {/* 抽象的なパターン */}
                        <div className="relative w-20 h-20 mb-4">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10 rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 ring-1 ring-white/10 -rotate-3 group-hover:-rotate-6 transition-transform duration-500 flex items-center justify-center">
                                <span className="text-3xl font-light text-white/40">
                                    {project.title.charAt(0)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* カード本体 */}
            <div className="p-6 relative z-20">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {project.title}
                </h3>
                <p className="text-gray-400 mb-5 font-light text-sm leading-relaxed line-clamp-3">
                    {project.description}
                </p>

                {/* 技術タグ */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-0.5 text-[11px] font-medium text-blue-300 bg-blue-500/10 rounded-full ring-1 ring-blue-500/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* リンク */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
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
                            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors ml-auto"
                            aria-label={`${project.title} Live Demo`}
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>Visit Site</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
