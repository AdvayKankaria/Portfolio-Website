"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { person } from "@/data/placeholder";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/animations";

const SESSION_KEY = "portfolio:loaded";

/**
 * First-visit loading screen: letter-by-letter name reveal with a blinking red
 * cursor (the first red the user sees), then a curtain wipe upward. Gated by
 * sessionStorage so it never repeats on back-navigation. Max ~2s.
 */
export function LoadingScreen() {
  const reduced = useReducedMotion();
  // Visible at first paint for everyone (avoids content flash + hydration drift),
  // then hidden immediately for returning visitors via the effect below.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // One-time mount decision: sessionStorage is unavailable during SSR, so the
    // gate is resolved here rather than in a lazy initializer.
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      return;
    }
    const duration = reduced ? 500 : 1800;
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, duration);
    return () => clearTimeout(timer);
  }, [reduced]);

  const letters = person.name.split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE.inOutExpo }}
        >
          <div className="flex items-center gap-1">
            <h1 className="sr-only">{person.name}</h1>
            <span aria-hidden className="flex font-mono text-2xl font-medium tracking-tight text-foreground sm:text-4xl">
              {reduced ? (
                <span>{person.name}</span>
              ) : (
                letters.map((ch, i) => (
                  <motion.span
                    key={`${ch}-${i}`}
                    initial={{ opacity: 0, y: "0.4em" }}
                    animate={{ opacity: 1, y: "0em" }}
                    transition={{
                      delay: 0.1 + i * 0.045,
                      duration: 0.4,
                      ease: EASE.outExpo,
                    }}
                    className="inline-block whitespace-pre"
                  >
                    {ch}
                  </motion.span>
                ))
              )}
            </span>
            <motion.span
              aria-hidden
              className="ml-1 inline-block h-7 w-2 bg-red-500 sm:h-9"
              animate={reduced ? undefined : { opacity: [1, 1, 0, 0] }}
              transition={
                reduced
                  ? undefined
                  : { duration: 0.9, repeat: Infinity, ease: "linear" }
              }
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
