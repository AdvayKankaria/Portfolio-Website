import type { Variants, Transition } from "framer-motion";

/* Animation tokens (mirror globals.css / MASTER §Animation Tokens) */
export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
  page: 0.9,
} as const;

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutExpo: [0.87, 0, 0.13, 1],
} as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const baseTransition: Transition = {
  duration: DURATION.slow,
  ease: EASE.outExpo,
};

/* ----- Reveal primitives ----- */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -32 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

/* ----- Stagger containers ----- */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

/* ----- Text reveal (char + word) ----- */
export const textRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.025, delayChildren: 0.1 },
  },
};

export const charReveal: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: DURATION.slow, ease: EASE.outExpo },
  },
};

export const wordRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  visible: {
    opacity: 1,
    y: "0em",
    transition: { duration: DURATION.base, ease: EASE.outExpo },
  },
};

/* ----- Card hover (theme uses red left-border, not scale; variants kept for non-card lifts) ----- */
export const cardHover: Variants = {
  rest: {},
  hover: { transition: { duration: DURATION.fast, ease: EASE.outExpo } },
};

/* ----- Page transitions ----- */
export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.page, ease: EASE.outExpo },
  },
};

export const pageExit: Variants = {
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: DURATION.base, ease: EASE.inOutExpo },
  },
};

/* Reduced-motion variant set: opacity only, no transforms/blur. */
export const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast } },
};

/** Viewport config shared by scroll reveals (trigger ~20% in, once). */
export const viewportOnce = { once: true, amount: 0.2 } as const;
