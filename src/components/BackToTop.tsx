"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

/**
 * ターン。スタート壁まで戻る。
 */
export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 600);
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="group fixed bottom-8 right-8 z-50 flex cursor-pointer items-center gap-2 rounded-full bg-pool-deep px-4 py-3 text-white shadow-[var(--shadow-rise)] transition-colors hover:bg-pool"
                    aria-label="トップへ戻る"
                >
                    <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
                    <span className="font-led text-[0.65rem] tracking-[0.18em]">TURN</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
