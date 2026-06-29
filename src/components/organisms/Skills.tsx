"use client";

import {
  Cloud,
  Code,
  Layers,
  Server,
  Wrench,
  Shield,
  Cpu,
  Users,
  type LucideIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { SkillBadge } from "@/components/molecules/SkillBadge";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { skills } from "@/data/placeholder";
import { cn } from "@/lib/utils";

const CATEGORY_ICON: Record<string, LucideIcon> = {
  "AI / ML / Data": Code,
  Languages: Code,
  "Backend & Databases": Server,
  "Cloud & DevOps": Cloud,
  "Security & Tools": Shield,
  "Frontend & UI": Layers,
  "Architecture & Systems": Cpu,
  "Core & Soft Skills": Users,
};

// Bento spans for a non-flat layout (desktop only). 8 items -> 2x4 layout
const SPAN = [
  "lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-1",
  "lg:col-span-2", "lg:col-span-1", "lg:col-span-2", "lg:col-span-2"
];

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Skills() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [50, -80]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [20, -30]);

  return (
    <section
      ref={containerRef}
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader
        sectionId="skills"
        num="02"
        title="Skills"
        headingId="skills-heading"
        kicker="The tools I reach for, grouped by where they live."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => {
          const icon = CATEGORY_ICON[group.category] ?? Code;
          const y = i % 2 === 0 ? yParallaxFast : yParallaxSlow;

          return (
            <motion.div
              key={group.category}
              style={reduced ? {} : { y }}
              className={cn(
                "rounded-md border border-border bg-card p-6",
                SPAN[i % SPAN.length],
              )}
            >
              <p className="mb-5 font-mono text-2xs uppercase tracking-widest text-muted-foreground">
                {group.category}
              </p>
              <StaggerContainer speed="fast" className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <SkillBadge key={item.name} name={item.name} icon={icon} />
                ))}
              </StaggerContainer>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
