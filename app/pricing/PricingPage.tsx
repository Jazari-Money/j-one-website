"use client";

import "../styles/pricing-page.css";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { resetPointer, trackPointer } from "../home/hooks";

const groups = [
  {
    title: "Money movement",
    rows: [
      ["Receive digital dollars", "Free"],
      ["Send to a bank account", "Free · FX Rate"],
      ["Send to a wallet", "Free over $10 · $1 below $10"],
    ],
  },
  {
    title: "Account",
    rows: [
      ["Opening an account", "Free"],
      ["Monthly fee", "None"],
      ["Annual fee", "None"],
      ["Holding dollars", "Free"],
    ],
  },
  {
    title: "Yields",
    rows: [
      ["Gauntlet USD Alpha", "Free"],
      ["Deposit and withdrawal", "~$0.01*"],
    ],
  },
] as const;

export function PricingPage() {
  return (
    <main className="pricing-shell">
      <InternalSiteHeader />
      <header className="pricing-hero">
        <h1>Pricing</h1>
        <p>Preview pricing. Applicable fees are always shown at confirmation.</p>
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
        <p className="pricing-note">
          *Estimated network cost. The exact amount may vary with the deposit or
          withdrawal value and is typically only a few cents.
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
