# Jazari One website context

Last updated: 2026-07-28

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

The homepage currently uses the approved heading “Partners & Networks.”
Commercial relationship wording still requires confirmation before launch.

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
- The primary CTA uses the active palette’s fluid shader and follows the
  pointer quietly.
- Do not use green status dots. “LIVE” is a typographic mark.
- Do not use separator rules between whole sections. Internal ledger/list
  boundaries are acceptable.
- Product screenshots stay upright and must never overlap headings.
- Product phones float directly on the page with a restrained halo; do not put
  them inside large colored rounded-rectangle plates.
- Cards use a low-amplitude shared 3D pointer response and a cursor-localized
  masked gradient border. Never put a radial glow inside the card surface.
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
3. Revealing editorial capability ledger using the supplied Jazari icon assets
4. Interactive How It Works tabs with one upright phone at a time
5. FX/review experience integrated inside How It Works
6. Static audience/use-case stories
7. Provider and network grid
8. Compact horizontal roadmap without product imagery:
   - USD account
   - More countries
   - VISA Virtual card
   - Remit Now Pay Later
9. Homepage Blog preview with the four latest guides
10. Closing download panel with a hover/viewport-triggered Citrus gradient flow
11. FAQ
12. Legal/product footer with official iOS and Android store badges, social
    links, and both UAE and US entities

Do not reintroduce separate FX, clarity, Card, or RNPL promo sections. Their
content is intentionally consolidated.

## Main interactions

### Header

- Transparent full-width bar at the top.
- Adds a translucent blurred background after scrolling; no persistent hairline.
- Desktop navigation links are deliberately larger than supporting UI copy.
- Mobile uses Lucide-style burger and close icons. The open menu covers the
  viewport and includes the Download App action plus X, Instagram, and Facebook.
- The palette control offers ten persisted themes using `localStorage`.

### Themes

The ten schemes are:

1. Pure Black (calm)
2. Deep Graphite (calm)
3. Cobalt (calm)
4. Digital Cyan (calm)
5. Acid Lime (wild)
6. Solar Flare (wild)
7. Hot Coral (wild)
8. Ultraviolet (experimental)
9. Signal Red (experimental)
10. Aurora Pulse (default, experimental)

Theme variables live in `app/styles/tokens.css`; mesh colors live in
`themeOptions` in `app/home/data.ts`. Layout tokens must never live inside a
palette selector: changing a color scheme cannot change page geometry.

### Download CTA

- The hero’s “Download App” shader CTA expands into an email field and
  text-only waitlist submit button while native distribution is staged.
- Header and closing CTAs scroll to and open the same form.
- This is currently a front-end demo state only; no backend persistence exists.

### How It Works

- Three accessible tabs:
  - Create an account
  - Enter the amount
  - Done!
- Arrow, Home, and End keys change tabs.
- One upright, equal-ratio local screenshot is shown at a time.
- The tabs form one quiet, borderless segmented control without helper labels.
- The active phone uses a transparent, borderless stage with a localized glow
  and bottom fade—no background card or decorative ghost typography.
- FX conversion supports MXN, COP, BRL, and EUR. The review leads with “Know
  what arrives before you send,” shows `1 USD = destination value` prominently,
  keeps the two 0% proof points beside the copy, and keeps the live-rate
  partner disclaimer at the bottom of the card.

### Capability ledger

- Rows are static: no entrance reveal and no hover surface effect.
- The USD-account claim is omitted here because that product remains on the
  roadmap.
- No liquid-metal canvas, cursor distortion, or decorative edge sweep is used.

### 3D card

- Built from React and CSS, not an image.
- Pointer hover adds a subtle tilt; pointer dragging rotates it freely.
- Arrow keys rotate it; Home resets it.
- Front and back faces contain only the Jazari One and official white Visa
  brand marks on a thick CSS-built body.
- There is a restrained cursor-position sheen, but no chip, number, holder
  name, expiry, magnetic strip, or signature strip.
- Reduced-motion users receive a static angled card.

### Audience

- The three supplied 2:3 portraits map to Freelancers, Migrants, and Their
  families.
- The photography is displayed without CSS tint, brightness filter, shader,
  or gradient scrim; the authored lower image area carries the caption.
- Mobile stacks the stories vertically.

### Closing gradient flow

- The closing panel uses Glimm’s Citrus palette with a top-to-bottom sweep,
  `snap` easing, and band tightness/width 40.
