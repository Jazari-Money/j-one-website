"use client";

/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import { MeshGradient } from "@paper-design/shaders-react";
import { withBasePath } from "../site-paths";
import { jazariVisualProfile } from "./data";
import {
  resetPointer,
  trackPointer,
  useInViewport,
  useReducedMotion,
} from "./hooks";

const heroDust = (() => {
  let seed = 0x72b4c91;
  const random = () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 0xffffffff;
  };

  return Array.from({ length: 118 }, () => ({
    x: 2 + random() * 96,
    y: 2 + random() * 90,
    size: 0.86 + random() * 2.35,
    driftX: -48 + random() * 96,
    driftY: -72 - random() * 118,
    duration: 5.2 + random() * 7.8,
    delay: -random() * 13,
  }));
})();

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
  const [shaderRef, shaderVisible] = useInViewport<HTMLDivElement>("160px");

  return (
    <section className="hero" id="top">
      <div className="hero-shader" aria-hidden="true" ref={shaderRef}>
        {shaderVisible && (
          <MeshGradient
            width="100%"
            height="100%"
            colors={[...jazariVisualProfile.mesh]}
            distortion={0.12}
            swirl={0.018}
            grainMixer={0}
            grainOverlay={0}
            speed={reduced ? 0 : 0.018}
            scale={0.92}
          />
        )}
        <span className="beam-rays">
          <i />
          <i />
        </span>
        <span className="beam-dust">
          {heroDust.map((particle, index) => (
            <i
              key={index}
              style={{
                "--dust-x": `${particle.x}%`,
                "--dust-y": `${particle.y}%`,
                "--dust-size": `${particle.size}px`,
                "--dust-dx": `${particle.driftX}px`,
                "--dust-dy": `${particle.driftY}px`,
                "--dust-duration": `${particle.duration}s`,
                "--dust-delay": `${particle.delay}s`,
              } as React.CSSProperties}
            />
          ))}
        </span>
      </div>
      <div className="hero-copy">
        <h1>Your dollars,<br />wherever you are</h1>
        <p>
          Hold your money in dollars that keep their value — and send it to any
          bank account in Mexico, Colombia, Brazil, Europe and 26 more countries.
        </p>
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
