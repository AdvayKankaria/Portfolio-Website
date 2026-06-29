"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { NavLink } from "@/components/molecules/NavLink";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { NAV_ITEMS, SCROLL } from "@/lib/constants";
import { person } from "@/data/placeholder";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export function Navbar() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Frost the bar once past the threshold.
  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > SCROLL.navbarFrost);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlay on Escape; lock scroll while open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"
      >
        {/* Logo */}
        <a
          href="#hero"
          className="font-mono text-base font-medium tracking-tight text-foreground"
        >
          {person.name.split(" ")[0]}
          <span className="text-red-500">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <NavLink item={item} active={active === item.id} />
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button href="#contact" variant="ghost" size="sm" magnetic>
            Contact
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md text-foreground lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Icon icon={menuOpen ? X : Menu} size={22} />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col bg-background lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="mt-24 flex flex-col gap-2 px-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.3 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-baseline gap-3 border-b border-border py-4 font-mono text-2xl transition-colors",
                      active === item.id
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm",
                        active === item.id
                          ? "text-red-500"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.num}
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 px-6">
              <Button href="#contact" variant="primary" onClick={() => setMenuOpen(false)}>
                Get in touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
