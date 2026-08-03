"use client";

import Link from "next/link";
import { guides } from "../home/data";
import { SiteFooter } from "../home/SiteFooter";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { ResponsiveImage } from "../home/ResponsiveImage";
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
          {guides.map((guide) => (
            <Link
              className={`pointer-card${"image" in guide ? " has-image" : ""}`}
              href={`/blog/${guide.slug}`}
              key={guide.slug}
              onPointerMove={trackPointer}
              onPointerLeave={resetPointer}
            >
              <div className="blog-index-copy">
                <h3>{guide.title}</h3>
                <strong className="blog-index-read neutral-control">Read Article</strong>
              </div>
              {"image" in guide && (
                <ResponsiveImage
                  className="blog-index-image"
                  pictureClassName="blog-index-media"
                  fallback={guide.image}
                  stem={guide.imageStem}
                  widths={[480, 960, 1440]}
                  width={guide.slug === "send-money-to-mexico" ? 1800 : 1536}
                  height={guide.slug === "send-money-to-mexico" ? 1800 : 1024}
                  sizes="(max-width: 900px) calc(100vw - 40px), 50vw"
                  alt={`${guide.route} transfer guide`}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
