"use client";

import { motion } from "framer-motion";

import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  item: NavItem;
  active: boolean;
  onClick?: () => void;
}

/** Desktop nav link with an animated red active underline (layoutId). */
export function NavLink({ item, active, onClick }: NavLinkProps) {
  return (
    <a
      href={`#${item.id}`}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "relative px-1 py-1 font-mono text-sm transition-colors duration-200",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <span className="mr-1.5 text-2xs text-muted-foreground">{item.num}</span>
      {item.label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute inset-x-0 -bottom-1 h-px bg-red-500"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </a>
  );
}
