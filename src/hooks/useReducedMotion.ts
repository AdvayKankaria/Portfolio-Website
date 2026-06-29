"use client";

import { useContext } from "react";

import { MotionContext } from "@/components/providers/MotionProvider";

/** True when the user prefers reduced motion (via MotionProvider). */
export function useReducedMotion(): boolean {
  return useContext(MotionContext).reducedMotion;
}
