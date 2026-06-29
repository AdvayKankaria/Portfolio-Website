"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { TextReveal } from "@/components/animations/TextReveal";
import { person } from "@/data/placeholder";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE } from "@/lib/animations";

// Three.js loaded only on the client, never in the initial bundle.
const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
});
const WebGLShader = dynamic(
  () => import("@/components/ui/web-gl-shader").then((m) => m.WebGLShader),
  { ssr: false },
);

function ScrollIndicator() {
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setHidden(window.scrollY > window.innerHeight * 0.2);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.a
          href="#about"
          aria-label="Scroll to about section"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            className="block"
            animate={reduced ? undefined : { y: [0, 8, 0] }}
            transition={
              reduced ? undefined : { duration: 1.6, repeat: Infinity }
            }
          >
            <Icon icon={ArrowDown} size={20} label="Scroll down" />
          </motion.span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Create smooth scroll-linked transformations mapped 0 to 1 of the section leaving the viewport
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]); // Fades out fully by 80% scroll
  const scaleDown = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const blurFilter = useTransform(scrollYProgress, [0, 0.8], ["blur(0px)", "blur(12px)"]);

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Base CSS fallback (shows if WebGL fails — no visible error) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-background bg-grid"
      />
      {/* Shader background (retuned red/graphite) */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-40">
        <WebGLShader intensity={0.7} />
      </div>
      {/* R3F floating geometry, transparent over the shader */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Scene />
      </div>
      {/* Readability scrim */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/10 to-background"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div 
          className="max-w-4xl"
          style={reduced ? {} : { y: yParallax, opacity: opacityFade, scale: scaleDown, filter: blurFilter }}
        >
          {person.available && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.base }}
            >
              <Badge dot>{person.availability}</Badge>
            </motion.div>
          )}

          <h1
            id="hero-heading"
            className="mt-6 font-mono text-5xl font-medium leading-[1.05] tracking-tighter text-foreground sm:text-7xl lg:text-8xl"
          >
            <TextReveal text={person.name} as="span" mode="chars" immediate />
          </h1>

          <motion.p
            className="mt-6 max-w-2xl text-pretty font-mono text-lg text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: DURATION.slow, ease: EASE.outExpo }}
          >
            {person.title} — {person.tagline}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: DURATION.slow, ease: EASE.outExpo }}
          >
            <Button href="#projects" variant="primary" magnetic data-cursor-label="Work">
              View Work
            </Button>
            <Button href="#contact" variant="ghost" magnetic data-cursor-label="Say hi">
              Contact
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
