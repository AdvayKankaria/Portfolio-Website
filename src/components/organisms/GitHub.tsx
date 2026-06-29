"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ContributionGrid } from "@/components/molecules/ContributionGrid";
import { RepoCard } from "@/components/molecules/RepoCard";
import { StatCounter } from "@/components/molecules/StatCounter";
import { Button } from "@/components/atoms/Button";
import { GithubIcon } from "@/components/atoms/BrandIcon";
import { github } from "@/data/placeholder";
import { viewportOnce } from "@/lib/animations";

const LANG_FILL = [
  "var(--graphite-300)",
  "var(--graphite-400)",
  "var(--graphite-500)",
  "var(--graphite-600)",
  "var(--graphite-700)",
];

function LanguageBar() {
  return (
    <div>
      <p className="mb-3 font-mono text-2xs uppercase tracking-widest text-muted-foreground">
        Language breakdown
      </p>
      <div className="flex h-3 w-full overflow-hidden rounded-sm border border-border">
        {github.languages.map((lang, i) => (
          <motion.div
            key={lang.name}
            className="h-full"
            style={{ backgroundColor: LANG_FILL[i % LANG_FILL.length] }}
            initial={{ width: 0 }}
            whileInView={{ width: `${lang.percent}%` }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
        {github.languages.map((lang, i) => (
          <span
            key={lang.name}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground"
          >
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: LANG_FILL[i % LANG_FILL.length] }}
              aria-hidden
            />
            {lang.name} {lang.percent}%
          </span>
        ))}
      </div>
    </div>
  );
}

export function GitHub() {
  const { stats } = github;
  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader
        sectionId="github"
        num="07"
        title="On GitHub"
        headingId="github-heading"
        kicker="Open source, in public."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-8 border-b border-border pb-10 sm:grid-cols-4">
        <StatCounter value={stats.stars} suffix="" label="Stars earned" />
        <StatCounter value={stats.repos} suffix="" label="Repositories" />
        <StatCounter value={stats.followers} suffix="" label="Followers" />
        <StatCounter value={stats.contributions} suffix="" label="Contributions" />
      </div>

      {/* Contribution grid + languages */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContributionGrid username={github.username} total={stats.contributions} />
        </div>
        <div className="flex flex-col justify-center">
          <LanguageBar />
        </div>
      </div>

      {/* Top repos */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {github.topRepos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>

      <div className="mt-10">
        <Button href={github.profileUrl} variant="ghost-steel" magnetic>
          <GithubIcon size={16} />
          View full profile
        </Button>
      </div>
    </section>
  );
}
