"use client";

/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import { FormEvent } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { withBasePath } from "../site-paths";
import type { ThemeOption } from "./data";
import {
  resetPointer,
  trackPointer,
  useInViewport,
  useReducedMotion,
} from "./hooks";

function MagicAccess({
  theme,
  shaderActive,
  open,
  joined,
  email,
  emailInput,
  onOpen,
  onEmail,
  onSubmit,
}: {
  theme: ThemeOption;
  shaderActive: boolean;
  open: boolean;
  joined: boolean;
  email: string;
  emailInput: React.RefObject<HTMLInputElement | null>;
  onOpen: () => void;
  onEmail: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={`access-control ${open ? "is-open" : ""}`} id="access">
      <button
        className="magic-access-button"
        type="button"
        onClick={onOpen}
        onPointerMove={trackPointer}
        onPointerLeave={resetPointer}
        aria-expanded={open}
        aria-controls="access-form"
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
      >
        <span className="button-shader" aria-hidden="true">
          {shaderActive && (
            <MeshGradient
              width="100%"
              height="100%"
              colors={[theme.mesh[1], theme.mesh[3], "#eaffdf", theme.mesh[2]]}
              distortion={0.24}
              swirl={0.05}
              grainMixer={0}
              grainOverlay={0}
              speed={reduced ? 0 : 0.16}
            />
          )}
        </span>
        <span className="button-label">Get Early Access</span>
      </button>
      <form
        className="access-form"
        id="access-form"
        onSubmit={onSubmit}
        aria-hidden={!open}
      >
        {joined ? (
          <div className="success-message" role="status">
            You&apos;re on the list. We&apos;ll be in touch.
          </div>
        ) : (
          <>
            <label className="sr-only" htmlFor="email">Email address</label>
            <input
              ref={emailInput}
              id="email"
              type="email"
              value={email}
              onChange={(event) => onEmail(event.target.value)}
              placeholder="Email address"
              autoComplete="email"
              tabIndex={open ? 0 : -1}
              required
            />
            <button
              type="submit"
              tabIndex={open ? 0 : -1}
              onPointerMove={trackPointer}
              onPointerLeave={resetPointer}
            >
              Join Waitlist
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export function Hero({
  theme,
  accessOpen,
  joined,
  email,
  emailInput,
  onOpen,
  onEmail,
  onSubmit,
}: {
  theme: ThemeOption;
  accessOpen: boolean;
  joined: boolean;
  email: string;
  emailInput: React.RefObject<HTMLInputElement | null>;
  onOpen: () => void;
  onEmail: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const reduced = useReducedMotion();
  const [shaderRef, shaderVisible] = useInViewport<HTMLDivElement>("160px");

  return (
    <section className="hero" id="top">
      <div className="hero-shader" aria-hidden="true" ref={shaderRef}>
        {shaderVisible && (
          <MeshGradient
            width="100%"
            height="100%"
            colors={[theme.mesh[0], theme.mesh[1], theme.mesh[2], theme.mesh[3]]}
            distortion={0.26}
            swirl={0.06}
            grainMixer={0}
            grainOverlay={0}
            speed={reduced ? 0 : 0.08}
            scale={0.82}
          />
        )}
      </div>
      <div className="hero-copy">
        <h1>Your dollars,<br />wherever you are.</h1>
        <p>
          Hold your money in dollars that keep their value — and send it to any
          bank account in Mexico, Colombia, Brazil, Europe and 26 more countries.
        </p>
        <MagicAccess
          theme={theme}
          shaderActive={shaderVisible}
          open={accessOpen}
          joined={joined}
          email={email}
          emailInput={emailInput}
          onOpen={onOpen}
          onEmail={onEmail}
          onSubmit={onSubmit}
        />
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
