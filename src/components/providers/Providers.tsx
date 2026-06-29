"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ActiveSectionProvider } from "@/components/providers/ActiveSectionProvider";

/** Single client boundary that composes all app-wide providers. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <ActiveSectionProvider>{children}</ActiveSectionProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}
