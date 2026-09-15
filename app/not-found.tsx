"use client";

import Link from "next/link";
import { useEffect } from "react";
import "./styles/internal-pages.css";
import { InternalSiteHeader } from "./home/InternalSiteHeader";
import { SiteFooter } from "./home/SiteFooter";
import { siteBasePath, withBasePath } from "./site-paths";

// Referral links are shared as pretty paths (/r/<code>/), but this site is a
// fully static export with no server, so unknown codes can't be prerendered.
// GitHub Pages serves this 404 page for any unmatched path — detect the
// referral shape here and hand off to the real, statically built page.
const referralPathPattern = /^\/r\/([A-Za-z0-9_-]+)\/?$/;

export default function NotFound() {
  useEffect(() => {
    let pathname = window.location.pathname;
    if (siteBasePath && pathname.startsWith(siteBasePath)) {
      pathname = pathname.slice(siteBasePath.length) || "/";
    }

    const match = pathname.match(referralPathPattern);
    if (match) {
      window.location.replace(withBasePath(`/referral/?code=${encodeURIComponent(match[1])}`));
    }
  }, []);

  return (
    <main>
      <InternalSiteHeader />
      <section className="pricing-hero" aria-labelledby="not-found-title">
        <h1 id="not-found-title">Page not found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link className="realism-button not-found-action" href="/">
          Back to Jazari One
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
