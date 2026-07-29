"use client";

/* eslint-disable @next/next/no-img-element -- exact local brand and device assets */

import { Dithering, GodRays, LiquidMetal, SmokeRing } from "@paper-design/shaders-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { withBasePath } from "../site-paths";
import type { CodexConcept } from "./data";
import { CodexCanvas } from "./CodexCanvas";

export type CodexSceneProps = {
  concept: CodexConcept;
  paused: boolean;
  reduced: boolean;
  cursor: boolean;
  intensity: number;
  introKey: number;
  compact?: boolean;
};

function SceneHeader() {
  return (
    <header className="xlab-nav" aria-label="Preview navigation">
      <Link href="/" className="xlab-brand" aria-label="Jazari One home">
        <img src={withBasePath("/images/brand/jazari-one-logo.svg")} alt="Jazari One" />
      </Link>
      <nav>
        <span>Personal</span>
        <span>Plan</span>
        <span>Blog</span>
      </nav>
      <span className="xlab-download">Download App</span>
    </header>
  );
}

function Phone({ paused, reduced, delayed = false }: { paused: boolean; reduced: boolean; delayed?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused || reduced) video.pause();
    else video.play().catch(() => {});
  }, [paused, reduced]);

  return (
    <div className={`xlab-phone ${delayed ? "is-delayed" : ""}`} aria-label="Jazari One app preview">
      <img src={withBasePath("/images/iphone-12-pro-graphite.webp")} alt="" aria-hidden="true" />
      <video ref={videoRef} autoPlay={!paused && !reduced} muted loop playsInline preload="metadata">
        <source src={withBasePath("/videos/jazari-app.mp4")} type="video/mp4" />
      </video>
    </div>
  );
}

function Copy({ dark = false, singular = false }: { dark?: boolean; singular?: boolean }) {
  return (
    <div className={`xlab-copy ${dark ? "is-dark" : ""}`}>
      <p className="xlab-eyebrow">USD account · global rails</p>
      <h1>
        {singular ? (
          <>
            One balance.
            <br />
            Everywhere.
          </>
        ) : (
          <>
            Your dollars,
            <br />
            without borders.
          </>
        )}
      </h1>
      <p className="xlab-subcopy">
        Hold, send and receive dollars across borders from one calm account.
      </p>
      <div className="xlab-actions">
        <span className="xlab-primary">Download App</span>
        <span className="xlab-secondary">Explore Jazari One</span>
      </div>
    </div>
  );
}

function WebglLayer({ id, paused, reduced, intensity }: Pick<CodexSceneProps, "paused" | "reduced" | "intensity"> & { id: string }) {
  const speed = paused || reduced ? 0 : 0.18 + intensity * 0.22;
  if (id === "04") {
    return (
      <GodRays
        className="xlab-webgl"
        colorBack="#030504"
        colorBloom="#f4d89f"
        colors={["#fff4d2", "#78a8b2", "#151917"]}
        density={0.72}
        intensity={0.58 + intensity * 0.28}
        bloom={0.22}
        spotty={0.18}
        midSize={0.22}
        midIntensity={0.5}
        offsetX={0.16}
        offsetY={-0.12}
        rotation={-26}
        scale={1.22}
        speed={speed}
        minPixelRatio={1}
        maxPixelCount={1600000}
      />
    );
  }
  if (id === "06") {
    return (
      <LiquidMetal
        className="xlab-webgl"
        shape="diamond"
        colorBack="#040608"
        colorTint="#b9f3e8"
        repetition={3.2}
        softness={0.36}
        shiftRed={0.26}
        shiftBlue={0.42}
        distortion={0.28 + intensity * 0.22}
        contour={0.58}
        angle={-18}
        scale={0.72}
        rotation={8}
        speed={speed}
        minPixelRatio={1}
        maxPixelCount={1500000}
      />
    );
  }
  if (id === "08") {
    return (
      <Dithering
        className="xlab-webgl"
        colorBack="#eee8dc"
        colorFront="#111a4d"
        shape="sphere"
        type="4x4"
        size={1.35}
        scale={1.15}
        rotation={-22}
        offsetX={-0.2}
        speed={speed}
        minPixelRatio={1}
        maxPixelCount={1300000}
      />
    );
  }
  return (
    <SmokeRing
      className="xlab-webgl"
      colorBack="#000000"
      colors={["#eafcff", "#77b8ff", "#e669c8", "#8ee2b8"]}
      thickness={0.12}
      radius={0.62}
      innerShape={0.42}
      noiseIterations={3}
      noiseScale={0.38}
      scale={0.58}
      speed={speed}
      minPixelRatio={1}
      maxPixelCount={1500000}
    />
  );
}

export function CodexScene(props: CodexSceneProps) {
  const { concept, paused, reduced, cursor, intensity, introKey, compact = false } = props;
  const canvasMode =
    concept.id === "01"
      ? "caustics"
      : concept.id === "03"
        ? "rails"
        : concept.id === "05"
          ? "dust"
          : "topography";
  const hasCanvas = ["01", "03", "05", "07"].includes(concept.id);
  const hasWebgl = ["04", "06", "08", "10"].includes(concept.id);
  const noPhone = concept.id === "10";

  return (
    <section
      key={introKey}
      className={`xlab-scene xlab-v${concept.id} is-${concept.composition} ${paused ? "is-paused" : ""} ${reduced ? "is-reduced" : ""} ${compact ? "is-compact" : ""}`}
      style={{ "--xlab-fx": intensity } as React.CSSProperties}
    >
      <div className="xlab-space" aria-hidden="true">
        {hasCanvas && (
          <CodexCanvas
            mode={canvasMode}
            paused={paused}
            reduced={reduced}
            cursor={cursor}
            intensity={intensity}
          />
        )}
        {hasWebgl && <WebglLayer id={concept.id} paused={paused} reduced={reduced} intensity={intensity} />}
        {concept.id === "02" && <div className="xlab-portal" />}
        {concept.id === "09" && <div className="xlab-color-event" />}
        <span className="xlab-grain" />
      </div>
      <SceneHeader />
      <Copy dark={concept.id === "07" || concept.id === "08"} singular={concept.id === "10"} />
      {!noPhone && <Phone paused={paused} reduced={reduced} delayed={concept.id === "05"} />}
      {noPhone && (
        <div className="xlab-after">
          <span>Scroll to reveal the account</span>
          <Phone paused={paused} reduced={reduced} />
        </div>
      )}
      <span className="xlab-scene-index">{concept.id} / 10</span>
    </section>
  );
}
