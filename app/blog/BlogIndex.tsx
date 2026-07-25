/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import Link from "next/link";
import { guides } from "../home/data";
import { withBasePath } from "../site-paths";

export function BlogIndex() {
  return (
    <main className="blog-index-shell">
      <nav className="blog-index-nav" aria-label="Blog navigation">
        <Link href="/#top" aria-label="Jazari One home">
          <img src={withBasePath("/images/brand/jazari-one-logo.svg")} alt="Jazari One" />
        </Link>
        <div>
          <Link href="/#how">How It Works</Link>
          <Link href="/#rates">Rates</Link>
          <Link href="/#roadmap">Roadmap</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
        <Link className="blog-index-cta" href="/#access">Get Early Access</Link>
      </nav>

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

      <footer className="blog-index-footer">
        <Link href="/#top">Jazari One</Link>
        <p>Useful context before money moves.</p>
      </footer>
    </main>
  );
}
