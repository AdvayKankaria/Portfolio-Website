"use client";

import { createContext, useEffect, type ReactNode } from "react";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

interface MotionContextValue {
  reducedMotion: boolean;
}

export const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
});

/**
 * Reads prefers-reduced-motion and exposes it to every animation component.
 * Also mirrors it onto <html data-reduce-motion> so the CSS fallback engages.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = Boolean(useFramerReducedMotion());

  // Mirror the preference onto <html> so the CSS fallback engages.
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-reduce-motion",
      reducedMotion ? "true" : "false",
    );
  }, [reducedMotion]);

  return (
    <MotionContext.Provider value={{ reducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}
