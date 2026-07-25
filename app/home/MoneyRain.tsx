"use client";

/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import { CSSProperties, useEffect, useRef, useState } from "react";
import { withBasePath } from "../site-paths";
import { coinSeeds } from "./data";
import { resetPointer, trackPointer, useReducedMotion } from "./hooks";

export function MoneyRain({ onAccess }: { onAccess: () => void }) {
  const [raining, setRaining] = useState(false);
  const timeout = useRef(0);
  const reduced = useReducedMotion();

  function runForTouch() {
    setRaining(true);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setRaining(false), 4200);
  }

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  return (
    <section
      className={`money-rain section ${raining ? "is-raining" : ""}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && !reduced) setRaining(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setRaining(false);
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse" && !reduced) runForTouch();
      }}
      onFocusCapture={() => {
        if (!reduced) setRaining(true);
      }}
      onBlurCapture={() => setRaining(false)}
    >
      {raining && !reduced && (
        <div className="coin-rain" aria-hidden="true">
          {coinSeeds.map((coin, index) => (
            <span
              className="coin-fall"
              key={index}
              style={{
                "--coin-left": `${coin.left}%`,
                "--coin-delay": `${coin.delay}s`,
                "--coin-duration": `${coin.duration}s`,
                "--coin-size": `${coin.size}px`,
                "--coin-drift": `${coin.drift}px`,
                "--coin-spin": `${coin.spin}deg`,
              } as CSSProperties}
            >
              <img
                src={withBasePath("/images/coins/jazari-dollar-3d.webp")}
                alt=""
                draggable="false"
              />
            </span>
          ))}
        </div>
      )}
      <div className="money-rain-glow" aria-hidden="true" />
      <div className="money-rain-content">
        <h2>Your dollars should move with you.</h2>
        <p>Join the waitlist and we&apos;ll tell you when Jazari becomes available in your country.</p>
        <button
          type="button"
          onClick={onAccess}
          onPointerMove={trackPointer}
          onPointerLeave={resetPointer}
        >
          Download App
        </button>
      </div>
    </section>
  );
}
