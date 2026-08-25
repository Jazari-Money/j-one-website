# Jazari One website context

Last updated: 2026-08-22

## Product

Jazari One is presented as a global digital-dollar account for people whose
money crosses borders. The core story is:

- Hold supported digital dollars.
- Receive eligible client and platform payments.
- Send through supported local bank routes.
- Review the reference rate, applicable cost, estimated recipient amount, and
  expected timing before confirming.

Current hero line:

> Use dollars. Anywhere.

Current hero description:

> Hold them. Send them. Grow them.

## Current public baseline

- Canonical deployment: `https://jazari-money.github.io/j-one-website/`
- Canonical branch: `main`
- Deployment: GitHub Pages through `.github/workflows/pages.yml`
- The site is statically exported with the `/j-one-website` base path.
- `context.md` is the canonical handoff document for product, design, content,
  legal-draft, mobile, and deployment decisions. Update it after material
  structural or claim changes.

### About us

`/about/` is an editorial company page with one H1 and three H2 chapters:

1. `About us` — page H1
2. `Manifesto`
3. `Built in the United States and UAE`
4. `Our partners`

The page begins with the title and founders photo, followed by the Manifesto.
The Manifesto itself ends in this order:

1. Normal body paragraph: `So you can focus on your needs, your goals, your
   people, and your dreams.`
2. Emphasized signoff: `— Alex and Has, founders of Jazari One`

The founders photo is the supplied 3072×2048 source converted to a 2560×1707
WebP for near-2× desktop rendering. Keep it directly below the page title and
above the Manifesto copy.

The registered-business cards contain no `United States entity` or `UAE
entity` prefix. Their company names use the editorial serif:

- `Jazari One, Inc.` — Registered in Dover, Delaware, United States.
- `Jazari Fintech Services — FZCO` — Registration #78870 · Dubai Silicon
  Oasis, UAE.

`Our partners` shows Bridge, Privy, Gauntlet, and Lido. The `See all partners`
pill sits opposite the H2, including at 390px. It links to `/partners/`.

### US Terms and Conditions

`/terms/` contains `US Terms and Conditions`, Version 1, effective
21 April 2026. It is a 30-section document with:

- a named, scrollable Contents index;
- semantic definition and fee tables;
- federal, state, remittance, RNPL, privacy, arbitration, KYC, and contact
  sections;
- FinCEN MSB Registration No. `MRX26-00006547` as supplied by the user.

The document deliberately preserves unconfirmed placeholders, including:

- `[US Issuer / Regulated Partner]`
- `[US Issuer Address - to be confirmed]`
- `[US Lending Partner - to be confirmed]`
- `[US Address - to be confirmed]`
- `$[X]` fee values

Do not fill, infer, normalize, or silently remove these placeholders. The
draft also contains partner licence, state disclosure, FDIC, lending, and
regulatory statements that require legal approval before production launch.
Treat the supplied wording as legal-draft source text, not independently
verified fact.

## Important claim guardrails

These claims require product/legal confirmation before a public launch:

- The homepage’s “30+ receiving countries” and “Available in 190+ countries”
  coverage claims.
- The displayed 0% / $0 Jazari transaction fee.
- Which assets and networks are live in the Jazari product.
- Formal “partner” status for Bridge, Privy, Gauntlet, Lido,
  ComplyAdvantage, Sumsub, Tether, or Circle.
- Visa issuance, card availability, card terms, and eligible countries.
- RNPL limits, pricing, eligibility, repayment terms, and credit disclosures.
- The exact licensed entity holding customer funds.
- FinCEN MSB Registration No. `MRX26-00006547`.
- Every partner licence, state-specific disclosure, FDIC statement, lending
  statement, address, fee, and timeline in the Version 1 US Terms.

The homepage currently uses the approved heading “Partners & Networks.”
Commercial relationship wording still requires confirmation before launch.

## User’s enduring design preferences

- Premium, restrained, editorial, and direct; Stripe, Bridge, OpenAI, and
  Airbnb are the quality bar.
- Dark, spacious layouts with large white serif display type.
- Supporting copy immediately below the headline.
- No kicker/eyebrow labels above homepage section headlines.
- No noisy background grid, busy rays, or cheap multi-color gradients.
- The production hero uses a two-second edge-to-edge color event: a vermilion
  lead, amber core, and deep-teal wake resolve into sparse ivory stars with a
  restrained warm memory at the lower edge.
