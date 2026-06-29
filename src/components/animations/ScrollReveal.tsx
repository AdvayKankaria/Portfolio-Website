"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { fadeInUp, reducedReveal, viewportOnce } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** 0–1 of the element visible before revealing. Defaults to 0.2 (20%). */
  amount?: number;
  delay?: number;
  variants?: Variants;
  as?: "div" | "section" | "article" | "li" | "span";
}

/** Reveals its child with fadeInUp once ~20% enters the viewport. */
export function ScrollReveal({
  children,
  className,
  amount = 0.2,
  delay = 0,
  variants,
  as = "div",
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  const used = reduced ? reducedReveal : (variants ?? fadeInUp);

  return (
    <MotionTag
      className={cn(className)}
      variants={used}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOnce, amount }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
