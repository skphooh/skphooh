import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * /robots.txt を生成する。
 *
 * 全ページを巡回可としたうえで、sitemap の位置を知らせる。
 * ビルド時に静的な robots.txt として書き出される。
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
