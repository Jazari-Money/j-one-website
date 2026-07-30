/* eslint-disable @next/next/no-img-element -- local partner marks use their exact sources */

import Link from "next/link";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { withBasePath } from "../site-paths";

const trustedPartners = [
  {
    name: "Bridge, a Stripe company",
    role: "Holds and moves the money. Handles conversion and payouts to local banks.",
    logo: "/images/rails/bridge.svg",
  },
  {
    name: "Privy",
    role: "Runs the wallets and transaction controls. Your account, your keys.",
    logo: "/images/rails/privy.svg",
  },
  {
    name: "Gauntlet",
    role: "Manages the yield strategies. A risk-management firm, not a bank and not us.",
    logo: "/images/rails/gauntlet.svg",
  },
] as const;

export function AboutPage() {
  return (
    <main className="about-shell">
      <InternalSiteHeader />

      <article className="about-page">
        <header className="about-hero">
          <h1>Who you&apos;re trusting with your money</h1>
          <p>
            We&apos;re not a bank, and we don&apos;t hold your money ourselves. Your funds sit
            with licensed, regulated partners whose names are public — so if you want to
            check us, there&apos;s something to check.
          </p>
        </header>

        <section className="about-partners" aria-label="The partners handling your money">
          {trustedPartners.map((partner) => (
            <article className="about-partner-card" key={partner.name}>
              <div className="about-partner-logo">
                <img src={withBasePath(partner.logo)} alt={`${partner.name} logo`} />
              </div>
              <div>
                <h2>{partner.name}</h2>
                <p>{partner.role}</p>
              </div>
            </article>
          ))}
        </section>

        <div className="about-details">
          <p>Jazari Fintech Services — FZCO · #78870 · Dubai Silicon Oasis, UAE</p>
          <p>Jazari One, Inc. · Dover, Delaware, United States</p>
          <Link className="about-partners-link" href="/partners">
            See all partners <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
