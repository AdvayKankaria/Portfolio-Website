import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface IconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
  strokeWidth?: number;
  /** Provide for meaningful icons; omit (decorative) → aria-hidden. */
  label?: string;
}

/** Thin lucide wrapper that enforces an accessible label or hides decoratively. */
export function Icon({
  icon: LucideComponent,
  className,
  size = 18,
  strokeWidth = 1.75,
  label,
}: IconProps) {
  return (
    <LucideComponent
      className={cn("shrink-0", className)}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