- Desktop triggers the sweep on pointer entry. Mobile triggers it once when
  roughly 42% of the panel enters the viewport.
- Reduced-motion users get the final quiet gradient state without a sweep.

## Blog routes

- `/blog`
- `/blog/send-money-to-mexico`
- `/blog/send-money-to-brazil`
- `/blog/send-money-to-colombia`
- `/blog/send-money-to-europe`
- `/blog/compare-transfer-costs`
- `/blog/verify-recipient-details`
- `/blog/digital-dollars-bank-payouts`
- `/pricing`

The homepage shows the four latest guides. The Blog index shows all seven.
Articles are brief and include useful route, safety, planning, and digital
dollar context. Shared article rendering lives in `app/blog/GuideArticle.tsx`.

## Provider and network grid

The homepage presents a stagger-revealing, optically balanced grid of:

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
every Jazari route. Keep the logos monochrome and compensate their apparent
weight inside one fixed logo field; do not restore the former tabbed explorer.

## Local assets

- Brand: `public/images/brand/jazari-one-logo.svg`
- Phone frame: `public/images/iphone-12-pro-graphite.webp`
- Hero video: `public/videos/jazari-app.mp4`
- Screens:
  - `public/images/screens/home.webp`
  - `public/images/screens/amount-entry.webp`
  - `public/images/screens/send-success.webp`
- Jazari icons: `public/images/features/*.webp`
- Current capability icons: `public/images/features/new/*.webp`
- Audience photography: `public/images/audience/*.webp`
- Monochrome technology/network SVGs: `public/images/rails/*`
- Official white Visa mark: `public/images/brand/visa-white.svg`

The current card is generated in code.

## Technical stack

- Next.js 16 with static export for GitHub Pages
- React 19
- TypeScript
- Locally bundled Instrument Serif for editorial display type
- Locally bundled Inter Variable for interface copy and Geist Mono only where
  code-like article metadata benefits from it
- `@paper-design/shaders-react`
- `glimm` for the closing gradient sweep
- Plain modular CSS for layout, shared pointer-card borders, and transitions
- Playwright for interaction and visual regression checks

GitHub Pages is the canonical and only deployment target. Local development
uses `next dev`, so the development and deployment paths use the same framework.
There is no Cloudflare Worker, Vinext/Vite runtime, Tailwind layer, D1 database,
or Drizzle ORM. Every production build uses Next.js static export; there is no
server-start path. The download/waitlist form remains front-end demo state.

Key files:

- `app/page.tsx` — thin homepage entry
- `app/home/HomeContent.tsx` — shared homepage state and composition
- `app/home/SiteHeader.tsx` — shared homepage, Blog, and article navigation
- `app/home/SiteFooter.tsx` — shared legal, store, and brand footer
- `app/pricing/PricingPage.tsx` — no-tier public pricing page
- `app/home/useVisualPreferences.ts` — persisted color and field preferences
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
- All presentational card hover behavior belongs to
  `app/styles/interactions.css`; do not implement one-off cursor glows inside
  section styles.
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
- Glimm is allowed only for the closing Citrus sweep. Do not use it as a global
  page-load effect or on ordinary cards.
- Do not drive pointer tilt through React state on every move; write the small
  normalized pointer values directly to CSS custom properties.
- Presentational cards may use only a subtle pointer tilt and cursor-localized
  masked border color; functional controls should stay visually still.
- Keep images in their visual column; never position them over copy.
- Test desktop, tablet, and narrow mobile layouts after structural changes.

## Current visual language

- Color profiles use coherent dark foundations and bright, restricted accent
  families. Each profile may adjust the background and surfaces, but should
  remain internally consistent rather than mixing unrelated hues.
- The independent field switcher offers Horizon, Orbital, Ribbon, and Beam.
  Field shape and color profile are separate persisted preferences.
- CTA buttons are pill-shaped, use Title Case, contain no decorative glyphs,
  and use one shared “realism” treatment: shallow material depth, an inner
  highlight, soft accent glow, cursor-position response, and a short light
  pass on hover. Keep the movement restrained and never let it displace copy.
- Header controls and content cards do not use decorative strokes.
- Benefit rows place the description directly below the title and use spacing,
  not separator rules, to establish rhythm.
- The three transfer steps behave as one borderless segmented control. Do not
  add helper labels such as “View screen” or “Showing screen.”
