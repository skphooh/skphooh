import type { Metadata } from "next";
import { Inter, Anton, Share_Tech_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import DiveProvider from "@/components/pool/DiveProvider";
import { profile } from "@/data/profile";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

/** 本文欧文 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/** 見出し。コンデンス大文字で競技らしい密度を出す */
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

/** タイム・レーン番号・距離表示 */
const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

/** 日本語。Inter は和文グリフを持たないため明示的に指定する */
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  // 相対パスの基準。canonical と OG 画像の URL がこれを起点に絶対化される
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // 下層ページは title にページ名だけ入れればよい
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

/**
 * 検索エンジンに「skphooh = この人物」と結びつけてもらうための構造化データ。
 * 氏名が未設定ならハンドルを name に使う。
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName || SITE_NAME,
  alternateName: [profile.fullNameEn, SITE_NAME].filter(
    (n) => n && n !== (profile.fullName || SITE_NAME),
  ),
  url: SITE_URL,
  image: new URL(profile.photo, SITE_URL).toString(),
  jobTitle: "セキュリティエンジニア志望 / Webエンジニア",
  knowsAbout: ["Webセキュリティ", "脆弱性診断", "Next.js", "React"],
  sameAs: ["https://github.com/skphooh"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7449511351198603"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${anton.variable} ${shareTechMono.variable} ${notoSansJP.variable} min-h-screen bg-canvas text-ink antialiased selection:bg-pool-light/30`}
      >
        <DiveProvider>{children}</DiveProvider>
      </body>
    </html>
  );
}
