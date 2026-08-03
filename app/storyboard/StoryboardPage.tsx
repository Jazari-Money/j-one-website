"use client";

/* eslint-disable @next/next/no-img-element -- component board uses exact local production artwork */

import "../styles/storyboard-page.css";
import {
  type CSSProperties,
  type ReactNode,
  useMemo,
  useState,
} from "react";
import { AccordionList } from "../home/AccordionList";
import {
  currencies,
  features,
  guides,
  type CurrencyCode,
} from "../home/data";
import { resetPointer, trackPointer } from "../home/hooks";
import { withBasePath } from "../site-paths";

const catalog = [
  ["typography", "Typography"],
  ["buttons", "Buttons"],
  ["icon-buttons", "Icon buttons"],
  ["links", "Links"],
  ["fields", "Fields & values"],
  ["dropdowns", "Dropdowns"],
  ["segments", "Segmented controls"],
  ["lists", "Lists & rows"],
  ["accordions", "Accordions"],
  ["cards", "Cards"],
  ["badges", "Badges & media"],
] as const;

const accordionItems = [
  {
    question: "What does the recipient receive?",
    answer:
      "The app shows the destination currency, expected amount, and delivery time before you confirm.",
  },
  {
    question: "How are rates and fees shown?",
    answer:
      "The live rate and any applicable cost stay together on the review screen.",
  },
] as const;

const pricingRows = [
  ["Receive stablecoins", "Free"],
  ["Send to a bank account", "Free · rate includes our margin"],
  ["Send to a wallet", "Free over $10 · $1 below $10"],
] as const;

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function StoryLabel({
  number,
  name,
  note,
}: {
  number: string;
  name: string;
  note: string;
}) {
  return (
    <header className="story-label">
      <span>{number}</span>
      <div>
        <h2>{name}</h2>
        <p>{note}</p>
      </div>
    </header>
  );
}

function Specimen({
  label,
  kind,
  children,
  className = "",
}: {
  label: string;
  kind: "desktop" | "mobile";
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`sb-specimen sb-${kind} ${className}`}>
      <div className="sb-specimen-label">
        <span>{label}</span>
        <code>{kind === "desktop" ? "1440+" : "390"}</code>
      </div>
      <div className="sb-specimen-stage">{children}</div>
    </article>
  );
}

function ViewportPair({
  desktop,
  mobile,
  desktopLabel = "Desktop",
  mobileLabel = "Mobile",
  className = "",
}: {
  desktop: ReactNode;
  mobile: ReactNode;
  desktopLabel?: string;
  mobileLabel?: string;
  className?: string;
}) {
  return (
    <div className={`sb-viewport-pair ${className}`}>
      <Specimen label={desktopLabel} kind="desktop">
        {desktop}
      </Specimen>
      <Specimen label={mobileLabel} kind="mobile">
        {mobile}
      </Specimen>
    </div>
  );
}

function ButtonSet({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`sb-button-set ${compact ? "is-compact" : ""}`}>
      <button
        className="realism-button sb-button"
        type="button"
        onPointerMove={trackPointer}
        onPointerLeave={resetPointer}
      >
        Download App
      </button>
      <button className="neutral-control sb-button" type="button">
        Read Article
      </button>
      <button className="neutral-control sb-button" type="button" disabled>
        Coming soon
      </button>
    </div>
  );
}

function IconButtonSet({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`sb-icon-button-set ${compact ? "is-compact" : ""}`}>
      <button className="realism-icon-button sb-icon-button" type="button" aria-label="Previous">
        <ArrowIcon direction="left" />
      </button>
      <button className="realism-icon-button sb-icon-button" type="button" aria-label="Next">
        <ArrowIcon />
      </button>
      <button className="neutral-control sb-icon-button" type="button" aria-label="Expand">
        <PlusIcon />
      </button>
      <button className="neutral-control sb-menu-button" type="button" aria-label="Open menu">
        <span />
        <span />
        <span />
      </button>
    </div>
  );
}

function LinkSet({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`sb-link-set ${compact ? "is-compact" : ""}`}>
      <a className="sb-nav-link" href="#story-links">Personal</a>
      <a className="sb-inline-link" href="#story-links">Email us</a>
      <a className="sb-article-link" href="#story-links">All Articles</a>
      <a className="sb-footer-link" href="#story-links">Privacy Policy</a>
    </div>
  );
}

