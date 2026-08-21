"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------
 * 骨格
 *
 * 腰を原点に、順運動学で各関節の座標を求める。ポーズは関節角度で
 * 定義し、角度のまま補間してから座標に落とす。座標を直接補間すると
 * 途中のフレームで手足が伸び縮みしてしまうため。
 * ------------------------------------------------------------------ */

/** 各部位の長さ */
const L = {
    torso: 34,
    neck: 7,
    head: 7.5,
    upperArm: 17,
    foreArm: 17,
    thigh: 20,
    shin: 20,
    foot: 7,
    /** 水着が腿を覆う割合 */
    suit: 0.45,
    /** ゴーグルの半幅 */
    goggle: 6.4,
} as const;

interface Pose {
    /** 胴の傾き。0=直立、正で前傾 */
    torso: number;
    /** 肩。0=腕が胴の延長（頭上へ万歳） */
    shoulder: number;
    /** 肘。正で曲がる */
    elbow: number;
    /** 股。0=脚が胴の延長（直立） */
    hip: number;
    /** 膝。正で曲がる */
    knee: number;
    /** 足首。負で爪先が伸びる */
    ankle: number;
}

/**
 * 飛び込みのポーズ列。
 *
 *   0.00 クラウチング  台の前縁を掴んで縮こまる
 *   0.30 蹴り出し      膝と股が伸び、腕が振り上がる
 *   0.55 伸展          体が一直線に近づく
 *   1.00 流線型        完全な伸び。爪先まで伸ばす
 */
const KEYFRAMES: { at: number; pose: Pose }[] = [
    { at: 0.0, pose: { torso: 62, shoulder: 150, elbow: 35, hip: -78, knee: 85, ankle: 20 } },
    { at: 0.3, pose: { torso: 44, shoulder: 74, elbow: 16, hip: -34, knee: 40, ankle: 6 } },
    { at: 0.55, pose: { torso: 16, shoulder: 22, elbow: 4, hip: -8, knee: 12, ankle: -6 } },
    { at: 1.0, pose: { torso: 0, shoulder: 0, elbow: 0, hip: 0, knee: 0, ankle: -18 } },
];

/** サンプリングするフレーム数。多いほど手足の長さが安定する */
const SAMPLES = 18;

const rad = (deg: number) => (deg * Math.PI) / 180;

