"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { Icon } from "@/components/atoms/Icon";
import { GithubIcon } from "@/components/atoms/BrandIcon";
import { Tag } from "@/components/atoms/Tag";
import { Card } from "@/components/ui/card";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
      className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors duration-200 hover:border-red-500 hover:text-red-400"
    >
      {children}
    </a>
  );
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const media = (
    <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-secondary">
      <Image
        src={project.image}
        alt={`${project.title} preview`}
        fill
        sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      {/* CTA overlay slides up on hover */}
      {(project.github || project.live) && (
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-2 bg-background/80 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
          {project.github && (
            <IconLink href={project.github} label="View source on GitHub">
              <GithubIcon size={16} />
            </IconLink>
          )}
          {project.live && (
            <IconLink href={project.live} label="Open live site">
              <Icon icon={ArrowUpRight} size={16} label="Open live site" />
            </IconLink>
          )}
        </div>
      )}
    </div>
  );

  const body = (
    <div className="flex flex-1 flex-col p-6">
      <div className="flex items-center justify-between font-mono text-2xs uppercase tracking-widest text-muted-foreground">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
      <h3
        className={cn(
          "mt-3 font-mono font-medium text-foreground transition-colors duration-200 group-hover:text-red-400",
          featured ? "text-2xl sm:text-3xl" : "text-xl",
        )}
      >
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-pretty text-sm text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech} label={tech} />
        ))}
      </div>
    </div>
  );

  return (
    <Card
      interactive
      className={cn(
        "group flex h-full flex-col",
        featured && "md:grid md:grid-cols-2 md:items-stretch",
      )}
    >
      {media}
      {body}
    </Card>
  );
}
