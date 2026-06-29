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
    <div ref={ref} className="mt-6 flex items-baseline gap-2">
      <span className="bg-gradient-to-br from-foreground to-foreground/40 bg-clip-text font-mono text-4xl font-semibold tabular-nums text-transparent">
        {count}
        <span className="text-muted-foreground">{suffix}</span>
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
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
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {achievements.map((item, i) => {
          const Glyph = ICONS[i % ICONS.length];
          return (
            <motion.article
              key={`${item.title}-${i}`}
              variants={fadeInUp}
              className="group flex flex-col rounded-3xl border border-white/10 bg-card/20 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-card/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-foreground/5 text-muted-foreground transition-all duration-500 group-hover:scale-110 group-hover:bg-foreground/10 group-hover:text-foreground group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  <Icon icon={Glyph} size={20} />
                </span>
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  {item.year}
                </span>
              </div>
              <h3 className="mt-8 font-mono text-lg font-medium tracking-tight text-foreground sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 font-mono text-sm tracking-wide text-red-400">
                {item.org}
              </p>
              <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
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
