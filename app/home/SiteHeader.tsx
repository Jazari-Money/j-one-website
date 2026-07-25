"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import { CSSProperties, useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { withBasePath } from "../site-paths";
import { themeOptions, type ThemeKey } from "./data";
import { resetPointer, trackPointer, useReducedMotion } from "./hooks";

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
  const reduced = useReducedMotion();
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
          <a href="#how" onClick={closeMobile}>How It Works</a>
          <a href="#rates" onClick={closeMobile}>Rates</a>
          <a href="#roadmap" onClick={closeMobile}>Roadmap</a>
          <a href={withBasePath("/blog/")} onClick={closeMobile}>Blog</a>
          <a href="#faq" onClick={closeMobile}>FAQ</a>
        </div>

        <div className="nav-actions">
          <div className="theme-control">
            <button
              className="theme-trigger"
              type="button"
              onClick={() => setThemeOpen((open) => !open)}
              onPointerMove={trackPointer}
              onPointerLeave={resetPointer}
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
                  style={{
                    "--swatch": option.mesh[0],
                    "--swatch-2": option.mesh[2],
                  } as CSSProperties}
                >
                  <span>{option.name}</span>
                  <small>{option.family}</small>
                </button>
              ))}
            </div>
          </div>
          <button
            className="nav-cta"
            type="button"
            onClick={onAccess}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            <span className="nav-cta-shader" aria-hidden="true">
              <MeshGradient
                width="100%"
                height="100%"
                colors={[selected.mesh[2], selected.mesh[3], "#ffffff", selected.mesh[1]]}
                distortion={0.12}
                swirl={0.02}
                grainMixer={0}
                grainOverlay={0}
                speed={reduced ? 0 : 0.08}
              />
            </span>
            <span className="nav-cta-label">Get Early Access</span>
          </button>
          <button
            className="mobile-toggle"
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
    </header>
  );
}
