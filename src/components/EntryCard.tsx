"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { profile } from "@/data/profile";

/** 掲示の 1 行。値が空なら行ごと出さない */
function EntryRow({ label, value }: { label: string; value: string }) {
    if (!value) return null;

    return (
        <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:gap-8">
            <dt className="shrink-0 font-led text-[0.7rem] tracking-[0.2em] text-ink-faint sm:w-24">
                {label}
            </dt>
            <dd className="text-lg text-ink">{value}</dd>
        </div>
    );
}

/**
 * エントリーカード。
 *
 * 大会の選手紹介パネル。表示する値は src/data/profile.ts にのみ置く。
 */
export default function EntryCard() {
    const [photoFailed, setPhotoFailed] = useState(false);

    const affiliationLine = [profile.affiliation, profile.grade]
        .filter(Boolean)
        .join("　");

    return (
        <section id="entry" className="tile-grid relative z-10 bg-canvas py-24 sm:py-32">
            <div className="mx-auto max-w-4xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                    className="card overflow-hidden"
                >
                    {/* ヘッダー */}
                    <div className="led-board flex items-center justify-between px-5 py-2.5 sm:px-7">
                        <span className="led-text relative z-10 text-[0.7rem] tracking-[0.25em]">
                            ENTRY
                        </span>
                        <span className="led-text led-text-gold relative z-10 text-[0.7rem] tracking-[0.25em]">
                            LANE 1
                        </span>
                    </div>

                    <div className="grid gap-8 p-7 sm:p-10 md:grid-cols-[180px_1fr] md:gap-12">
                        {/* 顔写真 */}
                        <div className="relative mx-auto aspect-square w-40 shrink-0 overflow-hidden rounded-[3px] bg-foam md:mx-0 md:w-full">
                            {profile.photo && !photoFailed ? (
                                <Image
                                    src={profile.photo}
                                    alt={profile.fullName || profile.handle}
                                    fill
                                    sizes="(max-width: 768px) 160px, 180px"
                                    className="object-cover"
                                    onError={() => setPhotoFailed(true)}
                                    priority
                                />
                            ) : (
                                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-pool-light">
                                    <User className="h-12 w-12 stroke-[1.25]" />
                                    <span className="font-led text-[0.6rem] tracking-[0.15em]">
                                        NO PHOTO
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* 掲示内容 */}
                        <dl className="flex flex-col justify-center divide-y divide-hairline">
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
