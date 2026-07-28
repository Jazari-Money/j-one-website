"use client";

/* eslint-disable @next/next/no-img-element -- local provider artwork */

import Link from "next/link";
import { AccordionList } from "../home/AccordionList";
import { FlowField } from "../home/FlowField";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { resetPointer, trackPointer } from "../home/hooks";
import { withBasePath } from "../site-paths";

const questions = [
  {
    question: "What is yield?",
    answer:
      "Yield is the variable return earned by placing funds into a financial strategy. It is not fixed, can change daily with market demand, and can fall close to zero. A lower rate reduces earnings; the separate investment risks can also affect principal.",
  },
  {
    question: "Where does the yield come from?",
    answer:
      "It comes from demand for borrowing funds across the markets used by the strategy. More demand can increase returns; less demand can reduce them. The strategy may rebalance as opportunities and risk conditions change.",
  },
  {
    question: "What is APY?",
    answer:
      "Annual Percentage Yield is an annualized estimate based on the current rate and compounding assumptions. It is forward-looking, not guaranteed, and can change daily.",
  },
  {
    question: "Why does the rate change?",
    answer:
      "Borrowing demand, available liquidity, market conditions, and strategy allocation all move over time. That is why the displayed APY is a variable snapshot rather than a promise.",
  },
  {
    question: "Who manages the strategy?",
    answer:
      "Gauntlet independently curates and manages Gauntlet USD Alpha. Gauntlet is a risk-management firm, not a bank and not Jazari One. Jazari provides the product interface where available.",
  },
  {
    question: "How do I add funds?",
    answer:
      "Enter an amount up to your available balance and review the strategy, current APY, asset, network costs, and risk notice before confirming. Jazari balances may hold USDC or USDT; supported funding routes are shown in the app.",
  },
  {
    question: "Can I withdraw?",
    answer:
      "There is no fixed lock-up period. Withdrawals are typically available, but processing can take longer during high network congestion, low liquidity, heavy vault activity, or market stress.",
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
          Put eligible digital dollars to work through independently managed
          onchain strategies. Rates move daily and returns are never guaranteed.
        </p>
      </header>

      <section
        className="yield-feature pointer-card"
        aria-labelledby="yield-strategy-title"
        onPointerMove={trackPointer}
        onPointerLeave={resetPointer}
      >
        <div className="yield-strategy-copy">
          <img src={withBasePath("/images/rails/gauntlet.svg")} alt="Gauntlet" />
          <h2 id="yield-strategy-title">Gauntlet USD Alpha</h2>
          <p>
            An independently managed, Base-based strategy that reallocates
            across stablecoin opportunities while monitoring liquidity,
            stablecoin, and smart-contract risk.
          </p>
          <a href="https://www.gauntlet.xyz/gauntlet-strategies/gtusda" target="_blank" rel="noreferrer">
            Read the strategy details
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
            <dd>USDC · USDT</dd>
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
          <h2 id="yield-questions-title">How yield works</h2>
          <p>Read this before adding funds.</p>
        </header>
        <AccordionList items={questions} />
      </section>

      <section className="yield-roadmap">
        <FlowField />
        <div>
          <h2>Ready to open a yield?</h2>
          <p>Review the current strategy and risks, then continue in the Jazari app.</p>
        </div>
        <Link
          className="realism-button"
          href="/#access"
          onPointerMove={trackPointer}
          onPointerLeave={resetPointer}
        >
          Download App
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
