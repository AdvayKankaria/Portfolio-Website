"use client";

import { useContext } from "react";

import { ActiveSectionContext } from "@/components/providers/ActiveSectionProvider";

/** Id of the section currently in the viewport band (via ActiveSectionProvider). */
export function useActiveSection(): string {
  return useContext(ActiveSectionContext);
}
