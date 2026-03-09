"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socialLinks = [
    { name: "GitHub", icon: Github, url: "#" },
    { name: "Twitter", icon: Twitter, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
];

export default function Contact() {
    return (
        <section id="contact" className="py-24 relative z-20 overflow-hidden">
            {/* Background ambient light */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="container px-4 mx-auto max-w-4xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Let's Work Together</h2>
                    <p className="text-gray-400 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
                        新しいプロジェクトの立ち上げや、既存プロダクトの改善など、お気軽にご相談ください。
                    </p>

                    <a
                        href="mailto:hello@example.com"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
                    >
                        <Mail className="w-5 h-5" />
                        Hello@example.com
                    </a>

                    <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Your Name. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
