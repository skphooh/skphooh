import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import EntryCard from "@/components/EntryCard";
import Projects from "@/components/Projects";
import Records from "@/components/Records";
import About from "@/components/About";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <Navbar />
      <ScrollProgress />

      {/* START */}
      <Hero />

      {/* エントリー */}
      <EntryCard />

      {/* LAP 01 — プロダクト */}
      <Projects />

      {/* LAP 02 — 受賞歴・活動歴 */}
      <Records />

      {/* LAP 03 — About */}
      <About />

      {/* FINISH */}
      <Contact />

      <BackToTop />
    </main>
  );
}
