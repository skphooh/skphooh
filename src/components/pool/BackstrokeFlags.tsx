"use client";

import { motion } from "framer-motion";

/** 旗 1 枚あたりの間隔(px) */
const PITCH = 34;
/** 画面幅に対して十分な枚数 */
const COUNT = 64;

/** 赤・白・青・黄の 4 枚で 1 周期 */
const COLORS = [
    "var(--color-rope-red)",
    "#ffffff",
    "var(--color-pool-light)",
    "var(--color-rope-yellow)",
];

/**
 * 背泳ぎ用フラッグ。
 *
 * 競技プールでは壁の 5m 手前に張られ、背泳ぎの選手に壁が近い
 * ことを知らせる。ここでも FINISH の直前に置いて「もうすぐ
 * 終わり」の合図にしている。
 */
export default function BackstrokeFlags({ className = "" }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`w-full overflow-hidden ${className}`}
        >
            <svg className="block h-12 w-full" role="presentation">
                {/* ロープ */}
                <line
                    x1="0"
                    y1="4"
                    x2="100%"
                    y2="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.35"
                />

                {Array.from({ length: COUNT }, (_, i) => {
                    const x = i * PITCH + 8;
                    return (
                        <motion.path
                            key={i}
                            d={`M${x} 4 L${x + 20} 4 L${x + 10} 34 Z`}
                            fill={COLORS[i % COLORS.length]}
                            style={{ transformOrigin: `${x + 10}px 4px` }}
                            animate={{ rotate: [-3, 3, -3] }}
                            transition={{
                                duration: 2.6 + (i % 4) * 0.35,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: (i % 7) * 0.12,
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
}
