"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** 2px red progress line pinned to the top of the viewport (MASTER: red signal). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-red-500"
    />
  );
}
