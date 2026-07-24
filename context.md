# Jazari One website context

Last updated: 2026-07-24

## Product

Jazari One is presented as a global digital-dollar account for people whose
money crosses borders. The core story is:

- Hold supported digital dollars.
- Receive eligible client and platform payments.
- Send through supported local bank routes.
- Review the reference rate, applicable cost, estimated recipient amount, and
  expected timing before confirming.

Current hero line:

> Your dollars, wherever you are.

Current hero description is intentionally kept as requested:

> Hold your money in dollars that keep their value — and send it to any bank
> account in Mexico, Colombia, Brazil, Europe and 26 more countries.

## Important claim guardrails

These claims require product/legal confirmation before a public launch:

- Exact supported country count and the phrase “26 more countries.”
- The displayed 0% / $0 Jazari transaction fee.
- Which assets and networks are live in the Jazari product.
- Formal “partner” status for Bridge, Privy, Gauntlet, Tether, or Circle.
- Visa issuance, card availability, card terms, and eligible countries.
- RNPL limits, pricing, eligibility, repayment terms, and credit disclosures.
- The exact licensed entity holding customer funds.

The homepage therefore calls the network section “Technology and networks,”
not a definitive commercial-partner list. FX examples are explicitly marked as
illustrative.

## User’s enduring design preferences

- Premium, restrained, editorial, and direct; Stripe, Bridge, OpenAI, and
  Airbnb are the quality bar.
- Dark, spacious layouts with large white serif display type.
- Supporting copy immediately below the headline.
- No kicker/eyebrow labels above homepage section headlines.
- No noisy background grid, busy rays, or cheap multi-color gradients.
- Shaders should be shallow, masked, and atmospheric.
- Keep the original Jazari One app video inside the local phone frame.
- CTA buttons use text only: no arrows, icons, or decorative glyphs.
- The primary CTA uses a toxic-green fluid shader.
- Do not use green status dots. “LIVE” is a typographic mark.
- Do not use separator rules between whole sections. Internal ledger/list
  boundaries are acceptable.
- Product screenshots stay upright and must never overlap headings.
- Product phones float directly on the page with a restrained halo; do not put
  them inside large colored rounded-rectangle plates.
- Roadmap and network stories are open editorial compositions with generous
  whitespace and localized glow; do not enclose them in large rounded plates.
- Supporting descriptions use a readable 15px size. Footer navigation, legal
  copy, and company information use 12px.
- Blog cards do not show country or read-time prefixes above their headlines.
- Third-party/network marks are monochrome and optically normalized by visual
  mass rather than assigned one identical numeric size.
- Avoid repeated generic bento-card layouts.
- Prefer interactive editorial ledgers, tabs, accordions, and vertical stories.

## Current page architecture

1. Bridge-inspired full-width fixed header
2. Hero with shallow masked mesh shader and Jazari app video
3. Editorial capability ledger using Jazari icon assets and simple surface hover
4. Interactive How It Works tabs with one upright phone at a time
5. FX/review experience integrated inside How It Works
6. Vertical roadmap:
   - Live: dollar account
   - Next: more local routes
   - Then: interactive 3D Jazari Visa card
   - Later: Remit Now Pay Later
7. Static audience/use-case stories
8. Interactive technology, digital-dollar, and network stories
9. Blog with four real internal article routes
10. Closing waitlist panel with performant CSS 3D money rain
11. Legal/product footer

Do not reintroduce separate FX, clarity, Card, or RNPL promo sections. Their
content is intentionally consolidated.

## Main interactions

### Header

- Transparent full-width bar at the top.
- Adds a translucent blurred background and hairline after scrolling.
- Desktop navigation links use an animated underline.
- Mobile control uses the text “Menu” / “Close.”
- The palette control offers ten persisted themes using `localStorage`.

### Themes

The ten schemes are:

