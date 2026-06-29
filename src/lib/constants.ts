import type { NavItem } from "@/types";

/** Section registry — drives the navbar, scroll-spy, and active-section number. */
export const SECTIONS: NavItem[] = [
  { id: "hero", label: "Home", num: "00" },
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "experience", label: "Experience", num: "03" },
  { id: "projects", label: "Work", num: "04" },
  { id: "research", label: "Research", num: "05" },
  { id: "achievements", label: "Awards", num: "06" },
  { id: "github", label: "GitHub", num: "07" },
  { id: "contact", label: "Contact", num: "08" },
];

/** Links shown in the navbar (excludes the hero itself). */
export const NAV_ITEMS: NavItem[] = SECTIONS.filter((s) => s.id !== "hero");

export const BREAKPOINTS = {
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const;

/** Scroll thresholds (px). */
export const SCROLL = {
  navbarFrost: 80,
  scrollToTop: 500,
  hideScrollIndicator: 0.2, // fraction of viewport height
} as const;

export const SITE_URL = "https://example.com";