- Hero copy begins as the spectral band crosses center at 1 second; supporting
  copy follows at 1.28 seconds, the CTA at 1.43 seconds, and the phone at 2.05
  seconds. Preserve these timings unless the whole sequence is redesigned.
- Hero dust never responds to the pointer. Its fine and near layers drift
  continuously from right to left at 9.5px/s and 12.5px/s respectively, with
  no vertical wandering.
- Hero shaders should remain masked and atmospheric after their intro event.
- Keep the original Jazari One app video inside the local phone frame.
- CTA buttons use text only: no arrows, icons, or decorative glyphs.
- The primary CTA uses Jazari Lime’s fluid shader and follows the pointer
  quietly.
- Do not use green status dots. “LIVE” is a typographic mark.
- Do not use separator rules between whole sections. Internal ledger/list
  boundaries are acceptable.
- Product screenshots stay upright and must never overlap headings.
- Product phones float directly on the page with a restrained halo; do not put
  them inside large colored rounded-rectangle plates.
- Cards use a low-amplitude shared 3D pointer response and a cursor-localized
  masked gradient border. Never put a radial glow inside the card surface.
- Supporting descriptions use a readable 15px size, with the primary transfer
  review description enlarged to 18px. Footer navigation, legal
  copy, and company information use 12px.
- The homepage feature line uses the supplied dollar, planet, sprout, and zero
  icon set in that order. The sprout is the dedicated Yields icon.
- Blog cards do not show country or read-time prefixes above their headlines.
- Homepage persona and article-preview cards are capped at 500px on desktop.
- The first two homepage persona photos use a 30px lower crop within their
  cards; keep the card geometry and captions fixed.
- Homepage article cards use one shared title scale, a bottom readability tint,
  no image zoom, and a right-aligned action on the title baseline. The tint
  lives on its own layer so it does not conflict with the pointer-border mask.
- The transfer review opens the complete current list of 30 receiving countries
  with local country flags in an accessible modal from the amount preview. The
  modal action appears above the rate disclaimer.
- Desktop transfer factoids begin 180px below the review description.
- The Yields walkthrough has one “Learn more about Yields” action below its
  steps, rather than repeating an action inside each step.
- Mobile Coming soon cards never use edge-dimming overlays. Flag and card art
  occupy a contained bottom zone and must not overlap text. The standalone
  `/roadmap/` cards share one mobile height and one title/body/art architecture.
- The live USD account page uses the supplied transparent USA flag artwork in
  its own visual column with a bottom mask gradient; keep it clear of the copy
  and account-details table.
- Pointer-card highlights fade from their last cursor position on leave; they
  must not jump back to the card center before disappearing.
- Third-party/network marks are monochrome and optically normalized by visual
  mass rather than assigned one identical numeric size.
- Avoid repeated generic bento-card layouts.
- Prefer interactive editorial ledgers, tabs, accordions, and vertical stories.

## Current page architecture

1. Bridge-inspired full-width fixed header
2. Hero with shallow masked mesh shader and the supplied, bottom-faded Jazari
   main-app screen using responsive AVIF/WebP sources
3. Revealing editorial capability ledger using the supplied Jazari icon assets,
   including the live USD-account claim and dedicated Yields icon
4. Interactive How It Works with Receive, Send, and Yields scenarios; each
   scenario contains three steps and one upright phone at a time
5. FX/review experience integrated inside How It Works
6. Static audience/use-case stories
7. Compact horizontal Coming soon roadmap with contained product artwork:
   - Visa card
   - Additional payout countries
   - Higher-return Yields
   - Remit Now Pay Later
8. Homepage Blog preview with the four latest guides and dedicated corridor imagery
9. Partner preview linking to the complete partners and networks page
10. FAQ
11. Compact legal/product footer with Product, Explore, Legal, and Support
    groups; official iOS and Android store badges; social links; and both UAE
    and US entities

## Component board

- `/storyboard` is a deliberately unlinked, `noindex` review surface.
- It renders the real production components and tokens rather than maintaining
  separate mock copies.
- The board uses stable numbered anchors:
  01 Foundations, 02 Actions, 03 Hero, 04 Benefit Ledger,
  05 Transfer Experience, 06 Persona Cards, 07 Partner Grid, 08 Roadmap,
  09 Article Cards, 10 FAQ, 11 Closing CTA, and 12 Footer.
- Use those numbers and names in review notes so component-level iterations can
  be discussed and implemented without ambiguity.

