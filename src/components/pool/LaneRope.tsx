"use client";

import { useId } from "react";

interface LaneRopeProps {
    className?: string;
    /** 流れる向き */
    reverse?: boolean;
    /** 水の上に置く場合に明るくする */
    onWater?: boolean;
    /**
     * ラスト 5m 区間。公式競技では壁の手前 5m のフロートが
     * 赤一色になるので、FINISH 直前のロープにこれを使う。
     */
    finish?: boolean;
}

/** フロート 1 個あたりの間隔(px)。タイル幅 = PITCH * 4 = 96 */
const PITCH = 24;

/** 赤・白・青・黄の 4 個で 1 周期 */
const FLOAT_COLORS = [
    "var(--color-rope-red)",
    "#ffffff",
    "var(--color-pool-light)",
    "var(--color-rope-yellow)",
];

/**
 * レーンロープ。
 *
 * セクションの境目とプロダクト一覧の区切りに使う、このサイトの
 * 基調モチーフ。背景の帯は敷かず、ロープだけを浮かせることで
 * 罫線としても図版としても読めるようにしている。
 *
 * SVG の pattern をタイルしているので、画面幅がどれだけ広がっても
 * フロートの大きさは変わらず、途切れもしない。
 */
export default function LaneRope({
    className = "",
    reverse = false,
    onWater = false,
    finish = false,
}: LaneRopeProps) {
    // 同一ページに複数並ぶので pattern の id はユニークにする
    const patternId = `rope-${useId().replace(/:/g, "")}`;

    // ラスト 5m は全フロートが赤
    const colors = finish
        ? FLOAT_COLORS.map(() => "var(--color-rope-red)")
        : FLOAT_COLORS;

    return (
        <div
            aria-hidden="true"
            className={`w-full overflow-hidden ${className}`}
        >
            <svg
                className="block h-4 w-full"
                role="presentation"
                style={{ opacity: onWater ? 0.95 : 0.85 }}
            >
                <defs>
                    <pattern
                        id={patternId}
                        width={PITCH * FLOAT_COLORS.length}
                        height="16"
                        patternUnits="userSpaceOnUse"
                    >
                        {/* フロートを貫くケーブル */}
                        <rect
                            y="7"
                            width={PITCH * FLOAT_COLORS.length}
                            height="2"
                            fill={onWater ? "rgba(255,255,255,0.5)" : "var(--color-hairline)"}
                        />
                        {colors.map((color, i) => (
                            <rect
                                key={i}
                                x={i * PITCH + 3}
                                y="2"
                                width="18"
                                height="12"
                                rx="6"
                                fill={color}
                            />
                        ))}
                    </pattern>
                </defs>

                {/* タイル 1 枚ぶん余分に描き、その幅だけ動かして繰り返す */}
                <g className={reverse ? "animate-rope-drift-reverse" : "animate-rope-drift"}>
                    <rect
                        x={-PITCH * FLOAT_COLORS.length}
                        y="0"
                        width="200%"
                        height="16"
                        fill={`url(#${patternId})`}
                    />
                </g>
            </svg>
        </div>
    );
}
