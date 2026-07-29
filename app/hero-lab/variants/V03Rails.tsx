"use client";

import { useCallback, useRef } from "react";
import { HeroCopy } from "../HeroCopy";
import { LabHeader } from "../LabHeader";
import { LabPhone } from "../LabPhone";
import { useCanvasAnimation, type CanvasFrame } from "../gl/useCanvasAnimation";
import { useStagePointer } from "../gl/useStagePointer";
import type { VariantProps } from "../types";

const COLORS = ["#5aa7ff", "#8f7bff", "#ff7ad9", "#ffb45e", "#4eff9e", "#f5eee2"];

function bezier(
  a: [number, number],
  b: [number, number],
  c: [number, number],
  d: [number, number],
  t: number,
) {
  const q = 1 - t;
  return [
    q ** 3 * a[0] + 3 * q ** 2 * t * b[0] + 3 * q * t ** 2 * c[0] + t ** 3 * d[0],
    q ** 3 * a[1] + 3 * q ** 2 * t * b[1] + 3 * q * t ** 2 * c[1] + t ** 3 * d[1],
  ] as const;
}

export function V03Rails(props: VariantProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { pointer, handlers } = useStagePointer(props.cursor && !props.reduced);

  const draw = useCallback((frame: CanvasFrame) => {
    const { ctx, width, height, time, intro, pointer: p } = frame;
    ctx.clearRect(0, 0, width, height);
    const center: [number, number] = [
      width * (0.58 + (p.x - 0.5) * 0.014),
      height * (0.58 + (p.y - 0.5) * 0.014),
    ];
    const starts: [number, number][] = [
      [-30, height * 0.15],
      [-30, height * 0.42],
      [-30, height * 0.82],
      [width + 30, height * 0.18],
      [width + 30, height * 0.52],
      [width + 30, height * 0.86],
      [width * 0.24, -30],
      [width * 0.82, height + 30],
    ];

    ctx.globalCompositeOperation = "lighter";
    starts.forEach((start, index) => {
      const side = start[0] < 0 ? 1 : start[0] > width ? -1 : index === 6 ? 1 : -1;
      const bend = (index % 2 ? 1 : -1) * height * 0.18;
      const b: [number, number] = [start[0] + side * width * 0.31, start[1] + bend];
      const c: [number, number] = [
        center[0] - side * width * 0.15,
        center[1] - bend * 0.38,
      ];
      const reveal = Math.max(0, Math.min(1, intro * 1.55 - index * 0.075));
      const end = bezier(start, b, c, center, reveal);

      ctx.beginPath();
      ctx.moveTo(start[0], start[1]);
      ctx.bezierCurveTo(b[0], b[1], c[0], c[1], end[0], end[1]);
      ctx.strokeStyle = `${COLORS[index % COLORS.length]}72`;
      ctx.lineWidth = frame.dpr * 0.7;
      ctx.shadowColor = COLORS[index % COLORS.length];
      ctx.shadowBlur = frame.dpr * 7 * props.intensity;
      ctx.stroke();

      const progress = (time * 0.075 + index * 0.137) % 1;
      const pulse = bezier(start, b, c, center, progress);
      ctx.beginPath();
      ctx.arc(pulse[0], pulse[1], frame.dpr * 1.7, 0, Math.PI * 2);
      ctx.fillStyle = COLORS[index % COLORS.length];
      ctx.shadowBlur = frame.dpr * 12;
      ctx.fill();
    });

    const gradient = ctx.createRadialGradient(center[0], center[1], 0, center[0], center[1], height * 0.13);
    gradient.addColorStop(0, "rgba(245,246,241,.9)");
    gradient.addColorStop(0.08, "rgba(78,255,158,.65)");
    gradient.addColorStop(0.3, "rgba(78,255,158,.08)");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(center[0] - height * 0.13, center[1] - height * 0.13, height * 0.26, height * 0.26);
    ctx.globalCompositeOperation = "source-over";
  }, [props.intensity]);

  useCanvasAnimation(canvasRef, draw, {
    paused: props.paused,
    reduced: props.reduced,
    pointer,
    introMs: 1850,
    dprCap: 1.45,
  });

  return (
    <section className="hlab-scene hlab-v03" {...handlers}>
      <canvas ref={canvasRef} className="hlab-effect" aria-hidden="true" />
      <span className="hlab-rail-node">ONE</span>
      <span className="hlab-rail-tag tag-a">SPEI</span>
      <span className="hlab-rail-tag tag-b">PIX</span>
      <span className="hlab-rail-tag tag-c">SEPA</span>
      <span className="hlab-rail-tag tag-d">CARD</span>
      <LabHeader />
      <HeroCopy layout="center" lines={["One account.", "Every route."]} />
      <LabPhone paused={props.paused} reduced={props.reduced} className="hlab-phone-rails" />
    </section>
  );
}
