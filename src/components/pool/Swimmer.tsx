"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------
 * 骨格
 *
 * 腰を原点に、順運動学で各関節の座標を求める。ポーズは関節角度で
 * 定義し、角度のまま補間してから座標に落とす。座標を直接補間すると
 * 途中のフレームで手足が伸び縮みしてしまうため。
 *
 * 進行方向は右。プールは常に右側にある。
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
    /** 胴の傾き。0=直立、正で前傾、負で後傾 */
    torso: number;
    /** 肩。0=腕が胴の延長（頭上へ万歳）、正で前へ下ろす */
    shoulder: number;
    /** 肘。正で曲がる */
    elbow: number;
    /** 股。0=脚が胴の延長（直立） */
    hip: number;
    /** 膝。正で曲がる */
    knee: number;
    /** 足首。0=すねに直交（立った足）、負で爪先が伸びる */
    ankle: number;
}

/** スタートの種類 */
export type StartType = "forward" | "backstroke";

/**
 * 通常のスタート（グラブスタート）。
 *
 *   0.00 台の上で深く前傾し、両手で前縁を掴む
 *   0.32 前縁を離して蹴り出す。腕が前へ振り出される
 *   0.62 体が伸びていく
 *   1.00 流線型。爪先まで伸ばす
 */
const FORWARD_KEYFRAMES: { at: number; pose: Pose }[] = [
    { at: 0.0, pose: { torso: 76, shoulder: 104, elbow: 10, hip: -56, knee: 48, ankle: -25 } },
    { at: 0.32, pose: { torso: 52, shoulder: 54, elbow: 8, hip: -26, knee: 24, ankle: -55 } },
    { at: 0.62, pose: { torso: 20, shoulder: 16, elbow: 3, hip: -8, knee: 8, ankle: -80 } },
    { at: 1.0, pose: { torso: 0, shoulder: 0, elbow: 0, hip: 0, knee: 0, ankle: -95 } },
];

/**
 * 背泳ぎのスタート。
 *
 * 選手は水中にいて、壁に足を掛け、上のグリップを掴んで縮こまっている。
 *
 *   0.00 膝を抱え込み、腕は頭上のグリップへ
 *   0.34 頭を後ろへ投げ出し、体を反らせながら壁を蹴る
 *   0.66 反りを保ったまま伸びる
 *   1.00 わずかに反りを残した流線型
 */
