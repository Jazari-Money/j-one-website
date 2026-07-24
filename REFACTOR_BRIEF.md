# Refactoring brief: split the homepage monoliths

Last updated: 2026-07-24
Status: complete

## Goal

Restructure the two monolith files — `app/page.tsx` (~1,505 lines) and
`app/globals.css` (~3,497 lines) — into per-section files so that any future
change touches one small file instead of two huge ones. This is a
**zero-visual-change, zero-behavior-change** refactor. Its purpose is faster,
cheaper iteration (human and AI-agent alike), not redesign.

## Non-goals

Explicitly out of scope. Do not do any of these as part of this refactor:

- No visual or copy changes of any kind.
- No renaming of CSS classes, ids, or CSS custom properties.
- No conversion to Tailwind utilities (Tailwind stays installed but unused).
- No changes to the `"use client"` boundary or introduction of server
  components.
- No framework/runtime changes (vinext, Vite, worker, Wrangler stay as-is).
- No changes to shader parameters, theme values, or animation timings.
- No new dependencies.
- Blog files (`app/blog/*`) are already well-factored — leave them alone.

All rules in `context.md` (design guardrails, claim guardrails, interaction
specs) remain binding and unchanged.

## Current state

- `app/page.tsx` is one `"use client"` file containing top-level data
  (`currencies`, `themeOptions`, `features`, …), two hooks
  (`useReducedMotion`, `useInViewport`), and all section components:
  `Phone`, `SiteHeader`, `MagicAccess`, `Hero`, `BenefitRow`/`BenefitLedger`,
  `HowItWorks`, `InteractiveCard`, `ProductRoadmap`, `AudienceExplorer`,
  `NetworkExplorer`, `Blog`, `MoneyRain`, `HomeContent`, `Home`.
- `app/globals.css` is one file: Tailwind import, the 10 theme variable
  blocks, base/reset styles, all section styles, and article-page styles
  (only one structural comment exists, `/* Article pages */` near line 2179).
- Cross-page shared state lives in `HomeContent` (theme selection, access
  form open/scroll behavior) and is passed down as props — this structure is
  already prop-driven and extraction-friendly.

## Target structure

```
app/
  page.tsx                  # thin: "use client", imports + composes HomeContent
  layout.tsx                # unchanged
  globals.css               # @import chain only (see CSS plan below)
  styles/
    tokens.css              # :root + all 10 [data-theme] variable blocks
    base.css                # reset and global element primitives
    section.css             # .section and shared chapter-heading primitives
    header.css
    hero.css                # hero + MagicAccess/access form
    benefits.css            # capability ledger + LiquidMetal wrapper
    how.css                 # tabs, phones, FX review block
    card.css                # 3D card
    roadmap.css
    audience.css
    networks.css
    blog.css                # homepage blog section
    money-rain.css          # closing panel + coins
    footer.css
    article.css             # current "Article pages" block
    responsive-1120.css     # original <=1120px cascade block
    responsive-900.css      # original <=900px cascade block
    responsive-620.css      # original <=620px cascade block
    desktop.css             # original >=901px density pass
    reduced-motion.css      # original reduced-motion overrides
  home/
    data.ts                 # currencies, themeOptions, features, audiences,
                            # networks, roadmap items, blog card list + types
    hooks.ts                # useReducedMotion, useInViewport
    Phone.tsx               # shared phone-frame component
    SiteHeader.tsx
    Hero.tsx                # includes MagicAccess (used only by Hero)
    BenefitLedger.tsx       # includes BenefitRow
    HowItWorks.tsx
    InteractiveCard.tsx
    ProductRoadmap.tsx
    AudienceExplorer.tsx
    NetworkExplorer.tsx
    Blog.tsx
    MoneyRain.tsx
    HomeContent.tsx         # owns theme + access-form state, composes sections
```

Notes:

