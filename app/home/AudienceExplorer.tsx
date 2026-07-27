/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import { audiences } from "./data";

export function AudienceExplorer() {
  return (
    <section className="audience section" id="audience">
      <header className="chapter-heading">
        <h2>For the people who power the global economy</h2>
      </header>

      <div className="audience-explorer">
        {audiences.map((item) => (
          <article className="audience-panel" key={item.title}>
            <img src={item.image} alt={item.alt} />
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
