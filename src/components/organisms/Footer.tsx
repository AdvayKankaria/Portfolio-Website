import { Globe } from "lucide-react";
import type { ComponentType } from "react";

import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/atoms/BrandIcon";
import { NAV_ITEMS } from "@/lib/constants";
import { person, socialEntries } from "@/data/placeholder";
import type { SocialPlatform } from "@/types";

const ICONS: Record<
  SocialPlatform,
  ComponentType<{ size?: number; className?: string }>
> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: XIcon,
  website: Globe,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between">
        {/* Name */}
        <a
          href="#hero"
          className="font-mono text-sm font-medium tracking-tight text-foreground"
        >
          {person.name}
          <span className="text-red-500">.</span>
        </a>

        {/* Nav */}
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {socialEntries.map((entry) => {
            const Glyph = ICONS[entry.platform];
            return (
              <a
                key={entry.platform}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={entry.label}
                className="text-muted-foreground transition-colors hover:text-red-400"
              >
                <Glyph size={18} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center font-mono text-2xs uppercase tracking-widest text-graphite-600 sm:px-6">
          © {year} {person.name} · Built with Next.js, R3F &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
