"use client";

import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "../home/SocialLinks";
import { FooterLegalInformation } from "../home/FooterLegalInformation";
import { useCookieConsent } from "../cookie-consent/CookieConsent";

export function CountryFooter({ country }: { country: "Kenya" | "Nigeria" | "Mexico" | "Colombia" }) {
  const { openPreferences } = useCookieConsent();
  return (
    <footer className="country-footer">
      <div className="country-footer-primary">
        <Link href="/" className="country-footer-logo" aria-label="Jazari One home">
          <Image
            src="/images/brand/jazari-one-logo.svg"
            alt="Jazari One"
            width={1638}
            height={217}
          />
        </Link>
        <SocialLinks className="country-footer-socials" />
      </div>
      <nav className="country-footer-legal-links" aria-label="Legal information">
        <Link href="/terms">Terms &amp; Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/uk-risk-information">UK Risk Information</Link>
        <button type="button" onClick={openPreferences}>Cookie Preferences</button>
      </nav>
      <div className="footer-meta">
        <div className="footer-addresses">
          <FooterLegalInformation country={country} />
          <div className="footer-downloads">
            <p className="footer-copyright">© 2026 Jazari One. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
