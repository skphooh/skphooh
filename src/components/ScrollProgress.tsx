"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * スクロール進捗バーコンポーネント
 * ページ上部にスクロール進捗をグラデーションバーで表示する
 */
export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);
    const springProgress = useSpring(0, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
            setProgress(scrollPercent);
            springProgress.set(scrollPercent);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [springProgress]);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
            style={{
                scaleX: springProgress,
                background:
                    "linear-gradient(90deg, #3b82f6, #a855f7, #ec4899)",
            }}
        />
    );
}
