"use client";

import { motion } from "framer-motion";
import { Download, MapPin } from "lucide-react";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { StatCounter } from "@/components/molecules/StatCounter";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { ScrollTextReveal } from "@/components/animations/ScrollTextReveal";
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

      <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-5">
        {/* Image — 2 of 5 cols on desktop, first on mobile */}
        <motion.div
          className="lg:col-span-2"
          initial={reduced ? undefined : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={viewportOnce}
          transition={{ duration: DURATION.slow, ease: EASE.outExpo }}
        >
          <div className="flex h-full flex-col items-center justify-center gap-8 rounded-3xl border border-border bg-card/10 p-8">
            <Avatar
              src={person.avatar}
              alt={`Portrait of ${person.name}`}
              initials={person.initials}
              className="aspect-square w-48 sm:w-56 lg:w-64 shadow-2xl ring-1 ring-border"
            />

            <div className="w-full text-center">
              <h3 className="font-mono text-xl font-semibold tracking-tight text-foreground">
                {person.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {person.title}
              </p>
              
              <div className="mt-6 flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
                <Icon icon={MapPin} size={14} />
                <span>{person.location}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text — 3 of 5 cols */}
        <div className="flex flex-col justify-between lg:col-span-3">
          <div className="space-y-6">
            {person.longBio.map((para, i) => (
              <ScrollTextReveal 
                key={i} 
                text={para} 
                className="text-justify text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg" 
              />
            ))}
          </div>

          <div>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Button href={person.resumeUrl} variant="primary" magnetic>
                <Icon icon={Download} size={16} />
                Download CV
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid w-full grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
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
      </div>
    </section>
  );
}
