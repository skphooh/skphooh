import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import EntryCard from "@/components/EntryCard";
import Projects from "@/components/Projects";
import Records from "@/components/Records";
import About from "@/components/About";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import LaneRope from "@/components/pool/LaneRope";
import BackstrokeFlags from "@/components/pool/BackstrokeFlags";
import { hasProfilePhoto } from "@/lib/profilePhoto";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <Navbar />
      <ScrollProgress />

      {/* START */}
      <Hero />

      {/* エントリー */}
      <EntryCard photoAvailable={hasProfilePhoto()} />

      {/* LAP 01 — プロダクト */}
      <Projects />

      {/* LAP 02 — 受賞歴・活動歴 */}
      <Records />

      {/* LAP 03 — About */}
      <About />

      {/* ラスト5m: 旗とロープで壁が近いことを知らせる */}
      <div className="relative z-10 bg-surface text-pool">
        <BackstrokeFlags />
        <LaneRope finish />
      </div>

      {/* FINISH */}
      <Contact />

      <BackToTop />
    </main>
  );
}
