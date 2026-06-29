"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  /** Shared layoutId so the red active indicator animates between chips. */
  layoutId: string;
}

/** Filter chip with an animated red underline marking the active category. */
export function Chip({ label, active, onClick, layoutId }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative rounded-md px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-x-2 -bottom-px h-px bg-red-500"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </button>
  );
}
