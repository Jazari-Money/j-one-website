"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import { useEffect, useState } from "react";
import { withBasePath } from "../site-paths";
import { SocialLinks } from "./SocialLinks";

export function SiteHeader({
  onAccess,
  mode = "home",
}: {
  onAccess: () => void;
  mode?: "home" | "internal";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header className={`site-header ${scrolled || mobileOpen ? "is-scrolled" : ""}`}>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href={homeHref} aria-label="Jazari One home" onClick={closeMobile}>
          <img src={withBasePath("/images/brand/jazari-one-logo.svg")} alt="Jazari One" />
        </a>

        <div className={`nav-menu ${mobileOpen ? "is-open" : ""}`}>
          <details className="nav-dropdown">
            <summary>Personal</summary>
            <div className="nav-dropdown-menu">
              <a href={sectionHref("how-send")} onClick={closeMobile}>Send</a>
              <a href={sectionHref("how-receive")} onClick={closeMobile}>Receive</a>
              <a href={withBasePath("/yields/")} onClick={closeMobile}>Yields</a>
              <a href={sectionHref("rates")} onClick={closeMobile}>Rates</a>
            </div>
          </details>
          <a href={withBasePath("/plan/")} onClick={closeMobile}>Plan</a>
          <a href={withBasePath("/blog/")} onClick={closeMobile}>Blog</a>
          <div className="nav-mobile-extras">
            <button
              className="neutral-control"
              type="button"
              onClick={() => {
                closeMobile();
                onAccess();
              }}
            >
              Download App
            </button>
            <SocialLinks className="nav-mobile-socials" />
          </div>
        </div>

        <div className="nav-actions">
          <button
            className="nav-cta neutral-control"
            type="button"
            onClick={onAccess}
          >
            <span className="nav-cta-label">Download App</span>
          </button>
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
