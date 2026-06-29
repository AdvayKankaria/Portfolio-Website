"use client";

import { useEffect, useRef, useState } from "react";

import { usePointerFine } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Variant = "default" | "interactive" | "magnetic";

/**
 * Custom cursor — pointer:fine devices only. A 16px red ring lerps toward the
 * pointer; it grows over links/buttons and expands to 48px with a label over
 * [data-magnetic] targets. Never rendered on touch devices.
 */
export function CustomCursor() {
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("");
  const [hidden, setHidden] = useState(true);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!fine) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;
    // ~80ms lerp lag at 60fps. Reduced motion → snap (factor 1).
    const factor = reduced ? 1 : 0.2;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setHidden(false);

      const el = e.target as HTMLElement | null;
      const magnetic = el?.closest("[data-magnetic]");
      const interactive = el?.closest(
        'a, button, [role="button"], input, textarea, select, label',
      );
      if (magnetic) {
        setVariant("magnetic");
        setLabel(magnetic.getAttribute("data-cursor-label") ?? "View");
      } else if (interactive) {
        setVariant("interactive");
        setLabel("");
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    const onLeave = () => setHidden(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const loop = () => {
      pos.x += (target.x - pos.x) * factor;
      pos.y += (target.y - pos.y) * factor;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    document.documentElement.classList.add("cursor-none");
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  if (!fine) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-50 grid place-items-center rounded-full border border-red-500 transition-[width,height,background-color,opacity] duration-200 ease-out",
        hidden ? "opacity-0" : "opacity-100",
        variant === "magnetic"
          ? "h-12 w-12 bg-red-500/15"
          : variant === "interactive"
            ? "h-7 w-7 bg-red-500/10"
            : "h-4 w-4 bg-transparent",
        pressed && "scale-90",
      )}
    >
      {variant === "magnetic" && label && (
        <span className="font-mono text-2xs uppercase leading-none tracking-widest text-red-300">
          {label}
        </span>
      )}
    </div>
  );
}
