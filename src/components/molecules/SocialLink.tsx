"use client";

import { Globe } from "lucide-react";
import type { ComponentType } from "react";

import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/atoms/BrandIcon";
import type { SocialEntry, SocialPlatform } from "@/types";

const ICONS: Record<SocialPlatform, ComponentType<{ size?: number; className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: XIcon,
  website: Globe,
};

/** Social row: icon + label + handle, with a hover translate-x nudge. */
export function SocialLink({ entry }: { entry: SocialEntry }) {
  const Glyph = ICONS[entry.platform];
  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 border-b border-border py-3 text-muted-foreground transition-colors duration-200 hover:text-foreground"
    >
      <Glyph
        size={18}
        className="shrink-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-red-400"
      />
      <span className="font-mono text-sm transition-transform duration-200 group-hover:translate-x-1">
        {entry.label}
      </span>
      <span className="ml-auto font-mono text-sm text-graphite-500">
        {entry.handle}
      </span>
    </a>
  );
}