1. Carbon Mint (default, calm)
2. Warm Stone (calm)
3. Blue Hour (calm)
4. Sea Glass (calm)
5. Toxic Bloom (wild)
6. Solar Heat (wild)
7. Magenta Current (wild)
8. Ultraviolet (experimental)
9. Infrared (experimental)
10. Aurora Glass (experimental)

Theme variables live in `app/styles/tokens.css`; mesh colors live in
`themeOptions` in `app/home/data.ts`.

### Early access

- The hero’s shader CTA expands into an email field and text-only submit button.
- Header and closing CTAs scroll to and open the same form.
- This is currently a front-end demo state only; no backend persistence exists.

### How It Works

- Three accessible tabs:
  - Set up your account
  - Build the transfer
  - Follow the payment
- Arrow, Home, and End keys change tabs.
- One upright local screenshot is shown at a time.
- Each tab has a bordered surface and an explicit “View screen” affordance.
- The active phone uses a transparent, borderless stage with a localized glow
  and bottom fade—no background card or decorative ghost typography.
- FX conversion supports MXN, COP, BRL, and EUR. The review leads with “Know
  what arrives before you send,” shows `1 USD = destination value` prominently,
  highlights the illustrative 0% transaction fee, and keeps the indicative-rate
  disclaimer at the bottom of the card.

### Capability ledger

- Rows use a quiet surface-color change on hover.
- No liquid-metal canvas, cursor distortion, or decorative edge sweep is used.

### 3D card

- Built from React and CSS, not an image.
- Pointer hover adds a subtle tilt; pointer dragging rotates it freely.
- Arrow keys rotate it; Home resets it.
- Front and back faces contain only the Jazari One and official white Visa
  brand marks on a restrained solid surface.
- There is no card shader, chip, number, holder name, expiry, magnetic strip, or
  signature strip.
- Reduced-motion users receive a static angled card.

### Audience

- Each category is a static photographic story with a headline and one concise
  value statement.
- There is no click, hover expansion, chip list, or detail overlay.
- Mobile stacks the stories vertically.

### Money rain

- A deterministic pool of 28 coins is rendered only while the closing panel is
  hovered, focused, or temporarily touched.
- Mobile hides coins after the first 14.
- Animations use only transforms and opacity.
- Reduced-motion users see only the static glow.

## Blog routes

- `/blog/send-money-to-mexico`
- `/blog/send-money-to-brazil`
- `/blog/send-money-to-colombia`
- `/blog/send-money-to-europe`

Articles are brief, route-specific, and include useful details such as CLABE,
Pix, Colombian account type, destination currency, and IBAN. Shared article
rendering lives in `app/blog/GuideArticle.tsx`.

## Technology and network stories

The homepage currently explains:

- Bridge
- Privy
- Gauntlet
- USD₮
- USDC
- Ethereum
- TRON
- Solana
- Polygon
- Base

Use neutral language. Do not imply every asset/network is already available on
every Jazari route.

## Local assets

- Brand: `public/images/brand/jazari-one-logo.svg`
- Phone frame: `public/images/iphone-12-pro-graphite.webp`
- Hero video: `public/videos/jazari-app.mp4`
- Screens:
  - `public/images/screens/home.webp`
  - `public/images/screens/amount-entry.webp`
  - `public/images/screens/send-success.webp`
- Jazari icons: `public/images/features/*.webp`
- Audience photography: `public/images/audience/*.webp`
- Monochrome technology/network SVGs: `public/images/rails/*`
- Official white Visa mark: `public/images/brand/visa-white.svg`

The current card is generated in code.

## Technical stack

- Next.js 16 with static export for GitHub Pages
- React 19
- TypeScript
- Locally bundled Geist Sans and Geist Mono
- `@paper-design/shaders-react`
- Plain modular CSS for layout, 3D card, transitions, and money rain
- Playwright for interaction and visual regression checks

GitHub Pages is the canonical and only deployment target. Local development
uses `next dev`, so the development and deployment paths use the same framework.
There is no Cloudflare Worker, Vinext/Vite runtime, Tailwind layer, D1 database,
or Drizzle ORM. Every production build uses Next.js static export; there is no
server-start path. The early-access form remains front-end demo state.

