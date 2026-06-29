"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { TimelineEntry } from "@/components/molecules/TimelineEntry";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParallaxItem } from "@/components/animations/ParallaxItem";
import { experience } from "@/data/placeholder";
import { cn } from "@/lib/utils";

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.35", "end 0.65"],
  });
  // The red connector draws downward as the section scrolls (feedback signal).
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader
        sectionId="experience"
        num="03"
        title="Experience"
        headingId="experience-heading"
        kicker="Where I've shipped, and what I shipped there."
      />

      <div ref={trackRef} className="relative">
        {/* Track: left on mobile, centered on desktop */}
        <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2">
          <motion.div
            style={{ scaleY }}
            className="h-full w-full origin-top bg-red-500"
          />
        </div>

        <ul className="space-y-10 md:space-y-16">
          {experience.map((entry, i) => {
            const leftSide = i % 2 === 0;
            return (
              <li
                key={`${entry.company}-${i}`}
                className="relative md:grid md:grid-cols-2 md:gap-12"
              >
                {/* Node dot on the line */}
                <span
                  aria-hidden
                  className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-graphite-500 md:left-1/2"
                />
                <div
                  className={cn(
                    "pl-12 md:pl-0",
                    leftSide ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12",
                  )}
                >
                  <ParallaxItem yRange={[20, -20]}>
                    <ScrollReveal>
                      <TimelineEntry entry={entry} align={leftSide ? "left" : "right"} />
                    </ScrollReveal>
                  </ParallaxItem>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
