"use client";

import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { resetPointer, trackPointer } from "../home/hooks";

const groups = [
  {
    title: "Money movement",
    rows: [
      ["Receive stablecoins", "Free"],
      ["Send to a bank account", "Free · rate includes our margin"],
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
    title: "Earn",
    rows: [
      ["Gauntlet USD Alpha", "Variable APY · our share taken before the rate you see"],
      ["Adding or withdrawing funds", "Network cost only — cents on Base"],
    ],
  },
] as const;

export function PricingPage() {
  return (
    <main className="pricing-shell">
      <InternalSiteHeader />
      <header className="pricing-hero">
        <h1>Plan</h1>
        <p>Preview pricing. Final fees and availability are confirmed in the app.</p>
      </header>
      <section
        className="pricing-groups pointer-card"
        aria-label="Jazari One plan"
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
