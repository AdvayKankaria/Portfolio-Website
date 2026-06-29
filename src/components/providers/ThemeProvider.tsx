"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Dark is the designed experience (set statically on <html className="dark">).
 * This provider keeps the native color-scheme in sync and is the seam where a
 * light/dark toggle could later live without touching the rest of the app.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.style.colorScheme = "dark";
  }, []);

  return <>{children}</>;
}
