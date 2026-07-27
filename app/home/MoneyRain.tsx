"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  PALETTES,
  createShader,
  playSweep,
  type ShaderController,
  type SweepHandle,
} from "glimm";
import { resetPointer, trackPointer, useReducedMotion } from "./hooks";

export function MoneyRain({ onAccess }: { onAccess: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shaderRef = useRef<ShaderController | null>(null);
  const sweepRef = useRef<SweepHandle | null>(null);
  const mobilePlayed = useRef(false);
  const reduced = useReducedMotion();

  const play = useCallback(() => {
    if (reduced || !shaderRef.current || sweepRef.current) return;
    const handle = playSweep(shaderRef.current, {
      palette: "citrus",
      direction: "ttb",
      easing: "snap",
      bandTight: 40,
      sweepMs: 1120,
      outroMs: 760,
      peakAlpha: 0.82,
      brightness: 0.9,
      waveAmount: 0.55,
      rippleAmount: 0.34,
      waveSpeed: 0.8,
      swellAmount: 0.45,
    });
    sweepRef.current = handle;
    handle.done.finally(() => {
      if (sweepRef.current === handle) sweepRef.current = null;
    });
  }, [reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    shaderRef.current = createShader({
      canvas,
      palette: PALETTES.citrus,
      direction: "ttb",
      bandTight: 40,
      waveAmount: 0.55,
      rippleAmount: 0.34,
      waveSpeed: 0.8,
      brightness: 0.9,
      swellAmount: 0.45,
    });
    return () => {
      sweepRef.current?.cancel();
      sweepRef.current = null;
      shaderRef.current?.destroy();
      shaderRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (!coarse) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || mobilePlayed.current) return;
        mobilePlayed.current = true;
        play();
        observer.disconnect();
      },
      { threshold: 0.42 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [play, reduced]);

  return (
    <section
      className="money-rain section"
      ref={sectionRef}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") play();
      }}
      onFocusCapture={play}
    >
      <canvas className="money-flow-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="money-rain-content">
        <h2>Your dollars should move with you.</h2>
        <p>Download Jazari and see when the account becomes available in your country.</p>
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
