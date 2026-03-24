import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent text-black overflow-hidden z-10 relative">
      {/* ナビゲーション */}
      <Navbar />
      <ScrollProgress />

      {/* Heroセクション: Framer Motionエントリーアニメーション */}
      <Hero />

      {/* 各セクション: スクロールで表示 */}
      <Projects />
      <About />
      <Contact />

      {/* フローティングUI */}
      <BackToTop />
    </main>
  );
}
