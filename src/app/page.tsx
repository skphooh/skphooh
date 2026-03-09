import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0a0a0a] text-white overflow-hidden">
      {/* 
        Hero includes Framer Motion entry animations.
        Other sections use WhileInView for scroll reveal effects.
      */}
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
