"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

import { DURATION, EASE } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Wraps page content in an opacity + y page-enter transition. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: DURATION.page, ease: EASE.outExpo }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
