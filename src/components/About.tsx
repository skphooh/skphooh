"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * スキル。4 泳法に対応させている。
 * 個人メドレーの泳順（バタフライ→背泳ぎ→平泳ぎ→自由形）に合わせ、
 * 第一泳法にいま一番力を入れている領域を置く。
 */
const skills = [
    {
        stroke: "BUTTERFLY",
        name: "Security",
        desc: "脆弱性診断・SOC・ゼロトラストの現場を経験。攻撃者の視点から設計を見直す",
    },
    {
        stroke: "BACKSTROKE",
        name: "Web Application",
        desc: "Next.js / React を軸にしたフロントエンドとバックエンドの実装",
    },
    {
        stroke: "BREASTSTROKE",
        name: "AI Integration",
        desc: "AIを活用した機能設計とプロンプトエンジニアリング",
    },
    {
        stroke: "FREESTYLE",
        name: "Rapid Prototyping",
        desc: "アイデアからデプロイまでを最短距離で走らせる",
    },
];

/** 水泳の掲示。電光掲示板の記録表示に見立てる */
const swimStats = [
    { label: "CAREER", value: "15 YRS" },
    { label: "ROLE", value: "副主将" },
    { label: "DUTY", value: "会計・記録" },
];

/** 使用技術 */
const techStack = [
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Tailwind CSS",
    "Framer Motion",
    "WebGL",
    "Supabase",
    "Neon",
    "Clerk",
    "FastAPI",
    "Firebase",
    "Android",
    "PostgreSQL",
    "Vercel",
];

/**
 * About と Skills (LAP 03)
 */
export default function About() {
    return (
        <section id="about" className="relative z-10 bg-surface py-24 sm:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <span className="lap-label">LAP 03</span>
                    <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-6xl">
                        ABOUT
                    </h2>
                </motion.div>

                {/* 本文 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-2xl space-y-6 text-base leading-loose text-ink-soft"
                >
                    <p>
                        大学院で、Wi-Fi の電波から「その人がいま本当にその場所にいるか」を確かめる
                        位置証明の研究をしています。研究のかたわら Next.js や React で Web
                        アプリケーションを個人開発していて、作ったものはすべて公開して動かし続けることにしています。
                    </p>
                    <p>
                        目指しているのは
                        <strong className="font-medium text-ink">セキュリティエンジニア</strong>
                        です。もともと「人を守る仕事」に漠然と憧れていました。表に立って守るだけでなく、
                        動いて当然と思われているものを裏側で守る仕事もある。技術の力を正しい方向に使えるこの分野に、
                        自然と関心が向きました。
                    </p>
                    <p>
                        その憧れが確信に変わったのは研究の中です。自分で設計した位置証明の仕組みを攻撃者の目で見直したとき、
                        正規の通信データをそのまま再送すれば教室の外からでも認証を通せてしまう、リプレイ攻撃の余地に気づきました。
                        作る側にいたからこそ、自分の設計の穴が見えた経験です。
                    </p>
                    <p>
                        インターンでは、LINEヤフーでの約6週間のホワイトボックス型脆弱性診断をはじめ、
                        野村総合研究所での SOC、富士通でのゼロトラスト・SASE など、守り方の異なる現場を経験しました。
                        CTF にも出場し、攻撃側の手法を手を動かして学んでいます。
                        <strong className="font-medium text-ink">
                            作る視点と壊す視点の両方を持つこと
                        </strong>
                        を、これからの軸にしたいと考えています。
                    </p>
                </motion.div>

                {/* 水泳 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14"
                >
                    <figure className="relative aspect-[3/2] overflow-hidden rounded-[3px] bg-foam">
                        <Image
                            src="/backstroke.jpg"
                            alt="背泳ぎのスタートに備え、スタート台のグリップを握る後ろ姿"
                            fill
                            sizes="(max-width: 768px) 100vw, 520px"
                            className="object-cover"
                        />
                    </figure>

                    <div>
                        <span className="lap-label">OFF THE DECK</span>
                        <h3 className="mt-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">
                            15 YEARS IN THE WATER
                        </h3>
                        <div className="mt-6 space-y-4 text-sm leading-loose text-ink-soft sm:text-base">
                            <p>
                                水泳は 15 年続けてきました。大学では体育会水泳部に所属し、
                                <strong className="font-medium text-ink">副主将</strong>
                                として、会計長と HP・記録担当も兼ねました。
                            </p>
                            <p>
                                前に立つより、全体を見て支える役回りです。全部員のベストタイムと出席率を記録して見える形にし、
                                主将やパートの責任者と練習メニューに落とし込みました。部員の 8 割が自己ベストを更新しています。
                            </p>
                            <p>
                                チームを裏側で支えること、当たり前に動く認証を研究で支えること、サービスを守ること。
                                自分の中では、
                                <strong className="font-medium text-ink">
                                    「当たり前を、裏側で支える」
                                </strong>
                                という一本の線でつながっています。
                            </p>
                        </div>
                        <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-[3px] bg-hairline text-center">
                            {swimStats.map((stat) => (
                                <div key={stat.label} className="bg-surface px-2 py-4">
                                    <dt className="font-led text-[0.6rem] tracking-[0.18em] text-ink-faint">
                                        {stat.label}
                                    </dt>
                                    <dd className="mt-1.5 font-display text-lg tracking-tight text-ink">
                                        {stat.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </motion.div>

                {/* スキル */}
                <div className="mt-20 grid gap-px overflow-hidden rounded-[3px] bg-hairline sm:grid-cols-2">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="group relative bg-surface p-8 transition-colors duration-300 hover:bg-canvas"
                        >
                            {/* ホバーで左端に水が差す */}
                            <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-pool-light transition-transform duration-400 ease-out group-hover:scale-y-100" />
                            <span className="font-led text-[0.65rem] tracking-[0.22em] text-pool-light">
                                {skill.stroke}
                            </span>
                            <h3 className="mt-3 font-display text-xl tracking-tight text-ink">
                                {skill.name}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                                {skill.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* 技術スタック */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6 }}
                    className="mt-16"
                >
                    <span className="lap-label">TECH STACK</span>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {techStack.map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, y: 6 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.03 }}
                                className="tag"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
