"use client";

/* eslint-disable @next/next/no-img-element -- official and local brand artwork */

import Link from "next/link";
import { useCookieConsent } from "../cookie-consent/CookieConsent";
import { withBasePath } from "../site-paths";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  const { openPreferences } = useCookieConsent();

  return (
    <footer className="site-footer">
      <div className="footer-primary">
        <div className="footer-brand">
          <img
            src={withBasePath("/images/brand/jazari-one-logo.svg")}
            alt="Jazari One"
            width="1638"
            height="217"
            loading="lazy"
            decoding="async"
          />
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          <div>
            <strong>Product</strong>
            <Link href="/#how">How it works</Link>
            <Link href="/#rates">Rates</Link>
            <Link href="/plan">Pricing</Link>
            <Link href="/yields">Yields</Link>
            <Link href="/roadmap">Coming soon</Link>
          </div>
          <div>
            <strong>Explore</strong>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About us</Link>
            <Link href="/partners">Partners</Link>
          </div>
          <div>
            <strong>Legal</strong>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/uk-risk-information">UK Risk Information</Link>
            <button type="button" onClick={openPreferences}>Cookie Preferences</button>
          </div>
          <div>
            <strong>Support</strong>
            <Link href="/#faq">FAQ</Link>
            <Link href="/help">Help</Link>
            <a href="mailto:hello@jazary.xyz">hello@jazary.xyz</a>
          </div>
        </nav>
        <SocialLinks className="footer-socials" />
      </div>

      <div className="footer-meta">
        <div className="footer-addresses">
          <div className="footer-addresses-content">
            <address>
              <span>Jazari One, Inc.,</span>{" "}
              <span>1111B S Governors Ave #93312, Dover, DE 19904, United States</span>
            </address>
            <p className="footer-registration">
              Jazari One holds a FinCEN MSB registration (No. MRX26-00006547)
              reflecting its compliance obligations as an entity operating in the payments ecosystem.
            </p>
            <address>
              <span>Jazari Fintech Services FZCO,</span>{" "}
              <span>#78870, Building A1, IFZA Business Park, Dubai Silicon Oasis, Dubai, UAE</span>
            </address>
            <p className="footer-registration">
              Jazari Fintech Services FZCO is a subsidiary of Jazari One, Inc.
            </p>
            <ol className="footer-registration footer-disclosures">
              <li>1. Jazari One is a technology service provider, not a bank, deposit-taker, e-money institution, or investment adviser.</li>
              <li>2. Balances held in Jazari One are stablecoins, not bank deposits. The value of a cryptoasset, including one that references a fiat currency, may fall to zero.</li>
              <li>3. Earn is an interface to third-party decentralised finance protocols. Rates are variable, capital is at risk, and returns are not guaranteed.</li>
              <li>4. Geographic, regulatory and eligibility limits apply and may change.</li>
            </ol>
          </div>
          <div className="footer-downloads">
            <div className="footer-stores" aria-label="Download the Jazari One app">
              <a href="https://apps.apple.com/" target="_blank" rel="noreferrer">
                <img
                  src={withBasePath("/images/stores/app-store-badge.avif")}
                  alt="Download on the App Store"
                  width="485"
                  height="156"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a href="https://play.google.com/store" target="_blank" rel="noreferrer">
                <img
                  src={withBasePath("/images/stores/google-play-badge.avif")}
                  alt="Get it on Google Play"
                  width="512"
                  height="152"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
            <p className="footer-copyright">© 2026 Jazari One. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
