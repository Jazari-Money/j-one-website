"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import Link from "next/link";
import { withBasePath } from "../site-paths";

/**
 * Visual replica of the production navigation, positioned inside the lab
 * stage. Kept independent of every background scene: it sits above the
 * effect layers and never inherits their filters or masks.
 */
export function LabHeader() {
  return (
    <header className="hlab-nav" aria-label="Preview navigation">
      <Link className="hlab-nav-brand" href="/" aria-label="Jazari One home">
        <img src={withBasePath("/images/brand/jazari-one-logo.svg")} alt="Jazari One" />
      </Link>
      <nav className="hlab-nav-links">
        <span>Personal</span>
        <Link href="/plan/">Plan</Link>
        <Link href="/blog/">Blog</Link>
      </nav>
      <a
        className="hlab-nav-cta"
        href="https://apps.apple.com/"
        target="_blank"
        rel="noreferrer"
      >
        Download App
      </a>
    </header>
  );
}
