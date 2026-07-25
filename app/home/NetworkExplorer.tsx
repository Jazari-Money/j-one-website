"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import type { CSSProperties } from "react";
import { networkStories } from "./data";
import { resetPointer, trackPointer, useRevealInViewport } from "./hooks";

export function NetworkExplorer() {
  const [gridRef, revealed] = useRevealInViewport<HTMLDivElement>("-10% 0px");

  return (
    <section className="networks section" id="networks">
      <header className="chapter-heading">
        <h2>How Jazari Moves Money.</h2>
        <p>
          Jazari can combine money movement, wallet access, digital dollars,
          risk tooling, and public networks according to the route.
        </p>
      </header>

      <div
        className={`provider-grid ${revealed ? "is-visible" : ""}`}
        aria-label="Jazari providers and network rails"
        ref={gridRef}
      >
        {networkStories.map((item, index) => (
          <article
            className={`provider-card logo-${item.logoFormat}`}
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
              <h3>{item.name}</h3>
              <p>{item.short}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
