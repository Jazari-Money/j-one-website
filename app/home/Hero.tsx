"use client";

import { appDownloadUrl } from "../site-paths";
import { HeroColorEvent } from "./HeroColorEvent";
import { ResponsiveImage } from "./ResponsiveImage";
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
        href={appDownloadUrl}
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
        <h1 aria-label="Get paid in USD. Earn. Send worldwide.">
          <span className="hero-title-desktop" aria-hidden="true">
            <span className="hero-title-line">
              <span>Get paid in USD. Earn.</span>
            </span>
            <span className="hero-title-line"><span>Send worldwide.</span></span>
          </span>
          <span className="hero-title-mobile" aria-hidden="true">
            <span className="hero-title-line"><span>Get paid in USD.</span></span>
            <span className="hero-title-line"><span>Earn. Send</span></span>
            <span className="hero-title-line"><span>worldwide.</span></span>
          </span>
        </h1>
        <p>
          Your own USD account. Up to 7% APY with{" "}
          <span className="hero-copy-mobile-keep">
            Yields.<br className="hero-copy-desktop-break" />{" "}
            Bank transfers to 30+ countries.
          </span>
        </p>
        <HeroDownload />
      </div>

      <div className="hero-product" aria-label="Jazari One app preview">
        <div className="hero-device-glow" aria-hidden="true" />
        <div className="hero-device">
          <ResponsiveImage
            className="hero-device-image"
            alt="Jazari One balance and recent transactions"
            fallback="/images/screens/j-one-app-main.png"
            stem="/images/screens/j-one-app-main"
            widths={[360, 720, 1080]}
            width={1263}
            height={2580}
            sizes="(max-width: 620px) 72vw, 322px"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>

    </section>
  );
}