Do not reintroduce separate FX, clarity, Card, or RNPL promo sections. Their
content is intentionally consolidated.

## Main interactions

### Header

- Transparent full-width bar at the top.
- Adds a translucent blurred background after scrolling; no persistent hairline.
- Desktop navigation links are deliberately larger than supporting UI copy.
- Mobile uses Lucide-style burger and close icons. The open menu covers the
  viewport. It is split into two-column Product and Company groups. The
  Download App action and X, Instagram, and Facebook icons are anchored near
  the bottom without a separator above them. Terms & Conditions and Privacy
  Policy sit in the final bottom row. Cookie Preferences is not shown in the
  mobile menu.
- There is no public visual switcher. Every route uses the fixed Jazari Lime
  color system and the fixed Beam hero field.

### Visual profile

Jazari Lime tokens live in `app/styles/tokens.css`; the Beam mesh colors live
in `jazariVisualProfile` in `app/home/data.ts`. Root attributes are fixed in
`app/layout.tsx`. Do not reintroduce alternate palettes, shader choices,
localStorage preferences, or a header swatch.

### Download CTA

- The hero’s “Download App” shader CTA expands into an email field and
  text-only waitlist submit button while native distribution is staged.
- Header and closing CTAs scroll to and open the same form.
- This is currently a front-end demo state only; no backend persistence exists.

### How It Works

- Three accessible scenario tabs: Receive, Send, and Yields.
- Each scenario has three concise, task-specific steps.
- Arrow, Home, and End keys change scenarios and steps.
- All nine source screenshots use one equal-ratio local asset system, but only
  the active screenshot is mounted. Mobile assets are compressed and decoded
  asynchronously to stay below iOS Safari bitmap-memory limits. The first
  Receive screen uses the current main-app artwork with dedicated 320px and
  520px responsive variants, and its live USD-account step has no Coming soon
  badge.
- One upright, equal-ratio local screenshot is shown at a time.
- The scenario tabs form one quiet segmented control. Step tabs remain visually
  aligned with the phone stage at desktop and collapse into a compact mobile flow.
- The active phone uses a transparent, borderless stage with a localized glow
  and bottom fade—no background card or decorative ghost typography.
- At the mobile collapse breakpoint the order is scenario tabs, phone, then a
  three-item vertical step accordion. The active step shows its description;
  inactive steps remain collapsed. The phone and all three steps fit together
  at the audited 390×844 layout.
- FX conversion supports MXN, COP, BRL, and EUR through a custom accessible
  selector showing each country, circular flag, and currency code. Amounts use
  two decimals. The review leads with “Estimate what may arrive before you send,”
  keeps the delivery-time and transaction-fee proof points beside the copy,
  and keeps the live-rate partner disclaimer at the bottom of the card.

### Capability ledger

- Rows are static: no entrance reveal and no hover surface effect.
- The first row presents direct payments to a personal USD account as live and
  states `Available in 190+ countries.` The local-payout row exposes the
  `Receiving countries` modal entry point.
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

## Blog routes

- `/blog`
- `/blog/send-money-to-mexico`
- `/blog/send-money-to-brazil`
- `/blog/send-money-to-colombia`
- `/blog/send-money-to-europe`
- `/blog/compare-transfer-costs`
- `/blog/verify-recipient-details`
- `/blog/digital-dollars-bank-payouts`

The homepage shows the four latest guides. The Blog index shows all seven.
Mexico, Brazil, Colombia, and Europe use dedicated route imagery on the
homepage, Blog index, and article pages. Their content follows the supplied
briefs: SPEI/CLABE, Pix, Bre-B llave, and SEPA/IBAN respectively. Shared article
rendering lives in `app/blog/GuideArticle.tsx`.

The homepage Blog section and `/blog/` index share this description:
`Tips and guides to help you get the most from Jazari One. Something missing?
Tell us what you'd like to see`, with the final sentence linked to
`hello@jazari.xyz`.

Primary standalone product and support routes are `/plan/` (Pricing),
`/yields/`, `/usd-account/`, `/roadmap/`, `/partners/`, `/about/`, and
`/help/`. The USD account is a live product and must not be restored to the
Coming soon roadmap.

## Provider and network grid

The homepage and About page preview four partners:

- Bridge
- Privy
- Gauntlet
- Lido

The dedicated partners page additionally includes ComplyAdvantage for
transaction monitoring and Sumsub for KYC and identity verification. Its
second directory is titled `Supported networks`; USDT and USDC are described
as digital dollars pegged 1:1 with USD and issued by Tether and Circle,
respectively.

