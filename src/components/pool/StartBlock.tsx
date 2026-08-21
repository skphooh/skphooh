"use client";

import { forwardRef } from "react";
import Swimmer, { type StartType } from "./Swimmer";

interface StartBlockProps {
    className?: string;
    /** 通常スタートか背泳ぎスタートか */
    start?: StartType;
    /** 親がホバーされているか。構えが深くなる */
    ready?: boolean;
    /** 飛び出したあと。台の上から消す */
    launched?: boolean;
    /** スイムキャップの色 */
    capColor?: string;
    /** ゴーグルの色 */
    goggleColor?: string;
}

/**
 * レーン番号の横に置く小さなスタート台と、そこで構えたスイマー。
 *
 * プールは右側。したがって台の上面はプール側（右）へ向かって下がり、
 * 蹴り板は反対の左後方に立つ。
 *
 * 通常スタートは台の上に立ち、背泳ぎスタートは水中で壁に足を掛けて
 * グリップを掴む。立ち位置がまるごと違うので、姿勢だけでなく配置も
 * 切り替えている。
 *
 * ref は台ではなくスイマー自身に向けている。飛び込み演出の開始点を、
 * どちらのスタートでも実際に人がいる位置から取るため。
 */
const StartBlock = forwardRef<HTMLDivElement, StartBlockProps>(function StartBlock(
    { className = "", start = "forward", ready = false, launched = false, capColor, goggleColor },
    ref
) {
    const backstroke = start === "backstroke";

    return (
        <div className={`relative h-14 w-16 shrink-0 ${className}`}>
            <svg
                viewBox="0 0 64 56"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                {/* 水面。プールは右側 */}
                <rect
                    x="44"
                    y="40"
                    width="20"
                    height="16"
                    fill="var(--color-pool-light)"
                    opacity="0.22"
                />
                <line
                    x1="44"
                    y1="40"
                    x2="64"
                    y2="40"
                    stroke="var(--color-pool-light)"
                    strokeWidth="1.2"
                    opacity="0.6"
                />

                {/* 台座 */}
                <rect x="13" y="35" width="30" height="17" rx="1.5" fill="#01223e" />

                {/* 上面。プール側（右）へ下がる */}
                <path d="M10 30 L45 34 L45 37.5 L10 33.5 Z" fill="#0077b6" />

                {/* 蹴り板。プールと反対の左後方に立つ */}
                <rect x="9.5" y="21" width="5" height="11" rx="1.2" fill="#00b4d8" />

                {/* 背泳ぎ用グリップ。前面（右）に付く握り棒 */}
                {backstroke && (
                    <>
                        <rect
                            x="39"
                            y="37.5"
                            width="9"
                            height="2.6"
                            rx="1.3"
                            fill="#00b4d8"
                        />
                        <rect x="41.5" y="34" width="2" height="4" fill="#0077b6" />
                    </>
                )}

                {/* プールサイド */}
                <rect
                    x="0"
                    y="52"
                    width="46"
                    height="4"
                    rx="1"
                    fill="currentColor"
                    opacity="0.16"
                />
            </svg>

            {/*
             * 通常スタートは台の上面、背泳ぎは水面のすぐ下。
             * 配置が違うので位置とサイズを分けている。
             */}
            <div
                ref={ref}
                className={`absolute transition-all duration-200 ${
                    launched ? "opacity-0" : "opacity-100"
                } ${
                    backstroke
                        ? `bottom-[6%] left-[54%] w-[42%] ${ready ? "-translate-x-0.5" : ""}`
                        : `bottom-[36%] left-[18%] w-[50%] ${ready ? "-translate-y-0.5 rotate-[5deg]" : ""}`
                }`}
            >
                <Swimmer
                    pose="crouch"
                    start={start}
                    capColor={capColor}
                    goggleColor={goggleColor}
                    className="h-full w-full"
                />
            </div>
        </div>
    );
});

export default StartBlock;