Key files:

- `app/page.tsx` — thin homepage entry
- `app/home/HomeContent.tsx` — shared homepage state and composition
- `app/home/data.ts` — themes, currencies, and section content
- `app/home/*.tsx` — one focused component per homepage section
- `app/globals.css` — ordered stylesheet import chain
- `app/styles/*.css` — section, breakpoint, and token styles
- `app/layout.tsx`
- `app/blog/GuideArticle.tsx`
- `tests/rendered-html.test.mjs`
- `tests/e2e/homepage.spec.ts`
- `playwright.config.ts`
- `.github/workflows/pages.yml`

## Local commands

```sh
npm run dev
npm run build
npm run lint
npm test
npm run test:e2e
npm run test:e2e:update
npm run test:all
```

`npm run test:e2e:update` should be used only after an intentional visual
change has been reviewed; it replaces the desktop, tablet, and mobile
Playwright baselines.

Default local URL: `http://localhost:3000`

## Architecture rules for fast iterations

- One homepage section owns one component in `app/home/` and one matching
  stylesheet in `app/styles/`.
- Responsive rules live at the bottom of the section stylesheet they affect;
  there are no shared breakpoint files.
- Shared colors, spacing, and theme values belong in `app/styles/tokens.css`.
- Section styles must not reach into unrelated sections.
- Keep content and repeated records in `app/home/data.ts`, not duplicated
  through components.
- Pass normal internal paths such as `/#blog` directly to Next.js `Link`.
  Next applies the GitHub Pages base path automatically. Use `withBasePath`
  only for raw public asset URLs such as `<img>`, `<video>`, and `<source>`;
  combining it with `Link` duplicates `/j-one-website`.
- Keep interaction state inside the component that uses it unless multiple
  sections genuinely share it.
- Create a shared abstraction only after the same pattern appears at least
  three times.
- Do not add a package for a small effect that can be implemented clearly with
  existing React or CSS.
- A focused visual change should normally touch one component, one stylesheet,
  and its relevant test.
- Update visual baselines only after reviewing the intended change.
- Every push to `main` must pass the static export, content checks, and lint
  before GitHub Pages publishes it.

## Quality and performance rules

- Respect `prefers-reduced-motion`.
- Avoid more than two visually dominant shader canvases in one viewport.
- Keep the hero shader confined to the top of the hero and render it as a
  structured, abstract field rather than a smoky wash.
- Do not reintroduce Glimm or liquid-metal effects.
- Do not drive pointer tilt through React state on every move; write the small
  normalized pointer values directly to CSS custom properties.
- Presentational cards may use only a very subtle pointer tilt and quiet
  cursor-position radial light; functional controls should stay visually still.
- Keep images in their visual column; never position them over copy.
- Test desktop, tablet, and narrow mobile layouts after structural changes.

## Current visual language

- Use a neutral, concrete page foundation. Theme choices change the accent and
  shader palette, not the entire page background.
- CTA buttons are pill-shaped, use Title Case, contain no decorative glyphs,
  and may carry a restrained cursor-position highlight.
- Header controls and content cards do not use decorative strokes.
- Benefit rows place the description directly below the title and use spacing,
  not separator rules, to establish rhythm.
- The three transfer steps behave as one borderless segmented control. Do not
  add helper labels such as “View screen” or “Showing screen.”
- The FX preview is deliberately sparse: no outer plate border, no internal
  separators, and one consistent tabular style for currencies and values.
- The roadmap reads as one compact vertical sequence connected by a continuous
  line; its nested stages should not feel like full-size standalone sections.

## Reference direction

- Bridge header and shallow top-motion discipline: https://www.bridge.xyz/
- Stripe editorial communication and interactive story rhythm:
  https://stripe.com/
- Paper shaders: https://shaders.paper.design/
- Recent web-design references: https://recent.design/websites
- Original Jazari behavior/assets: https://jazari.xyz/
