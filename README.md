# Jazari One website

The public Jazari One marketing site. It is built with Next.js and exported as
static files for GitHub Pages.

## Prerequisites

- Node.js `>=22.13.0`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run build
npm run lint
npm test
npm run test:e2e
```

- `npm run build` checks the standard Next.js application.
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

The site intentionally uses plain modular CSS rather than Tailwind. It has no
server runtime or database; early-access submission is currently a front-end
demo. Geist is bundled locally through the `geist` package, so builds do not
depend on Google Fonts being available.
