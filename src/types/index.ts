/* ============================================================================
   Shared domain types. All personal content is shaped by these and lives only
   in src/data/placeholder.ts.
   ========================================================================== */

export interface Person {
  name: string;
  firstName: string;
  title: string;
  tagline: string;
  bio: string;
  longBio: string[];
  location: string;
  email: string;
  availability: string;
  available: boolean;
  resumeUrl: string;
  initials: string;
  avatar: string;
}

export interface Social {
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

export type SocialPlatform = "github" | "linkedin" | "twitter" | "website";

export interface SocialEntry {
  platform: SocialPlatform;
  label: string;
  handle: string;
  href: string;
}

export interface SkillItem {
  name: string;
  /** 1–5, used only for sort/weight — never rendered as a bar or % (MASTER). */
  level: number;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  current: boolean;
  location: string;
  description: string[];
  stack: string[];
  url: string;
}

export type ProjectCategory =
  | "All"
  | "Web"
  | "AI/ML"
  | "Systems"
  | "Open Source";

export interface Project {
  title: string;
  description: string;
  stack: string[];
  github: string;
  live: string;
  featured: boolean;
  category: Exclude<ProjectCategory, "All">;
  year: string;
  image: string;
}

export interface Research {
  title: string;
  venue: string;
  year: string;
  abstract: string;
  pdf: string;
  doi: string;
  citations: number;
}

export interface Achievement {
  title: string;
  org: string;
  year: string;
  description: string;
  metric?: { value: number; label: string; suffix?: string };
}

export interface Repo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  url: string;
}

export interface LanguageShare {
  name: string;
  percent: number;
}

export interface GitHubData {
  username: string;
  profileUrl: string;
  stats: {
    stars: number;
    repos: number;
    followers: number;
    contributions: number;
  };
  topRepos: Repo[];
  languages: LanguageShare[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface NavItem {
  id: string;
  label: string;
  /** Zero-padded section number shown in mono (MASTER §Layout). */
  num: string;
}
