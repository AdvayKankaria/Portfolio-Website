"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { Chip } from "@/components/atoms/Chip";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { projects } from "@/data/placeholder";

export function Projects() {
  const featured = useMemo(() => projects.find((p) => p.featured), []);
  const rest = useMemo(() => projects.filter((p) => !p.featured), []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(rest.map((p) => p.category)))],
    [rest],
  );

  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? rest : rest.filter((p) => p.category === active);

  return (
    <section
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

      {/* Featured */}
      {featured && (
        <ScrollReveal className="mb-12">
          <ProjectCard project={featured} featured />
        </ScrollReveal>
      )}

      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap gap-2 border-y border-border py-4">
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
      <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
