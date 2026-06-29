/* ============================================================================
   ⚠️  THE ONLY FILE WITH PERSONAL CONTENT.
   Every section imports from here — no personal data is hardcoded elsewhere.

   This is realistic PLACEHOLDER data for a fictional engineer ("Alex Rivera").
   Replace every value below with your own. Nothing else needs to change.
   ========================================================================== */

import type {
  Achievement,
  Experience,
  GitHubData,
  Person,
  Project,
  Research,
  SkillCategory,
  Social,
  SocialEntry,
  Stat,
} from "@/types";

export const person: Person = {
  name: "Alex Rivera",
  firstName: "Alex",
  title: "Senior Software Engineer",
  tagline: "I build precise, fast, and resilient systems for the web.",
  bio: "Senior software engineer focused on performance-critical interfaces, distributed systems, and developer tooling.",
  longBio: [
    "I'm a senior software engineer with eight years spent shipping products where milliseconds and reliability matter — real-time dashboards, design tooling, and the platforms underneath them.",
    "My work sits at the seam between systems engineering and interface craft: I care equally about a clean p99 latency graph and a button that feels right under the cursor.",
    "Lately I've been going deep on WebGL, edge runtimes, and the kind of tooling that makes a whole team faster. I write to think, mentor when I can, and ship on Fridays anyway.",
  ],
  location: "San Francisco, CA",
  email: "alex@example.com",
  availability: "Open to senior & staff engineering roles",
  available: true,
  resumeUrl: "/resume.pdf",
  initials: "AR",
  avatar: "/avatar.svg",
};

export const social: Social = {
  github: "https://github.com/alexrivera",
  linkedin: "https://linkedin.com/in/alexrivera",
  twitter: "https://twitter.com/alexrivera",
  website: "https://alexrivera.dev",
};

export const socialEntries: SocialEntry[] = [
  {
    platform: "github",
    label: "GitHub",
    handle: "@alexrivera",
    href: social.github,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "in/alexrivera",
    href: social.linkedin,
  },
  {
    platform: "twitter",
    label: "Twitter / X",
    handle: "@alexrivera",
    href: social.twitter,
  },
  {
    platform: "website",
    label: "Website",
    handle: "alexrivera.dev",
    href: social.website,
  },
];

export const stats: Stat[] = [
  { value: 8, suffix: "+", label: "Years building" },
  { value: 40, suffix: "+", label: "Projects shipped" },
  { value: 12, suffix: "", label: "Open-source repos" },
  { value: 99, suffix: "%", label: "Uptime maintained" },
];

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", level: 5 },
      { name: "Python", level: 5 },
      { name: "Go", level: 4 },
      { name: "Rust", level: 3 },
      { name: "SQL", level: 4 },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: 5 },
      { name: "Next.js", level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Three.js / WebGL", level: 4 },
      { name: "Framer Motion", level: 4 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 5 },
      { name: "PostgreSQL", level: 4 },
      { name: "GraphQL", level: 4 },
      { name: "Redis", level: 4 },
      { name: "gRPC", level: 3 },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", level: 4 },
      { name: "Docker", level: 5 },
      { name: "Kubernetes", level: 4 },
      { name: "Terraform", level: 3 },
      { name: "CI/CD", level: 4 },
    ],
  },
  {
    category: "Tooling",
    items: [
      { name: "Git", level: 5 },
      { name: "Vite", level: 4 },
      { name: "Playwright", level: 4 },
      { name: "Figma", level: 3 },
    ],
  },
];

export const experience: Experience[] = [
  {
    company: "Halcyon Systems",
    role: "Senior Software Engineer",
    start: "2022",
    end: "Present",
    current: true,
    location: "San Francisco, CA",
    description: [
      "Lead engineer on a real-time observability platform serving 4M+ events/sec with sub-second query latency.",
      "Cut dashboard render times 62% by moving hot paths to WebGL and a streaming data layer.",
      "Mentor a team of five; own the frontend performance budget and architecture review.",
    ],
    stack: ["TypeScript", "React", "Go", "ClickHouse", "Kubernetes"],
    url: "https://example.com",
  },
  {
    company: "Northwind Labs",
    role: "Software Engineer",
    start: "2019",
    end: "2022",
    current: false,
    location: "Remote",
    description: [
      "Built the collaborative canvas engine behind a design tool used by 200k+ creators.",
      "Designed an offline-first sync protocol with CRDTs, reducing conflict errors to near zero.",
      "Shipped the public component library and design system adopted across four product teams.",
    ],
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "WebSockets"],
    url: "https://example.com",
  },
  {
    company: "Cobalt Interactive",
    role: "Frontend Engineer",
    start: "2017",
    end: "2019",
    current: false,
    location: "Austin, TX",
    description: [
      "Delivered marketing and product experiences for early-stage startups under tight timelines.",
      "Introduced a performance culture: Lighthouse gates in CI, image pipelines, and budgets.",
    ],
    stack: ["JavaScript", "React", "Next.js", "GSAP"],
    url: "https://example.com",
  },
];

