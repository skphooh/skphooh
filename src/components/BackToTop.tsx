"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * トップへ戻るボタン (Neo-Brutalism)
 */
export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.5 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.6 }}
                    onClick={scrollToTop}
                    className="neo-brutal-btn fixed bottom-8 right-8 z-50 p-4 bg-[var(--color-neo-yellow)]"
                    aria-label="トップへ戻る"
                >
                    <ArrowUp className="w-6 h-6 stroke-[3]" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
