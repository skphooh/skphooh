"use client";

import type { ReactNode } from "react";

interface LedBoardProps {
    /** 掲示板左上の見出し。例: RESULT / SPLIT */
    title?: string;
    /** 見出し行の右端に出す補足。例: 年・件数 */
    meta?: ReactNode;
    children: ReactNode;
    className?: string;
    /** 本文まわりの余白を詰める */
    compact?: boolean;
}

/**
 * 大会の電光掲示板。
 *
 * 紺地に走査線を重ね、文字は LED のにじみを持たせたアンバーで出す。
 * 受賞歴の一覧や Hero のタイピング表示など、数字と英字を見せたい
 * 箇所の共通ガワとして使う。
 */
export default function LedBoard({
    title,
    meta,
    children,
    className = "",
    compact = false,
}: LedBoardProps) {
    return (
        <div className={`led-board ${className}`}>
            {(title || meta) && (
                <div className="flex items-center justify-between gap-4 border-b-2 border-pool-water/50 px-4 py-2 sm:px-6">
                    {title && (
                        <span className="led-text text-xs tracking-[0.22em] sm:text-sm">
                            {title}
                        </span>
                    )}
                    {meta && (
                        <span className="led-text text-xs opacity-80 sm:text-sm">{meta}</span>
                    )}
                </div>
            )}
            <div className={compact ? "px-4 py-3 sm:px-6" : "px-4 py-5 sm:px-6 sm:py-7"}>
                {children}
            </div>
        </div>
    );
}
