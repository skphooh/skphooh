import type { Metadata } from "next";
import { Inter, Anton, Share_Tech_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

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
  title: "skphooh | Portfolio",
  description:
    "skphoohのポートフォリオサイト。50mプールに見立てたページ構造で、開発したプロダクトと経歴を紹介しています。",
  openGraph: {
    title: "skphooh | Portfolio",
    description:
      "50mプールに見立てたポートフォリオ。プロダクト・研究発表・経歴をまとめています。",
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
        className={`${inter.variable} ${anton.variable} ${shareTechMono.variable} ${notoSansJP.variable} min-h-screen bg-canvas text-ink antialiased selection:bg-pool-light/30`}
      >
        {children}
      </body>
    </html>
  );
}
