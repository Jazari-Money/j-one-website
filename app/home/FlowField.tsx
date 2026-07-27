"use client";

import { useEffect, useRef } from "react";
import {
  PALETTES,
  createShader,
  playSweep,
  type ShaderController,
  type SweepHandle,
} from "glimm";
import { useReducedMotion } from "./hooks";

export function FlowField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shaderRef = useRef<ShaderController | null>(null);
  const sweepRef = useRef<SweepHandle | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host || reduced) return;

    shaderRef.current = createShader({
      canvas,
      palette: PALETTES.citrus,
      direction: "ttb",
      bandTight: 40,
      waveAmount: 0.62,
      rippleAmount: 0.4,
      waveSpeed: 0.72,
      brightness: 0.72,
      swellAmount: 0.52,
    });

    const play = () => {
      if (!shaderRef.current || sweepRef.current) return;
      const handle = playSweep(shaderRef.current, {
        palette: "citrus",
        direction: "ttb",
        easing: "snap",
        bandTight: 40,
        sweepMs: 1280,
        outroMs: 900,
        peakAlpha: 0.68,
        brightness: 0.74,
        waveAmount: 0.62,
        rippleAmount: 0.4,
        waveSpeed: 0.72,
        swellAmount: 0.52,
      });
      sweepRef.current = handle;
      handle.done.finally(() => {
        if (sweepRef.current === handle) sweepRef.current = null;
      });
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") play();
    };
    host.addEventListener("pointerenter", onPointerEnter);

    let observer: IntersectionObserver | undefined;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          play();
          observer?.disconnect();
        },
        { threshold: 0.38 },
      );
      observer.observe(host);
    }

    return () => {
      observer?.disconnect();
      host.removeEventListener("pointerenter", onPointerEnter);
      sweepRef.current?.cancel();
      shaderRef.current?.destroy();
      sweepRef.current = null;
      shaderRef.current = null;
    };
  }, [reduced]);

  return (
    <canvas
      className={`flow-field-canvas money-flow-canvas ${className}`.trim()}
      ref={canvasRef}
      aria-hidden="true"
    />
  );
}
