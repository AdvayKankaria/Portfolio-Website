"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { staggerContainer, staggerFast, viewportOnce } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  speed?: "base" | "fast";
  amount?: number;
  as?: "div" | "ul" | "ol";
}

/**
 * Wraps a list and staggers its direct children (each should be a
 * `motion` element using the matching item variants, e.g. fadeInUp).
 */
export function StaggerContainer({
  children,
  className,
  speed = "base",
  amount = 0.2,
  as = "div",
}: StaggerContainerProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  const variants = speed === "fast" ? staggerFast : staggerContainer;

  return (
    <MotionTag
      className={cn(className)}
      variants={reduced ? undefined : variants}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ ...viewportOnce, amount }}
    >
      {children}
    </MotionTag>
  );
}
