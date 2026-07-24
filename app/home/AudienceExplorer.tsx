"use client";

/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import { audiences } from "./data";
import { resetPointer, trackPointer } from "./hooks";

export function AudienceExplorer() {
  return (
    <section className="audience section" id="audience">
      <header className="chapter-heading">
        <h2>Built for the way global lives work.</h2>
        <p>Three common ways one dollar balance can support work, movement, and family.</p>
      </header>

      <div className="audience-explorer">
        {audiences.map((item) => (
          <article
            className="audience-panel"
            key={item.title}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
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
