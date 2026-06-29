"use client";

import { motion } from "framer-motion";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";
import { useState } from "react";

import { Icon } from "@/components/atoms/Icon";
import type { Research } from "@/types";
import { cn } from "@/lib/utils";

/** Editorial research row with an expandable abstract (layout-animated height). */
export function ResearchItem({ entry }: { entry: Research }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.li layout className="border-b border-border py-8">
      <motion.div layout="position" className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4 font-mono text-2xs uppercase tracking-widest text-muted-foreground">
          <span>{entry.venue}</span>
          <span>{entry.year}</span>
        </div>

        <h3 className="font-mono text-lg font-medium text-foreground sm:text-xl">
          {entry.title}
        </h3>

        <p
          className={cn(
            "max-w-3xl text-pretty text-sm text-muted-foreground",
            !open && "line-clamp-3",
          )}
        >
          {entry.abstract}
        </p>

        <div className="mt-2 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            {open ? "Less" : "Abstract"}
            <Icon
              icon={ChevronDown}
              size={14}
              className={cn("transition-transform duration-200", open && "rotate-180")}
            />
          </button>

          <span className="font-mono text-xs text-graphite-500">
            {entry.citations} citations
          </span>

          <div className="ml-auto flex items-center gap-2">
            {entry.pdf && (
              <a
                href={entry.pdf}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read the PDF for ${entry.title}`}
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-red-500 hover:text-red-400"
              >
                <Icon icon={FileText} size={16} label="PDF" />
              </a>
            )}
            {entry.doi && (
              <a
                href={entry.doi}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the DOI for ${entry.title}`}
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-red-500 hover:text-red-400"
              >
                <Icon icon={ExternalLink} size={16} label="DOI" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.li>
  );
}
