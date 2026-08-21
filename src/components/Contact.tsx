"use client";

import { motion } from "framer-motion";
import { Github, Mail, ArrowUpRight } from "lucide-react";
import WaterSurface from "./pool/WaterSurface";

const socialLinks = [{ name: "GitHub", icon: Github, url: "https://github.com/skphooh" }];

/**
 * Contact (FINISH)
 *
 * ゴール側の壁。深い水の上にタッチ板を置く。
 */
export default function Contact() {
    return (
        <section
            id="contact"
            className="relative z-10 overflow-hidden bg-pool-deep py-28 sm:py-36"
        >
            {/* 深い水 */}
            <WaterSurface depth={0.72} density={0.6} />

            <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-led text-[0.7rem] tracking-[0.28em] text-pool-light">
                        FINISH
                    </span>
                    <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-6xl">
                        TOUCH THE WALL
                    </h2>
                    <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/70">
                        新しいプロジェクトの立ち上げや、既存プロダクトの改善など、お気軽にご相談ください。
                    </p>
                </motion.div>

                {/* タッチ板 */}
                <motion.a
                    href="mailto:skphooh@gmail.com"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="group animate-float-idle mt-12 inline-flex items-center gap-4 rounded-[3px] bg-white/95 px-8 py-5 text-base font-semibold text-pool-deep transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_-8px_rgba(0,180,216,0.7)] sm:text-lg"
                >
                    <Mail className="h-5 w-5" />
                    skphooh@gmail.com
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>

                {/* フッター */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/15 pt-8 sm:flex-row"
                >
                    <p className="font-led text-[0.7rem] tracking-[0.15em] text-white/50">
                        © 2026 skphooh — BUILT WITH NEXT.JS
                    </p>

                    <div className="flex items-center gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full p-2.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                                aria-label={social.name}
                            >
                                <social.icon className="h-5 w-5" />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
