# Jazari One website

The public Jazari One marketing site at `https://jazari.xyz`. It is built with
Next.js and exported as static files for GitHub Pages (production) and Google
Cloud Storage (dev).

Project decisions, claim guardrails, current page structure, and handoff notes
live in [`context.md`](./context.md). Update that file after material product,
legal, content, or responsive-layout changes.

## Prerequisites

- [Bun 1.4.2](https://bun.sh/blog/bun-v1.4.2), pinned in `package.json`

## Local development

```bash
bun install --frozen-lockfile
bun run dev
```

Open `http://localhost:3000`.

Commit `bun.lock` when dependencies change. Both GitHub Actions workflows read
the Bun version from `package.json` and use frozen installs. Next.js, ESLint,
content tests, and Playwright run with Bun.

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
bun run build
bun run lint
bun run test
bun run test:e2e
```

- `bun run build` checks the standard Next.js application.
- Every build is a static export served at the domain root.
- `bun run test` creates the static export and verifies its content and routes.
- `bun run test:e2e` checks interactions and the existing visual baselines.
- `bun run test:all` runs the complete local verification sequence.

Use `bun run test` for the build-and-test script; bare `bun test` invokes Bun's
test discovery, which also picks up the separate Playwright specs.

Only use `bun run test:e2e:update` after intentionally reviewing a visual
change.

## Deployment

GitHub Pages is the production deployment target. A push to `main` runs
`.github/workflows/pages.yml`, verifies the code, exports the static site, and
publishes the `out/` directory.

Allow the `dev` GitHub environment to deploy from PR merge refs
(`refs/pull/*/merge`); a rule allowing only `main` blocks these deployments.
Repository collaborators who can push PR branches can publish to dev.

Validate workflow syntax locally with
`actionlint .github/workflows/deploy-dev.yml`. Actual token exchange, bucket
permissions, and website serving must be verified by the first PR deployment.

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
