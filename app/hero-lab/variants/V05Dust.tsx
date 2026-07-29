"use client";

/* eslint-disable react-hooks/immutability -- the particle field is intentionally mutable ref-backed simulation state */

import { useCallback, useRef } from "react";
import { HeroCopy } from "../HeroCopy";
import { LabHeader } from "../LabHeader";
import { LabPhone } from "../LabPhone";
import { useCanvasAnimation, type CanvasFrame } from "../gl/useCanvasAnimation";
import { useStagePointer } from "../gl/useStagePointer";
import type { VariantProps } from "../types";

type Mote = { x: number; y: number; z: number; vx: number; vy: number; seed: number };

function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export function V05Dust(props: VariantProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motes = useRef<Mote[]>([]);
  const { pointer, handlers } = useStagePointer(props.cursor && !props.reduced);

  const seedMotes = useCallback((width: number, height: number) => {
    const random = seeded(0x5a21d2);
    const count = width < 700 ? 150 : 290;
    motes.current = Array.from({ length: count }, () => ({
      x: random() * width,
      y: random() * height,
      z: 0.15 + random() * 0.85,
      vx: (random() - 0.5) * 0.08,
      vy: (random() - 0.5) * 0.08,
      seed: random() * 30,
    }));
  }, []);

  const draw = useCallback((frame: CanvasFrame) => {
    const { ctx, width, height, time, dt, intro, pointer: p, dpr } = frame;
    if (!motes.current.length) seedMotes(width, height);
    ctx.clearRect(0, 0, width, height);
    const cursorX = p.x * width;
    const cursorY = p.y * height;

    for (const mote of motes.current) {
      // Deliberately slow: the field should read as weather, not particles.
      const field =
        Math.sin(mote.x * 0.004 + time * 0.16 + mote.seed) * 1.45 +
        Math.cos(mote.y * 0.005 - time * 0.11) * 1.2;
      const speed = (0.05 + mote.z * 0.11) * props.intensity * dpr;
      mote.vx += Math.cos(field) * speed * dt;
      mote.vy += Math.sin(field) * speed * dt;

      const dx = mote.x - cursorX;
      const dy = mote.y - cursorY;
      const dist = dx * dx + dy * dy;
      if (dist < width * width * 0.025) {
        const force = (1 - dist / (width * width * 0.025)) * 0.0004 * mote.z;
        mote.vx += -dy * force;
        mote.vy += dx * force;
      }

      mote.vx *= 0.975;
      mote.vy *= 0.975;
      mote.x += mote.vx;
      mote.y += mote.vy;
      if (mote.x < -10) mote.x = width + 10;
      if (mote.x > width + 10) mote.x = -10;
      if (mote.y < -10) mote.y = height + 10;
      if (mote.y > height + 10) mote.y = -10;

      const protectsCopy = mote.x < width * 0.47 && mote.y > height * 0.24 && mote.y < height * 0.73;
      const alpha = intro * (protectsCopy ? 0.07 : 0.15 + mote.z * 0.48) * props.intensity;
      const size = dpr * (0.3 + mote.z * 1.05);
      ctx.fillStyle =
        mote.seed % 5 < 1
          ? `rgba(78,255,158,${alpha * 0.82})`
          : `rgba(244,236,221,${alpha})`;
      ctx.beginPath();
      ctx.ellipse(mote.x, mote.y, size * 1.15, size * 0.8, field, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [props.intensity, seedMotes]);

  useCanvasAnimation(canvasRef, draw, {
    paused: props.paused,
    reduced: props.reduced,
    pointer,
    introMs: 2200,
    dprCap: 1.45,
    onResize: seedMotes,
  });

  return (
    <section className="hlab-scene hlab-v05" {...handlers}>
      <span className="hlab-dust-container" aria-hidden="true" />
      <canvas ref={canvasRef} className="hlab-effect hlab-dust-canvas" aria-hidden="true" />
      <span className="hlab-dust-stream stream-a" />
      <span className="hlab-dust-stream stream-b" />
      <LabHeader />
      <HeroCopy layout="left" />
      <LabPhone paused={props.paused} reduced={props.reduced} className="hlab-phone-dust" />
    </section>
  );
}
