"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function ScrollTextReveal({
  text,
  className,
  as: Tag = "p",
}: ScrollTextRevealProps) {
  const container = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 90%", "end 60%"], // Animation starts when top is 90% down viewport, ends at 60%
  });

  const words = text.split(" ");

  if (reduced) {
    const Component = Tag as any;
    return <Component className={className}>{text}</Component>;
  }

  const Component = Tag as any;

  return (
    <Component ref={container} className={cn("relative", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <span key={i}>
            <Word progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </Component>
  );
}

interface WordProps {
  children: React.ReactNode;
  progress: any;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  // Use framer-motion to map the overall scroll progress to this word's opacity
  const opacity = useTransform(progress, range, [0.1, 1]);

  return (
    <span className="relative inline-block">
      {/* Background low-opacity text for the classic "scrubbing" effect look */}
      <span className="absolute opacity-10">{children}</span>
      {/* The actual revealed text */}
      <motion.span style={{ opacity }} className="text-white drop-shadow-sm">{children}</motion.span>
    </span>
  );
}
