# Portfolio — Architecture Document

> Source of truth for structure, tokens, and behavior. Design tokens trace to
> `design-system/portfolio/MASTER.md` (Graphite Mono + Red). All personal content
> lives only in `src/data/placeholder.ts`.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (CSS-first `@theme`) ·
Framer Motion 12 · React Three Fiber 9 + drei 10 + three 0.185 · GSAP 3 (timeline-draw only) ·
react-hook-form 7 + zod 4 · lucide-react · Radix primitives.

---

## 1. Folder Architecture

```
src/
  app/
    layout.tsx            # <html class="dark">, fonts, metadata, JSON-LD, providers, skip-link
    page.tsx              # home — composes all sections in order
    not-found.tsx         # styled 404 (graphite + red CTA back home)
    loading.tsx           # route-level skeleton (graphite blocks)
    robots.ts             # MetadataRoute.Robots
    sitemap.ts            # MetadataRoute.Sitemap
    globals.css           # @theme tokens, base, reduced-motion, utilities
  components/
    ui/                   # primitives (themed): button, card, badge, separator, tooltip,
                          #   web-gl-shader (21st.dev, retuned red/graphite), liquid-glass-button
    atoms/                # Button (3 CVA variants), Badge, Icon, Tag, Chip, Tooltip, Avatar,
                          #   SectionNumber
    molecules/            # NavLink, ProjectCard, SkillBadge, SectionHeader, TimelineEntry,
                          #   StatCounter, SocialLink, ContributionGrid, RepoCard, ResearchItem
    organisms/            # Navbar, Hero, About, Skills, Experience, Projects, Research,
                          #   Achievements, GitHub, Contact, Footer
    three/                # Scene, FloatingGeometry, ParticleField (dynamic, ssr:false)
    animations/           # PageTransition, ScrollReveal, TextReveal, StaggerContainer
    chrome/               # LoadingScreen, CustomCursor, ScrollProgress, ScrollToTop
    providers/            # MotionProvider, ThemeProvider, ActiveSectionProvider
  hooks/
    useScrollProgress.ts  useReducedMotion.ts  useInView.ts  useMagneticHover.ts
    useCountUp.ts         useActiveSection.ts  useMediaQuery.ts
  lib/
    utils.ts              # cn() = clsx + tailwind-merge
    fonts.ts              # Geist + Geist_Mono (next/font/google)
    metadata.ts           # buildMetadata() + JSON-LD Person, from placeholder.ts
    animations.ts         # shared Framer variants + tokens
    constants.ts          # nav items, section registry, breakpoints, durations
  types/index.ts          # all shared interfaces
  data/placeholder.ts     # ONLY file with personal content
  styles/tokens.css       # optional extra token layer
docs/ARCHITECTURE.md
design-system/portfolio/MASTER.md
```

---

## 2. Component Architecture (atoms → molecules → organisms)

**Atoms** — Button (3 CVA variants: primary / ghost / ghost-steel), Badge (pill graphite), Icon
(lucide wrapper w/ aria), Tag, Chip, Tooltip (radix), Avatar, SectionNumber (turns red in view).

**Molecules** — NavLink (layoutId underline), ProjectCard (red left-border hover), SkillBadge,
SectionHeader (number + mono h2 + 1px rule), TimelineEntry, StatCounter (count-up), SocialLink
(translate-x hover), ContributionGrid (52×7 SVG), RepoCard (language dot + stars),
ResearchItem (expandable abstract).

**Organisms / Sections** — Navbar, Hero, About, Skills, Experience, Projects, Research,
Achievements, GitHub, Contact, Footer. Each `<section aria-labelledby>` with a SectionHeader.

**Chrome** — LoadingScreen (sessionStorage gate, curtain wipe), CustomCursor (pointer:fine only),
ScrollProgress (top 2px red bar), ScrollToTop (appears >500px).

**Sourced `ui/` primitives** — `web-gl-shader.tsx` (21st.dev raw-shader background, retuned from RGB
to a red core + cool-graphite halo per the MASTER color rules; used as the Hero backdrop, dynamically
imported `ssr:false`, reduced-motion → single static frame). `liquid-glass-button.tsx` kept as an
opt-in library extra; the canonical CTA remains `atoms/Button`.

---

## 3. Animation Architecture

| Effect | Library | Trigger |
|--------|---------|---------|
| Page enter/exit | Framer `AnimatePresence` | route / mount |
| Scroll reveals (fadeInUp) | Framer `whileInView` | IntersectionObserver 20% |
| Text reveal (char/word stagger) | Framer variants | in-view once |
| Stagger lists | Framer `staggerChildren` | parent in-view |
| Hover / tap micro | Framer `whileHover/whileTap` | pointer |
| Magnetic buttons | `useMagneticHover` (rAF + Framer) | pointermove on `[data-magnetic]` |
| Count-up stats | `useCountUp` (rAF) | in-view |
| Nav active underline | Framer `layoutId` | route/section change |
| Custom cursor lerp | rAF (no lib) | pointermove |
| Scroll progress bar | Framer `useScroll`/`scaleX` | scroll |
| Hero shader background | three.js `RawShaderMaterial` rAF | mount (paused when hidden/reduced) |
| 3D floating geometry / particles / parallax | React Three Fiber `useFrame` | rAF (delta) |
| **Timeline connector draw** | Framer `useScroll`+`useTransform` (GSAP only if multi-segment) | scroll |

**GSAP justification:** the Experience connector maps `stroke-dashoffset` continuously to scroll.
Framer `useScroll`/`useTransform` drives that single value, so GSAP is not needed for the default
path; it is reserved only for a staggered multi-segment draw and justified per-use if added.

