"use client";

import { FlowField } from "./FlowField";
import { resetPointer, trackPointer } from "./hooks";

export function MoneyRain({ onAccess }: { onAccess: () => void }) {
  return (
    <section className="money-rain section">
      <FlowField />
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
