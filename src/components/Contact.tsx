"use client";

import { motion } from "framer-motion";
import { Github, Mail, ArrowUpRight } from "lucide-react";

/** ソーシャルリンク */
const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/skphooh" },
];

/**
 * お問い合わせセクション (Neo-Brutalism)
 */
export default function Contact() {
    return (
        <section id="contact" className="py-32 relative z-20 overflow-hidden bg-[var(--color-neo-pink)] border-b-4 border-black">
            {/* 装飾 */}
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-black bg-[var(--color-neo-yellow)] rounded-full shadow-[8px_8px_0_#000] pointer-events-none" />
            <div className="absolute bottom-40 right-10 w-48 h-48 border-4 border-black bg-[var(--color-neo-blue)] shadow-[8px_8px_0_#000] pointer-events-none transform rotate-12" />

            <div className="container px-6 mx-auto max-w-4xl text-center relative z-10">
                {/* セクションヘッダー */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 bg-white border-4 border-black p-10 shadow-[12px_12px_0_#000]"
                >
                    <div className="inline-block bg-black text-white border-2 border-black px-6 py-2 mb-8 transform -rotate-2">
                        <span className="text-sm font-black uppercase tracking-widest">
                            Contact
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 uppercase">
                        Let&apos;s Work
                        <br />
                        <span className="text-stroke relative">
                            Together
                            <span className="absolute inset-0 text-[var(--color-neo-yellow)] stroke-black" style={{WebkitTextStroke: "2px black", transform: "translate(4px, 4px)", zIndex: -1}}>Together</span>
                        </span>
                    </h2>
                    <p className="text-black font-bold text-xl max-w-xl mx-auto border-t-4 border-black pt-6">
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
                        className="neo-brutal-btn inline-flex items-center gap-4 px-10 py-6 text-xl md:text-2xl bg-[var(--color-neo-green)] group"
                    >
                        <Mail className="w-8 h-8 stroke-[3]" />
                        skphooh@gmail.com
                        <ArrowUpRight className="w-8 h-8 stroke-[3] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </motion.div>

                {/* フッター */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-32 p-8 bg-black border-4 border-black text-white shadow-[8px_8px_0_var(--color-neo-yellow)]"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-white font-black text-sm uppercase">
                            © 2026 skphooh.
                            <br className="md:hidden" /> Built with Next.js & Tailwind.
                        </p>

                        {/* ソーシャルアイコン */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white text-black border-2 border-white hover:bg-[var(--color-neo-yellow)] hover:border-black hover:shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-all"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-6 h-6 stroke-[3]" />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
