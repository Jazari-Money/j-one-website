/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import { audiences } from "./data";
import { resetPointer, trackPointer } from "./hooks";

export function AudienceExplorer() {
  return (
    <section className="audience section" id="audience">
      <header className="chapter-heading">
        <h2>For your work and the life you’re building every day.</h2>
      </header>

      <div className="audience-explorer">
        {audiences.map((item) => (
          <article
            className="audience-panel pointer-card"
            key={item.title}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            <img src={item.image} alt={item.alt} />
            <div className="audience-caption">
              <h3>{item.title}</h3>
              <ul>
                {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
