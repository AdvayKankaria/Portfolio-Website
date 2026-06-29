import { Hero } from "@/components/organisms/Hero";
import { About } from "@/components/organisms/About";
import { Skills } from "@/components/organisms/Skills";
import { Experience } from "@/components/organisms/Experience";
import { Projects } from "@/components/organisms/Projects";
import { Research } from "@/components/organisms/Research";
import { Achievements } from "@/components/organisms/Achievements";
import { GitHub } from "@/components/organisms/GitHub";
import { Contact } from "@/components/organisms/Contact";
import { Footer } from "@/components/organisms/Footer";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <main id="main-content" className="flex-1">
        <Hero />
        <Separator />
        <About />
        <Separator />
        <Skills />
        <Separator />
        <Experience />
        <Separator />
        <Projects />
        <Separator />
        <Research />
        <Separator />
        <Achievements />
        <Separator />
        <GitHub />
        <Separator />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