const BACKSTROKE_KEYFRAMES: { at: number; pose: Pose }[] = [
    { at: 0.0, pose: { torso: -24, shoulder: -10, elbow: 64, hip: -116, knee: 94, ankle: -10 } },
    { at: 0.34, pose: { torso: -36, shoulder: -8, elbow: 24, hip: -60, knee: 46, ankle: -50 } },
    { at: 0.66, pose: { torso: -24, shoulder: -3, elbow: 8, hip: -22, knee: 14, ankle: -80 } },
    { at: 1.0, pose: { torso: -12, shoulder: 0, elbow: 0, hip: -8, knee: 0, ankle: -95 } },
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
function poseAt(keys: { at: number; pose: Pose }[], t: number): Pose {
    if (t <= keys[0].at) return keys[0].pose;
    const last = keys[keys.length - 1];
    if (t >= last.at) return last.pose;

    for (let i = 0; i < keys.length - 1; i++) {
        const a = keys[i];
        const b = keys[i + 1];
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

const JOINT_KEYS: (keyof Joints)[] = [
    "hip",
    "shoulder",
    "neck",
    "head",
    "elbow",
    "hand",
    "knee",
    "ankle",
    "toe",
    "suitEnd",
    "goggleA",
    "goggleB",
];

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
    const shinAngle = legAngle - pose.knee;
    const knee = step(hip, legAngle, L.thigh);
    const ankle = step(knee, shinAngle, L.shin);
    // +90 ですねに直交＝立った足。ankle を負にすると爪先が伸びる
    const toe = step(ankle, shinAngle + 90 + pose.ankle, L.foot);

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
function buildFrames(keys: { at: number; pose: Pose }[]): Joints[] {
    return Array.from({ length: SAMPLES }, (_, i) =>
        solve(poseAt(keys, i / (SAMPLES - 1)))
    );
}

const FRAMES: Record<StartType, Joints[]> = {
    forward: buildFrames(FORWARD_KEYFRAMES),
    backstroke: buildFrames(BACKSTROKE_KEYFRAMES),
};

/**
 * 与えられたフレーム群がちょうど収まる viewBox を求める。
 * 手で数えると姿勢を調整するたびにずれるので、座標から計算する。
 */
function viewBoxOf(frames: Joints[], pad = 11): string {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const frame of frames) {
        for (const key of JOINT_KEYS) {
            const [x, y] = frame[key];
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    }

    return [minX - pad, minY - pad, maxX - minX + pad * 2, maxY - minY + pad * 2].join(
        " "
    );
}

/**
 * 姿勢。
 *   dive       … スタート姿勢から流線型まで通しで動く
 *   crouch     … スタート姿勢のまま静止
 *   streamline … 伸びきったまま静止
 */
export type SwimmerPose = "dive" | "crouch" | "streamline";

/** 静止ポーズは体が収まる範囲だけを切り出し、小さく置いても潰れないようにする */
const VIEW_BOX: Record<StartType, Record<SwimmerPose, string>> = {
    forward: {
        dive: viewBoxOf(FRAMES.forward),
        crouch: viewBoxOf([FRAMES.forward[0]]),
        streamline: viewBoxOf([FRAMES.forward[SAMPLES - 1]]),
    },
    backstroke: {
        dive: viewBoxOf(FRAMES.backstroke),
        crouch: viewBoxOf([FRAMES.backstroke[0]]),
        streamline: viewBoxOf([FRAMES.backstroke[SAMPLES - 1]]),
    },
};

/** framer-motion に渡す等間隔の times 配列 */
const TIMES = Array.from({ length: SAMPLES }, (_, i) => i / (SAMPLES - 1));

interface SwimmerProps {
    className?: string;
    /** 姿勢 */
    pose?: SwimmerPose;
    /** スタートの種類 */
    start?: StartType;
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
 * 手足は肩・肘・股・膝でつながっており、スタート姿勢から流線型まで
 * 関節角度が連続的に変化する。
 */
export default function Swimmer({
    className = "",
    pose = "dive",
    start = "forward",
    duration = 1.0,
    delay = 0,
}: SwimmerProps) {
    const frames = FRAMES[start];
    const moving = pose === "dive";
    const held = pose === "crouch" ? frames[0] : frames[SAMPLES - 1];

    /** 静止時は 1 ポーズ、動くときは全フレームを渡す */
    const seq = (joint: keyof Joints, axis: 0 | 1) =>
        moving ? frames.map((f) => f[joint][axis]) : held[joint][axis];

    /**
     * 最初のフレームの値。これを素の属性としても渡しておかないと、
     * 初回レンダーで x1/cx などが undefined になり SVG が警告を出す。
     */
    const first = (v: number | number[]) => (Array.isArray(v) ? v[0] : v);

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
            x1={first(seq(from, 0))}
            y1={first(seq(from, 1))}
            x2={first(seq(to, 0))}
            y2={first(seq(to, 1))}
            initial={{
                x1: first(seq(from, 0)),
                y1: first(seq(from, 1)),
                x2: first(seq(to, 0)),
                y2: first(seq(to, 1)),
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
            viewBox={VIEW_BOX[start][pose]}
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
                cx={first(seq("head", 0))}
                cy={first(seq("head", 1))}
                initial={{ cx: first(seq("head", 0)), cy: first(seq("head", 1)) }}
                animate={{ cx: seq("head", 0), cy: seq("head", 1) }}
                transition={transition}
            />

            {/* ゴーグル */}
            {bone("goggleA", "goggleB", 4, SUIT)}
        </svg>
    );
}
