"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import Swimmer from "./pool/Swimmer";

/** プールの全長(m)。進捗をこの距離に読み替える */
const POOL_LENGTH = 50;

/**
 * 進捗表示。
 *
 * 画面右端の細いレールに現在地を打ち、いま何メートル地点かを
 * 出す。ページの読み進みを「泳いだ距離」として見せる。
 */
export default function ScrollProgress() {
    const [distance, setDistance] = useState(0);
    const progress = useSpring(0, { stiffness: 120, damping: 30 });

    /** 進捗(0-1)をレール上の位置に変換する */
    const markerTop = useTransform(progress, (v) => `${v * 100}%`);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const ratio = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
            progress.set(ratio);
            setDistance(Math.round(ratio * POOL_LENGTH));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [progress]);

    return (
        <>
            {/* 上端の細いバー。モバイルではこれだけ */}
            <motion.div
                className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-pool-light"
                style={{ scaleX: progress }}
            />

            {/* 右端の距離レール */}
            <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
                <span className="font-led text-[0.6rem] tracking-[0.15em] text-ink-faint">
                    0m
                </span>
                <div className="relative h-40 w-px bg-hairline">
                    <motion.div
                        className="absolute inset-x-0 top-0 h-full origin-top bg-pool-light"
                        style={{ scaleY: progress }}
                    />
                    {/* 進捗にあわせてレーンを下っていくスイマー */}
                    <motion.div
                        className="absolute -left-[14px] -mt-3 w-7 text-pool"
                        style={{ top: markerTop }}
                    >
                        <Swimmer className="w-full rotate-90" still />
                    </motion.div>
                </div>
                <span className="font-led text-[0.6rem] tracking-[0.15em] text-pool">
                    {distance}m
                </span>
            </div>
        </>
    );
}
