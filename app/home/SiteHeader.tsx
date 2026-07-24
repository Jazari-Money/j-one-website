"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import { CSSProperties, useEffect, useState } from "react";
import { withBasePath } from "../site-paths";
import { themeOptions, type ThemeKey } from "./data";

export function SiteHeader({
  theme,
  onThemeChange,
  onAccess,
}: {
  theme: ThemeKey;
  onThemeChange: (theme: ThemeKey) => void;
  onAccess: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const selected = themeOptions.find((option) => option.key === theme) ?? themeOptions[0];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const close = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setThemeOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header className={`site-header ${scrolled || mobileOpen ? "is-scrolled" : ""}`}>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Jazari One home" onClick={closeMobile}>
          <img src={withBasePath("/images/brand/jazari-one-logo.svg")} alt="Jazari One" />
        </a>

        <div className={`nav-menu ${mobileOpen ? "is-open" : ""}`}>
          <a href="#how" onClick={closeMobile}>How it works</a>
          <a href="#roadmap" onClick={closeMobile}>What&apos;s next</a>
          <a href="#audience" onClick={closeMobile}>For whom</a>
          <a href="#blog" onClick={closeMobile}>Blog</a>
        </div>

        <div className="nav-actions">
          <div className="theme-control">
            <button
              className="theme-trigger"
              type="button"
              onClick={() => setThemeOpen((open) => !open)}
              aria-expanded={themeOpen}
              aria-controls="theme-menu"
            >
              Palette: {selected.name}
            </button>
            <div
              className={`theme-menu ${themeOpen ? "is-open" : ""}`}
              id="theme-menu"
              aria-hidden={!themeOpen}
            >
              {themeOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  className={theme === option.key ? "is-active" : ""}
                  onClick={() => {
                    onThemeChange(option.key);
                    setThemeOpen(false);
                  }}
                  aria-pressed={theme === option.key}
                  style={{ "--swatch": option.mesh.at(-1) } as CSSProperties}
                >
                  <span>{option.name}</span>
                  <small>{option.family}</small>
                </button>
              ))}
            </div>
          </div>
          <button className="nav-cta" type="button" onClick={onAccess}>
            Get early access
          </button>
          <button
            className="mobile-toggle"
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
    </header>
  );
}
