"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { StatCounter } from "@/components/molecules/StatCounter";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { person, stats } from "@/data/placeholder";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE, viewportOnce } from "@/lib/animations";

export function About() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader
        sectionId="about"
        num="01"
        title="About"
        headingId="about-heading"
        kicker="Engineer, by temperament and trade."
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-5">
        {/* Image — 2 of 5 cols on desktop, first on mobile */}
        <motion.div
          className="lg:col-span-2"
          initial={reduced ? undefined : { clipPath: "inset(100% 0 0 0)" }}
          whileInView={reduced ? undefined : { clipPath: "inset(0% 0 0 0)" }}
          viewport={viewportOnce}
          transition={{ duration: DURATION.slow, ease: EASE.outExpo }}
        >
          <Avatar
            src={person.avatar}
            alt={`Portrait of ${person.name}`}
            initials={person.initials}
            className="aspect-square w-full"
          />
        </motion.div>

        {/* Text — 3 of 5 cols */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {person.longBio.map((para, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <p className="text-pretty text-base text-muted-foreground sm:text-lg">
                  {para}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={person.resumeUrl} variant="ghost-steel" magnetic>
              <Icon icon={Download} size={16} />
              Download CV
            </Button>
            <span className="font-mono text-sm text-muted-foreground">
              {person.location}
            </span>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
