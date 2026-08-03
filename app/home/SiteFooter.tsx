"use client";

/* eslint-disable @next/next/no-img-element -- official and local brand artwork */

import Link from "next/link";
import { useState } from "react";
import { withBasePath } from "../site-paths";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  const [cookieOpen, setCookieOpen] = useState(false);

  return (
    <footer className="site-footer">
      <div className="footer-primary">
        <div className="footer-brand">
          <img src={withBasePath("/images/brand/jazari-one-logo.svg")} alt="Jazari One" />
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          <div>
            <strong>Product</strong>
            <Link href="/#how">How it works</Link>
            <Link href="/#rates">Rates</Link>
            <Link href="/plan">Plan</Link>
            <Link href="/yields">Yields</Link>
            <Link href="/roadmap">Coming soon</Link>
          </div>
          <div>
            <strong>Explore</strong>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About us</Link>
            <Link href="/partners">Partners</Link>
            <Link href="/#faq">FAQ</Link>
            <a href="mailto:hello@jazari.xyz">Contact</a>
          </div>
          <div>
            <strong>Legal</strong>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <button type="button" onClick={() => setCookieOpen(true)}>Cookie Preferences</button>
          </div>
        </nav>
        <SocialLinks className="footer-socials" />
      </div>

      <div className="footer-meta">
        <p>
          Jazari One is a technology service provider. Wallet, custody, and payment
          services are delivered by licensed and regulated third-party providers.
          Jazari does not hold customer funds or provide regulated financial services directly.
        </p>
        <div className="footer-stores" aria-label="Download the Jazari One app">
          <a href="https://apps.apple.com/" target="_blank" rel="noreferrer">
            <img src={withBasePath("/images/stores/app-store-badge.avif")} alt="Download on the App Store" />
          </a>
          <a href="https://play.google.com/store" target="_blank" rel="noreferrer">
            <img src={withBasePath("/images/stores/google-play-badge.avif")} alt="Get it on Google Play" />
          </a>
        </div>
        <div className="footer-addresses">
          <address>
            <strong>Jazari Fintech Services — FZCO,</strong>{" "}
            <span>#78870, Building A1, IFZA Business Park, Dubai Silicon Oasis, Dubai, UAE</span>
          </address>
          <address>
            <strong>Jazari One, Inc.,</strong>{" "}
            <span>1111B S Governors Ave #93312, Dover, DE 19904, United States</span>
          </address>
        </div>
        <div className="footer-signoff">
          <span>Jazari Fintech Services FZCO is a subsidiary of Jazari One, Inc.</span>
          <span>© 2026 Jazari One. All rights reserved.</span>
        </div>
      </div>

      {cookieOpen && (
        <div className="cookie-panel" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
          <div className="cookie-panel-card">
            <h2 id="cookie-title">Cookie preferences</h2>
            <p>This preview uses essential storage for core site functionality. Optional analytics are not enabled.</p>
            <div>
              <button className="realism-button" type="button" onClick={() => setCookieOpen(false)}>Essential Only</button>
              <button className="realism-button" type="button" onClick={() => setCookieOpen(false)}>Accept All</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
