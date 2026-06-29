"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { Icon } from "@/components/atoms/Icon";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Appears after scrolling past the first viewport; returns to top on click. */
export function ScrollToTop() {
  const progress = useScrollProgress();
  const reduced = useReducedMotion();
  // Show once meaningfully scrolled (~half a viewport in).
  const visible = progress > 0.08;

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-md border border-border bg-card/80 text-muted-foreground backdrop-blur transition-colors duration-200 hover:border-red-500 hover:text-red-400"
        >
          <Icon icon={ArrowUp} size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
