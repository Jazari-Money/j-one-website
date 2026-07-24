"use client";

import { withBasePath } from "../site-paths";
import { guides } from "./data";
import { resetPointer, trackPointer } from "./hooks";

export function Blog() {
  return (
    <section className="blog section" id="blog">
      <header className="chapter-heading">
        <h2>Blog</h2>
        <p>Brief, practical answers for checking a route before you send.</p>
      </header>
      <div className="blog-grid">
        {guides.map((guide, index) => (
          <a
            className={`blog-card ${index === 0 ? "blog-card-featured" : ""}`}
            href={withBasePath(`/blog/${guide.slug}`)}
            key={guide.slug}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            <h3>{guide.title}</h3>
            <p>{guide.deck}</p>
            <span className="blog-read">Read Guide</span>
          </a>
        ))}
      </div>
    </section>
  );
}
