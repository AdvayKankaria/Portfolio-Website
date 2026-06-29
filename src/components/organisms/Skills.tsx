"use client";

import {
  Cloud,
  Code,
  Layers,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { SkillBadge } from "@/components/molecules/SkillBadge";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { skills } from "@/data/placeholder";
import { cn } from "@/lib/utils";

const CATEGORY_ICON: Record<string, LucideIcon> = {
  Languages: Code,
  Frontend: Layers,
  Backend: Server,
  "Cloud & DevOps": Cloud,
  Tooling: Wrench,
};

// Bento spans for a non-flat layout (desktop only).
const SPAN = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2", "lg:col-span-2"];

export function Skills() {
  return (
    <section
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const icon = CATEGORY_ICON[group.category] ?? Code;
          return (
            <div
              key={group.category}
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
