import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

/**
 * /sitemap.xml を生成する。
 *
 * トップと各プロダクトページを並べる。プロダクトを増やしても
 * projects.ts に追記するだけで反映される。
 */
export default function sitemap(): MetadataRoute.Sitemap {
    // ビルド時刻。デプロイのたびに更新される
    const lastModified = new Date();

    return [
        {
            url: SITE_URL,
            lastModified,
            changeFrequency: "monthly",
            priority: 1,
        },
        ...projects.map((project) => ({
            url: `${SITE_URL}/projects/${project.slug}`,
            lastModified,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
    ];
}
