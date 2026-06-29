"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { Icon } from "@/components/atoms/Icon";
import { fadeInUp } from "@/lib/animations";

interface SkillBadgeProps {
  name: string;
  icon: LucideIcon;
}

/**
 * Skill badge — graphite border + muted text only (MASTER forbids colored
 * badges, so hover brightens toward graphite/foreground, never red).
 */
export function SkillBadge({ name, icon }: SkillBadgeProps) {
  return (
    <motion.span
      variants={fadeInUp}
      whileHover={{ scale: 1.05 }}
      className="group inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3.5 py-2 font-mono text-sm text-muted-foreground transition-colors duration-200 hover:border-graphite-400 hover:text-foreground"
    >
      <Icon
        icon={icon}
        size={14}
        className="text-graphite-500 transition-colors duration-200 group-hover:text-foreground"
      />
      {name}
    </motion.span>
  );
}
