"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses exact sources */

import type { CSSProperties } from "react";
import "../styles/partners-page.css";
import { allPartnerStories, networkStories, partnerStories } from "../home/data";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import { resetPointer, trackPointer, useRevealInViewport } from "../home/hooks";

function DirectoryCard({
  item,
  index,
}: {
  item: (typeof allPartnerStories)[number];
  index: number;
}) {
  return (
    <article
      className={`provider-card pointer-card logo-${item.logoFormat}`}
      style={{ "--reveal-index": index } as CSSProperties}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
    >
      <div className="provider-logo-slot">
        <span
          className={`provider-logo is-${item.logoFormat}`}
          style={{ "--logo-scale": item.logoScale } as CSSProperties}
        >
          <img
            src={item.logo}
            alt={`${item.name} logo`}
            width="240"
            height="96"
            loading="lazy"
            decoding="async"
          />
        </span>
      </div>
      <div className="provider-card-copy">
        {!("wordmarkOnly" in item && item.wordmarkOnly) && <h3>{item.name}</h3>}
        <p>{item.short}</p>
      </div>
    </article>
  );
}

export function PartnersPage() {
  const [partnersRef, partnersVisible] = useRevealInViewport<HTMLDivElement>("-8% 0px");
  const [networksRef, networksVisible] = useRevealInViewport<HTMLDivElement>("-8% 0px");

  return (
    <main className="partners-shell">
      <InternalSiteHeader />
      <header className="partners-hero">
        <h1>Partners</h1>
        <p>
          The specialist providers and public networks behind Jazari&apos;s
          account, transfer, and Yields services.
        </p>
      </header>

      <section className="partner-directory" aria-labelledby="partner-directory-title">
        <h2 id="partner-directory-title">Service partners</h2>
        <div
          className={`provider-grid ${partnersVisible ? "is-visible" : ""}`}
          ref={partnersRef}
        >
          {partnerStories.map((item, index) => (
            <DirectoryCard item={item} index={index} key={item.name} />
          ))}
        </div>
      </section>

      <section className="partner-directory" aria-labelledby="network-directory-title">
        <h2 id="network-directory-title">Supported networks</h2>
        <div
          className={`provider-grid directory-network-grid ${networksVisible ? "is-visible" : ""}`}
          ref={networksRef}
        >
          {networkStories.map((item, index) => (
            <DirectoryCard item={item} index={index} key={item.name} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