The dedicated partners page also includes the supported asset and network
reference grid.

Use neutral language. Do not imply every asset/network is already available on
every Jazari route. Keep the logos monochrome and compensate their apparent
weight inside one fixed logo field; do not restore the former tabbed explorer.

## Local assets

- Brand: `public/images/brand/jazari-one-logo.svg`
- Phone frame: `public/images/iphone-12-pro-graphite.webp`
- Homepage hero app image: `public/images/screens/j-one-app-main.png`, with
  360px, 720px, and 1080px AVIF/WebP derivatives
- First How It Works Receive screen: `public/images/how-to/how-to-receive-01.png`,
  with 320px and 520px AVIF/WebP derivatives of the current main-app artwork
- Yields capability icon: `public/images/features/yields-icon.png`
- Lido Yields wordmark: `public/images/rails/lido-white.svg`
- USD account flag: `public/images/roadmap/usa-flag.png`, with responsive
  AVIF/WebP derivatives
- Hero-lab video: `public/videos/jazari-app.mp4`
- Screens:
  - `public/images/screens/home.webp`
  - `public/images/screens/amount-entry.webp`
  - `public/images/screens/send-success.webp`
- Jazari icons: `public/images/features/*.webp`
- Current capability icons: `public/images/features/new/*.webp`
- Audience photography: `public/images/audience/*.webp`
- Monochrome technology/network SVGs: `public/images/rails/*`
- Official white Visa mark: `public/images/brand/visa-white.svg`
- Founders photo: `public/images/about/jazari-founders.webp`

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
- `app/yields/YieldsPage.tsx` — Gauntlet and Lido Yields options and risk FAQ
- `app/usd-account/UsdAccountPage.tsx` — live USD account product page
- `app/partners/PartnersPage.tsx` — service-partner and supported-network grids
- `app/help/page.tsx` — support contact page
- `app/home/data.ts` — fixed visual profile, currencies, and section content
- `app/home/*.tsx` — one focused component per homepage section
- `app/globals.css` — ordered stylesheet import chain
- `app/styles/*.css` — section, breakpoint, and token styles
- `app/layout.tsx`
- `app/blog/GuideArticle.tsx`
- `app/about/AboutPage.tsx` — Manifesto, registered entities, and partners
- `app/terms/page.tsx` — Version 1 US Terms and Conditions draft
- `context.md` — canonical project handoff and claim guardrails
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

- Jazari Lime is the only color profile: a pure-black foundation with the live
  product greens `#1ad959`, `#4eff9e`, `#21f668`, and `#4dff99`.
- Beam is the only hero field. It combines a restrained animated mesh, two
  alternating light layers, and irregular drifting dust without white
  hotspots or a visible seam behind the phone.
- CTA buttons are pill-shaped, use Title Case, contain no decorative glyphs,
  and use one shared “realism” treatment: shallow material depth, an inner
  highlight, soft accent glow, cursor-position response, and a short light
  pass on hover. Keep the movement restrained and never let it displace copy.
  Do not approximate Jazari Lime with yellow-green hues.
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
- The homepage Coming soon section is a compact horizontal scroll-snap
  carousel controlled by round previous/next buttons. Cards use restrained,
  contained artwork where available and never allow art to overlap copy. It
  has no timeline line or phase prefix. The current card naming is
  `Visa card`, `Additional payout countries`, `Higher-return Yields`, and
  `Remit Now Pay Later`. USD account is live and is not a roadmap card.
  The homepage carousel includes a `View All` entry point to `/roadmap/`,
  which presents every milestone in a compact responsive grid.
- The virtual card is code-generated with front, back, and four visible edge
  planes. It keeps only the Jazari One and Visa marks, uses a restrained
  cursor-position sheen, and supports drag and keyboard rotation.
- Alternate palette and shader keys no longer exist. The UI and automated
  tests must not expose a visual switcher or write visual preferences to
  localStorage.
- The closing download panel uses a compact vertical green beam with
  independently randomized green/yellow dust. Keep the action neutral,
  compact, and icon-free.
- The homepage headline is `Use dollars. Anywhere.` and the supporting line is
  `Hold them. Send them. Grow them.`
- The benefit list contains four concise claims: direct payments to a USD
  account available in 190+ countries, send to 30+ countries in local
  currency, earn up to 7% APY with Yields, and no transfer or hidden fees. The
  four desktop items share one centered four-column row. The Yields item uses
  the supplied sprout icon rather than the former plus icon.
