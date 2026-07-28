"use client";

/* eslint-disable @next/next/no-img-element -- local editorial imagery */

import Link from "next/link";
import { guides } from "./data";
import { resetPointer, trackPointer } from "./hooks";

export function Blog() {
  return (
    <section className="blog section" id="blog">
      <header className="chapter-heading">
        <h2>Blog</h2>
        <Link className="blog-all-link neutral-control" href="/blog">All Articles</Link>
      </header>
      <div className="blog-grid">
        {guides.slice(0, 3).map((guide, index) => (
          <Link
            className={`blog-card pointer-card ${index === 0 ? "blog-card-featured" : ""} ${"image" in guide ? "has-image" : ""}`}
            href={`/blog/${guide.slug}`}
            key={guide.slug}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            {"image" in guide && (
              <img
                className="blog-card-image"
                src={guide.image}
                alt={`${guide.route} transfer guide`}
              />
            )}
            <div className="blog-card-copy">
              <h3>{guide.title}</h3>
              <span className="blog-read neutral-control">Read Article</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
