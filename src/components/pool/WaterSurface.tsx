"use client";

import { useEffect, useRef } from "react";

interface WaterSurfaceProps {
    className?: string;
    /** 0=水面近く / 1=深部。水の色と光量を決める */
    depth?: number;
    /** 泡の量。0 で泡なし、1 で標準 */
    density?: number;
    /** クリックの波紋とカーソル追従の泡を出す */
    interactive?: boolean;
}

const TAU = Math.PI * 2;

/* ------------------------------------------------------------------
 * シェーダ
 * ------------------------------------------------------------------ */

const VERT = `
attribute vec2 a_pos;
void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

/**
 * コースティクスは反復的な三角関数の畳み込みで作る。
 * 低解像度ノイズを拡大する方式と違い、ピクセル単位で解くので
 * どれだけ拡大しても筋がぼやけず、階段状にもならない。
 */
const FRAG = `
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_depth;

const vec3 SHALLOW = vec3(0.008, 0.706, 0.847); // #02b4d8
const vec3 DEEP    = vec3(0.004, 0.133, 0.243); // #01223e
const vec3 LIGHT   = vec3(0.86,  0.98,  1.0);

float caustic(vec2 uv, float t) {
    vec2 p = mod(uv * 6.28318, 6.28318) - 250.0;
    vec2 i = p;
    float c = 1.0;
    const float inten = 0.0045;

    for (int n = 0; n < 5; n++) {
        float tt = t * (1.0 - (3.5 / float(n + 1)));
        i = p + vec2(cos(tt - i.x) + sin(tt + i.y),
                     sin(tt - i.y) + cos(tt + i.x));
        c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten),
                               p.y / (cos(i.y + tt) / inten)));
    }

    c /= 5.0;
    c = 1.17 - pow(c, 1.4);
    return pow(abs(c), 8.0);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // 縦横比を補正しないと引き伸ばされた網目になる
    vec2 cuv = uv * vec2(u_resolution.x / u_resolution.y, 1.0);

    float t = u_time * 0.32 + 23.0;
    float c = caustic(cuv * 0.85, t);

    // 下へ行くほど深く、暗くする
    float d = clamp(u_depth + (1.0 - uv.y) * 0.5, 0.0, 1.0);
    vec3 water = mix(SHALLOW, DEEP, d);

    // 光は水面に近いほど強い
    float fall = mix(0.28, 1.0, uv.y) * (1.0 - u_depth * 0.5);

    vec3 col = water + LIGHT * c * fall * 0.5;

    gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

/* ------------------------------------------------------------------
 * 泡と波紋
 * ------------------------------------------------------------------ */

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
 * 水面。
 *
 * water レイヤー (WebGL)  … 水の色とコースティクス
 * foam  レイヤー (2D)     … 泡とクリックの波紋
 *
 * WebGL が使えない環境では water レイヤーだけ CSS グラデーションに
 * 退避し、泡と波紋はそのまま動く。
 */
