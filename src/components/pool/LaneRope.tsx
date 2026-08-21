"use client";

import { useId } from "react";

interface LaneRopeProps {
    className?: string;
    /** 流れる向き。既定は左方向 */
    reverse?: boolean;
}

/** フロート 1 個あたりの間隔(px)。タイル幅 = PITCH * 4 = 112 */
const PITCH = 28;

/** 競泳レーンロープの配色。赤・白・青・黄の 4 個で 1 周期 */
const FLOAT_COLORS = [
    "var(--color-rope-red)",
    "#ffffff",
    "var(--color-pool-water)",
    "var(--color-rope-yellow)",
];

/**
 * セクション間の区切りに敷くレーンロープ。
 *
 * SVG の pattern をタイルしているので、画面幅がいくら広がっても
 * フロートの大きさは一定のまま途切れない。タイル幅ちょうど
 * (112px) だけ平行移動させることで、継ぎ目のない流れになる。
 */
export default function LaneRope({ className = "", reverse = false }: LaneRopeProps) {
    // 同一ページに複数並ぶので pattern の id は毎回ユニークにする
    const patternId = `lane-rope-${useId().replace(/:/g, "")}`;

    return (
        <div
            aria-hidden="true"
            className={`relative w-full overflow-hidden border-y-4 border-pool-line bg-pool-water ${className}`}
        >
            <svg className="block h-7 w-full" role="presentation">
                <defs>
                    <pattern
                        id={patternId}
                        width={PITCH * FLOAT_COLORS.length}
                        height="28"
                        patternUnits="userSpaceOnUse"
                    >
                        {/* フロートを貫くケーブル */}
                        <rect
                            y="12"
                            width={PITCH * FLOAT_COLORS.length}
                            height="4"
                            fill="var(--color-pool-line)"
                            opacity="0.4"
                        />
                        {FLOAT_COLORS.map((color, i) => (
                            <rect
                                key={i}
                                x={i * PITCH + 3}
                                y="2"
                                width="22"
                                height="24"
                                rx="7"
                                fill={color}
                                stroke="var(--color-pool-line)"
                                strokeWidth="2"
                            />
                        ))}
                    </pattern>
                </defs>

                {/* タイル 1 枚ぶん余分に描いておき、その幅だけ動かして繰り返す */}
                <g className={reverse ? "animate-rope-drift-reverse" : "animate-rope-drift"}>
                    <rect
                        x={-PITCH * FLOAT_COLORS.length}
                        y="0"
                        width="200%"
                        height="28"
                        fill={`url(#${patternId})`}
                    />
                </g>
            </svg>
        </div>
    );
}
