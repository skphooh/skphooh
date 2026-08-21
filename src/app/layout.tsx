import type { Metadata } from "next";
import { Inter, Anton, Share_Tech_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import BackgroundEffect from "@/components/BackgroundEffect";

/** 本文欧文 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/** 見出し。コンデンス大文字でゼッケン・掲示板の質感を出す */
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

/** タイム・レーン番号・距離表示。電光掲示板の等幅 */
const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

/** 日本語。Inter は和文グリフを持たないため明示的に指定する */
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "skphooh | Portfolio",
  description:
    "skphoohのポートフォリオサイト。創造性と最新技術を掛け合わせ、美しく、使いやすいWebアプリケーションを構築しています。",
  openGraph: {
    title: "skphooh | Portfolio",
    description:
      "創造性と最新技術を掛け合わせ、美しく使いやすいWebアプリケーションを構築するskphoohのポートフォリオ。",
    type: "website",
  },
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
      </head>
      <body
        className={`${inter.variable} ${anton.variable} ${shareTechMono.variable} ${notoSansJP.variable} antialiased bg-pool-tile text-pool-line min-h-screen selection:bg-pool-shallow selection:text-pool-line`}
      >
        <BackgroundEffect />
        {children}
      </body>
    </html>
  );
}