- The FX preview is deliberately sparse: no “FX preview” heading label, no outer border, no
  internal separators, and one consistent Geist tabular style for currencies
  and values. `1 USD = destination value` is prominent; expected delivery is
  `2–5 minutes`. The two horizontal proof points use Instrument Serif values
  without underlines: `0% Hidden FX rate fee` and `0% Transaction fee`.
- The roadmap is a compact, text-only horizontal scroll-snap carousel
  controlled by round previous/next buttons. It has no timeline line, product
  image, or phase prefix. It follows the provider grid and precedes Blog. The
  current naming is `Roadmap`, `USD account`, `More countries`,
  `More yield strategies`, `VISA Virtual card`, and `Remit Now Pay Later`.
- The virtual card is code-generated with front, back, and four visible edge
  planes. It keeps only the Jazari One and Visa marks, uses a restrained
  cursor-position sheen, and supports drag and keyboard rotation.
- Theme keys stay stable for local-storage compatibility. Public names are
  Pure Black, Deep Graphite, Cobalt, Digital Cyan, Acid Lime, Solar Flare,
  Hot Coral, Ultraviolet, Signal Red, and Aurora Pulse. Aurora Pulse is the
  default; Pure Black and Deep Graphite remain deliberately neutral options.
  Their clean, bright fields reference Stripe’s palette discipline; do not add
  grain or muddy color mixing.
- Orbital is the default field shape. It uses a large fluid mesh plus a few
  masked, animated contour bands to suggest layered energy flow without noise.
- Beam uses two alternating animated light layers and numerous very small,
  irregularly drifting dust particles. Its lower fade must continue behind
  the phone without a visible horizontal seam.
- The download shader follows the pointer through CSS custom properties; keep
  the button compact and avoid adding icons.
- The homepage headline is `Your dollars, wherever you are` without a final
  period. Instrument Serif display text uses `-0.2px` letter spacing.
- The benefit list uses the supplied chrome dollar object for “Keep a dollar
  balance” and ends with “Access variable yield,” which links the product story
  to the dedicated Yields page.
- The FAQ belongs immediately after the “Your dollars should move with you”
  conversion section.
- The provider/network presentation is a balanced five-column desktop grid,
  collapsing to three and two columns. Each card shows only the service
  name and description. Wordmarks and symbols occupy a fixed visual slot, stay
  monochrome, and are optically normalized; Bridge omits its subsidiary line,
  while Gauntlet and Base use mark-only artwork.
- Blog index and every article use the same header and footer components as the
  homepage. The homepage Blog chapter shows “All Articles” beside its heading.
- The Blog index presents seven articles without read-time labels. Article
  pages use visible breadcrumbs, one left-aligned reading column, no “At a
  glance”/“Before confirming” cards, and a “Ready to join Jazari One?” CTA.
- Footer copy uses Inter and the official CDN-supplied Apple and Google badge
  artwork. It uses a normal multi-column layout without separator rules and
  links directly to Jazari’s official Terms and Privacy Policy. Cookie
  Preferences is currently a clearly mocked local modal.
- Pricing has no tiers. It is one combined surface divided by restrained
  separators, ordered `Money movement`, `Accounts`, then `Cards`; the group
  headings have no explanatory subtitles. It lists no foreign exchange,
  stablecoins at a $1 network fee, local payout with no hidden FX margin and no
  transfer fee, and USD/GBP/EUR accounts plus the Visa virtual card as coming
  soon.
- `/yields/` explains variable onchain yield and the current Gauntlet USD Alpha
  strategy. The displayed `4.66%` is an illustrative, variable APY supplied by
  Jazari, not a guaranteed quote. The page must keep its explicit principal,
  liquidity, stablecoin, smart-contract, oracle, bridge, collateral, and
  withdrawal-delay disclosures. It also points to the `More yield strategies`
  roadmap milestone.
- The visual preference hook must load persisted theme and field choices
  before writing defaults back to local storage; do not reintroduce the
  mount-time overwrite race.

## Reference direction

- Bridge header and shallow top-motion discipline: https://www.bridge.xyz/
- Stripe editorial communication and interactive story rhythm:
  https://stripe.com/
- Paper shaders: https://shaders.paper.design/
- Recent web-design references: https://recent.design/websites
- Original Jazari behavior/assets: https://jazari.xyz/
- Framer Realism Button material and hover reference:
  https://www.framer.com/community/marketplace/components/realismbutton/
- Gauntlet USD Alpha strategy and risk reference:
  https://www.gauntlet.xyz/gauntlet-strategies/gtusda
