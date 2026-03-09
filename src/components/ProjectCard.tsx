"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, LucideIcon } from "lucide-react";

export interface ProjectType {
    title: string;
    description: string;
    image: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
}

interface ProjectCardProps {
    project: ProjectType;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative rounded-3xl overflow-hidden glass hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] focus-within:ring-2 focus-within:ring-blue-500/50"
        >
            <div className="relative h-64 w-full overflow-hidden bg-gray-800">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
                {/* Placeholder for real image */}
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 group-hover:scale-105 transition-transform duration-700 ease-out">
                    <div className="w-24 h-24 mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center ring-1 ring-white/10 shadow-lg">
                        <span className="text-4xl font-light text-white/50">{project.title.charAt(0)}</span>
                    </div>
                    <span className="text-xs text-gray-500 tracking-widest uppercase">Project Preview</span>
                </div>
            </div>

            <div className="p-8 relative z-20 -mt-10">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {project.title}
                </h3>
                <p className="text-gray-400 mb-6 font-light leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full ring-1 ring-blue-500/20 transition-colors group-hover:bg-blue-500/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                            aria-label={`${project.title} GitHub Repository`}
                        >
                            <Github className="w-5 h-5" />
                            <span>Source</span>
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors ml-auto"
                            aria-label={`${project.title} Live Demo`}
                        >
                            <ExternalLink className="w-5 h-5" />
                            <span>Visit Site</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