All animation components consult `MotionProvider`. Reduced motion → variants collapse to opacity-only
with `duration: 0`, no transforms; `useFrame` loops paused (static scene); shader renders one frame.

---

## 4. Design Tokens → CSS var → Tailwind key

Tailwind v4 maps CSS vars to utilities via `@theme inline` in `globals.css`. No `tailwind.config.ts`.

| MASTER token | CSS custom property | Tailwind utility |
|--------------|---------------------|------------------|
| Background / Foreground | `--background` / `--foreground` | `bg-background` / `text-foreground` |
| Card | `--card` | `bg-card` |
| Primary (red) | `--primary` | `bg-primary` `text-primary` |
| Muted / muted-fg | `--muted` / `--muted-foreground` | `bg-muted` / `text-muted-foreground` |
| Border / Ring | `--border` / `--ring` | `border-border` / `ring-ring` |
| Red 300–700 | `--red-300..700` → `--color-red-*` | `text-red-500` etc. |
| Graphite 50–950 | `--graphite-50..950` → `--color-graphite-*` | `bg-graphite-900` etc. |
| Radius | `--radius` (0.25rem) → `--radius-*` | `rounded` |
| Font sans/mono | `--font-sans` / `--font-mono` | `font-sans` / `font-mono` |
| Durations / Eases | `--duration-*` / `--ease-*` | `duration-*` / `ease-*` |

---

## 5. Typography System

Geist Mono for headings/numbers/buttons; Geist sans for body (MASTER §Typography).
display `clamp(3rem,6vw,6rem)/1.05/500/-0.03em` · h1 `clamp(2.5,5vw,4rem)/1.1/500/-0.02em` ·
h2 `clamp(2rem,4vw,3rem)/1.1` · h3 `1.5/1.2` · h4 `1.25/1.3` · body-lg `1.125/1.6` · body `1/1.6` ·
body-sm `.875/1.5` · caption `.75/1.4/500/0.05em`. No italics. Min body 16px.

---

## 6. Spacing System (4px grid)

`4 8 12 16 24 32 48 64 96 128` → utilities `1 2 3 4 6 8 12 16 24 32`. Section padding ≥ 120px
(`py-24`/`py-32`). Container `max-w-7xl px-6` desktop / `px-4` mobile. 12-col grid. 1px section rules.

---

## 7. Animation Tokens

`instant 100 · fast 200 · base 350 · slow 600 · page 900` (ms). Eases: `out-expo
cubic-bezier(0.16,1,0.3,1)`, `in-out-expo cubic-bezier(0.87,0,0.13,1)`, spring
`{stiffness:300,damping:30}`. Declared in `lib/animations.ts` + `globals.css`.

---

## 8. Responsive Strategy (desktop-first: 1440 / 1024 / 768 / 375)

Per-section redesign (not shrink):
- **Hero** split headline + shader/3D → type −15%, smaller canvas → stacked, reduced canvas →
  fluid clamp type, particles-only.
- **About** 5-col (img 2 / text 3) → 50/50 → stacked img-first.
- **Skills** bento masonry → 2-col → 1-col wrap.
- **Experience** center alternating timeline → left timeline all-right → compact left.
- **Projects** featured full + 2-col → 2-col → 1-col; filter bar wraps.
- **GitHub** 52-col contribution grid horizontally scrollable ≤768.
- **Contact** 2-col (copy / form) → stacked.
- **Navbar** center links → hamburger overlay < 768. Cursor effects off < 1024 / touch.

Tap targets ≥ 44×44 at ≤768. No horizontal scroll at 375 (clamp + overflow guards).

---

## 9. Accessibility Plan

Landmarks `header/nav/main/section[aria-labelledby]/article/footer`; one `h1` (Hero) then h2→h3.
First focusable: skip-link → `#main-content`. Tab reaches all; Enter/Space activate; Escape closes
overlays/expanders. Red focus-visible ring everywhere; never bare `outline:none`. Icon-only buttons
`aria-label`; real `<label>`s + `aria-invalid` + inline errors. `prefers-reduced-motion`: CSS ≈0
transitions, Framer opacity-only, 3D/shader static. Color never the sole signal. Contrast ≥ 4.5:1
body, ≥ 3:1 large/UI.

---

## 10. SEO Plan

`layout.tsx` `Metadata`: title template `%s | {name}`, default `{name} — {title}`, description,
keywords, authors, `metadataBase`, openGraph (title/desc/url/siteName/`images 1200×630`/type website),
twitter `summary_large_image`, robots index/follow + googleBot. JSON-LD `Person` via script tag.
`robots.ts` + `sitemap.ts` (Next 13+). All strings from `placeholder.ts`. OG image `public/og.png`.

---

## 11. Performance Plan

Dynamic imports: `three/Scene` and `ui/web-gl-shader` via `next/dynamic({ssr:false})`; LoadingScreen,
CustomCursor client-only — Three.js never in initial bundle (verify `ANALYZE=true`). Sections render
server-side where static; interactive leaves are `"use client"`. Images via `next/image` with explicit
dims + `blurDataURL`; avif/webp in `next.config.ts`; CLS 0. Fonts via `next/font` only (zero FOUT).
Budget < 150kb first-load JS/route; specific three/drei imports only; memoize hot-path handlers.
LCP < 2.5s (4G). Bundle analyzer via `@next/bundle-analyzer` (`ANALYZE=true npm run build`).

---

## 12. Build / Commit Discipline

Commit after each phase with descriptive messages. `node_modules` git-ignored. Per-section self-audit
(MASTER Pre-Delivery + instruction §SELF-CHECK) before advancing.
