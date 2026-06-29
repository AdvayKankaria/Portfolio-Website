"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query hook. Returns false on the server / first paint. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True on devices with a precise pointer (mouse) — used to gate cursor/magnetic FX. */
export function usePointerFine(): boolean {
  return useMediaQuery("(pointer: fine)");
}
