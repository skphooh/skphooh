"use client";

import { motion } from "framer-motion";
import ProjectCard, { ProjectType } from "./ProjectCard";

const projects: ProjectType[] = [
    {
        title: "Wear-Cast",
        description: "ユーザーの記録や他のユーザーとの交流を通して、日々の生活をアップデートするコンセプトのアプリケーション。",
        image: "https://image.thum.io/get/width/1200/crop/800/https://wear-cast.vercel.app/",
        techStack: ["Next.js", "React", "Tailwind CSS"],
        liveUrl: "https://wear-cast.vercel.app/",
    },
    {
        title: "Meguri24",
        description: "AIがあなたの生活リズムを最適化する生活習慣改善アプリ。Clerkを用いたセキュアな認証基盤と、洗練されたダッシュボードを提供します。",
        image: "https://image.thum.io/get/width/1200/crop/800/https://meguri24.vercel.app/",
        techStack: ["Next.js", "Clerk", "Tailwind CSS", "AI"],
        liveUrl: "https://meguri24.vercel.app/",
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 relative z-10 bg-[#0a0a0a]">
            <div className="container px-4 mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Selected Projects</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
