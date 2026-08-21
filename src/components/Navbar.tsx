"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
    { href: "#top", label: "HOME" },
    { href: "#projects", label: "PROJECTS" },
    { href: "#records", label: "RECORDS" },
    { href: "#about", label: "ABOUT" },
    { href: "#contact", label: "CONTACT" },
];

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

/**
 * 固定ナビ。
 *
 * Hero の上では水に溶かし、スクロールすると白い面に切り替える。
 * 現在地はレーン番号の付いた下線で示す。
 */
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("top");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);

        const observers: IntersectionObserver[] = [];
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) setActiveSection(id);
                    });
                },
                { threshold: 0.25, rootMargin: "-72px 0px -40% 0px" }
            );
            observer.observe(el);
            observers.push(observer);
        });

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observers.forEach((o) => o.disconnect());
        };
    }, []);

    const handleClick = (href: string) => {
        setMobileOpen(false);
        if (href === "#top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <nav
                className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
                    scrolled
                        ? "border-b border-hairline bg-surface/85 backdrop-blur-md"
                        : "border-b border-transparent"
                }`}
            >
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-18">
                    <button
                        onClick={() => handleClick("#top")}
                        className="cursor-pointer overflow-hidden rounded-[3px] transition-opacity hover:opacity-70"
                        aria-label="トップへ"
                    >
                        <Image
                            src="/logo.png"
                            alt="skphooh"
                            width={30}
                            height={30}
                            className="object-cover"
                            priority
                        />
                    </button>

                    {/* デスクトップ */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navLinks.map((link, i) => {
                            const id = link.href.replace("#", "");
                            const active = activeSection === id;
                            return (
                                <button
                                    key={link.href}
                                    onClick={() => handleClick(link.href)}
                                    className={`relative cursor-pointer px-4 py-2 font-led text-[0.7rem] tracking-[0.16em] transition-colors ${
                                        active
                                            ? scrolled
                                                ? "text-pool"
                                                : "text-white"
                                            : scrolled
                                              ? "text-ink-faint hover:text-ink"
                                              : "text-white/60 hover:text-white"
                                    }`}
                                >
                                    <span className="mr-2 opacity-50">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    {link.label}
                                    {active && (
                                        <motion.span
                                            layoutId="navActive"
                                            className={`absolute inset-x-3 bottom-1 h-px ${
                                                scrolled ? "bg-pool" : "bg-white"
                                            }`}
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 32,
                                            }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* モバイル */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`cursor-pointer rounded-[3px] p-2 transition-colors md:hidden ${
                            scrolled ? "text-ink hover:bg-canvas" : "text-white hover:bg-white/10"
                        }`}
                        aria-label="メニュー"
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="card fixed inset-x-4 top-[4.5rem] z-40 flex flex-col overflow-hidden md:hidden"
                    >
                        {navLinks.map((link, i) => {
                            const active = activeSection === link.href.replace("#", "");
                            return (
                                <button
                                    key={link.href}
                                    onClick={() => handleClick(link.href)}
                                    className={`flex cursor-pointer items-center gap-3 border-b border-hairline px-5 py-4 text-left font-led text-xs tracking-[0.16em] last:border-b-0 ${
                                        active ? "text-pool" : "text-ink-soft"
                                    }`}
                                >
                                    <span className="opacity-50">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    {link.label}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
