"use client";

import { useEffect, useRef } from "react";

interface PoolCanvasProps {
    className?: string;
    /** 泡の量。1 で標準 */
    density?: number;
    /** 0=水面 / 1=深部。コースティクスの強さと泡の速さを決める */
    depth?: number;
    /** クリックの波紋とカーソル追従の泡を有効にする */
    interactive?: boolean;
}

/** コースティクス用オフスクリーンの解像度。低解像度で描いて拡大転写する */
const CAUSTIC_W = 160;
const CAUSTIC_H = 90;

/** 格子ノイズのテーブルサイズ */
const LATTICE = 256;

const TAU = Math.PI * 2;

interface Bubble {
    x: number;
    y: number;
    r: number;
    speed: number;
    wobbleAmp: number;
    wobblePhase: number;
    alpha: number;
}

interface Ripple {
    x: number;
    y: number;
    r: number;
    maxR: number;
}

/**
 * プールの水面を描く Canvas。
 *
 * 3 レイヤーを 1 本の requestAnimationFrame で合成する:
 *   1. コースティクス — 水面が底に落とす光の網目
 *   2. バブル         — 下から上へ昇る気泡
 *   3. リップル       — クリック地点から広がる波紋
 *
 * 負荷対策として DPR は 1.5 で頭打ちにし、コースティクスは
 * 160x90 のオフスクリーンに描いてから拡大している。画面外・
 * 非アクティブタブでは rAF を止め、prefers-reduced-motion では
 * 1 フレームだけ描いて静止する。
 */
