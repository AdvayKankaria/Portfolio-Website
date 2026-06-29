"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

import {
  charReveal,
  textRevealContainer,
  viewportOnce,
  wordReveal,
  wordRevealContainer,
} from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Mode = "chars" | "words";

interface TextRevealProps {
  text: string;
  mode?: Mode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Reveal as soon as mounted instead of waiting for scroll (used in Hero). */
  immediate?: boolean;
  delayChildren?: number;
}

/** Splits text into words or characters and staggers them in (blur + rise). */
export function TextReveal({
  text,
  mode = "words",
  className,
  as = "span",
  immediate = false,
  delayChildren,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  // Reduced motion: render plain text, no per-token animation.
  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  const container = mode === "chars" ? textRevealContainer : wordRevealContainer;
  const child = mode === "chars" ? charReveal : wordReveal;
  const words = text.split(" ");

  const animationProps = immediate
    ? { initial: "hidden" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: viewportOnce,
      };

  return (
    <MotionTag
      className={cn("inline-block", className)}
      variants={container}
      transition={delayChildren ? { delayChildren } : undefined}
      aria-label={text}
      {...animationProps}
    >
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {mode === "chars" ? (
            word.split("").map((ch, ci) => (
              <motion.span
                key={`${ch}-${ci}`}
                variants={child}
                className="inline-block"
                aria-hidden
              >
                {ch}
              </motion.span>
            ))
          ) : (
            <motion.span variants={child} className="inline-block" aria-hidden>
              {word}
            </motion.span>
          )}
          {wi < words.length - 1 && (
            <Fragment>
              <span className="inline-block">&nbsp;</span>
            </Fragment>
          )}
        </span>
      ))}
    </MotionTag>
  );
}
