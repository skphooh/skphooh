import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import LaneRope from "@/components/pool/LaneRope";
import { projects } from "@/data/projects";

interface PageProps {
    params: Promise<{ slug: string }>;
}

/** 全プロダクトを静的に書き出す */
export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) return { title: "Not Found | skphooh" };

    const summary = project.description.replace(/\n/g, " ");

    return {
        title: `${project.title} | skphooh`,
        description: summary,
        openGraph: {
            title: `${project.title} | skphooh`,
            description: summary,
            type: "article",
        },
    };
}

const STATUS_LABEL = {
    live: "LIVE",
    development: "IN DEV",
    archived: "ARCHIVED",
} as const;

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const index = projects.findIndex((p) => p.slug === slug);

    if (index === -1) notFound();

    const project = projects[index];
    // 最後のレーンまで行ったら先頭に戻る
    const next = projects[(index + 1) % projects.length];
    const status = project.status ?? "live";

    return (
        <main className="min-h-screen bg-surface">
            {/* 戻る */}
            <div className="mx-auto max-w-5xl px-6 pb-8 pt-24 sm:pt-28">
                <Link
                    href="/#projects"
                    className="group inline-flex items-center gap-2 font-led text-[0.7rem] tracking-[0.18em] text-ink-faint transition-colors hover:text-pool"
                >
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                    BACK TO LANES
                </Link>
            </div>

            {/* 見出し */}
            <header className="mx-auto max-w-5xl px-6">
                <div className="flex flex-wrap items-baseline gap-4">
                    <span className="lap-label">
                        LANE {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-led text-[0.65rem] tracking-[0.18em] text-pool">
                        ● {STATUS_LABEL[status]}
                    </span>
                </div>

                <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-6xl">
                    {project.title}
                </h1>

                <p className="mt-5 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-ink-soft sm:text-base">
                    {project.description}
                </p>
            </header>

            {/* ライブプレビュー。切り取らず、縦横比も崩さない */}
            {project.iframePreview && project.liveUrl && (
                <section className="mx-auto mt-14 max-w-6xl px-6">
                    <div className="card overflow-hidden">
                        <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-rope-red/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-rope-yellow/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-pool-light/60" />
                            <span className="ml-3 truncate font-led text-[0.65rem] tracking-[0.1em] text-ink-faint">
                                {project.liveUrl}
                            </span>
                        </div>
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-canvas">
                            <iframe
                                src={project.liveUrl}
                                className="absolute inset-0 h-full w-full border-0"
                                title={`${project.title} ライブプレビュー`}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* 本文 */}
            <section className="mx-auto max-w-5xl px-6 py-20">
                <div className="grid gap-14 md:grid-cols-[1.4fr_1fr]">
                    <div>
                        <span className="lap-label">OVERVIEW</span>
                        <p className="mt-5 whitespace-pre-line text-sm leading-loose text-ink-soft sm:text-base">
                            {project.details || project.description}
                        </p>

                        <div className="mt-12">
                            <span className="lap-label">TECH STACK</span>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {project.features && project.features.length > 0 && (
                        <div>
                            <span className="lap-label">FEATURES</span>
                            <ul className="mt-5 space-y-0">
                                {project.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-baseline gap-3 border-b border-hairline py-3.5 text-sm text-ink"
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
                </div>

                {/* リンク */}
                <div className="mt-16 flex flex-col gap-3 sm:flex-row">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                        >
                            サイトを見る
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost"
                        >
                            <Github className="h-4 w-4" />
                            ソースコード
                        </a>
                    )}
                </div>
            </section>

            {/* 次のレーンへ */}
            <LaneRope />
            <section className="mx-auto max-w-5xl px-6 py-14">
                <Link
                    href={`/projects/${next.slug}`}
                    className="group flex items-center justify-between gap-6"
                >
                    <span>
                        <span className="lap-label">NEXT LANE</span>
                        <span className="mt-2 block font-display text-2xl tracking-tight text-ink transition-colors group-hover:text-pool sm:text-3xl">
                            {next.title}
                        </span>
                    </span>
                    <ArrowRight className="h-6 w-6 shrink-0 text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-pool" />
                </Link>
            </section>
        </main>
    );
}
