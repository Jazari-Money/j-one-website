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

      <div className="provider-table" role="table" aria-label="Jazari providers and network rails">
        <div className="provider-row provider-head" role="row">
          <span role="columnheader">Provider</span>
          <span role="columnheader">Layer</span>
          <span role="columnheader">Role</span>
        </div>
        {networkStories.map((item) => (
          <div className="provider-row" role="row" key={item.name}>
            <div className="provider-identity" role="cell">
              <span
                className={`provider-logo ${item.logoFormat === "wide" ? "is-wide" : ""}`}
                style={{ "--logo-scale": item.logoScale } as CSSProperties}
                aria-hidden="true"
              >
                <img src={item.logo} alt="" />
              </span>
              <b className={item.logoFormat === "wide" ? "sr-only" : "provider-name"}>
                {item.name}
              </b>
            </div>
            <span className="provider-layer" role="cell">{item.kind}</span>
            <p role="cell">{item.short}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
