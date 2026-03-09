"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * トップへ戻るボタン
 * ページを一定量スクロールすると表示される
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
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full ring-1 ring-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg"
                    aria-label="トップへ戻る"
                >
                    <ArrowUp className="w-5 h-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
