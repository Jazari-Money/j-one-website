"use client";

import Link from "next/link";
import { guides } from "./data";
import { resetPointer, trackPointer } from "./hooks";

export function Blog() {
  return (
    <section className="blog section" id="blog">
      <header className="chapter-heading">
        <h2>Blog</h2>
        <Link className="blog-all-link" href="/blog">All Articles</Link>
      </header>
      <div className="blog-grid">
        {guides.slice(0, 4).map((guide, index) => (
          <Link
            className={`blog-card ${index === 0 ? "blog-card-featured" : ""}`}
            href={`/blog/${guide.slug}`}
            key={guide.slug}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            <h3>{guide.title}</h3>
            <p>{guide.deck}</p>
            <span className="blog-read">Read Article</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
