"use client";

import "../styles/pricing-page.css";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { resetPointer, trackPointer } from "../home/hooks";

const groups = [
  {
    title: "Money movement",
    rows: [
      ["Receive supported stablecoins", "Free"],
      ["Send to a bank account", "No transfer fee¹"],
      ["Send USDC to a wallet", "Free over $10 · $1 below $10"],
      ["USDT support charge", "0.10%"],
    ],
  },
  {
    title: "Payment rails",
    rows: [
      ["US bank account — ACH, FedWire and FedNow", "Free"],
      ["SEPA", "Free"],
      ["CLABE", "Free"],
      ["Pix", "Free"],
      ["UK Faster Payments — GBP FPS", "Free"],
      ["COP Bre-B", "Free"],
    ],
  },
  {
    title: "USD account",
    rows: [
      ["Open an account", "Free"],
      ["Monthly fee", "None"],
      ["Annual fee", "None"],
      ["Hold USD", "Free"],
    ],
  },
  {
    title: "Yields",
    rows: [
      ["Performance fee", "Free"],
      ["Deposit and withdrawal", "Free"],
    ],
  },
] as const;

export function PricingPage() {
  return (
    <main className="pricing-shell">
      <InternalSiteHeader />
      <header className="pricing-hero">
        <h1>Pricing</h1>
        <p>
          Pricing valid as of August 27, 2026 and subject to change. Jazari One
          reserves the right to change pricing at any time.
        </p>
      </header>
      <section
        className="pricing-groups pointer-card"
        aria-label="Jazari One pricing"
        onPointerMove={trackPointer}
        onPointerLeave={resetPointer}
      >
        {groups.map((group) => (
          <article className="pricing-group" key={group.title}>
            <h2>{group.title}</h2>
            <dl>
              {group.rows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
