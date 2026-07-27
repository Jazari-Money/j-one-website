"use client";

import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { resetPointer, trackPointer } from "../home/hooks";

const groups = [
  {
    title: "Money movement",
    rows: [
      ["Foreign Exchange", "Not Offered"],
      ["Stablecoin Transfer", "$1 Network Fee"],
      ["Local Payout", "No Transfer Fee · No Hidden FX Margin"],
    ],
  },
  {
    title: "Accounts",
    rows: [
      ["USD Account", "Coming Soon"],
      ["GBP Account", "Coming Soon"],
      ["EUR Account", "Coming Soon"],
    ],
  },
  {
    title: "Cards",
    rows: [["VISA Virtual Card", "Coming Soon"]],
  },
] as const;

export function PricingPage() {
  return (
    <main className="pricing-shell">
      <InternalSiteHeader />
      <header className="pricing-hero">
        <h1>Pricing</h1>
        <p>
          Preview pricing only. Availability, eligibility, final fees, and route
          terms are confirmed in the app.
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
