"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

/** ナビゲーションリンクの定義 */
const navLinks = [
    { href: "#top", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
];

/**
 * 固定ナビバーコンポーネント
 * スクロール時にブラー付き背景を表示し、アクティブセクションをハイライトする
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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
                        : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between h-16 md:h-20">
                    {/* ロゴ */}
                    <button
                        onClick={() => handleClick("#top")}
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                    >
                        <Image
                            src="/logo.png"
                            alt="skphooh"
                            width={36}
                            height={36}
                            className="rounded-lg"
                            priority
                        />
                    </button>

                    {/* デスクトップナビ */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleClick(link.href)}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full cursor-pointer ${activeSection === link.href.replace("#", "")
                                        ? "text-white"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {activeSection === link.href.replace("#", "") && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-white/10 rounded-full"
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
                        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="メニュー"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </motion.nav>

            {/* モバイルメニュー */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-16 z-40 bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/5 md:hidden"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleClick(link.href)}
                                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeSection === link.href.replace("#", "")
                                            ? "text-white bg-white/10"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
