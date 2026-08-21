"use client";

import { forwardRef } from "react";
import Swimmer from "./Swimmer";

interface StartBlockProps {
    className?: string;
    /** 親がホバーされているか。構えが深くなる */
    ready?: boolean;
}

/**
 * レーン番号の横に置く小さなスタート台と、その上で構えたスイマー。
 *
 * 飛び込みはこの子がそのまま飛ぶ。だからクリック位置ではなく、
 * この要素の画面上の位置を演出の開始点として渡す。
 */
const StartBlock = forwardRef<HTMLDivElement, StartBlockProps>(function StartBlock(
    { className = "", ready = false },
    ref
) {
    return (
        <div ref={ref} className={`relative h-14 w-14 shrink-0 ${className}`}>
            {/* 台 */}
            <svg
                viewBox="0 0 56 56"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                {/* 台座 */}
                <rect x="14" y="34" width="30" height="16" rx="1.5" fill="#01223e" />
                {/* 上面。後ろがわずかに高い */}
                <path d="M11 34 L47 34 L47 30 L11 32 Z" fill="#0077b6" />
                {/* 蹴り板 */}
                <rect x="41" y="26" width="5" height="8" rx="1" fill="#00b4d8" />
                {/* プールサイド */}
                <rect x="0" y="50" width="56" height="4" rx="1" fill="currentColor" opacity="0.18" />
            </svg>

            {/* 構えたスイマー。台の上面に乗せる */}
            <Swimmer
                pose="crouch"
                className={`absolute bottom-[36%] left-[16%] w-[62%] transition-transform duration-300 ${
                    ready ? "-translate-y-0.5 rotate-[6deg]" : ""
                }`}
            />
        </div>
    );
});

export default StartBlock;