export default function PoolCanvas({
    className = "",
    density = 1,
    depth = 0,
    interactive = true,
}: PoolCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        /* ---------------- 格子ノイズ ----------------
         * Math.sin によるハッシュは 1 フレームあたり数十万回の
         * 呼び出しになるため、乱数テーブルを引く方式にする。 */
        const lattice = new Float32Array(LATTICE * LATTICE);
        for (let i = 0; i < lattice.length; i++) lattice[i] = Math.random();

        const lat = (xi: number, yi: number) =>
            lattice[((yi & (LATTICE - 1)) << 8) | (xi & (LATTICE - 1))];

        /** 2 次元 value noise。smoothstep で補間する */
        const noise2 = (x: number, y: number) => {
            const xi = Math.floor(x);
            const yi = Math.floor(y);
            const xf = x - xi;
            const yf = y - yi;
            const u = xf * xf * (3 - 2 * xf);
            const v = yf * yf * (3 - 2 * yf);
            const i00 = lat(xi, yi);
            const i10 = lat(xi + 1, yi);
            const i01 = lat(xi, yi + 1);
            const i11 = lat(xi + 1, yi + 1);
            const a = i00 + (i10 - i00) * u;
            const b = i01 + (i11 - i01) * u;
            return a + (b - a) * v;
        };

        /* ---------------- オフスクリーン ---------------- */
        const off = document.createElement("canvas");
        off.width = CAUSTIC_W;
        off.height = CAUSTIC_H;
        const offCtx = off.getContext("2d");
        if (!offCtx) return;

        const image = offCtx.createImageData(CAUSTIC_W, CAUSTIC_H);
        const data = image.data;

        // RGB は固定。毎フレーム書き換えるのはアルファのみ
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 205;
            data[i + 1] = 240;
            data[i + 2] = 255;
        }

        /** 深いほど光は弱まる */
        const causticStrength = 0.78 - depth * 0.46;

        const drawCaustics = (t: number) => {
            let p = 3;
            for (let y = 0; y < CAUSTIC_H; y++) {
                // 水面に近い上側ほど光が強い
                const yFade = 1 - (y / CAUSTIC_H) * 0.55;
                for (let x = 0; x < CAUSTIC_W; x++) {
                    // 1 枚目のノイズで座標を歪ませ、2 枚目で網目を作る
                    const warp = noise2(x * 0.055 + t * 0.13, y * 0.055 - t * 0.05);
                    const n = noise2(
                        x * 0.085 + warp * 2.4 + t * 0.19,
                        y * 0.085 + warp * 2.4 - t * 0.11
                    );

                    // 稜線を取り出して 8 乗し、細い光の筋に絞り込む
                    let c = 1 - Math.abs(n - 0.5) * 2;
                    c = c * c;
                    c = c * c;
                    c = c * c;

                    data[p] = c * 255 * causticStrength * yFade;
                    p += 4;
                }
            }
            offCtx.putImageData(image, 0, 0);
        };

        /* ---------------- 状態 ---------------- */
        let width = 0;
        let height = 0;
        const bubbles: Bubble[] = [];
        const ripples: Ripple[] = [];

        const spawnBubble = (x?: number, y?: number): Bubble => ({
            x: x ?? Math.random() * width,
            y: y ?? height + Math.random() * 40,
            r: 1.5 + Math.random() * 4.5,
            speed: 14 + Math.random() * 34 + depth * 10,
            wobbleAmp: 4 + Math.random() * 14,
            wobblePhase: Math.random() * TAU,
            alpha: 0.25 + Math.random() * 0.5,
        });

        const resetBubbles = () => {
            bubbles.length = 0;
            const target = Math.round(
                Math.min(110, Math.max(18, (width * height) / 14000)) * density
            );
            for (let i = 0; i < target; i++) {
                const b = spawnBubble();
                // 初期状態で画面全体に散らしておく
                b.y = Math.random() * height;
                bubbles.push(b);
            }
        };

        /* ---------------- サイズ調整 ---------------- */
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            resetBubbles();
        };

        resize();

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        /* ---------------- 描画 ---------------- */
        const render = (dt: number) => {
            ctx.clearRect(0, 0, width, height);

            // 1. コースティクス
            ctx.imageSmoothingEnabled = true;
            ctx.drawImage(off, 0, 0, width, height);

            // 2. バブル
            for (const b of bubbles) {
                b.y -= b.speed * dt;
                b.wobblePhase += dt * 1.6;

                if (b.y + b.r < 0) {
                    Object.assign(b, spawnBubble());
                    continue;
                }

                const x = b.x + Math.sin(b.wobblePhase) * b.wobbleAmp;

                ctx.beginPath();
                ctx.arc(x, b.y, b.r, 0, TAU);
                ctx.fillStyle = `rgba(255,255,255,${b.alpha * 0.14})`;
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = `rgba(255,255,255,${b.alpha})`;
                ctx.stroke();

                // 気泡表面のハイライト
                ctx.beginPath();
                ctx.arc(x - b.r * 0.32, b.y - b.r * 0.32, b.r * 0.24, 0, TAU);
                ctx.fillStyle = `rgba(255,255,255,${b.alpha * 0.8})`;
                ctx.fill();
            }

            // 3. リップル
            for (let i = ripples.length - 1; i >= 0; i--) {
                const rp = ripples[i];
                rp.r += dt * 260;

                if (rp.r >= rp.maxR) {
                    ripples.splice(i, 1);
                    continue;
                }

                const life = 1 - rp.r / rp.maxR;
                ctx.lineWidth = 2;
                ctx.strokeStyle = `rgba(255,255,255,${life * 0.55})`;
                ctx.beginPath();
                ctx.arc(rp.x, rp.y, rp.r, 0, TAU);
                ctx.stroke();

                if (rp.r > 26) {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgba(144,224,239,${life * 0.4})`;
                    ctx.beginPath();
                    ctx.arc(rp.x, rp.y, rp.r - 22, 0, TAU);
                    ctx.stroke();
                }
            }
        };

        /* ---------------- ループ ---------------- */
        let rafId = 0;
        let last = performance.now();
        let elapsed = 0;
        let frame = 0;
        let visible = true;
        let onScreen = true;

        const loop = (now: number) => {
            rafId = requestAnimationFrame(loop);

            // タブが隠れている / 画面外なら描画しない
            if (!visible || !onScreen) {
                last = now;
                return;
            }

            // フレーム落ち時に飛びすぎないよう dt に上限を設ける
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            elapsed += dt;
            frame++;

            // コースティクスは動きが遅いので 2 フレームに 1 回で足りる
            if (frame % 2 === 0) drawCaustics(elapsed);

            render(dt);
        };

        if (reduceMotion) {
            // 静止した 1 フレームだけ描く
            drawCaustics(0);
            render(0);
        } else {
            drawCaustics(0);
            rafId = requestAnimationFrame(loop);
        }

        /* ---------------- 一時停止の制御 ---------------- */
        const onVisibility = () => {
            visible = !document.hidden;
        };
        document.addEventListener("visibilitychange", onVisibility);

        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                onScreen = entries[0]?.isIntersecting ?? true;
            },
            { threshold: 0 }
        );
        intersectionObserver.observe(canvas);

        /* ---------------- 入力 ----------------
         * canvas 自体は pointer-events:none のままにして window で
         * 座標を拾う。こうしないと上に重なるボタンがクリックできない。 */
        let lastCursorBubble = 0;

        const toLocal = (clientX: number, clientY: number) => {
            const rect = canvas.getBoundingClientRect();
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        const inBounds = (x: number, y: number) =>
            x >= 0 && x <= width && y >= 0 && y <= height;

        const onPointerDown = (e: PointerEvent) => {
            const { x, y } = toLocal(e.clientX, e.clientY);
            if (!inBounds(x, y)) return;
            ripples.push({ x, y, r: 0, maxR: 130 + Math.random() * 90 });
            // 波紋と一緒に泡も弾ける
            for (let i = 0; i < 5; i++) {
                bubbles.push(
                    spawnBubble(x + (Math.random() - 0.5) * 40, y + Math.random() * 10)
                );
            }
        };

        const onPointerMove = (e: PointerEvent) => {
            const now = performance.now();
            if (now - lastCursorBubble < 90) return;
            const { x, y } = toLocal(e.clientX, e.clientY);
            if (!inBounds(x, y)) return;
            lastCursorBubble = now;
            bubbles.push(spawnBubble(x + (Math.random() - 0.5) * 24, y));
        };

        if (interactive && !reduceMotion) {
            window.addEventListener("pointerdown", onPointerDown);
            window.addEventListener("pointermove", onPointerMove, { passive: true });
        }

        return () => {
            cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
            window.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
        };
    }, [density, depth, interactive]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`pointer-events-none block h-full w-full ${className}`}
        />
    );
}
