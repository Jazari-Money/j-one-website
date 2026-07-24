"use client";

/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import { audiences } from "./data";

export function AudienceExplorer() {
  return (
    <section className="audience section" id="audience">
      <header className="chapter-heading">
        <h2>Built for the way global lives work.</h2>
        <p>Three common ways one dollar balance can support work, movement, and family.</p>
      </header>

      <div className="audience-explorer">
        {audiences.map((item) => (
          <article className="audience-panel" key={item.title}>
            <img src={item.image} alt={item.alt} />
            <div className="audience-scrim" />
            <div className="audience-caption">
              <h3>{item.title}</h3>
              <p>{item.line}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
