"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import type { CSSProperties } from "react";
import Link from "next/link";
import { partnerStories } from "./data";
import { resetPointer, trackPointer, useRevealInViewport } from "./hooks";

export function NetworkExplorer() {
  const [gridRef, revealed] = useRevealInViewport<HTMLDivElement>("-10% 0px");

  return (
    <section className="networks section" id="networks">
      <header className="chapter-heading">
        <h2>Partners</h2>
        <Link className="networks-all-link neutral-control" href="/partners">
          All Partners
        </Link>
      </header>

      <div
        className={`provider-grid ${revealed ? "is-visible" : ""}`}
        aria-label="Jazari partners"
        ref={gridRef}
      >
        {partnerStories.map((item, index) => (
          <article
            className={`provider-card pointer-card logo-${item.logoFormat}`}
            key={item.name}
            style={{
              "--reveal-index": index,
            } as CSSProperties}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            <div className="provider-logo-slot">
              <span
                className={`provider-logo is-${item.logoFormat}`}
                style={{ "--logo-scale": item.logoScale } as CSSProperties}
              >
                <img src={item.logo} alt={`${item.name} logo`} />
              </span>
            </div>
            <div className="provider-card-copy">
              {!("wordmarkOnly" in item && item.wordmarkOnly) && <h3>{item.name}</h3>}
              <p>{item.short}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