/** 角度(度)の向きへ length だけ進んだ点。0 度は真上 */
function step(
    from: readonly [number, number],
    angle: number,
    length: number
): [number, number] {
    return [
        from[0] + Math.sin(rad(angle)) * length,
        from[1] - Math.cos(rad(angle)) * length,
    ];
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** t(0-1) におけるポーズ */
function poseAt(t: number): Pose {
    if (t <= KEYFRAMES[0].at) return KEYFRAMES[0].pose;
    const last = KEYFRAMES[KEYFRAMES.length - 1];
    if (t >= last.at) return last.pose;

    for (let i = 0; i < KEYFRAMES.length - 1; i++) {
        const a = KEYFRAMES[i];
        const b = KEYFRAMES[i + 1];
        if (t >= a.at && t <= b.at) {
            const k = (t - a.at) / (b.at - a.at);
            return {
                torso: lerp(a.pose.torso, b.pose.torso, k),
                shoulder: lerp(a.pose.shoulder, b.pose.shoulder, k),
                elbow: lerp(a.pose.elbow, b.pose.elbow, k),
                hip: lerp(a.pose.hip, b.pose.hip, k),
                knee: lerp(a.pose.knee, b.pose.knee, k),
                ankle: lerp(a.pose.ankle, b.pose.ankle, k),
            };
        }
    }
    return last.pose;
}

interface Joints {
    hip: [number, number];
    shoulder: [number, number];
    neck: [number, number];
    head: [number, number];
    elbow: [number, number];
    hand: [number, number];
    knee: [number, number];
    ankle: [number, number];
    toe: [number, number];
    /** 水着の裾。腰から腿の途中まで */
    suitEnd: [number, number];
    /** ゴーグルの両端。顔の向きに直交する */
    goggleA: [number, number];
    goggleB: [number, number];
}

/** ポーズから各関節の座標を求める */
function solve(pose: Pose): Joints {
    const hip: [number, number] = [0, 0];

    // 胴は腰から上へ
    const shoulder = step(hip, pose.torso, L.torso);
    const neck = step(shoulder, pose.torso, L.neck);
    const head = step(neck, pose.torso, L.head);

    // 腕は肩から。角度は胴に対する相対
    const armAngle = pose.torso + pose.shoulder;
    const elbow = step(shoulder, armAngle, L.upperArm);
    const hand = step(elbow, armAngle + pose.elbow, L.foreArm);

    // 脚は腰から下へ。胴の反対向きが基準
    const legAngle = pose.torso + 180 + pose.hip;
    const knee = step(hip, legAngle, L.thigh);
    const ankle = step(knee, legAngle - pose.knee, L.shin);
    const toe = step(ankle, legAngle - pose.knee + 90 + pose.ankle, L.foot);

    // 水着は腰から腿の途中まで
    const suitEnd = step(hip, legAngle, L.thigh * L.suit);

    // ゴーグルは胴の軸に直交する向き
    const goggleA = step(head, pose.torso + 90, L.goggle);
    const goggleB = step(head, pose.torso - 90, L.goggle);

    return {
        hip,
        shoulder,
        neck,
        head,
        elbow,
        hand,
        knee,
        ankle,
        toe,
        suitEnd,
        goggleA,
        goggleB,
    };
}

/** 全フレームぶんの関節座標をあらかじめ計算しておく */
const FRAMES: Joints[] = Array.from({ length: SAMPLES }, (_, i) =>
    solve(poseAt(i / (SAMPLES - 1)))
);

/** framer-motion に渡す等間隔の times 配列 */
const TIMES = FRAMES.map((_, i) => i / (SAMPLES - 1));

/**
 * 姿勢。
 *   dive       … クラウチングから流線型まで通しで動く
 *   crouch     … 台の上で構えたまま静止
 *   streamline … 伸びきったまま静止
 */
export type SwimmerPose = "dive" | "crouch" | "streamline";

/**
 * 静止ポーズは体が収まる範囲だけを切り出す。動く場合は全ポーズが
 * 入る広い枠が要るが、静止なら余白を詰めたほうが大きく見える。
 */
const VIEW_BOX: Record<SwimmerPose, string> = {
    dive: "-72 -100 144 160",
    crouch: "-6 -32 58 62",
    streamline: "-16 -76 32 128",
};

interface SwimmerProps {
    className?: string;
    /** 姿勢 */
    pose?: SwimmerPose;
    /** 飛び込み動作の再生時間(秒) */
    duration?: number;
    /** 再生を始めるまでの待ち(秒) */
    delay?: number;
}

const SUIT = "#01223e";
const CAP = "#e63946";
const SKIN = "#ffffff";

/**
 * 水着とキャップを着けた棒人間スイマー。
 *
 * 手足は肩・肘・股・膝でつながっており、クラウチングから
 * 流線型まで関節角度が連続的に変化する。
 */
export default function Swimmer({
    className = "",
    pose = "dive",
    duration = 1.0,
    delay = 0,
}: SwimmerProps) {
    const moving = pose === "dive";
    const held = pose === "crouch" ? FRAMES[0] : FRAMES[FRAMES.length - 1];

    /** 静止時は 1 ポーズ、動くときは全フレームを渡す */
    const seq = (joint: keyof Joints, axis: 0 | 1) =>
        moving ? FRAMES.map((f) => f[joint][axis]) : held[joint][axis];

    /**
     * 最初のフレームの値。これを素の属性としても渡しておかないと、
     * 初回レンダーで x1/cx などが undefined になり SVG が警告を出す。
     */
    const head = (v: number | number[]) => (Array.isArray(v) ? v[0] : v);

    // ポーズ列に時間配分を織り込み済みなので、再生は等速でよい
    const transition = moving
        ? { duration, delay, times: TIMES, ease: "linear" as const }
        : undefined;

    /**
     * 2 点を結ぶ線を、全フレーム追従させる。
     * コンポーネントではなく描画ヘルパーにしてある。レンダー中に
     * コンポーネントを定義すると、毎回別物として作り直されるため。
     */
    const bone = (
        from: keyof Joints,
        to: keyof Joints,
        width: number,
        color: string = SKIN
    ) => (
        <motion.line
            stroke={color}
            strokeWidth={width}
            x1={head(seq(from, 0))}
            y1={head(seq(from, 1))}
            x2={head(seq(to, 0))}
            y2={head(seq(to, 1))}
            initial={{
                x1: head(seq(from, 0)),
                y1: head(seq(from, 1)),
                x2: head(seq(to, 0)),
                y2: head(seq(to, 1)),
            }}
            animate={{
                x1: seq(from, 0),
                y1: seq(from, 1),
                x2: seq(to, 0),
                y2: seq(to, 1),
            }}
            transition={transition}
        />
    );

    return (
        <svg
            viewBox={VIEW_BOX[pose]}
            className={className}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* 奥側の腕脚。薄く描いて厚みを出す */}
            <g opacity="0.4">
                {bone("shoulder", "elbow", 6)}
                {bone("elbow", "hand", 5.5)}
                {bone("hip", "knee", 7)}
                {bone("knee", "ankle", 6)}
            </g>

            {/* 胴 */}
            {bone("hip", "shoulder", 9)}

            {/* 手前の脚 */}
            {bone("hip", "knee", 7.5)}
            {bone("knee", "ankle", 6.5)}
            {bone("ankle", "toe", 5)}

            {/* 水着 */}
            {bone("hip", "suitEnd", 13, SUIT)}

            {/* 手前の腕 */}
            {bone("shoulder", "elbow", 6.5)}
            {bone("elbow", "hand", 6)}

            {/* 首 */}
            {bone("shoulder", "neck", 6)}

            {/* 頭 = スイムキャップ */}
            <motion.circle
                r={L.head}
                fill={CAP}
                cx={head(seq("head", 0))}
                cy={head(seq("head", 1))}
                initial={{ cx: head(seq("head", 0)), cy: head(seq("head", 1)) }}
                animate={{ cx: seq("head", 0), cy: seq("head", 1) }}
                transition={transition}
            />

            {/* ゴーグル */}
            {bone("goggleA", "goggleB", 4, SUIT)}
        </svg>
    );
}
