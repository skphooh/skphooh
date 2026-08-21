"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ProjectStatus, ProjectType } from "@/data/projects";

interface ProjectLaneProps {
    project: ProjectType;
    index: number;
    onSelect: (originX: number) => void;
}

const statusLabel: Record<ProjectStatus, string> = {
    live: "LIVE",
    development: "IN DEV",
    archived: "ARCHIVED",
};

/**
 * プロダクト 1 件 = 1 レーン。
 *
 * 左にレーン番号、中央に内容、右にプレビュー。ホバーすると
 * 水がレーンを左から満たし、番号が浮き上がる。
 */
export default function ProjectLane({ project, index, onSelect }: ProjectLaneProps) {
    const status = project.status ?? "live";

    const handleSelect = (clientX: number) => {
        onSelect(clientX / window.innerWidth);
    };

    return (
        <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            onClick={(e) => handleSelect(e.clientX)}
            className="group relative block w-full cursor-pointer overflow-hidden px-4 py-8 text-left sm:px-8 sm:py-10"
        >
            {/* ホバーで満ちる水 */}
            <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-pool-light/12 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />

            <span className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
                {/* レーン番号 */}
                <span className="shrink-0">
                    <span className="block font-display text-5xl leading-none text-hairline transition-colors duration-300 group-hover:text-pool-light sm:text-6xl">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </span>

                {/* 内容 */}
                <span className="min-w-0 flex-1">
                    <span className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
                            {project.title}
                        </span>
                        <span className="font-led text-[0.65rem] tracking-[0.18em] text-pool">
                            {statusLabel[status]}
                        </span>
                    </span>

                    <span className="mb-4 block max-w-xl text-sm leading-relaxed text-ink-soft">
                        {project.description.split("\n")[0]}
                    </span>

                    <span className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tech) => (
                            <span key={tech} className="tag">
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 4 && (
                            <span className="tag">+{project.techStack.length - 4}</span>
                        )}
                    </span>
                </span>

                {/* プレビュー */}
                <span className="relative hidden h-28 w-48 shrink-0 overflow-hidden rounded-[3px] bg-canvas lg:block">
                    {project.iframePreview && project.liveUrl ? (
                        <>
                            <span className="absolute left-0 top-0 block h-[400%] w-[400%] origin-top-left scale-[0.25]">
                                <iframe
                                    src={project.liveUrl}
                                    className="h-full w-full border-0"
                                    title={`${project.title} Preview`}
                                    loading="lazy"
                                    scrolling="no"
                                    tabIndex={-1}
                                />
                            </span>
                            {/* iframe へのクリックを塞ぐ */}
                            <span className="absolute inset-0 block" />
                        </>
                    ) : null}
                </span>

                {/* 進入の矢印 */}
                <span className="hidden shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-pool md:block">
                    <ArrowRight className="h-5 w-5" />
                </span>
            </span>
        </motion.button>
    );
}
