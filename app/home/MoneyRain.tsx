"use client";

import type { CSSProperties } from "react";
import { FlowField } from "./FlowField";
import { resetPointer, trackPointer } from "./hooks";

const particles = (() => {
  let seed = 0x51f15e;
  const random = () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 0xffffffff;
  };

  return Array.from({ length: 58 }, () => ({
    x: random() * 100,
    y: random() * 100,
    size: 0.8 + random() * 2.4,
    driftX: -38 + random() * 76,
    driftY: -22 - random() * 62,
    duration: 7 + random() * 12,
    delay: -random() * 14,
    warm: random() > 0.72,
  }));
})();

export function MoneyRain({ onAccess }: { onAccess: () => void }) {
  return (
    <section className="money-rain section">
      <FlowField />
      <div className="money-particles" aria-hidden="true">
        {particles.map((particle, index) => (
          <i
            className={particle.warm ? "is-warm" : ""}
            key={index}
            style={{
              "--particle-x": `${particle.x}%`,
              "--particle-y": `${particle.y}%`,
              "--particle-size": `${particle.size}px`,
              "--particle-dx": `${particle.driftX}px`,
              "--particle-dy": `${particle.driftY}px`,
              "--particle-duration": `${particle.duration}s`,
              "--particle-delay": `${particle.delay}s`,
            } as CSSProperties}
          />
        ))}
      </div>
      <div className="money-rain-content">
        <h2>Your dollars should move with you</h2>
        <button
          className="realism-button"
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
