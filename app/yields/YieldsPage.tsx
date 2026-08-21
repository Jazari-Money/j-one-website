"use client";

/* eslint-disable @next/next/no-img-element -- local provider artwork */

import "../styles/yields-page.css";
import { AccordionList } from "../home/AccordionList";
import { ContainedColorEvent } from "../home/ContainedColorEvent";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { resetPointer, trackPointer } from "../home/hooks";
import { appDownloadUrl, withBasePath } from "../site-paths";

const questions = [
  {
    question: "What are Yields?",
    answer:
      "Yields are variable returns earned by placing funds into a financial strategy. They are not fixed, can change daily with market demand, and can fall close to zero. A lower rate reduces earnings; the separate investment risks can also affect principal.",
  },
  {
    question: "Where do Yields come from?",
    answer:
      "They come from demand for borrowing funds across the markets used by the strategy. More demand can increase returns; less demand can reduce them. The strategy may rebalance as opportunities and risk conditions change.",
  },
  {
    question: "What is APY?",
    answer:
      "Annual Percentage Yield is an annualized estimate based on the current rate and compounding assumptions. It is forward-looking, not guaranteed, and can change daily.",
  },
  {
    question: "Why does the rate change?",
    answer:
      "Borrowing demand, liquidity, market conditions, and strategy allocation all move over time. That is why the APY you see is a variable snapshot rather than a promise.",
  },
  {
    question: "Who manages the strategy?",
    answer:
      "Gauntlet independently curates and manages Gauntlet USD Alpha. Gauntlet is a risk-management firm, not a bank and not Jazari One. You access the strategy through Jazari.",
  },
  {
    question: "How do I add funds?",
    answer:
      "Choose an amount of USDC from your balance, then review the strategy, current APY, network costs, and risk notice before you confirm. The app shows the funding route you can use.",
  },
  {
    question: "Can I withdraw?",
    answer:
      "You can normally withdraw without a fixed lock-up period. Processing can take longer during high network congestion, low liquidity, heavy vault activity, or market stress.",
  },
  {
    question: "What are the risks?",
    answer:
      "This is a risky investment, not a savings account or guaranteed return. Funds are not deposit-insured. APY can fall close to zero, withdrawals can be delayed, stablecoins can lose their peg, and smart-contract, oracle, liquidity, bridge, and borrower-collateral failures can cause partial or total loss.",
  },
] as const;

export function YieldsPage() {
  return (
    <main className="yields-shell">
      <InternalSiteHeader />

      <header className="yields-hero">
        <h1>Yields</h1>
        <p>
          Put your balance to work through independently managed
          onchain strategies. Rates adjust daily and returns are never guaranteed.
        </p>
      </header>

      <section
        className="yield-feature pointer-card"
        aria-labelledby="yield-strategy-title"
        onPointerMove={trackPointer}
        onPointerLeave={resetPointer}
      >
        <div className="yield-strategy-copy">
          <img
            src={withBasePath("/images/rails/gauntlet.svg")}
            alt="Gauntlet"
            width="240"
            height="96"
            loading="lazy"
            decoding="async"
          />
          <h2 id="yield-strategy-title">Gauntlet USD Alpha</h2>
          <p>
            An independently managed, Base-based strategy that reallocates
            across stablecoin opportunities while monitoring liquidity,
            stablecoin, and smart-contract risk.
          </p>
          <a href="https://www.gauntlet.xyz/gauntlet-strategies/gtusda" target="_blank" rel="noreferrer">
            Learn more
          </a>
        </div>
        <div className="yield-rate">
          <strong>4.66%</strong>
          <span>Variable APY</span>
          <small>Illustrative rate supplied by Jazari · updated daily</small>
        </div>
        <dl className="yield-facts">
          <div>
            <dt>Funding assets</dt>
            <dd>USDC</dd>
          </div>
          <div>
            <dt>Access</dt>
            <dd>Add or withdraw funds at any time</dd>
          </div>
          <div>
            <dt>Protection</dt>
            <dd>Not deposit-insured</dd>
          </div>
        </dl>
      </section>

      <section className="yield-questions" aria-labelledby="yield-questions-title">
        <header>
          <h2 id="yield-questions-title">How Yields work</h2>
          <p>Read this before adding funds.</p>
        </header>
        <AccordionList items={questions} />
      </section>

      <ContainedColorEvent className="yield-roadmap" labelledBy="yield-cta-title">
        <div className="color-event-cta-copy">
          <h2 id="yield-cta-title">Ready to open Yields?</h2>
          <p>Review the current Yields strategy and risks, then continue in the Jazari app.</p>
        </div>
        <a
          className="realism-button"
          href={appDownloadUrl}
          target="_blank"
          rel="noreferrer"
          onPointerMove={trackPointer}
          onPointerLeave={resetPointer}
        >
          Download App
        </a>
      </ContainedColorEvent>

      <SiteFooter />
    </main>
  );
}