export const projects: Project[] = [
  {
    title: "Atlas Observability",
    description:
      "A real-time metrics and tracing platform with a WebGL-accelerated timeline that stays at 60fps across millions of spans. Streaming query layer, custom storage engine, and a keyboard-first UI.",
    stack: ["Next.js", "WebGL", "Go", "ClickHouse"],
    github: "https://github.com/alexrivera/atlas",
    live: "https://example.com",
    featured: true,
    category: "Systems",
    year: "2024",
    image: "/projects/atlas.svg",
  },
  {
    title: "Prism Editor",
    description:
      "A collaborative vector editor with CRDT-based offline sync and a plugin runtime sandboxed in WebAssembly.",
    stack: ["React", "Rust", "WASM", "WebSockets"],
    github: "https://github.com/alexrivera/prism",
    live: "https://example.com",
    featured: false,
    category: "Web",
    year: "2023",
    image: "/projects/prism.svg",
  },
  {
    title: "Quanta",
    description:
      "An on-device inference toolkit that compiles small transformer models to run in the browser via WebGPU.",
    stack: ["TypeScript", "WebGPU", "Python"],
    github: "https://github.com/alexrivera/quanta",
    live: "https://example.com",
    featured: false,
    category: "AI/ML",
    year: "2024",
    image: "/projects/quanta.svg",
  },
  {
    title: "Relay",
    description:
      "A typed RPC framework for edge runtimes with end-to-end inference and zero-config streaming.",
    stack: ["TypeScript", "Deno", "gRPC"],
    github: "https://github.com/alexrivera/relay",
    live: "",
    featured: false,
    category: "Open Source",
    year: "2023",
    image: "/projects/relay.svg",
  },
  {
    title: "Forge UI",
    description:
      "A headless component library and design-token pipeline that powers four production design systems.",
    stack: ["React", "Tailwind", "Style Dictionary"],
    github: "https://github.com/alexrivera/forge",
    live: "https://example.com",
    featured: false,
    category: "Open Source",
    year: "2022",
    image: "/projects/forge.svg",
  },
];

export const research: Research[] = [
  {
    title:
      "Streaming Aggregation for Interactive Observability at the Edge",
    venue: "USENIX NSDI (Workshop)",
    year: "2024",
    abstract:
      "We present a streaming aggregation layer that maintains interactive query latency over high-cardinality telemetry. By pushing partial aggregates to edge nodes and reconciling with a columnar backend, we keep p99 query latency under 200ms while ingesting millions of events per second. We discuss the trade-offs between freshness, accuracy, and cost, and evaluate the system on production-scale workloads.",
    pdf: "/research/streaming-aggregation.pdf",
    doi: "https://doi.org/10.0000/placeholder",
    citations: 14,
  },
  {
    title: "CRDT Compaction Strategies for Long-Lived Collaborative Documents",
    venue: "PaPoC (EuroSys Workshop)",
    year: "2022",
    abstract:
      "Long-lived collaborative documents accumulate operation history that degrades memory and load performance. We propose a compaction strategy for sequence CRDTs that preserves causal consistency while bounding metadata growth, and show a 4x reduction in document load time on real editing traces.",
    pdf: "/research/crdt-compaction.pdf",
    doi: "https://doi.org/10.0000/placeholder",
    citations: 9,
  },
];

export const achievements: Achievement[] = [
  {
    title: "Hackathon Winner — Best Systems Hack",
    org: "TechCrunch Disrupt",
    year: "2023",
    description:
      "First place out of 180 teams for a real-time anomaly detection pipeline built in 36 hours.",
    metric: { value: 1, label: "Place", suffix: "st" },
  },
  {
    title: "Open Source Spotlight",
    org: "GitHub Stars Program",
    year: "2023",
    description:
      "Recognized for maintainership across developer tooling projects with a combined 6k+ stars.",
    metric: { value: 6, label: "Stars", suffix: "k+" },
  },
  {
    title: "Speaker — WebGL Performance",
    org: "React Summit",
    year: "2024",
    description:
      "Invited talk on keeping data-dense WebGL interfaces at 60fps under real workloads.",
  },
  {
    title: "Patent — Streaming Query Reconciliation",
    org: "USPTO (Pending)",
    year: "2024",
    description:
      "Co-inventor on a method for reconciling edge partial-aggregates with a columnar store.",
  },
];

export const github: GitHubData = {
  username: "alexrivera",
  profileUrl: "https://github.com/alexrivera",
  stats: {
    stars: 6240,
    repos: 48,
    followers: 1830,
    contributions: 1947,
  },
  topRepos: [
    {
      name: "atlas",
      description: "WebGL-accelerated real-time observability platform.",
      language: "Go",
      languageColor: "oklch(0.65 0.01 260)",
      stars: 3120,
      url: "https://github.com/alexrivera/atlas",
    },
    {
      name: "forge",
      description: "Headless components + design-token pipeline.",
      language: "TypeScript",
      languageColor: "oklch(0.72 0.01 260)",
      stars: 1840,
      url: "https://github.com/alexrivera/forge",
    },
    {
      name: "relay",
      description: "Typed RPC for edge runtimes with streaming.",
      language: "TypeScript",
      languageColor: "oklch(0.72 0.01 260)",
      stars: 940,
      url: "https://github.com/alexrivera/relay",
    },
    {
      name: "quanta",
      description: "On-device transformer inference via WebGPU.",
      language: "Rust",
      languageColor: "oklch(0.58 0.01 260)",
      stars: 720,
      url: "https://github.com/alexrivera/quanta",
    },
  ],
  languages: [
    { name: "TypeScript", percent: 46 },
    { name: "Go", percent: 22 },
    { name: "Rust", percent: 16 },
    { name: "Python", percent: 11 },
    { name: "Other", percent: 5 },
  ],
};
