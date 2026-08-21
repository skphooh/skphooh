"use client";

import { motion } from "framer-motion";
import {
    awards,
    seasonLog,
    KIND_LABEL,
    type LogEntry,
    type RecordKind,
} from "@/data/records";
import { club } from "@/data/club";

/** 種別ごとのバッジ色 */
const KIND_STYLE: Record<RecordKind, string> = {
    conference: "border-pool/30 text-pool",
    hackathon: "border-rope-red/35 text-rope-red",
    internship: "border-pool-light/50 text-pool-light",
    athletics: "border-rope-yellow/60 text-[#b8890a]",
};

/** LED が灯るときのちらつき。掲示板の各行に使う */
const flickerIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: [0, 1, 0.25, 1, 0.6, 1] },
};

/**
 * 受賞歴と活動歴 (LAP 02)
 *
 *   RESULT  … 電光掲示板。賞だけを抜き出して並べる
 *   SEASON LOG … レーンラインに沿った時系列。学会・ハッカソン・
 *                インターンを 1 本にまとめる
 */
export default function Records() {
    /**
     * 体育会の在籍は他の活動より前から続いているので、時系列の
     * 先頭に置く。club.name が未入力のあいだは出さない。
     */
    const clubEntry: LogEntry[] = club.name
        ? [
              {
                  period: club.period,
                  kind: "athletics",
                  title: club.name,
                  detail: club.detail,
              },
          ]
        : [];

    const log = [...clubEntry, ...seasonLog];

    return (
        <section id="records" className="relative z-10 bg-canvas py-24 sm:py-32">
            <div className="mx-auto max-w-4xl px-6">
                {/* 見出し */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <span className="lap-label">LAP 02</span>
                    <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-6xl">
                        RECORDS
                    </h2>
                </motion.div>

                {/* 掲示板 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="led-board overflow-hidden"
                >
                    <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-5 py-3 sm:px-7">
                        <span className="led-text text-[0.7rem] tracking-[0.25em]">
                            RESULT
                        </span>
                        <span className="led-text led-text-dim text-[0.7rem] tracking-[0.25em]">
                            {awards.length} AWARDS
                        </span>
                    </div>

                    <ul className="relative z-10 divide-y divide-white/8">
                        {awards.map((award, i) => (
                            <motion.li
                                key={`${award.title}-${award.date}`}
                                initial={flickerIn.initial}
                                whileInView={flickerIn.whileInView}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{
                                    duration: 0.75,
                                    delay: 0.15 + i * 0.14,
                                    times: [0, 0.2, 0.3, 0.45, 0.6, 1],
                                }}
                                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-5 sm:px-7"
                            >
                                <span className="led-text led-text-gold shrink-0 text-sm">
                                    ★
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="led-text block text-sm sm:text-base">
                                        {award.title}
                                    </span>
                                    <span className="led-text led-text-dim mt-1 block text-[0.7rem] leading-relaxed">
                                        {award.event}
                                    </span>
                                </span>
                                <span className="led-text led-text-dim shrink-0 text-[0.7rem]">
                                    {award.date}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* 活動歴 */}
                <div className="mt-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lap-label"
                    >
                        SEASON LOG
                    </motion.span>

                    <div className="relative mt-8 pl-8">
                        {/* レーンライン。視界に入ると上から引かれる */}
                        <motion.span
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 1.1, ease: "easeOut" }}
                            className="absolute bottom-6 left-[5px] top-3 w-px origin-top bg-hairline"
                        />

                        <ol className="space-y-10">
                            {log.map((entry, i) => (
                                <motion.li
                                    key={`${entry.period}-${entry.title}`}
                                    initial={{ opacity: 0, x: -12 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                                    className="relative"
                                >
                                    {/* マーカー */}
                                    <span className="absolute -left-8 top-1.5 flex h-[11px] w-[11px] items-center justify-center">
                                        {entry.ongoing && (
                                            <span className="absolute h-full w-full animate-ping rounded-full bg-pool-light/60" />
                                        )}
                                        <span
                                            className={`relative h-[11px] w-[11px] rounded-full ${
                                                entry.ongoing
                                                    ? "bg-pool-light"
                                                    : "border border-hairline bg-surface"
                                            }`}
                                        />
                                    </span>

                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="font-led text-[0.7rem] tracking-[0.14em] text-ink-faint">
                                            {entry.period}
                                        </span>
                                        <span
                                            className={`rounded-[2px] border px-2 py-0.5 font-led text-[0.6rem] tracking-[0.12em] ${KIND_STYLE[entry.kind]}`}
                                        >
                                            {KIND_LABEL[entry.kind]}
                                        </span>
                                        {entry.ongoing && (
                                            <span className="animate-pulse-lamp font-led text-[0.6rem] tracking-[0.14em] text-pool">
                                                ● IN PROGRESS
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="mt-2 text-base font-medium leading-snug text-ink sm:text-lg">
                                        {entry.title}
                                    </h3>

                                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                                        {entry.detail}
                                    </p>

                                    {entry.award && (
                                        <p className="mt-2.5 flex items-baseline gap-2 text-sm text-ink">
                                            <span className="text-rope-yellow">★</span>
                                            {entry.award}
                                        </p>
                                    )}
                                </motion.li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
