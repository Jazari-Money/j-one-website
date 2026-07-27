"use client";

import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { resetPointer, trackPointer } from "../home/hooks";

const groups = [
  {
    title: "Accounts",
    intro: "Local account details, introduced country by country.",
    rows: [
      ["USD Account", "Coming Soon"],
      ["GBP Account", "Coming Soon"],
      ["EUR Account", "Coming Soon"],
    ],
  },
  {
    title: "Cards",
    intro: "Spend from the same balance when cards become available.",
    rows: [["VISA Virtual Card", "Coming Soon"]],
  },
  {
    title: "Money Movement",
    intro: "Clear costs for supported stablecoin and local payout routes.",
    rows: [
      ["Foreign Exchange", "Not Offered"],
      ["Stablecoin Transfer", "$1 Network Fee"],
      ["Local Payout", "No Transfer Fee · No Hidden FX Margin"],
    ],
  },
] as const;

export function PricingPage() {
  return (
    <main className="pricing-shell">
      <InternalSiteHeader />
      <header className="pricing-hero">
        <h1>Simple, visible pricing.</h1>
        <p>No tiers. The applicable cost is shown before you confirm a supported transaction.</p>
      </header>
      <section className="pricing-groups" aria-label="Jazari One pricing">
        {groups.map((group) => (
          <article
            className="pricing-group pointer-card"
            key={group.title}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            <header>
              <h2>{group.title}</h2>
              <p>{group.intro}</p>
            </header>
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
      <p className="pricing-note">
        Preview pricing only. Availability, eligibility, final fees, and route terms are confirmed in the app.
      </p>
      <SiteFooter />
    </main>
  );
}
