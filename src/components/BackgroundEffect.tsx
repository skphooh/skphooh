"use client";

import { useEffect, useState, useRef } from "react";

/**
 * 背景エフェクトコンポーネント
 * マウス追従グラデーション + 浮遊パーティクル + グリッドオーバーレイで
 * サイト全体にプレミアムな奥行き感を演出する
 */
export default function BackgroundEffect() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);

    /** マウス追従エフェクト */
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    /** パーティクルアニメーション */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        /** Canvasリサイズ */
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        /** パーティクル定義 */
        interface Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            opacityDirection: number;
        }

        const particles: Particle[] = [];
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.4 + 0.1,
                opacityDirection: Math.random() > 0.5 ? 1 : -1,
            });
        }

        /** 描画ループ */
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                /* 位置更新 */
                p.x += p.speedX;
                p.y += p.speedY;

                /* 画面端のラップアラウンド */
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                /* 透明度の揺らぎ */
                p.opacity += p.opacityDirection * 0.003;
                if (p.opacity >= 0.5) p.opacityDirection = -1;
                if (p.opacity <= 0.1) p.opacityDirection = 1;

                /* 描画 */
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(148, 163, 184, ${p.opacity})`;
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <>
            {/* マウス追従グラデーション */}
            <div
                className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.04), transparent 40%)`,
                }}
            />

            {/* 浮遊パーティクル */}
            <canvas
                ref={canvasRef}
                className="pointer-events-none fixed inset-0 z-20"
            />

            {/* グリッドパターンオーバーレイ */}
            <div
                className="pointer-events-none fixed inset-0 z-10 opacity-[0.015]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: "80px 80px",
                }}
            />
        </>
    );
}
