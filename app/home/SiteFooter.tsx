"use client";

/* eslint-disable @next/next/no-img-element -- official and local brand artwork */

import Link from "next/link";
import { useCookieConsent } from "../cookie-consent/CookieConsent";
import { withBasePath } from "../site-paths";
import { SocialLinks } from "./SocialLinks";
import { FooterLegalInformation } from "./FooterLegalInformation";
import { CountryDownloadLink } from "../countries/CountryDownloadLink";

export function SiteFooter({ country }: { country?: "Kenya" | "Nigeria" }) {
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
            <Link href="/receive">Receive</Link>
            <Link href="/send">Send money</Link>
            <Link href="/yields">{country ? "Savings & Yields" : "Yields"}</Link>
            <Link href="/plan">Pricing</Link>
            {!country && <Link href="/roadmap">Coming soon</Link>}
          </div>
          <div>
            <strong>Explore</strong>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About us</Link>
            <Link href="/partners">Partners</Link>
            <Link href="/Kenya">Kenya</Link>
            <Link href="/Nigeria">Nigeria</Link>
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
            <Link href={country ? `/${country}/#faq` : "/#faq"}>FAQ</Link>
            <Link href="/help">Help</Link>
            <a href="mailto:hello@jazari.xyz">hello@jazari.xyz</a>
          </div>
        </nav>
        <SocialLinks className="footer-socials" />
      </div>

      <div className="footer-meta">
        <div className="footer-addresses">
          <FooterLegalInformation country={country} />
          <div className="footer-downloads">
            <div className="footer-stores" aria-label="Download the Jazari One app">
              <CountryDownloadLink country={country} placement="footer">
                <img
                  src={withBasePath("/images/stores/app-store-badge.avif")}
                  alt="Download on the App Store"
                  width="485"
                  height="156"
                  loading="lazy"
                  decoding="async"
                />
              </CountryDownloadLink>
              <CountryDownloadLink country={country} placement="footer">
                <img
                  src={withBasePath("/images/stores/google-play-badge.avif")}
                  alt="Get it on Google Play"
                  width="512"
                  height="152"
                  loading="lazy"
                  decoding="async"
                />
              </CountryDownloadLink>
            </div>
            <p className="footer-copyright">© 2026 Jazari One. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
