/* eslint-disable @next/next/no-img-element -- official and local brand artwork */

import Link from "next/link";
import { withBasePath } from "../site-paths";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <img src={withBasePath("/images/brand/jazari-one-logo.svg")} alt="Jazari One" />
        <div>
          <Link href="/#how">How it works</Link>
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
            src={withBasePath("/images/stores/app-store-badge.avif")}
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
            src={withBasePath("/images/stores/google-play-badge.avif")}
            alt="Get it on Google Play"
          />
        </a>
        <SocialLinks className="footer-socials" />
      </div>

      <p className="footer-disclaimer">
        Jazari One is a technology service provider. Wallet, custody, and
        payment services are delivered by licensed and regulated third-party
        providers. Jazari does not hold customer funds or provide regulated
        financial services directly.
      </p>
      <div className="footer-entities">
        <address>
          <strong>JAZARI FINTECH SERVICES - FZCO</strong>
          <span>#78870, Building A1, IFZA Business Park, Dubai Silicon Oasis, Dubai, UAE</span>
        </address>
        <address>
          <strong>Jazari One, Inc.</strong>
          <span>1111B S Governors Ave #93312, Dover, DE 19904, United States of America</span>
        </address>
      </div>
      <div className="footer-bottom">
        <span>Jazari Fintech Services FZCO is a Subsidiary of Jazari One, Inc.</span>
        <span>© 2026 Jazari One. All rights reserved.</span>
      </div>
    </footer>
  );
}
