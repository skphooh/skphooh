"use client";

import { motion } from "framer-motion";
import ProjectLane from "./ProjectCard";
import LaneRope from "./pool/LaneRope";
import { useDive } from "./pool/DiveProvider";
import { projects } from "@/data/projects";

/**
 * プロダクト一覧 (LAP 01)
 *
 * カードを並べるのではなく、レーンを縦に積む。行と行の境目は
 * レーンロープ。行を選ぶと飛び込み、詳細ページへ移動する。
 */
export default function Projects() {
    const { dive } = useDive();

    return (
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
                    <div key={project.slug}>
                        <ProjectLane
                            project={project}
                            index={index}
                            onSelect={(origin) =>
                                dive(`/projects/${project.slug}`, origin)
                            }
                        />
                        <LaneRope reverse={index % 2 === 1} />
                    </div>
                ))}
            </div>
        </section>
    );
}
