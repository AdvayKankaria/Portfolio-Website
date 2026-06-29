"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** 0–1 fraction of the element visible before triggering. */
  amount?: number;
  /** Stop observing after the first intersection. */
  once?: boolean;
  rootMargin?: string;
}

/** Lightweight IntersectionObserver wrapper. */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  amount = 0.2,
  once = true,
  rootMargin = "0px",
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, once, rootMargin]);

  return { ref, inView };
}
