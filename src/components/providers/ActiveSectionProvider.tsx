"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";

import { SECTIONS } from "@/lib/constants";

export const ActiveSectionContext = createContext<string>("hero");

/**
 * Tracks which section currently occupies the viewport band near the top and
 * shares its id, so the navbar underline and the red section-number stay in sync.
 */
export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <ActiveSectionContext.Provider value={active}>
      {children}
    </ActiveSectionContext.Provider>
  );
}
