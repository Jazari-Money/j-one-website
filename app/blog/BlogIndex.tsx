"use client";

import Link from "next/link";
import { guides } from "../home/data";
import { SiteFooter } from "../home/SiteFooter";
import { InternalSiteHeader } from "../home/InternalSiteHeader";

export function BlogIndex() {
  return (
    <main className="blog-index-shell">
      <InternalSiteHeader />

      <header className="blog-index-header">
        <h1>Blog</h1>
        <p>
          Practical guides for sending, receiving, and understanding money
          across borders.
        </p>
      </header>

      <section className="blog-index-articles" aria-labelledby="all-articles">
        <header>
          <h2 id="all-articles">All Articles</h2>
          <p>{guides.length} guides</p>
        </header>
        <div className="blog-index-grid">
          {guides.map((guide, index) => (
            <Link
              className={index === 0 ? "is-featured" : ""}
              href={`/blog/${guide.slug}`}
              key={guide.slug}
            >
              <span>{guide.route}</span>
              <h3>{guide.title}</h3>
              <p>{guide.deck}</p>
              <small>{guide.read}</small>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
