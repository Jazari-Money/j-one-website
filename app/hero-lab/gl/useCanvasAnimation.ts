"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type { LabPointer } from "./ShaderCanvas";

export type CanvasFrame = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  dpr: number;
  time: number;
  dt: number;
  intro: number;
  pointer: LabPointer;
  reduced: boolean;
};

type CanvasAnimationOptions = {
  paused: boolean;
  reduced: boolean;
  introMs?: number;
  dprCap?: number;
  pointer?: RefObject<LabPointer>;
  /** Called on size changes so particle systems can (re)seed. */
  onResize?: (width: number, height: number, dpr: number) => void;
};

/**
 * Shared RAF loop for Canvas-2D hero scenes: DPR capping, pause, reduced
 * motion (renders one static frame), tab visibility, viewport culling and
 * pointer smoothing — mirroring ShaderCanvas semantics.
 */
export function useCanvasAnimation(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  draw: (frame: CanvasFrame) => void,
  {
    paused,
    reduced,
    introMs = 1800,
    dprCap = 1.6,
    pointer,
    onResize,
  }: CanvasAnimationOptions,
) {
  const drawRef = useRef(draw);
  const resizeRef = useRef(onResize);
  const liveProps = useRef({ paused, reduced });
  const kickRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    drawRef.current = draw;
    resizeRef.current = onResize;
    liveProps.current = { paused, reduced };
    kickRef.current?.();
  }, [draw, onResize, paused, reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let disposed = false;
    let inView = true;
    let docVisible = !document.hidden;
    let time = 0;
    let intro = 0;
    let last = performance.now();
    let staticFrameDrawn = false;
    const smooth = { x: 0.5, y: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        resizeRef.current?.(w, h, dpr);
        staticFrameDrawn = false;
      }
    };

    const schedule = () => {
      if (!disposed && !raf && inView && docVisible) {
        raf = requestAnimationFrame(render);
      }
    };
    kickRef.current = () => {
      last = performance.now();
      staticFrameDrawn = false;
      schedule();
    };

    const render = (now: number) => {
      raf = 0;
      if (disposed) return;
      const props = liveProps.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (!props.paused && !props.reduced) time += dt;
      if (props.reduced) intro = 1;
      else if (!props.paused) intro = Math.min(1, intro + (dt * 1000) / introMs);

      const target = pointer?.current ?? smooth;
      smooth.x += (target.x - smooth.x) * 0.08;
      smooth.y += (target.y - smooth.y) * 0.08;

      resize();
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      drawRef.current({
        ctx,
        width: canvas.width,
        height: canvas.height,
        dpr,
        time,
        dt,
        intro,
        pointer: { x: smooth.x, y: smooth.y },
        reduced: props.reduced,
      });

      const still = props.paused || props.reduced;
      if (still && staticFrameDrawn) return;
      if (still) staticFrameDrawn = true;
      schedule();
    };

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            if (inView) kickRef.current?.();
          });
    observer?.observe(canvas);

    const onVisibility = () => {
      docVisible = !document.hidden;
      if (docVisible) kickRef.current?.();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const resizeObserver = new ResizeObserver(() => kickRef.current?.());
    resizeObserver.observe(canvas);

    schedule();

    return () => {
      disposed = true;
      kickRef.current = null;
      if (raf) cancelAnimationFrame(raf);
      observer?.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [canvasRef, introMs, dprCap, pointer]);

}