- The FAQ belongs immediately after the “Your dollars should move with you”
  conversion section.
- The provider/network presentation is a balanced five-column desktop grid,
  collapsing to three and two columns. Each card shows only the service
  name and description. Wordmarks and symbols occupy a fixed visual slot, stay
  monochrome, align to the top of that slot with equal outer padding, and are
  optically normalized; Bridge uses a true vector wordmark without its
  subsidiary line, while Gauntlet and Base use mark-only artwork.
- Blog index and every article use the same header and footer components as the
  homepage. The homepage Blog chapter shows “All Articles” beside its heading.
  The homepage and Blog index repeat the approved tips-and-guides description
  with a mailto link for suggested topics.
  The Mexico preview and article use the local `mexico-transfer.webp` editorial
  image with no tint overlay.
- The Blog index headline follows the same display scale as Pricing. Homepage
  article previews keep a clear gap between their title and `Read Article`
  button; buttons must never touch or overlap their title.
- The Blog index presents seven articles without read-time labels. Article
  pages use visible breadcrumbs, one left-aligned reading column, no “At a
  glance”/“Before confirming” cards, and a “Ready to join Jazari One?” CTA.
- Footer copy uses Inter and the official CDN-supplied Apple and Google badge
  artwork. It uses a tight multi-column layout without separator rules. The
  Support group contains FAQ, Help, and the intentionally supplied footer
  address `hello@jazary.xyz`; the Help page uses `hello@jazari.xyz`. The
  parent entity address, FinCEN registration, FZCO address, and subsidiary line
  stack in that order, with each entity and address composed as one inline
  sentence. A larger break separates those lines from the compact four-item
  disclosure. On desktop, the store badges sit directly above copyright and
  copyright aligns with the final disclosure row. Do not add a decorative
  metallic wordmark or 3D closing object below the footer.
  Terms & Conditions, Privacy Policy, and UK Risk Information are internal
  pages at `/terms/`, `/privacy-policy/`, and `/uk-risk-information/`, using a
  shared responsive legal-reading layout. Terms is the supplied Version 1 US
  document effective 21 April 2026; Privacy remains the April 2026 document;
  UK Risk Information preserves the five FCA-prescribed risk sections and
  directs complaints to `hello@jazari.xyz`. The legal heroes display date
  metadata but no reading-time estimate. Terms section titles and Contents
  links use sentence case. On desktop, all three legal documents
  place the reading column on the left and the sticky Contents index on the
  right; narrow screens retain a single-column layout. The shared
  footer links to all three pages and carries the four-item site-wide risk
  disclosure below the entity addresses. Cookie Preferences opens the shared
  consent modal. The global consent controller stores only the necessary
  `jazari_cookie_consent` cookie for one year, denies analytics by default, and
  loads direct GA4 only after an explicit grant. The GA measurement ID is
  supplied at build time and the consent logic never sets a cookie domain.
- Pricing has no tiers. It is one combined surface ordered `Money movement`,
  `Account`, then `Yields`; section boundaries are established through spacing,
  not full-width rules, while row separators remain short, inset, and faint.
  The description is `Preview pricing. Applicable fees are always shown at
  confirmation.` Bank payouts show `Free · FX Rate`; Gauntlet USD Alpha is
  `Free`; and `Deposit and withdrawal` shows `~$0.01*` with a footnote that the
  exact network cost varies by value and is typically only a few cents.
- `/yields/` explains variable onchain yield and presents two independently
  managed options: Gauntlet USD Alpha at `4.66% APY` and Lido EarnUSD at `7%
  APY`. Both cards use the simple `APY` label, with no `Variable APY` label or
  Jazari illustrative-rate note. Lido uses the supplied white logotype and
  links to `https://stake.lido.fi/earn/usd/deposit`. Risk information lives in
  the expandable `How Yields work` answers rather than a duplicated standalone
  risk section. The page ends with `Ready to open Yields?` and a `Download App`
  action.
- `/usd-account/` uses the shared internal-page hero scale and rhythm. Its
  description combines the personal-account, licensed US bank partner, and
  ACH/FedNow/domestic-wire/SWIFT copy. A Pricing-style `What's included` table
  sits before the Download App action, while the transparent flag occupies a
  separate column and fades at the bottom. Do not reintroduce `Available now`
  or `Receive in dollars` labels.
