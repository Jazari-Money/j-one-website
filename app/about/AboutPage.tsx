/* eslint-disable @next/next/no-img-element -- local partner marks use their exact sources */

import type { CSSProperties } from "react";
import Link from "next/link";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { partnerStories } from "../home/data";

const trustedPartners = [
  {
    ...partnerStories[0],
    heading: "Bridge, a Stripe company",
    role: "Holds and moves the money. Handles conversion and payouts to local banks.",
  },
  {
    ...partnerStories[1],
    heading: "Privy",
    role: "Runs the wallets and transaction controls. Your account, your keys.",
  },
  {
    ...partnerStories[2],
    heading: "Gauntlet",
    role: "Manages the yield strategies. A risk-management firm, not a bank and not us.",
  },
] as const;

export function AboutPage() {
  return (
    <main className="about-shell">
      <InternalSiteHeader />

      <article className="about-page">
        <header className="about-manifest">
          <span>Manifesto</span>
          <h1>Why we&apos;re building Jazari One</h1>
          <div className="about-manifest-copy">
            <p>
              Every transfer begins with something real. Work that has been done. A bill
              that needs to be paid. A parent, child, partner, or friend who needs support.
              A goal you are saving for. A life you are building.
            </p>
            <p>
              Yet moving money still means losing part of it. Fees, exchange rate spreads,
              delays, forced conversions, and outdated systems take value at every step.
              Money gets sent, but not all of it arrives.
            </p>
            <p>
              We created Jazari One because we believe modern lives deserve modern financial
              rails. A simpler way to hold value, move money across borders, and manage your
              finances without having to understand all the machinery underneath.
            </p>
            <p>
              Our goal is simple. Remove as many obstacles as possible between your money and
              what it is meant to do. Make costs clear. Make transfers easier to follow. Help
              you keep more of what you earn and stay in control of what happens next.
            </p>
            <p className="about-manifest-close">
              So you can focus on your needs, your goals, your people, and your dreams.
            </p>
            <p className="about-manifest-signoff">— Jazari One Team</p>
          </div>
        </header>

        <section className="about-entities" aria-labelledby="about-entities-title">
          <header>
            <span>Registered business</span>
            <h2 id="about-entities-title">Built in the United States and the UAE.</h2>
          </header>
          <div className="about-entity-grid">
            <article>
              <span>United States entity</span>
              <h3>Jazari One, Inc.</h3>
              <p>Registered in Dover, Delaware, United States.</p>
            </article>
            <article>
              <span>UAE entity</span>
              <h3>Jazari Fintech Services — FZCO</h3>
              <p>Registration #78870 · Dubai Silicon Oasis, UAE.</p>
            </article>
          </div>
        </section>

        <section className="about-trust" aria-labelledby="about-trust-title">
          <header className="about-hero">
            <h2 id="about-trust-title">Who you&apos;re trusting with your money</h2>
            <p>
              We&apos;re not a bank, and we don&apos;t hold your money ourselves. Your funds sit
              with licensed, regulated partners whose names are public — so if you want to
              check us, there&apos;s something to check.
            </p>
          </header>

          <div className="about-partners" aria-label="The partners handling your money">
            {trustedPartners.map((partner, index) => (
              <article
                className={`provider-card pointer-card logo-${partner.logoFormat}`}
                style={{ "--reveal-index": index } as CSSProperties}
                key={partner.name}
              >
                <div className="provider-logo-slot">
                  <span
                    className={`provider-logo is-${partner.logoFormat}`}
                    style={{ "--logo-scale": partner.logoScale } as CSSProperties}
                  >
                    <img src={partner.logo} alt={`${partner.name} logo`} />
                  </span>
                </div>
                <div className="provider-card-copy">
                  {"wordmarkOnly" in partner && partner.wordmarkOnly ? (
                    <h3 className="sr-only">{partner.heading}</h3>
                  ) : (
                    <h3>{partner.heading}</h3>
                  )}
                  <p>{partner.role}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="about-partners-action">
            <Link className="about-partners-link neutral-control" href="/partners">
              See all partners <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
