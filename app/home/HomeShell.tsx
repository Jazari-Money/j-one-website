"use client";

import { useEffect, type ReactNode } from "react";

export function HomeShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const cardFromTarget = (target: EventTarget | null) =>
      target instanceof Element
        ? target.closest<HTMLElement>(".pointer-card")
        : null;

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const card = cardFromTarget(event.target);
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      card.style.setProperty("--pointer-x", `${x * 100}%`);
      card.style.setProperty("--pointer-y", `${y * 100}%`);
      card.style.setProperty("--pointer-nx", `${x - 0.5}`);
      card.style.setProperty("--pointer-ny", `${y - 0.5}`);
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 1.4}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 1.6}deg`);
    };

    const resetPointer = (event: PointerEvent) => {
      const card = cardFromTarget(event.target);
      if (!card || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) {
        return;
      }
      card.style.setProperty("--pointer-nx", "0");
      card.style.setProperty("--pointer-ny", "0");
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };

    document.addEventListener("pointermove", updatePointer, { passive: true });
    document.addEventListener("pointerout", resetPointer, { passive: true });
    return () => {
      document.removeEventListener("pointermove", updatePointer);
      document.removeEventListener("pointerout", resetPointer);
    };
  }, []);

  return (
    <main
      className="home-page is-ready"
      data-theme="jazari"
      data-shader="color-event"
    >
      {children}
    </main>
  );
}