- Visual styling is deterministic: `data-theme="jazari"` and
  `data-shader="beam"` are fixed at the root and on the homepage composition.
- The legal documents use a named vertical `Contents` sidebar on desktop with
  the document body on its right. On narrow layouts the same named links wrap
  above the document. Never replace the names with an unexplained numbered
  horizontal rail.
- Pricing, Yields, USD account, Roadmap, and Blog share one internal-page hero system:
  identical container width, top rhythm, display scale, and description style.
  Their functional cards use neutral charcoal surfaces rather than
  theme-tinted green panels.
- The shared CTA is a compact dark material pill. Its label is semibold and
  its border highlight follows the pointer; avoid broad white gradients or
  oversized padding.
- Neutral controls—including roadmap navigation, article links, FAQ toggles,
  and closing CTAs—share one dark material pill with a quiet inner top
  highlight. They do not show a green outline in the resting state.
- Card hover lighting stays local to the pointer: a thin edge highlight may
  travel around the hovered card, but it must not cast a broad glow across the
  card or reflect onto adjacent cards.
- The Beam hero shader should preserve dark negative space while animated
  light layers and sparse dust move through the Jazari Lime field. Suppress
  white hotspots, radial orbs, muddy bloom, and alternate field shapes.
- The homepage uses the Garden of Code loading rhythm: it begins on black,
  holds for roughly 90ms, then reveals the header, beam, copy, CTA, and phone
  in a short stagger. Do not add a splash screen or blocking loader.
  Hero dust uses deterministic but irregular positions, sizes, drift vectors,
  durations, and delays so visual output stays testable without forming a grid.
- Footer metadata has no separator rules. Copyright aligns to the right.
- The local Bridge asset is a path-traced vector made from the standalone
  wordmark embedded by Bridge’s official site. Do not synthesize the lettering
  or restore the “a stripe company” subline in provider cards.
- The homepage Mexico article is an image-led card: the editorial image fills
  the complete surface, with the title and action anchored over a restrained
  bottom gradient.
- FAQ fallback contact copy belongs in the left introduction column beneath
  the FAQ description, not underneath the accordion.
- The FX preview uses the same visible charcoal card family as the provider
  grid. It should read as a distinct surface even on a pure-black background.

## Reference direction

- Bridge header and shallow top-motion discipline: https://www.bridge.xyz/
- Stripe editorial communication and interactive story rhythm:
  https://stripe.com/
- Paper shaders: https://shaders.paper.design/
- Recent web-design references: https://recent.design/websites
- Original Jazari behavior/assets: https://jazari.xyz/
- Framer Realism Button material and hover reference:
  https://www.framer.com/community/marketplace/components/realismbutton/
- Unicorn Studio’s layered volumetric-light and interactive shader direction:
  https://www.unicorn.studio/
- Gauntlet USD Alpha strategy and risk reference:
  https://www.gauntlet.xyz/gauntlet-strategies/gtusda
- Lido EarnUSD entry point:
  https://stake.lido.fi/earn/usd/deposit

## Hero Lab (internal)

- `/hero-lab/` is an unlinked, `noindex` comparison sandbox with ten working
  hero direction studies at `/hero-lab/01/`–`/hero-lab/10/` plus a
  side-by-side `/hero-lab/compare/` view. It exists to choose the next
  production hero direction; it does not touch the live homepage.
- Composition quota across the ten studies: four rounded-container scenes,
  four edge-to-edge scenes, two hybrids that break their container.
- Code lives in `app/hero-lab/` (registry in `lab-data.ts`, one component per
  study in `variants/`, raw-WebGL/Canvas hosts in `gl/`). Styles live in
  `app/styles/hero-lab-runtime.css`. No new dependencies: scenes use
  hand-written GLSL fragment shaders and Canvas 2D.
- Lab controls: replay intro, play/pause, forced reduced motion, intensity
  (0.4–1.5), cursor reaction toggle, desktop/mobile preview frame. Settings
  persist in localStorage under `jazari-hero-lab-settings`.
- Runtime discipline: only the open study renders a live scene (overview cards
  are static CSS previews), DPR is capped, RAF stops in hidden tabs and when
  paused, WebGL contexts are released when a canvas actually leaves the DOM
  (guarding React StrictMode remounts), and every scene has a static no-WebGL
  fallback plus reduced-motion states.
- The in-lab mobile preview is driven by container queries on `.hlab-frame`
  (`@container herostage`), which mirror the `max-width: 620px` media block —
  keep the two in sync when editing responsive rules.
