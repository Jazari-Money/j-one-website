/* eslint-disable @next/next/no-img-element -- official and local brand artwork */

import Link from "next/link";
import { CSSProperties } from "react";
import { withBasePath } from "../site-paths";

export function SiteFooter() {
  const logoUrl = `url("${withBasePath("/images/brand/jazari-one-logo.svg")}")`;

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <img src={withBasePath("/images/brand/jazari-one-logo.svg")} alt="Jazari One" />
        <div>
          <Link href="/#how">How It Works</Link>
          <Link href="/#rates">Rates</Link>
          <Link href="/#roadmap">Roadmap</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/#faq">FAQ</Link>
          <a href="mailto:hello@jazari.xyz">Contact</a>
        </div>
      </div>

      <div className="footer-stores" aria-label="Download the Jazari One app">
        <a
          className="official-store-badge"
          href="https://apps.apple.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Download Jazari One on the App Store"
        >
          <img
            src={withBasePath("/images/stores/app-store-badge.svg")}
            alt="Download on the App Store"
          />
        </a>
        <a
          className="official-store-badge google-play-badge"
          href="https://play.google.com/store"
          target="_blank"
          rel="noreferrer"
          aria-label="Get Jazari One on Google Play"
        >
          <img
            src={withBasePath("/images/stores/google-play-badge.png")}
            alt="Get it on Google Play"
          />
        </a>
      </div>

      <p>
        Jazari One is a technology service provider. Wallet, custody, and
        payment services are delivered by licensed and regulated third-party
        providers. Jazari does not hold customer funds or provide regulated
        financial services directly.
      </p>
      <div className="footer-bottom">
        <span>Jazari Fintech Services — FZCO · Dubai, UAE</span>
        <span>© 2026 Jazari One. All rights reserved.</span>
      </div>

      <div
        className="footer-mark"
        style={{ "--footer-logo": logoUrl } as CSSProperties}
        aria-label="Jazari One"
      >
        <span className="footer-mark-shader" aria-hidden="true" />
      </div>
    </footer>
  );
}
