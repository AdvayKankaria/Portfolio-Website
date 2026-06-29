"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ParallaxItemProps {
  children: React.ReactNode;
  className?: string;
  /** Y-axis movement: [startPosition, endPosition] in pixels */
  yRange?: [number, number];
  /** Offsets for when the animation should start and end relative to the viewport */
  offset?: any;
}

export function ParallaxItem({
  children,
  className,
  yRange = [30, -30],
  offset = ["start end", "end start"],
}: ParallaxItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div
      ref={ref}
      className={cn("w-full", className)}
      style={reduced ? {} : { y }}
    >
      {children}
    </motion.div>
  );
}
