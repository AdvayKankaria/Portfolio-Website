"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePointerFine } from "@/hooks/useMediaQuery";

/**
 * Magnetic hover: the element eases toward the pointer while hovered, then
 * springs back. Disabled for touch devices and reduced-motion users.
 * Apply the returned ref + style (x/y) to a motion element.
 */
export function useMagneticHover<T extends HTMLElement = HTMLButtonElement>(
  strength = 0.35,
) {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const reduced = useReducedMotion();
  const pointerFine = usePointerFine();
  const enabled = pointerFine && !reduced;

  const onMouseMove = (e: React.MouseEvent<T>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    style: { x: springX, y: springY },
    handlers: { onMouseMove, onMouseLeave },
    enabled,
  };
}
