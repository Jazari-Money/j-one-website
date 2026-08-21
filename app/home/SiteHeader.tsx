"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import { useEffect, useRef, useState } from "react";
import { appDownloadUrl, withBasePath } from "../site-paths";
import { SocialLinks } from "./SocialLinks";

export function SiteHeader({
  mode = "home",
}: {
  mode?: "home" | "internal";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const productMenuRef = useRef<HTMLDetailsElement>(null);
  const homeHref = mode === "home" ? "#top" : withBasePath("/#top");
  const sectionHref = (section: string) =>
    mode === "home" ? `#${section}` : withBasePath(`/#${section}`);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const close = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setProductOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const closeProductMenu = (event: PointerEvent) => {
      const menu = productMenuRef.current;
      if (window.matchMedia("(max-width: 900px)").matches) return;
      if (menu && !menu.contains(event.target as Node)) setProductOpen(false);
    };
    document.addEventListener("pointerdown", closeProductMenu);
    return () => document.removeEventListener("pointerdown", closeProductMenu);
  }, []);

  function closeMobile() {
    setMobileOpen(false);
    setProductOpen(false);
  }

  return (
    <header className={`site-header ${scrolled || mobileOpen ? "is-scrolled" : ""}`}>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href={homeHref} aria-label="Jazari One home" onClick={closeMobile}>
          <img
            src={withBasePath("/images/brand/jazari-one-logo.svg")}
            alt="Jazari One"
            width="1638"
            height="217"
            decoding="async"
            fetchPriority="high"
          />
        </a>

        <div className={`nav-menu ${mobileOpen ? "is-open" : ""}`}>
          <details ref={productMenuRef} className="nav-dropdown nav-desktop-only" open={mobileOpen || productOpen}>
            <summary
              onClick={(event) => {
                event.preventDefault();
                if (!window.matchMedia("(max-width: 900px)").matches) {
                  setProductOpen((open) => !open);
                }
              }}
            >
              Product
            </summary>
            <span className="nav-mobile-section-title">Product</span>
            <div className="nav-dropdown-menu">
              <a href={sectionHref("how-receive")} onClick={closeMobile}>Receive</a>
              <a href={sectionHref("how-send")} onClick={closeMobile}>Send</a>
              <a href={sectionHref("rates")} onClick={closeMobile}>Rates</a>
              <a href={withBasePath("/yields/")} onClick={closeMobile}>Yields</a>
            </div>
          </details>
          <a className="nav-desktop-only" href={withBasePath("/plan/")} onClick={closeMobile}>Pricing</a>
          <a className="nav-desktop-only" href={withBasePath("/blog/")} onClick={closeMobile}>Blog</a>
          <a className="nav-desktop-only" href={withBasePath("/about/")} onClick={closeMobile}>About us</a>
          <div className="nav-mobile-groups">
            <section className="nav-mobile-group" aria-labelledby="mobile-product-links">
              <strong id="mobile-product-links">Product</strong>
              <a href={sectionHref("how")} onClick={closeMobile}>How it works</a>
              <a href={withBasePath("/plan/")} onClick={closeMobile}>Pricing</a>
              <a href={sectionHref("rates")} onClick={closeMobile}>Rates</a>
              <a href={withBasePath("/yields/")} onClick={closeMobile}>Yields</a>
              <a href={withBasePath("/roadmap/")} onClick={closeMobile}>Coming soon</a>
            </section>
            <section className="nav-mobile-group" aria-labelledby="mobile-company-links">
              <strong id="mobile-company-links">Company</strong>
              <a href={withBasePath("/blog/")} onClick={closeMobile}>Blog</a>
              <a href={withBasePath("/about/")} onClick={closeMobile}>About us</a>
              <a href={withBasePath("/partners/")} onClick={closeMobile}>Partners</a>
              <a href={sectionHref("faq")} onClick={closeMobile}>FAQ</a>
            </section>
          </div>
          <div className="nav-mobile-extras">
            <a
              className="neutral-control"
              href={appDownloadUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeMobile}
            >
              Download App
            </a>
            <SocialLinks className="nav-mobile-socials" />
          </div>
          <div className="nav-mobile-legal">
            <a href={withBasePath("/terms/")} onClick={closeMobile}>Terms &amp; Conditions</a>
            <a href={withBasePath("/privacy-policy/")} onClick={closeMobile}>Privacy Policy</a>
          </div>
        </div>

        <div className="nav-actions">
          <a
            className="nav-cta neutral-control"
            href={appDownloadUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="nav-cta-label">Download App</span>
          </a>
          <button
            className="mobile-toggle realism-icon-button"
            type="button"
            onClick={() => {
              setMobileOpen((open) => !open);
            }}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
