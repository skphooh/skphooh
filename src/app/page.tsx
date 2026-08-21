import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import EntryCard from "@/components/EntryCard";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import LaneRope from "@/components/pool/LaneRope";

export default function Home() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col overflow-hidden bg-transparent text-pool-line">
      {/* ナビゲーション */}
      <Navbar />
      <ScrollProgress />

      {/* START: 飛び込み */}
      <Hero />
      <LaneRope />

      {/* エントリーカード */}
      <EntryCard />
      <LaneRope reverse />

      {/* 各セクション: スクロールで表示 */}
      <Projects />
      <About />
      <Contact />

      {/* フローティングUI */}
      <BackToTop />
    </main>
  );
}
