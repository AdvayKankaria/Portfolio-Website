"use client";

import { motion } from "framer-motion";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";
import { useState } from "react";

import { Icon } from "@/components/atoms/Icon";
import type { Research } from "@/types";
import { cn } from "@/lib/utils";

export function ResearchItem({ entry }: { entry: Research }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.li 
      layout 
      className="group mb-4 rounded-3xl border border-white/5 bg-card/5 backdrop-blur-sm transition-all duration-500 hover:bg-card/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]"
    >
      <div 
        className="flex cursor-pointer flex-col p-6 sm:p-8"
        onClick={() => setOpen((v) => !v)}
      >
        <motion.div layout="position" className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            <span>{entry.venue}</span>
            <span className="flex items-center gap-2">
              {entry.year}
              <Icon
                icon={ChevronDown}
                size={16}
                className={cn("ml-2 transition-transform duration-300", open && "rotate-180")}
              />
            </span>
          </div>

          <h3 className="font-mono text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-red-400 sm:text-2xl">
            {entry.title}
          </h3>

          <p
            className={cn(
              "mt-2 whitespace-pre-line text-pretty text-sm leading-relaxed text-muted-foreground transition-all duration-500",
              !open && "line-clamp-2"
            )}
          >
            {entry.abstract}
          </p>

          <div 
            className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/5 pt-6"
            onClick={(e) => e.stopPropagation()} // Prevent row click when clicking links
          >
            <span className="font-mono text-sm font-medium text-foreground">
              {entry.citations} <span className="text-muted-foreground font-normal">citations</span>
            </span>

            <div className="ml-auto flex items-center gap-3">
              {entry.pdf && (
                <a
                  href={entry.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read the PDF for ${entry.title}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-foreground/5 text-foreground transition-all duration-300 hover:scale-110 hover:bg-foreground/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-foreground/5 text-foreground transition-all duration-300 hover:scale-110 hover:bg-foreground/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  <Icon icon={ExternalLink} size={16} label="DOI" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.li>
  );
}
