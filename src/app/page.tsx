import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0a0a0a] text-white overflow-hidden">
      {/* ナビゲーションとスクロール進捗バー */}
      <Navbar />
      <ScrollProgress />

      {/* Heroセクション: Framer Motionによるエントリーアニメーション */}
      <Hero />

      {/* 各セクション: whileInViewによるスクロール表示アニメーション */}
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
