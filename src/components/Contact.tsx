"use client";

import { motion } from "framer-motion";
import { Github, Mail, ArrowUpRight } from "lucide-react";

/** ソーシャルリンク */
const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/skphooh" },
];

/**
 * お問い合わせセクション
 * メールCTA、SNSリンク、フッターを含む
 */
export default function Contact() {
    return (
        <section id="contact" className="py-32 relative z-20 overflow-hidden">
            {/* 背景エフェクト */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-600/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="container px-6 mx-auto max-w-4xl text-center relative z-10">
                {/* セクションヘッダー */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-blue-400 font-medium mb-4 block">
                        Contact
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Let&apos;s Work{" "}
                        <span className="text-gradient">Together</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light max-w-xl mx-auto">
                        新しいプロジェクトの立ち上げや、既存プロダクトの改善など、お気軽にご相談ください。
                    </p>
                </motion.div>

                {/* メールCTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <a
                        href="mailto:skphooh@gmail.com"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-sm hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300"
                    >
                        <Mail className="w-5 h-5" />
                        skphooh@gmail.com
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </motion.div>

                {/* フッター */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-24 pt-8 border-t border-white/5"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-gray-600 text-xs">
                            © 2026 skphooh. Built with Next.js & Framer Motion.
                        </p>

                        {/* ソーシャルアイコン */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
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
