"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import { CSSProperties, useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { withBasePath } from "../site-paths";
import {
  shaderOptions,
  themeOptions,
  type ShaderKey,
  type ThemeKey,
} from "./data";
import { resetPointer, trackPointer, useReducedMotion } from "./hooks";
import { SocialLinks } from "./SocialLinks";

export function SiteHeader({
  theme,
  shader,
  onThemeChange,
  onShaderChange,
  onAccess,
  mode = "home",
}: {
  theme: ThemeKey;
  shader: ShaderKey;
  onThemeChange: (theme: ThemeKey) => void;
  onShaderChange: (shader: ShaderKey) => void;
  onAccess: () => void;
  mode?: "home" | "internal";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();
  const selected = themeOptions.find((option) => option.key === theme) ?? themeOptions[0];
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
        setThemeOpen(false);
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
          <a href={sectionHref("how")} onClick={closeMobile}>How it works</a>
          <a href={sectionHref("rates")} onClick={closeMobile}>Rates</a>
          <a href={sectionHref("roadmap")} onClick={closeMobile}>Roadmap</a>
          <a href={withBasePath("/blog/")} onClick={closeMobile}>Blog</a>
          <a href={sectionHref("faq")} onClick={closeMobile}>FAQ</a>
          <div className="nav-mobile-extras">
            <button
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
          <div className="theme-control">
            <button
              className="theme-trigger"
              type="button"
              onClick={() => setThemeOpen((open) => !open)}
              onPointerMove={trackPointer}
              onPointerLeave={resetPointer}
              aria-expanded={themeOpen}
              aria-controls="theme-menu"
              aria-label={`Choose color theme. Current theme: ${selected.name}`}
            >
              <span
                className="theme-trigger-swatch"
                style={{
                  "--swatch": selected.mesh[1],
                  "--swatch-2": selected.mesh[2],
                } as CSSProperties}
                aria-hidden="true"
              />
            </button>
            <div
              className={`theme-menu ${themeOpen ? "is-open" : ""}`}
              id="theme-menu"
              aria-hidden={!themeOpen}
            >
              <div className="theme-menu-section">
                <p>Color</p>
                <div className="theme-swatch-grid">
                  {themeOptions.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      className={theme === option.key ? "is-active" : ""}
                      onClick={() => onThemeChange(option.key)}
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
              <div className="theme-menu-section field-options">
                <p>Field</p>
                <div>
                  {shaderOptions.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      className={shader === option.key ? "is-active" : ""}
                      onClick={() => {
                        onShaderChange(option.key);
                        setThemeOpen(false);
                      }}
                      aria-pressed={shader === option.key}
                    >
                      <span>{option.name}</span>
                      <small>{option.description}</small>
                    </button>
                  ))}
                </div>
              </div>
              <button
                className="visuals-done"
                type="button"
                onClick={() => setThemeOpen(false)}
              >
                Done
              </button>
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
            <span className="nav-cta-label">Download App</span>
          </button>
          <button
            className="mobile-toggle"
            type="button"
            onClick={() => {
              setThemeOpen(false);
              setMobileOpen((open) => !open);
            }}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
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
