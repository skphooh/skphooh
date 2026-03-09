"use client";

import { motion } from "framer-motion";
import ProjectCard, { ProjectType } from "./ProjectCard";

const projects: ProjectType[] = [
    {
        title: "E-Commerce Experience",
        description: "洗練されたUIと高速なレスポンスを実現したモダンなECサイトモックアップ。シームレスなカート操作と決済フローを備えています。",
        image: "/placeholder-1.jpg",
        techStack: ["Next.js", "Tailwind CSS", "Stripe API"],
        githubUrl: "#",
        liveUrl: "#",
    },
    {
        title: "Task Management App",
        description: "ドラッグ＆ドロップで直感的にタスクを管理できるアプリケーション。ユーザーの生産性を向上させるためのアニメーションを取り入れています。",
        image: "/placeholder-2.jpg",
        techStack: ["React", "Firebase", "Framer Motion"],
        githubUrl: "#",
        liveUrl: "#",
    },
    {
        title: "AI Chat Interface",
        description: "AIモデルと対話するためのシンプルでクリーンなチャットインターフェース。リアルタイムなストリーミング応答とシンタックスハイライトに対応。",
        image: "/placeholder-3.jpg",
        techStack: ["TypeScript", "Supabase", "OpenAI API"],
        githubUrl: "#",
        liveUrl: "#",
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
