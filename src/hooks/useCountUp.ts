"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Options {
  duration?: number;
  /** Start the animation (e.g. when the element scrolls into view). */
  start: boolean;
}

/** Animates 0 → target with an ease-out curve when `start` flips true. */
export function useCountUp(target: number, { duration = 1600, start }: Options) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(target);
      return;
    }

    let frame = 0;
    let startTime = 0;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start, reduced]);

  return value;
}
