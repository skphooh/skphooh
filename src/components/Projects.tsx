"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import ProjectLane from "./ProjectCard";
import LaneRope from "./pool/LaneRope";
import DiveTransition from "./pool/DiveTransition";
import { projects, type ProjectType } from "@/data/projects";

/**
 * プロダクト一覧 (LAP 01)
 *
 * カードを並べるのではなく、レーンを縦に積む。行と行の境目は
 * レーンロープ。行を選ぶと水が画面を覆い、その裏で詳細に
 * 差し替わってから水が引く。
 */
export default function Projects() {
    const [selected, setSelected] = useState<ProjectType | null>(null);
    const [diving, setDiving] = useState<ProjectType | null>(null);
    const [diveOriginX, setDiveOriginX] = useState(0.5);
    /** 飛び込むたびに DiveTransition を作り直し、演出を頭から再生させる */
    const [diveKey, setDiveKey] = useState(0);

    /** モーダル表示中は背後をスクロールさせない */
    useEffect(() => {
        if (!selected) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [selected]);

    /** Esc で閉じる */
    useEffect(() => {
        if (!selected) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelected(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [selected]);

    const handleSelect = (project: ProjectType, originX: number) => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) {
            setSelected(project);
            return;
        }

        setDiveOriginX(originX);
        setDiveKey((k) => k + 1);
        setDiving(project);
    };

    /** 水が画面を覆いきった瞬間。この裏で詳細を立ち上げる */
    const handleReveal = useCallback(() => {
        setDiving((current) => {
            if (current) setSelected(current);
            return current;
        });
    }, []);

    /** 水が引ききった */
    const handleDone = useCallback(() => setDiving(null), []);

    return (
        <>
            <section id="projects" className="relative z-10 bg-surface py-24 sm:py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-14"
                    >
                        <span className="lap-label">LAP 01</span>
                        <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-6xl">
                            PROJECTS
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                            個人開発で制作した代表的なプロダクトです。レーンを選ぶと飛び込みます。
                        </p>
                    </motion.div>
                </div>

                {/* レーン */}
                <div className="mx-auto max-w-5xl px-2 sm:px-6">
                    <LaneRope />
                    {projects.map((project, index) => (
                        <div key={project.title}>
                            <ProjectLane
                                project={project}
                                index={index}
                                onSelect={(originX) => handleSelect(project, originX)}
                            />
                            <LaneRope reverse={index % 2 === 1} />
                        </div>
                    ))}
                </div>
            </section>

            {/* 詳細。水に覆われている間に立ち上がる */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-pool-deep/70 p-4 backdrop-blur-sm sm:p-8"
                        onClick={() => setSelected(null)}
                        role="dialog"
                        aria-modal="true"
                        aria-label={selected.title}
                    >
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.98, opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="card relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden"
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute right-4 top-4 z-20 cursor-pointer rounded-full bg-surface/90 p-2 text-ink transition-colors hover:bg-canvas"
                                aria-label="閉じる"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="overflow-y-auto">
                                {/* ライブプレビュー */}
                                {selected.iframePreview && selected.liveUrl && (
                                    <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden bg-canvas">
                                        <div className="absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-[0.5] lg:h-[125%] lg:w-[125%] lg:scale-[0.8]">
                                            <iframe
                                                src={selected.liveUrl}
                                                className="h-full w-full border-0"
                                                title={`${selected.title} Live`}
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="p-7 sm:p-10">
                                    <h3 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
                                        {selected.title}
                                    </h3>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {selected.techStack.map((tech) => (
                                            <span key={tech} className="tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">
                                        {selected.details || selected.description}
                                    </p>

                                    {selected.features && selected.features.length > 0 && (
                                        <div className="mt-10">
                                            <span className="lap-label">FEATURES</span>
                                            <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                                                {selected.features.map((feature) => (
                                                    <li
                                                        key={feature}
                                                        className="flex items-baseline gap-3 border-b border-hairline pb-3 text-sm text-ink"
                                                    >
                                                        <span className="font-led text-[0.65rem] text-pool-light">
                                                            ▸
                                                        </span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                                        {selected.liveUrl && (
                                            <a
                                                href={selected.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn"
                                            >
                                                サイトを見る
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        )}
                                        {selected.githubUrl && (
                                            <a
                                                href={selected.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-ghost"
                                            >
                                                <Github className="h-4 w-4" />
                                                ソースコード
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 飛び込み。モーダルより上に重なって切り替えを隠す */}
            <DiveTransition
                key={diveKey}
                active={diving !== null}
                originX={diveOriginX}
                onReveal={handleReveal}
                onDone={handleDone}
            />
        </>
    );
}
