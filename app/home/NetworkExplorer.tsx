/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import { CSSProperties } from "react";
import { networkStories } from "./data";

export function NetworkExplorer() {
  return (
    <section className="networks section" id="networks">
      <header className="chapter-heading">
        <h2>How Jazari Moves Money.</h2>
        <p>
          Jazari can combine money movement, wallet access, digital dollars,
          risk tooling, and public networks according to the route.
        </p>
      </header>

      <div className="provider-grid" aria-label="Jazari providers and network rails">
        {networkStories.map((item) => (
          <article
            className={`provider-card ${item.logoFormat === "wide" ? "has-wordmark" : ""}`}
            key={item.name}
          >
            <div className="provider-logo-slot">
              <span
                className={`provider-logo ${item.logoFormat === "wide" ? "is-wide" : ""}`}
                style={{ "--logo-scale": item.logoScale } as CSSProperties}
              >
                <img src={item.logo} alt={`${item.name} logo`} />
              </span>
            </div>
            <div className="provider-card-copy">
              <span className="provider-layer">{item.kind}</span>
              <h3>{item.name}</h3>
              <p>{item.short}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
