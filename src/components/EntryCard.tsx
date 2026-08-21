"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { profile } from "@/data/profile";

/** 掲示板の行。値が空なら行ごと出さない */
function EntryRow({ label, value }: { label: string; value: string }) {
    if (!value) return null;

    return (
        <div className="flex flex-col gap-1 border-b-2 border-pool-line/15 py-3 sm:flex-row sm:items-baseline sm:gap-6 sm:py-4">
            <dt className="shrink-0 font-led text-xs tracking-[0.18em] text-pool-water sm:w-28 sm:text-sm">
                {label}
            </dt>
            <dd className="text-lg font-bold text-pool-line sm:text-xl">{value}</dd>
        </div>
    );
}

/**
 * エントリーカード。
 *
 * 大会の選手紹介パネルの体裁で、顔写真と所属を出す。
 * 表示する値は src/data/profile.ts にのみ置いている。
 */
export default function EntryCard() {
    const [photoFailed, setPhotoFailed] = useState(false);

    // 所属と学年は 1 行にまとめる。どちらか欠けていても崩れない
    const affiliationLine = [profile.affiliation, profile.grade]
        .filter(Boolean)
        .join("  ");

    return (
        <section
            id="entry"
            className="tile-grid relative z-10 bg-pool-tile py-24 sm:py-32"
        >
            <div className="container mx-auto max-w-5xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="pool-panel"
                >
                    {/* カードのヘッダー */}
                    <div className="led-board flex items-center justify-between border-0 border-b-4 px-5 py-3 shadow-none sm:px-8">
                        <span className="led-text relative z-10 text-xs tracking-[0.22em] sm:text-sm">
                            ENTRY
                        </span>
                        <span className="led-text led-text-gold relative z-10 text-xs tracking-[0.22em] sm:text-sm">
                            LANE 1
                        </span>
                    </div>

                    <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[220px_1fr] md:gap-12">
                        {/* 顔写真 */}
                        <div className="relative mx-auto aspect-square w-44 shrink-0 overflow-hidden border-4 border-pool-line bg-pool-foam shadow-[var(--shadow-pool-sm)] md:mx-0 md:w-full">
                            {profile.photo && !photoFailed ? (
                                <Image
                                    src={profile.photo}
                                    alt={profile.fullName || profile.handle}
                                    fill
                                    sizes="(max-width: 768px) 176px, 220px"
                                    className="object-cover"
                                    onError={() => setPhotoFailed(true)}
                                    priority
                                />
                            ) : (
                                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-pool-water">
                                    <User className="h-14 w-14 stroke-[1.5]" />
                                    <span className="font-led text-[10px] tracking-[0.15em]">
                                        NO PHOTO
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* 掲示内容 */}
                        <dl className="flex flex-col justify-center">
                            <EntryRow label="NAME" value={profile.fullName} />
                            <EntryRow label="ROMAJI" value={profile.fullNameEn} />
                            <EntryRow label="HANDLE" value={profile.handle} />
                            <EntryRow label="TEAM" value={affiliationLine} />
                            <EntryRow label="EVENT" value={profile.title} />
                        </dl>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