export default function WaterSurface({
    className = "",
    depth = 0,
    density = 1,
    interactive = true,
}: WaterSurfaceProps) {
    const glCanvasRef = useRef<HTMLCanvasElement>(null);
    const fxCanvasRef = useRef<HTMLCanvasElement>(null);

    /* ---------------- WebGL: 水とコースティクス ---------------- */
    useEffect(() => {
        const canvas = glCanvasRef.current;
        if (!canvas) return;

        const gl =
            (canvas.getContext("webgl", {
                antialias: false,
                depth: false,
                alpha: false,
                powerPreference: "low-power",
            }) as WebGLRenderingContext | null) ?? null;

        if (!gl) {
            // WebGL 非対応。CSS グラデーションで代替する
            canvas.style.background =
                "linear-gradient(to bottom, #02b4d8, #0077b6 55%, #01223e)";
            return;
        }

        const vs = compile(gl, gl.VERTEX_SHADER, VERT);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
        if (!vs || !fs) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
        gl.useProgram(program);

        // 画面を覆う三角形 1 枚
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            gl.STATIC_DRAW
        );
        const aPos = gl.getAttribLocation(program, "a_pos");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const uResolution = gl.getUniformLocation(program, "u_resolution");
        const uTime = gl.getUniformLocation(program, "u_time");
        const uDepth = gl.getUniformLocation(program, "u_depth");
        gl.uniform1f(uDepth, depth);

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        // コースティクスは輪郭がやわらかいので等倍で十分。
        // 高 DPI で焼くとフラグメント数が跳ね上がるだけになる。
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
            canvas.width = Math.round(rect.width * dpr);
            canvas.height = Math.round(rect.height * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uResolution, canvas.width, canvas.height);
        };
        resize();

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        let rafId = 0;
        let visible = true;
        let onScreen = true;
        const start = performance.now();

        const draw = (time: number) => {
            gl.uniform1f(uTime, time);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        const loop = (now: number) => {
            rafId = requestAnimationFrame(loop);
            if (!visible || !onScreen) return;
            draw((now - start) / 1000);
        };

        if (reduceMotion) {
            draw(0);
        } else {
            rafId = requestAnimationFrame(loop);
        }

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

        return () => {
            cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
            gl.deleteProgram(program);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
            gl.deleteBuffer(buffer);
        };
    }, [depth]);

    /* ---------------- 2D: 泡と波紋 ---------------- */
    useEffect(() => {
        const canvas = fxCanvasRef.current;
        if (!canvas || density <= 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        let width = 0;
        let height = 0;
        const bubbles: Bubble[] = [];
        const ripples: Ripple[] = [];

        const spawnBubble = (x?: number, y?: number): Bubble => ({
            x: x ?? Math.random() * width,
            y: y ?? height + Math.random() * 40,
            r: 1.2 + Math.random() * 3.6,
            speed: 12 + Math.random() * 30,
            wobbleAmp: 3 + Math.random() * 12,
            wobblePhase: Math.random() * TAU,
            alpha: 0.18 + Math.random() * 0.38,
        });

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            bubbles.length = 0;
            const target = Math.round(
                Math.min(70, Math.max(12, (width * height) / 22000)) * density
            );
            for (let i = 0; i < target; i++) {
                const b = spawnBubble();
                b.y = Math.random() * height;
                bubbles.push(b);
            }
        };
        resize();

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        const render = (dt: number) => {
            ctx.clearRect(0, 0, width, height);

            for (const b of bubbles) {
                b.y -= b.speed * dt;
                b.wobblePhase += dt * 1.5;

                if (b.y + b.r < 0) {
                    Object.assign(b, spawnBubble());
                    continue;
                }

                const x = b.x + Math.sin(b.wobblePhase) * b.wobbleAmp;

                ctx.beginPath();
                ctx.arc(x, b.y, b.r, 0, TAU);
                ctx.fillStyle = `rgba(255,255,255,${b.alpha * 0.12})`;
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = `rgba(255,255,255,${b.alpha})`;
                ctx.stroke();
            }

            for (let i = ripples.length - 1; i >= 0; i--) {
                const rp = ripples[i];
                rp.r += dt * 300;
                if (rp.r >= rp.maxR) {
                    ripples.splice(i, 1);
                    continue;
                }
                const life = 1 - rp.r / rp.maxR;
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = `rgba(255,255,255,${life * 0.5})`;
                ctx.beginPath();
                ctx.arc(rp.x, rp.y, rp.r, 0, TAU);
                ctx.stroke();
            }
        };

        let rafId = 0;
        let last = performance.now();
        let visible = true;
        let onScreen = true;

        const loop = (now: number) => {
            rafId = requestAnimationFrame(loop);
            if (!visible || !onScreen) {
                last = now;
                return;
            }
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            render(dt);
        };

        if (reduceMotion) {
            render(0);
        } else {
            rafId = requestAnimationFrame(loop);
        }

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

        /* canvas は pointer-events:none のままにして window で座標を拾う。
         * こうしないと上に重なる要素がクリックできなくなる。 */
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
            ripples.push({ x, y, r: 0, maxR: 120 + Math.random() * 80 });
            for (let i = 0; i < 4; i++) {
                bubbles.push(spawnBubble(x + (Math.random() - 0.5) * 36, y));
            }
        };

        const onPointerMove = (e: PointerEvent) => {
            const now = performance.now();
            if (now - lastCursorBubble < 110) return;
            const { x, y } = toLocal(e.clientX, e.clientY);
            if (!inBounds(x, y)) return;
            lastCursorBubble = now;
            bubbles.push(spawnBubble(x + (Math.random() - 0.5) * 20, y));
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
    }, [density, interactive]);

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        >
            <canvas ref={glCanvasRef} className="block h-full w-full" />
            <canvas ref={fxCanvasRef} className="absolute inset-0 block h-full w-full" />
        </div>
    );
}
