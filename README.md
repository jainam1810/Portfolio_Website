# Jainam Varia — Portfolio

A cinematic, editorial portfolio built around three domains: **AI/ML**, **Blockchain**, and **Security Engineering**.

**Live:** [jv-techfolio.netlify.app](https://jv-techfolio.netlify.app/) · [portfolio-website-xi-three-98.vercel.app](https://portfolio-website-xi-three-98.vercel.app/)

---

## The idea

One line carries the whole site:

> **I build systems that _learn_. _settle_. _hold_.**

Each verb belongs to one domain — machine learning *learns*, a blockchain *settles*, security *holds*. A persistent switcher in the navigation selects a domain, and the choice propagates everywhere:

- the entire palette re-themes through a single animated CSS custom property
- the hero dims the two verbs you did not pick
- the domains section expands the chosen pillar and collapses the others to vertical rails
- projects and skills filter to that domain
- experience *dims* rather than hides — the career record stays whole

---

## Tech stack

| Layer | Choice |
|---|---|
| Build | Vite 8 |
| Framework | React 19 + TypeScript 7 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Components | shadcn/ui on the Radix primitives (`radix-nova`) |
| Animation | Motion (Framer Motion) v13 |
| Smooth scroll | Lenis |
| Brand marks | simple-icons (tree-shaken, ~36 icons) |
| Fonts | Self-hosted via Fontsource — Anton, Instrument Serif, Geist, JetBrains Mono |
| Email | EmailJS |

### Notable implementation details

- **One variable themes the site.** `--domain` is registered with `@property` as a real `<color>`, so it *interpolates* instead of snapping. `data-domain` is set on `<html>`; every descendant — including portalled dialogs — inherits the animated value. Any subtree can also opt into a fixed domain by setting its own `data-domain`.
- **Duotone portraits** are composed from a grayscale image plus `mix-blend-mode: color` / `screen` layers tinted by the live accent, so the hero photo re-tints with the domain.
- **The ticker is pure CSS** — the list is rendered twice and translated `-50%`. No JavaScript, seamless loop, and `prefers-reduced-motion` is honoured for free.
- **All content is typed and centralised** in `src/data`. Components never hard-code copy, which is what keeps domain filtering consistent across five different sections.
- Full `prefers-reduced-motion` support, keyboard-navigable Radix dialog, and no horizontal overflow at 390px.

---

## Easter egg

Unchanged from the original site — a cricket bat swings, connects, and the screen erupts into a fireworks show with Web Audio boom synthesis.

- **Desktop:** `↑ ↑ ↓ ↓ ← → ← → B A`
- **Mobile:** tap 7 times within 1.5 seconds

---

## Project structure

```
Portfolio_Website/
├── index.html                  # Vite entry + SEO/OG metadata
├── public/                     # Photo, audio, company logos, manifest
├── src/
│   ├── App.tsx                 # Shell: providers, Lenis, loader, section order
│   ├── index.css               # Design system: tokens, domains, utilities
│   ├── data/                   # ← all content lives here, fully typed
│   │   ├── types.ts
│   │   ├── site.ts             # Bio, links, CVs, stats, EmailJS config
│   │   ├── domains.ts          # The three pillars
│   │   ├── projects.ts         # 9 projects
│   │   ├── experience.ts       # 6 roles
│   │   └── misc.ts             # Education, skills, activities, languages
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── site/               # One file per section
│   │   ├── anim.tsx            # Reveal, WordReveal, Counter, AccentRule
│   │   └── domain-context.tsx  # Domain state
│   ├── hooks/use-portfolio.ts  # Typewriter, active section, Konami, scroll
│   └── lib/
│       ├── icons.tsx           # Brand glyphs with monogram fallback
│       └── cricket-fireworks.ts
└── vite.config.ts
```

### Editing content

Everything is data-driven. To add a project, append to `src/data/projects.ts`:

```ts
{
  slug: 'my-project',
  title: 'My Project',
  year: '2026',
  primary: 'chain',           // drives the accent colour
  domains: ['chain', 'sec'],  // drives filtering
  status: 'Live',
  featured: true,             // renders as a wide cell
  summary: '...',
  impact: '...',              // the measurable result
  stack: ['TypeScript', 'Solidity'],
  links: [{ label: 'GitHub', href: '...', kind: 'repo' }],
}
```

Brand glyphs resolve automatically from the `stack` strings; anything simple-icons does not ship (AWS, LinkedIn, Power BI, Tableau) falls back to a monogram chip by design.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → build/
npm run preview
npm run typecheck
```

Build output is `build/`, matching the existing Netlify and Vercel configuration (build command `npm run build`, publish directory `build`).

---

## Contact

- **LinkedIn:** [linkedin.com/in/jainamvaria](https://www.linkedin.com/in/jainamvaria/)
- **GitHub:** [github.com/jainam1810](https://github.com/jainam1810)
- **Email:** jainamvaria1010@gmail.com
- **WhatsApp:** [wa.me/447544504854](https://wa.me/447544504854)
- **Instagram:** [@jai_varia_19](https://www.instagram.com/jai_varia_19/)

---

© 2026 Jainam Varia. All Rights Reserved.
