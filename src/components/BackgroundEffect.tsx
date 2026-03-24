"use client";

import { useEffect, useState } from "react";

/**
 * 背景エフェクトコンポーネント (Neo-Brutalism版)
 * シンプルで強烈なドットグリッドパターン
 */
export default function BackgroundEffect() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* 強調されたドットパターン */}
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    backgroundImage: `radial-gradient(#000 2px, transparent 2px)`,
                    backgroundSize: "32px 32px",
                    opacity: 0.1,
                }}
            />
        </>
    );
}