function CurrencyField({
  amount,
  currency,
  open,
  compact = false,
  onCurrency,
  onOpen,
}: {
  amount: string;
  currency: CurrencyCode;
  open: boolean;
  compact?: boolean;
  onCurrency: (value: CurrencyCode) => void;
  onOpen: (value: boolean) => void;
}) {
  const active = currencies[currency];

  return (
    <div className={`sb-currency-field ${compact ? "is-compact" : ""}`}>
      <span className="sb-field-label">Recipient gets</span>
      <div className="sb-currency-row">
        <strong className="numeric">{amount}</strong>
        <button
          className="sb-currency-trigger neutral-control"
          type="button"
          aria-expanded={open}
          onClick={() => onOpen(!open)}
        >
          <img src={active.flag} alt="" />
          <span>{currency}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="m4 6 4 4 4-4" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="sb-currency-menu" role="listbox" aria-label="Recipient currency">
          {(Object.keys(currencies) as CurrencyCode[]).map((code) => (
            <button
              type="button"
              role="option"
              aria-selected={code === currency}
              className="sb-currency-option"
              key={code}
              onClick={() => {
                onCurrency(code);
                onOpen(false);
              }}
            >
              <img src={currencies[code].flag} alt="" />
              <span>{currencies[code].country}</span>
              <b>{code}</b>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PersonalDropdown({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`sb-personal-dropdown ${compact ? "is-compact" : ""}`}>
      <button className="sb-nav-link" type="button">
        Personal
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <div className="sb-personal-menu">
        <span>Personal</span>
        <a href="#story-dropdowns">Send</a>
        <a href="#story-dropdowns">Receive</a>
        <a href="#story-dropdowns">Yields</a>
        <a href="#story-dropdowns">Rates</a>
      </div>
    </div>
  );
}

function SegmentControl({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState("Receive");
  const options = ["Receive", "Send", "Yields"];

  return (
    <div className={`sb-segments ${compact ? "is-compact" : ""}`} role="tablist">
      <span
        className="sb-segment-slider"
        style={{ "--segment": options.indexOf(active) } as CSSProperties}
      />
      {options.map((option) => (
        <button
          type="button"
          role="tab"
          aria-selected={active === option}
          className={active === option ? "is-active" : ""}
          key={option}
          onClick={() => setActive(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function FeatureList({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={`sb-feature-list ${compact ? "is-compact" : ""}`}>
      {features.map((feature) => (
        <li key={feature.id}>
          <img src={feature.image} alt="" />
          <span>{feature.copy}</span>
        </li>
      ))}
    </ul>
  );
}

function PricingList({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`sb-pricing-list ${compact ? "is-compact" : ""}`}>
      <h3>Money movement</h3>
      {pricingRows.slice(0, compact ? 2 : 3).map(([name, value]) => (
        <div className="sb-pricing-row" key={name}>
          <span>{name}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function ArticleCard({ compact = false }: { compact?: boolean }) {
  const guide = guides[0];
  return (
    <a
      className={`sb-article-card pointer-card ${compact ? "is-compact" : ""}`}
      href={withBasePath(`/blog/${guide.slug}/`)}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
    >
      <img src={guide.image} alt="" />
      <div>
        <h3>{guide.title}</h3>
        <span className="neutral-control">Read Article</span>
      </div>
    </a>
  );
}

function PartnerCard({ compact = false }: { compact?: boolean }) {
  return (
    <article
      className={`sb-partner-card pointer-card ${compact ? "is-compact" : ""}`}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
    >
      <div className="sb-partner-mark">
        <img src={withBasePath("/images/rails/bridge.svg")} alt="Bridge" />
      </div>
      <h3>Bridge</h3>
      <p>Stablecoin, fiat, conversion, and payout infrastructure.</p>
    </article>
  );
}

function RoadmapCard({ compact = false }: { compact?: boolean }) {
  return (
    <article
      className={`sb-roadmap-card pointer-card ${compact ? "is-compact" : ""}`}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
    >
      <span className="sb-status">Coming soon</span>
      <h3>New receive countries</h3>
      <p>New local banking routes open as approvals are ready.</p>
      <ul>
        <li><img src={currencies.MXN.flag} alt="" />Mexico</li>
        <li><img src={currencies.COP.flag} alt="" />Colombia</li>
      </ul>
    </article>
  );
}

function YieldCard({ compact = false }: { compact?: boolean }) {
  return (
    <article
      className={`sb-yield-card pointer-card ${compact ? "is-compact" : ""}`}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
    >
      <img src={withBasePath("/images/rails/gauntlet.svg")} alt="Gauntlet" />
      <div>
        <span>Variable APY</span>
        <strong className="numeric">4.66%</strong>
      </div>
      <p>Gauntlet USD Alpha</p>
    </article>
  );
}

function TypographySpecimen({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`sb-type-stack ${compact ? "is-compact" : ""}`}>
      <div>
        <code>Display / Instrument Serif</code>
        <h1>Use dollars. Anywhere.</h1>
      </div>
      <div>
        <code>Section / Instrument Serif</code>
        <h2>Know what arrives</h2>
      </div>
      <div>
        <code>Interface / Inter</code>
        <h3>Transaction fee</h3>
      </div>
      <div className="sb-body-samples">
        <p className="is-lead">Clear information before every transfer.</p>
        <p>Final rates and delivery times are confirmed in the app.</p>
        <small>Updated daily · illustrative rate</small>
      </div>
      <div className="sb-number-sample">
        <strong className="numeric">4.66%</strong>
        <span>Variable APY</span>
      </div>
    </div>
  );
}

function BadgeSet({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`sb-badge-set ${compact ? "is-compact" : ""}`}>
      <div className="sb-chip-row">
        <span className="sb-status">Coming soon</span>
        <span className="sb-apy-chip">4.66% APY</span>
        <span className="sb-flag-chip"><img src={currencies.MXN.flag} alt="" />Mexico</span>
      </div>
      <div className="sb-store-row">
        <img src={withBasePath("/images/stores/app-store-badge.svg")} alt="Download on the App Store" />
        <img src={withBasePath("/images/stores/google-play-badge.png")} alt="Get it on Google Play" />
      </div>
      <div className="sb-social-row">
        <button className="realism-icon-button" type="button" aria-label="X">X</button>
        <button className="realism-icon-button" type="button" aria-label="Instagram">◎</button>
        <button className="realism-icon-button" type="button" aria-label="Facebook">f</button>
      </div>
    </div>
  );
}

export function StoryboardPage() {
  const [currencyDesktop, setCurrencyDesktop] = useState<CurrencyCode>("MXN");
  const [currencyMobile, setCurrencyMobile] = useState<CurrencyCode>("MXN");
  const [currencyDesktopOpen, setCurrencyDesktopOpen] = useState(true);
  const [currencyMobileOpen, setCurrencyMobileOpen] = useState(false);

  const convertedDesktop = useMemo(
    () => currencies[currencyDesktop].symbol + (1000 * currencies[currencyDesktop].rate).toLocaleString(),
    [currencyDesktop],
  );
  const convertedMobile = useMemo(
    () => currencies[currencyMobile].symbol + (1000 * currencies[currencyMobile].rate).toLocaleString(),
    [currencyMobile],
  );

  return (
    <main className="storyboard-page" data-theme="jazari" data-shader="beam">
      <header className="storyboard-intro">
        <div>
          <span>Atomic UI inventory</span>
          <h1>Jazari One<br />component board</h1>
        </div>
        <p>
          Production primitives only. Every family is shown at its intended
          desktop and mobile scale so each detail can be reviewed in isolation.
        </p>
      </header>

      <nav className="story-index" aria-label="Component board index">
        <ol>
          {catalog.map(([id, name], index) => (
            <li key={id}>
              <a href={`#story-${id}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {name}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section className="storyboard-story" id="story-typography">
        <StoryLabel number="01" name="Typography" note="Editorial, interface, body, metadata, and numeric roles." />
        <ViewportPair
          desktop={<TypographySpecimen />}
          mobile={<TypographySpecimen compact />}
        />
      </section>

      <section className="storyboard-story" id="story-buttons">
        <StoryLabel number="02" name="Buttons" note="Primary, neutral, and unavailable actions in their production proportions." />
        <ViewportPair
          desktop={<ButtonSet />}
          mobile={<ButtonSet compact />}
        />
      </section>

      <section className="storyboard-story" id="story-icon-buttons">
        <StoryLabel number="03" name="Icon buttons" note="Directional, disclosure, and menu controls with accessible labels." />
        <ViewportPair
          desktop={<IconButtonSet />}
          mobile={<IconButtonSet compact />}
        />
      </section>

      <section className="storyboard-story" id="story-links">
        <StoryLabel number="04" name="Links" note="Navigation, inline, article, and footer link treatments." />
        <ViewportPair
          desktop={<LinkSet />}
          mobile={<LinkSet compact />}
        />
      </section>

      <section className="storyboard-story" id="story-fields">
        <StoryLabel number="05" name="Fields & values" note="Amount entry, recipient result, labels, currency values, and read-only data." />
        <ViewportPair
          desktop={
            <div className="sb-field-stack">
              <label className="sb-amount-field">
                <span>You send</span>
                <span><input value="$1,000.00" readOnly aria-label="Amount" /></span>
              </label>
              <CurrencyField
                amount={convertedDesktop}
                currency={currencyDesktop}
                open={false}
                onCurrency={setCurrencyDesktop}
                onOpen={() => undefined}
              />
              <div className="sb-readonly-row"><span>Expected delivery</span><strong>2–5 minutes</strong></div>
            </div>
          }
          mobile={
            <div className="sb-field-stack">
              <label className="sb-amount-field is-compact">
                <span>You send</span>
                <span><input value="$1,000.00" readOnly aria-label="Amount" /></span>
              </label>
              <CurrencyField
                amount={convertedMobile}
                currency={currencyMobile}
                open={false}
                compact
                onCurrency={setCurrencyMobile}
                onOpen={() => undefined}
              />
              <div className="sb-readonly-row is-compact"><span>Delivery</span><strong>2–5 min.</strong></div>
            </div>
          }
        />
      </section>

      <section className="storyboard-story" id="story-dropdowns">
        <StoryLabel number="06" name="Dropdowns" note="Navigation and country-aware currency menus, shown open for review." />
        <ViewportPair
          desktop={
            <div className="sb-dropdown-pair">
              <PersonalDropdown />
              <CurrencyField
                amount={convertedDesktop}
                currency={currencyDesktop}
                open={currencyDesktopOpen}
                onCurrency={setCurrencyDesktop}
                onOpen={setCurrencyDesktopOpen}
              />
            </div>
          }
          mobile={
            <div className="sb-dropdown-pair is-mobile">
              <PersonalDropdown compact />
              <CurrencyField
                amount={convertedMobile}
                currency={currencyMobile}
                open={currencyMobileOpen}
                compact
                onCurrency={setCurrencyMobile}
                onOpen={setCurrencyMobileOpen}
              />
            </div>
          }
        />
      </section>

      <section className="storyboard-story" id="story-segments">
        <StoryLabel number="07" name="Segmented controls" note="Animated scenario selection with equal hit areas and clear active state." />
        <ViewportPair
          desktop={<SegmentControl />}
          mobile={<SegmentControl compact />}
        />
      </section>

      <section className="storyboard-story" id="story-lists">
        <StoryLabel number="08" name="Lists & rows" note="Feature statements, pricing rows, flags, values, and compact metadata." />
        <ViewportPair
          desktop={
            <div className="sb-list-grid">
              <FeatureList />
              <PricingList />
            </div>
          }
          mobile={
            <div className="sb-list-grid">
              <FeatureList compact />
              <PricingList compact />
            </div>
          }
        />
      </section>

      <section className="storyboard-story" id="story-accordions">
        <StoryLabel number="09" name="Accordions" note="The shared disclosure pattern in collapsed and expanded states." />
        <ViewportPair
          desktop={<AccordionList items={accordionItems} />}
          mobile={<AccordionList items={accordionItems} />}
        />
      </section>

      <section className="storyboard-story" id="story-cards">
        <StoryLabel number="10" name="Cards" note="Every production card family, with the same pointer-localized edge response." />
        <ViewportPair
          className="sb-card-pair"
          desktop={
            <div className="sb-card-grid">
              <ArticleCard />
              <PartnerCard />
              <RoadmapCard />
              <YieldCard />
            </div>
          }
          mobile={
            <div className="sb-card-grid">
              <ArticleCard compact />
              <PartnerCard compact />
              <RoadmapCard compact />
              <YieldCard compact />
            </div>
          }
        />
      </section>

      <section className="storyboard-story" id="story-badges">
        <StoryLabel number="11" name="Badges & media" note="Status, APY, country, store, social, and brand media primitives." />
        <ViewportPair
          desktop={<BadgeSet />}
          mobile={<BadgeSet compact />}
        />
      </section>
    </main>
  );
}
