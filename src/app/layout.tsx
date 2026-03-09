import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Digital Experiences",
  description: "Crafting modern, accessible, and fast web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={`${inter.variable} antialiased bg-[#0a0a0a] text-white min-h-screen selection:bg-purple-500/30`}>
        {children}
      </body>
    </html>
  );
}
