# Jazari One website

The public Jazari One marketing site. It is built with Next.js and exported as
static files for GitHub Pages.

Project decisions, claim guardrails, current page structure, and handoff notes
live in [`context.md`](./context.md). Update that file after material product,
legal, content, or responsive-layout changes.

## Prerequisites

- Node.js `>=22.13.0`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Analytics configuration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to
the public GA4 web data stream ID when testing analytics locally. If the value
is absent or invalid, consent preferences still work but Google Analytics is
not loaded.

The GitHub Pages workflow reads the same value from the repository variable
`GA_MEASUREMENT_ID`. Measurement IDs are public identifiers and should be
configured as a repository variable, not a secret.

## Verification

```bash
npm run build
npm run lint
npm test
npm run test:e2e
```

- `npm run build` checks the standard Next.js application.
- Every build is a static export; only the GitHub Pages base path differs in
  deployment.
- `npm test` creates the GitHub Pages export and verifies its content and routes.
- `npm run test:e2e` checks interactions and the existing visual baselines.
- `npm run test:all` runs the complete local verification sequence.

Only use `npm run test:e2e:update` after intentionally reviewing a visual
change.

## Deployment

GitHub Pages is the canonical deployment target. A push to `main` runs
`.github/workflows/pages.yml`, verifies the code, exports the static site, and
publishes the `out/` directory.

## Project structure

- `app/page.tsx` — homepage entry
- `app/home/` — one focused component per homepage section
- `app/home/data.ts` — section content, themes, and currency data
- `app/styles/` — tokens, section styles, and responsive styles
- `app/blog/` — shared article renderer and regional guide routes
- `public/` — local images, video, logos, and fonts
- `tests/` — static-output and browser tests
- `app/cookie-consent/` — consent persistence, preferences UI, and analytics gating

The site intentionally uses plain modular CSS rather than Tailwind. It has no
server runtime or database; early-access submission is currently a front-end
demo. Geist is bundled locally through the `geist` package, so builds do not
depend on Google Fonts being available.