- Every extracted component file starts with `"use client"`.
- State stays where it is: `HomeContent` keeps ownership of theme and
  access-form state; sections keep receiving props with the same names.
- Small helper components stay co-located with their only consumer
  (`MagicAccess` in `Hero.tsx`, `BenefitRow` in `BenefitLedger.tsx`).
- Shared types (`CurrencyCode`, `ThemeOption`, feature types) are exported
  from `home/data.ts`.

## CSS plan (the risk lives here — read carefully)

The CSS split must preserve the **exact cascade order**. Strategy:

1. `app/globals.css` becomes only an ordered import chain:
   `@import "tailwindcss";` followed by `@import "./styles/tokens.css";`,
   `base.css`, then section files **in the same order the rules currently
   appear in globals.css**.
2. Move rules verbatim — no reformatting, no consolidation, no "cleanup while
   we're here." Rule text must be byte-identical apart from file location.
3. A rule that styles multiple sections goes to `base.css`, not duplicated.
4. Media queries stay adjacent to the rules they modify, in the same file.
5. Import CSS via the `globals.css` chain only — do **not** import CSS files
   from components (avoids any vinext/Vite ordering surprises).

## Execution order

Work top-to-bottom in small, independently verifiable steps. Run
`npm run build` after each step; commit after each green step.

1. **Baseline capture.** `npm run build && npm test`, then save the built
   homepage HTML (from `dist/`) somewhere outside the repo for later diffing.
2. **Extract data + hooks** into `home/data.ts` and `home/hooks.ts`; update
   imports in `page.tsx`. No JSX changes.
3. **Extract components**, one file per step, in this order (leaf-first):
   `Phone` → `SiteHeader` → `Hero` (+`MagicAccess`) → `BenefitLedger` →
   `HowItWorks` → `InteractiveCard` → `ProductRoadmap` → `AudienceExplorer` →
   `NetworkExplorer` → `Blog` → `MoneyRain` → `HomeContent`. Finally reduce
   `page.tsx` to a thin composition file.
4. **Split CSS** per the plan above, a few files per step, preserving order.
5. **Verify** (see below), then update `context.md`'s "Key files" section to
   reflect the new layout, and update this brief's Status line.

## Verification / acceptance criteria

- `npm run build`, `npm test`, and `npm run lint` all pass.
- Built homepage HTML is identical to the step-1 baseline (allowing only
  hash-like build artifacts in asset URLs). Any other diff means a mistake.
- Manual pass in `npm run dev`: default theme plus at least Toxic Bloom and
  one experimental theme; desktop, tablet, and narrow mobile; reduced-motion
  on and off; theme persistence via `localStorage`; tab keyboard navigation
  in How It Works; card drag/keyboard rotation; money rain on hover.
- No source file except `styles/tokens.css` exceeds ~450 lines.
- `git log` shows the small stepwise commits, not one big-bang commit.

## Completion record

- Baseline visible HTML captured before extraction:
  `/private/tmp/jazari-refactor-baseline.html`
- Baseline SHA-256:
  `55fb4399b69b84cd63c0bfcc564c38530afc09643f4171d93a2dc9446318a72f`
- Visible server-rendered HTML remained byte-identical after component and CSS
  extraction. Vinext-only RSC metadata is intentionally excluded from this
  comparison because its build identifiers change between builds.
- `app/page.tsx` is now a thin composition entry.
- Homepage data, hooks, and sections live in `app/home/`.
- `app/globals.css` is now an ordered import chain.
- No extracted source file exceeds 450 lines.
- Playwright covers the key interactions and full-page desktop, tablet, and
  mobile visual baselines.

## Why this shape (for future sessions)

The stack itself (Next 16 on vinext/Cloudflare, React 19, plain CSS themes)
is fine and is deliberately kept. The cost driver was that every edit
required navigating two monoliths and cross-referencing markup in one
against rules in the other. After this refactor, a typical change should
touch one ~100–300 line component file and one ~100–300 line CSS file.
