"use client";

import { useEffect, useMemo, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { LabPointer } from "./ShaderCanvas";

/**
 * Tracks the pointer inside a hero stage. Writes normalized values into a ref
 * (for shader uniforms) and into CSS custom properties on the stage element
 * (for DOM parallax), without touching React state.
 */
export function useStagePointer(enabled: boolean) {
  const ref = useRef<LabPointer>({ x: 0.5, y: 0.5 });
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
    if (!enabled) {
      ref.current = { x: 0.5, y: 0.5 };
    }
  }, [enabled]);

  const handlers = useMemo(
    () => ({
      onPointerMove(event: ReactPointerEvent<HTMLElement>) {
        if (!enabledRef.current || event.pointerType !== "mouse") return;
        const node = event.currentTarget;
        const rect = node.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
        ref.current = { x, y };
        node.style.setProperty("--stage-nx", `${(x - 0.5).toFixed(4)}`);
        node.style.setProperty("--stage-ny", `${(y - 0.5).toFixed(4)}`);
      },
      onPointerLeave(event: ReactPointerEvent<HTMLElement>) {
        ref.current = { x: 0.5, y: 0.5 };
        event.currentTarget.style.setProperty("--stage-nx", "0");
        event.currentTarget.style.setProperty("--stage-ny", "0");
      },
    }),
    [],
  );

  return { pointer: ref, handlers };
}
