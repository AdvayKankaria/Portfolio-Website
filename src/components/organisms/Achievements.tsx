"use client";

import { motion } from "framer-motion";
import { Award, Mic, Star, Trophy, type LucideIcon } from "lucide-react";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Icon } from "@/components/atoms/Icon";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { achievements } from "@/data/placeholder";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { fadeInUp } from "@/lib/animations";
import type { Achievement } from "@/types";

const ICONS: LucideIcon[] = [Trophy, Star, Mic, Award];

function Metric({ value, suffix, label }: NonNullable<Achievement["metric"]>) {
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.6 });
  const count = useCountUp(value, { start: inView });
  return (
    <div ref={ref} className="mt-4 flex items-baseline gap-2">
      <span className="font-mono text-3xl font-medium tabular-nums text-foreground">
        {count}
        <span className="text-muted-foreground">{suffix}</span>
      </span>
      <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function Achievements() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader
        sectionId="achievements"
        num="06"
        title="Recognition"
        headingId="achievements-heading"
        kicker="Awards, talks, and the occasional trophy."
      />

      <StaggerContainer
        speed="base"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {achievements.map((item, i) => {
          const Glyph = ICONS[i % ICONS.length];
          return (
            <motion.article
              key={`${item.title}-${i}`}
              variants={fadeInUp}
              className="flex flex-col rounded-md border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground">
                  <Icon icon={Glyph} size={18} />
                </span>
                <span className="font-mono text-sm text-muted-foreground">
                  {item.year}
                </span>
              </div>
              <h3 className="mt-5 font-mono text-base font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 font-mono text-sm text-muted-foreground">
                {item.org}
              </p>
              <p className="mt-3 flex-1 text-pretty text-sm text-muted-foreground">
                {item.description}
              </p>
              {item.metric && <Metric {...item.metric} />}
            </motion.article>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
