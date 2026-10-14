/**
 * サイト全体で使う定数。
 *
 * apex (skphooh.com) は www へ転送されるため、正規 URL は www 側に
 * そろえる。ここを変えると canonical・sitemap・robots がまとめて
 * 追従する。
 */

import { profile } from "@/data/profile";

export const SITE_URL = "https://www.skphooh.com";

export const SITE_NAME = "skphooh";

/**
 * 検索結果やタブに出す表記。氏名は環境変数から読むので、
 * 未設定のときはハンドルだけに落ちる。
 *   例: 山田 太郎（skphooh）
 */
export const SITE_AUTHOR = profile.fullName
    ? `${profile.fullName}（${SITE_NAME}）`
    : SITE_NAME;

export const SITE_TITLE = `${SITE_AUTHOR} | セキュリティ × Web開発 ポートフォリオ`;

export const SITE_DESCRIPTION =
    `${SITE_AUTHOR}のポートフォリオ。セキュリティエンジニア志望の大学院生として、` +
    "Webアプリケーションの脆弱性診断に取り組みながら、Next.js / React で個人開発したプロダクト・研究発表・経歴を紹介しています。";
