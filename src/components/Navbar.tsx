"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

/** ナビゲーションリンクの定義 */
const navLinks = [
    { href: "#top", label: "HOME" },
    { href: "#projects", label: "PROJECTS" },
    { href: "#about", label: "ABOUT" },
    { href: "#contact", label: "CONTACT" },
];

/**
 * 固定ナビバーコンポーネント (Neo-Brutalism版)
 */
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("top");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        /** スクロール検知 */
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        /** IntersectionObserverでアクティブセクションを検知 */
        const sectionIds = ["top", "projects", "about", "contact"];
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el =
                id === "top" ? document.body : document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(id);
                        }
                    });
                },
                { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
            );

            observer.observe(el);
            observers.push(observer);
        });

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observers.forEach((o) => o.disconnect());
        };
    }, []);

    /** スムーズスクロールでナビゲーション */
    const handleClick = (href: string) => {
        setMobileOpen(false);
        if (href === "#top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? "bg-white border-b-4 border-black shadow-[0_4px_0_#000]"
                        : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between h-16 md:h-20">
                    {/* ロゴ */}
                    <button
                        onClick={() => handleClick("#top")}
                        className="neo-brutal-box p-1 hover:translate-x-[2px] hover:translate-y-[2px] transition-transform cursor-pointer overflow-hidden rounded-none"
                    >
                        <Image
                            src="/logo.png"
                            alt="skphooh"
                            width={32}
                            height={32}
                            className="object-cover"
                            priority
                        />
                    </button>

                    {/* デスクトップナビ */}
                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleClick(link.href)}
                                className={`relative px-4 py-2 text-sm font-black transition-colors cursor-pointer border-2 border-transparent ${activeSection === link.href.replace("#", "")
                                        ? "text-black"
                                        : "text-gray-600 hover:text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0_#000] hover:-translate-y-0.5"
                                    }`}
                            >
                                {activeSection === link.href.replace("#", "") && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-[var(--color-neo-yellow)] border-2 border-black shadow-[2px_2px_0_#000]"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* モバイルメニューボタン */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 border-2 border-black bg-white shadow-[2px_2px_0_#000] text-black hover:bg-[var(--color-neo-yellow)] transition-all cursor-pointer hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                        aria-label="メニュー"
                    >
                        {mobileOpen ? <X size={22} className="stroke-[3]" /> : <Menu size={22} className="stroke-[3]" />}
                    </button>
                </div>
            </motion.nav>

            {/* モバイルメニュー */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2, type: "spring" }}
                        className="fixed inset-x-4 top-20 z-40 bg-white border-4 border-black shadow-[8px_8px_0_#000] md:hidden p-4 flex flex-col gap-3"
                    >
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleClick(link.href)}
                                className={`text-left px-5 py-3 text-lg font-black transition-all cursor-pointer border-2 border-black ${activeSection === link.href.replace("#", "")
                                        ? "bg-[var(--color-neo-yellow)] shadow-[4px_4px_0_#000] -translate-y-1"
                                        : "bg-white text-black hover:bg-gray-100 hover:shadow-[4px_4px_0_#000] hover:-translate-y-1"
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
