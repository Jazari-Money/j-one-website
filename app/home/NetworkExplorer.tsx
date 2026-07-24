"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import { CSSProperties, useState } from "react";
import { networkStories } from "./data";

export function NetworkExplorer() {
  const [active, setActive] = useState(0);
  const story = networkStories[active];

  return (
    <section className="networks section" id="networks">
      <header className="chapter-heading">
        <h2>One balance. Multiple rails.</h2>
        <p>
          Jazari brings digital dollars, wallet infrastructure, risk tooling,
          and public networks into one experience. The route determines what is used.
        </p>
      </header>

      <div className="network-explorer">
        <div className="network-list" role="tablist" aria-label="Jazari technology and networks">
          {networkStories.map((item, index) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              id={`network-tab-${index}`}
              aria-selected={active === index}
              aria-controls="network-story"
              className={active === index ? "is-active" : ""}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span
                className={`network-name ${item.logoFormat === "wide" ? "is-wide" : ""}`}
                style={{ "--logo-scale": item.logoScale } as CSSProperties}
              >
                <span className="network-logo-box" aria-hidden="true">
                  <img src={item.logo} alt="" />
                </span>
                <b>{item.name}</b>
              </span>
              <small>{item.short}</small>
            </button>
          ))}
        </div>
        <div
          className="network-story"
          id="network-story"
          role="tabpanel"
          aria-labelledby={`network-tab-${active}`}
        >
          <div className="network-orbit" aria-hidden="true">
            <i />
            <i />
            <i />
            <img
              className={story.logoFormat === "wide" ? "is-wide" : ""}
              style={{ "--logo-scale": story.featureScale } as CSSProperties}
              src={story.logo}
              alt=""
            />
          </div>
          <span>{story.kind}</span>
          <h3>{story.name}</h3>
          <p>{story.detail}</p>
        </div>
      </div>
    </section>
  );
}
