import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundEffect from "@/components/BackgroundEffect";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="ja" className="dark">
      <body
        className={`${inter.variable} antialiased bg-[#0a0a0a] text-white min-h-screen selection:bg-purple-500/30`}
      >
        <BackgroundEffect />
        {children}
      </body>
    </html>
  );
}
