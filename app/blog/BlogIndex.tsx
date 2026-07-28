"use client";

/* eslint-disable @next/next/no-img-element -- local editorial imagery */

import Link from "next/link";
import { guides } from "../home/data";
import { SiteFooter } from "../home/SiteFooter";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { resetPointer, trackPointer } from "../home/hooks";

export function BlogIndex() {
  return (
    <main className="blog-index-shell">
      <InternalSiteHeader />

      <header className="blog-index-header">
        <h1>Blog</h1>
        <p>
          {guides.length} practical articles for sending, receiving, and
          understanding money across borders.
        </p>
      </header>

      <section className="blog-index-articles" aria-label="All articles">
        <div className="blog-index-grid">
          {guides.map((guide, index) => (
            <Link
              className={`pointer-card ${index === 0 ? "is-featured" : ""}`}
              href={`/blog/${guide.slug}`}
              key={guide.slug}
              onPointerMove={trackPointer}
              onPointerLeave={resetPointer}
            >
              <div className="blog-index-copy">
                <span>{guide.route}</span>
                <h3>{guide.title}</h3>
                <p>{guide.deck}</p>
                <strong className="blog-index-read neutral-control">Read Article</strong>
              </div>
              {"image" in guide && (
                <img className="blog-index-image" src={guide.image} alt="Family walking together in Mexico" />
              )}
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
