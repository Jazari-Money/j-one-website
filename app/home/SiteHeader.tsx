"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "../site-paths";
import { SocialLinks } from "./SocialLinks";

export function SiteHeader({
  mode = "home",
}: {
  mode?: "home" | "internal";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const personalMenuRef = useRef<HTMLDetailsElement>(null);
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

  useEffect(() => {
    const closePersonalMenu = (event: PointerEvent) => {
      const menu = personalMenuRef.current;
      if (menu && !menu.contains(event.target as Node)) {
        menu.removeAttribute("open");
      }
    };
    document.addEventListener("pointerdown", closePersonalMenu);
    return () => document.removeEventListener("pointerdown", closePersonalMenu);
  }, []);

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
          <details ref={personalMenuRef} className="nav-dropdown" open={mobileOpen || undefined}>
            <summary>Personal</summary>
            <span className="nav-mobile-section-title">Personal</span>
            <div className="nav-dropdown-menu">
              <a href={sectionHref("how-receive")} onClick={closeMobile}>Receive</a>
              <a href={sectionHref("how-send")} onClick={closeMobile}>Send</a>
              <a href={sectionHref("rates")} onClick={closeMobile}>Rates</a>
              <a href={withBasePath("/yields/")} onClick={closeMobile}>Yields</a>
            </div>
          </details>
          <a href={withBasePath("/plan/")} onClick={closeMobile}>Plan</a>
          <a href={withBasePath("/blog/")} onClick={closeMobile}>Blog</a>
          <div className="nav-mobile-extras">
            <a
              className="neutral-control"
              href="https://apps.apple.com/"
              target="_blank"
              rel="noreferrer"
              onClick={closeMobile}
            >
              Download App
            </a>
            <SocialLinks className="nav-mobile-socials" />
          </div>
        </div>

        <div className="nav-actions">
          <a
            className="nav-cta neutral-control"
            href="https://apps.apple.com/"
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
