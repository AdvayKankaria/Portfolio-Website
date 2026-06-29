"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { Chip } from "@/components/atoms/Chip";
import { projects } from "@/data/placeholder";
export function Projects() {

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [],
  );

  const [active, setActive] = useState(categories[0] || "");
  const filtered = projects.filter((p) => p.category === active);

  const containerRef = useRef<HTMLElement>(null);
  
  return (
    <section
      ref={containerRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader
        sectionId="projects"
        num="04"
        title="Selected Work"
        headingId="projects-heading"
        kicker="A few things I've designed, built, and shipped."
      />

      {/* Filter bar */}
      <div className="mb-12 flex flex-wrap gap-2 border-y border-border py-4">
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            active={active === cat}
            onClick={() => setActive(cat)}
            layoutId="project-filter"
          />
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ProjectCard project={project} featured={project.featured} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
