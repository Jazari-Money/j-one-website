"use client";

import {
  type CSSProperties,
  useMemo,
  useState,
} from "react";
import { AudienceExplorer } from "../home/AudienceExplorer";
import { BenefitLedger } from "../home/BenefitLedger";
import { Blog } from "../home/Blog";
import { currencies, type CurrencyCode } from "../home/data";
import { FAQ } from "../home/FAQ";
import { Hero } from "../home/Hero";
import { HowItWorks } from "../home/HowItWorks";
import { NetworkExplorer } from "../home/NetworkExplorer";
import { ProductRoadmap } from "../home/ProductRoadmap";
import { SiteFooter } from "../home/SiteFooter";
import { SiteHeader } from "../home/SiteHeader";
import { resetPointer, trackPointer } from "../home/hooks";

const stories = [
  ["foundations", "Foundations"],
  ["actions", "Actions"],
  ["hero", "Hero"],
  ["benefits", "Benefit Ledger"],
  ["transfer", "Transfer Experience"],
  ["personas", "Persona Cards"],
  ["partners", "Partner Grid"],
  ["roadmap", "Roadmap"],
  ["articles", "Article Cards"],
  ["faq", "FAQ"],
  ["footer", "Footer"],
] as const;

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

export function StoryboardPage() {
  const [amount, setAmount] = useState("1,000.00");
  const [currency, setCurrency] = useState<CurrencyCode>("MXN");

  const converted = useMemo(() => {
    const number = Number.parseFloat(amount.replace(/,/g, ""));
    return Number.isFinite(number) ? number * currencies[currency].rate : 0;
  }, [amount, currency]);

  return (
    <main className="storyboard-page" data-theme="jazari" data-shader="beam">
      <SiteHeader mode="internal" />

      <section className="storyboard-intro">
        <span>Internal review surface</span>
        <h1>Jazari One<br />component board</h1>
        <p>
          The live production components, isolated and numbered for focused
          design review. This route is intentionally absent from the public navigation.
        </p>
      </section>

      <nav className="story-index" aria-label="Component board index">
        <ol>
          {stories.map(([id, name], index) => (
            <li key={id}>
              <a href={`#story-${id}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {name}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section className="storyboard-story story-foundations" id="story-foundations">
        <StoryLabel
          number="01"
          name="Foundations"
          note="The fixed Jazari Lime palette and the two production type voices."
        />
        <div className="foundation-stage">
          <div className="type-specimen">
            <p>Instrument Serif · Display</p>
            <strong>Your dollars, wherever you are</strong>
          </div>
          <div className="type-specimen is-sans">
            <p>Inter · Interface and body</p>
            <strong>Clear information before every transfer.</strong>
          </div>
          <div className="color-specimens" aria-label="Jazari Lime color tokens">
            <div style={{ "--sample": "#000000" } as CSSProperties}><span>Foundation</span><code>#000000</code></div>
            <div style={{ "--sample": "#0a0b0a" } as CSSProperties}><span>Surface</span><code>#0A0B0A</code></div>
            <div style={{ "--sample": "#1ad959" } as CSSProperties}><span>Jazari Green</span><code>#1AD959</code></div>
            <div style={{ "--sample": "#4eff9e" } as CSSProperties}><span>Highlight</span><code>#4EFF9E</code></div>
          </div>
        </div>
      </section>

      <section className="storyboard-story" id="story-actions">
        <StoryLabel
          number="02"
          name="Actions"
          note="Primary, secondary, and icon controls shown in their resting and interactive states."
        />
        <div className="action-stage">
          <button
            className="realism-button"
            type="button"
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            Download App
          </button>
          <button
            className="story-secondary pointer-card"
            type="button"
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            Read Article
          </button>
          <button
            className="realism-icon-button"
            type="button"
            aria-label="Next item"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </section>

      <section className="storyboard-story story-full" id="story-hero">
        <StoryLabel
          number="03"
          name="Hero"
          note="Beam field, editorial message, download action, product video, and phone mask."
        />
        <Hero />
      </section>

      <section className="storyboard-story story-full" id="story-benefits">
        <StoryLabel
          number="04"
          name="Benefit Ledger"
          note="Editorial introduction followed by the animated icon and value list."
        />
        <BenefitLedger />
      </section>

      <section className="storyboard-story story-full" id="story-transfer">
        <StoryLabel
          number="05"
          name="Transfer Experience"
          note="Keyboard-accessible segmented steps, changing app screens, fee proof, and FX preview."
        />
        <HowItWorks
          amount={amount}
          currency={currency}
          converted={converted}
          onAmount={setAmount}
          onCurrency={setCurrency}
        />
      </section>

      <section className="storyboard-story story-full" id="story-personas">
        <StoryLabel
          number="06"
          name="Persona Cards"
          note="Untinted photography, dedicated captions, and cursor-localized edge response."
        />
        <AudienceExplorer />
      </section>

      <section className="storyboard-story story-full" id="story-partners">
        <StoryLabel
          number="07"
          name="Partner Grid"
          note="Monochrome provider and network marks normalized to one visual system."
        />
        <NetworkExplorer />
      </section>

      <section className="storyboard-story story-full" id="story-roadmap">
        <StoryLabel
          number="08"
          name="Roadmap"
          note="Horizontal scroll-snap milestone cards and compact directional controls."
        />
        <ProductRoadmap />
      </section>

      <section className="storyboard-story story-full" id="story-articles">
        <StoryLabel
          number="09"
          name="Article Cards"
          note="One editorial lead story and three supporting entry points."
        />
        <Blog />
      </section>

      <section className="storyboard-story story-full" id="story-faq">
        <StoryLabel
          number="10"
          name="FAQ"
          note="Native disclosure behavior with focused pointer response."
        />
        <FAQ />
      </section>

      <section className="storyboard-story story-footer" id="story-footer">
        <StoryLabel
          number="11"
          name="Footer"
          note="Navigation, legal identity, store badges, and company metadata."
        />
        <SiteFooter />
      </section>
    </main>
  );
}
