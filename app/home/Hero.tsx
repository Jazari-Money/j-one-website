"use client";

/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import { withBasePath } from "../site-paths";
import { HeroColorEvent } from "./HeroColorEvent";
import {
  resetPointer,
  trackPointer,
  useReducedMotion,
} from "./hooks";

function HeroDownload() {
  return (
    <div className="hero-download-control" id="access">
      <a
        className="magic-access-button hero-download-button"
        href="https://apps.apple.com/"
        target="_blank"
        rel="noreferrer"
        onPointerMove={trackPointer}
        onPointerLeave={resetPointer}
      >
        <span className="button-shader" aria-hidden="true" />
        <span className="button-label">Download App</span>
      </a>
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="hero" id="top">
      <div className="hero-shader" aria-hidden="true">
        <HeroColorEvent reduced={reduced} />
      </div>
      <div className="hero-copy">
        <h1>
          <span className="hero-title-line"><span>Use dollars.</span></span>
          <span className="hero-title-line"><span>Anywhere.</span></span>
        </h1>
        <p>Hold them. Send them. Grow them.</p>
        <HeroDownload />
      </div>

      <div className="hero-product" aria-label="Jazari One app preview">
        <div className="hero-device-glow" aria-hidden="true" />
        <div className="hero-device">
          <img
            className="hero-device-frame"
            src={withBasePath("/images/iphone-12-pro-graphite.webp")}
            alt=""
            aria-hidden="true"
          />
          <video
            className="hero-device-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Jazari One app experience"
          >
            <source src={withBasePath("/videos/jazari-app.mp4")} type="video/mp4" />
          </video>
        </div>
      </div>

    </section>
  );
}
