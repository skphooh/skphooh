"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import ProjectLane, { ProjectType } from "./ProjectCard";
import LaneRope from "./pool/LaneRope";
import DiveTransition from "./pool/DiveTransition";

/** プロジェクトデータ */
const projects: ProjectType[] = [
    {
        title: "うちの子製作所",
        description:
            "写真・イラスト1枚からAIが高品質な3Dモデルを生成し、\n3Dプリンター用STLデータを即時出力するクリエイティブプラットフォーム。",
        features: [
            "AI 3D Generation (Tripo3D)",
            "ターンアラウンド生成 (Gemini API)",
            "ブラウザ内 3D Viewer (Three.js)",
            "Print-Ready STL エクスポート",
            "マーケットプレイス",
            "Stripe 決済",
        ],
        techStack: ["React", "Vite", "TypeScript", "FastAPI", "Firebase", "Three.js", "Stripe", "Gemini API"],
        liveUrl: "https://utinoko.skphooh.com",
        githubUrl: "https://github.com/skphooh/Hack-1",
        status: "live",
        iframePreview: true,
        details:
            "「うちの子製作所」は、好きなキャラクターや思い出の写真・イラスト1枚から、AIが3Dモデルを自動生成するサービスです。\nTripo3D APIで高品質なGLBを生成し、Gemini APIで裏面補完、trimeshでSTL変換・台座追加まで全自動。\n🎖 Hack-1グランプリ2026 オーディエンス賞・セガサミーイノベーション賞 W受賞",
    },
    {
        title: "Wear-Cast",
        description:
            "日々のコーディネートと天気を記録し、他のユーザーの投稿と交流できるSNS型ライフスタイルアプリ。\n天気に基づいたおすすめの服装提案機能も搭載。",
        features: ["コーディネート記録", "ソーシャルフィード", "天気連動レコメンド", "プロフィール管理"],
        techStack: ["Next.js", "React", "Tailwind CSS", "Supabase"],
        liveUrl: "https://wearcast.skphooh.com/",
        status: "live",
        iframePreview: true,
        details:
            "Wear-Castは、毎日の気象データと連動してユーザーの服装記録をサポートするSNSアプリケーションです。\n洗練されたUIとスムーズなトランジションで、ストレスのない記録体験を提供します。",
    },
    {
        title: "Meguri24",
        description:
            "AIが24時間の生活リズムを分析し、最適な行動パターンを提案する生活習慣改善アプリ。\n円形の24時間時計UIでタスク管理、睡眠分析、日記機能を提供。",
        features: ["24時間時計UI", "AI生活リズム分析", "タスク管理", "日記・ふりかえり"],
        techStack: ["Next.js", "Clerk", "Neon", "Tailwind CSS", "AI"],
        liveUrl: "https://meguri24.skphooh.com/",
        status: "live",
        iframePreview: true,
        details:
            "Meguri24は、独自の円形UIを採用した新しい形のタスク・生活管理アプリです。\nAIを活用し、日々の記録からより良い習慣形成をサポートします。\nClerkによる安全な認証基盤を備えています。",
    },
    {
        title: "skphooh.com",
        description:
            "このポートフォリオサイト自体。\n50mプールをページ構造に見立て、水・レーン・飛び込みで体験を組み立てている。",
        features: ["WebGL コースティクス", "レーン構造のプロダクト一覧", "飛び込みトランジション", "レスポンシブ対応"],
        techStack: ["Next.js", "WebGL", "Framer Motion", "Tailwind CSS", "TypeScript"],
        liveUrl: "https://skphooh.com/",
        githubUrl: "https://github.com/skphooh/skphooh",
        status: "live",
        iframePreview: true,
    },
];

/**
 * プロダクト一覧 (LAP 01)
 *
 * カードを並べるのではなく、レーンを縦に積む。行と行の境目は
 * レーンロープ。行を選ぶと飛び込み演出を挟んでから詳細を開く。
 */
export default function Projects() {
    const [selected, setSelected] = useState<ProjectType | null>(null);
    const [diving, setDiving] = useState<ProjectType | null>(null);
    const [diveOriginX, setDiveOriginX] = useState(0.5);

    /** モーダル表示中は背後をスクロールさせない */
    useEffect(() => {
        if (!selected) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [selected]);

    /** Esc で閉じる */
    useEffect(() => {
        if (!selected) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelected(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [selected]);

    const handleSelect = (project: ProjectType, originX: number) => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) {
            setSelected(project);
            return;
        }

        setDiveOriginX(originX);
        setDiving(project);
    };

    /** 入水しきったら詳細を開く */
    const handleDiveComplete = useCallback(() => {
        setDiving((current) => {
            if (current) setSelected(current);
            return null;
        });
    }, []);

    return (
        <>
            <section id="projects" className="relative z-10 bg-surface py-24 sm:py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-14"
                    >
                        <span className="lap-label">LAP 01</span>
                        <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-6xl">
                            PROJECTS
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                            個人開発で制作した代表的なプロダクトです。レーンを選ぶと詳細が開きます。
                        </p>
                    </motion.div>
                </div>

                {/* レーン */}
                <div className="mx-auto max-w-5xl px-2 sm:px-6">
                    <LaneRope />
                    {projects.map((project, index) => (
                        <div key={project.title}>
                            <ProjectLane
                                project={project}
                                index={index}
                                onSelect={(originX) => handleSelect(project, originX)}
                            />
                            <LaneRope reverse={index % 2 === 1} />
                        </div>
                    ))}
                </div>
            </section>

            {/* 飛び込み */}
            <DiveTransition
                active={diving !== null}
                originX={diveOriginX}
                onComplete={handleDiveComplete}
            />

            {/* 詳細 */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-pool-deep/70 p-4 backdrop-blur-sm sm:p-8"
                        onClick={() => setSelected(null)}
                        role="dialog"
                        aria-modal="true"
                        aria-label={selected.title}
                    >
                        <motion.div
                            initial={{ scale: 0.97, opacity: 0, y: 24 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.97, opacity: 0, y: 24 }}
                            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="card relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden"
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute right-4 top-4 z-20 cursor-pointer rounded-full bg-surface/90 p-2 text-ink transition-colors hover:bg-canvas"
                                aria-label="閉じる"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="overflow-y-auto">
                                {/* ライブプレビュー */}
                                {selected.iframePreview && selected.liveUrl && (
                                    <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden bg-canvas">
                                        <div className="absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-[0.5] lg:h-[125%] lg:w-[125%] lg:scale-[0.8]">
                                            <iframe
                                                src={selected.liveUrl}
                                                className="h-full w-full border-0"
                                                title={`${selected.title} Live`}
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="p-7 sm:p-10">
                                    <h3 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
                                        {selected.title}
                                    </h3>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {selected.techStack.map((tech) => (
                                            <span key={tech} className="tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">
                                        {selected.details || selected.description}
                                    </p>

                                    {selected.features && selected.features.length > 0 && (
                                        <div className="mt-10">
                                            <span className="lap-label">FEATURES</span>
                                            <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                                                {selected.features.map((feature) => (
                                                    <li
                                                        key={feature}
                                                        className="flex items-baseline gap-3 border-b border-hairline pb-3 text-sm text-ink"
                                                    >
                                                        <span className="font-led text-[0.65rem] text-pool-light">
                                                            ▸
                                                        </span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                                        {selected.liveUrl && (
                                            <a
                                                href={selected.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn"
                                            >
                                                サイトを見る
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        )}
                                        {selected.githubUrl && (
                                            <a
                                                href={selected.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-ghost"
                                            >
                                                <Github className="h-4 w-4" />
                                                ソースコード
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
