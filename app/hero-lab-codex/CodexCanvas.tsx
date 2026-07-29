"use client";

import { useEffect, useRef } from "react";

type CanvasMode = "caustics" | "rails" | "dust" | "topography";

type Props = {
  mode: CanvasMode;
  paused: boolean;
  reduced: boolean;
  cursor: boolean;
  intensity: number;
};

type Particle = {
  x: number;
  y: number;
  z: number;
  seed: number;
};

function hash(value: number) {
  return Math.abs(Math.sin(value * 127.1) * 43758.5453) % 1;
}

export function CodexCanvas({ mode, paused, reduced, cursor, intensity }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, vx: 0, vy: 0 });
  const stateRef = useRef({ paused, reduced, cursor, intensity });

  useEffect(() => {
    stateRef.current = { paused, reduced, cursor, intensity };
  }, [paused, reduced, cursor, intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !host || !context) return;

    let width = 1;
    let height = 1;
    let frame = 0;
    let visible = !document.hidden;
    let previous = performance.now();
    let elapsed = 0;
    const particles: Particle[] = Array.from({ length: 230 }, (_, index) => ({
      x: hash(index * 3.17),
      y: hash(index * 8.41 + 5),
      z: 0.25 + hash(index * 1.93) * 0.75,
      seed: hash(index * 11.7),
    }));

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (event: PointerEvent) => {
      if (!stateRef.current.cursor) return;
      const rect = host.getBoundingClientRect();
      const nextX = (event.clientX - rect.left) / rect.width;
      const nextY = (event.clientY - rect.top) / rect.height;
      pointerRef.current.vx = nextX - pointerRef.current.x;
      pointerRef.current.vy = nextY - pointerRef.current.y;
      pointerRef.current.x = nextX;
      pointerRef.current.y = nextY;
    };

    const onVisibility = () => {
      visible = !document.hidden;
      previous = performance.now();
    };

    const clear = (color: string) => {
      context.globalCompositeOperation = "source-over";
      context.fillStyle = color;
      context.fillRect(0, 0, width, height);
    };

    const drawCaustics = (time: number, fx: number) => {
      clear("#030405");
      context.globalCompositeOperation = "screen";
      const colors = ["#ffb44a", "#73d9ff", "#ed5bba", "#ecf4e8", "#62d49a"];
      for (let band = 0; band < 9; band += 1) {
        const phase = time * (0.035 + band * 0.002) + band * 0.79;
        const baseY = height * (0.18 + band * 0.078);
        context.beginPath();
        for (let x = -20; x <= width + 20; x += 10) {
          const normalized = x / width;
          const wave =
            Math.sin(normalized * 7.2 + phase) * 22 +
            Math.sin(normalized * 16 - phase * 1.7) * 8;
          const bend = (pointerRef.current.x - 0.5) * 18 * Math.sin(normalized * Math.PI);
          const y = baseY + wave + bend;
          if (x === -20) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.lineWidth = 1.5 + (band % 3) * 2.5;
        context.strokeStyle = colors[band % colors.length];
        context.globalAlpha = (0.18 + (band % 2) * 0.08) * fx;
        context.shadowColor = colors[band % colors.length];
        context.shadowBlur = 18 + band * 2;
        context.stroke();
      }
      context.shadowBlur = 0;
      const glow = context.createRadialGradient(
        width * 0.66,
        height * 0.48,
        0,
        width * 0.66,
        height * 0.48,
        height * 0.42,
      );
      glow.addColorStop(0, `rgba(236,244,232,${0.18 * fx})`);
      glow.addColorStop(0.32, `rgba(115,217,255,${0.08 * fx})`);
      glow.addColorStop(1, "transparent");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
    };

    const drawRails = (time: number, fx: number) => {
      clear("#05070a");
      const node = { x: width * 0.62, y: height * 0.53 };
      const colors = ["#4f7cff", "#ff6c5c", "#77e3bb", "#f5e8c8", "#aa79ff"];
      context.globalCompositeOperation = "screen";
      for (let index = 0; index < 12; index += 1) {
        const fromLeft = index % 2 === 0;
        const startX = fromLeft ? -30 : width + 30;
        const startY = height * (0.08 + hash(index) * 0.84);
        const bendX = width * (0.22 + hash(index + 9) * 0.28);
        const bendY = height * (0.12 + hash(index + 21) * 0.76);
        context.beginPath();
        context.moveTo(startX, startY);
        context.bezierCurveTo(
          fromLeft ? bendX : width - bendX,
          bendY,
          node.x + (fromLeft ? -110 : 120),
          node.y + (index - 5.5) * 9,
          node.x,
          node.y,
        );
        context.lineWidth = index % 3 === 0 ? 1.5 : 0.7;
        context.strokeStyle = colors[index % colors.length];
        context.globalAlpha = 0.38 * fx;
        context.stroke();

        const pulse = (time * 0.09 + index * 0.11) % 1;
        const px = startX + (node.x - startX) * pulse;
        const py = startY + (node.y - startY) * pulse;
        context.fillStyle = colors[index % colors.length];
        context.globalAlpha = 0.9 * fx;
        context.beginPath();
        context.arc(px, py, 1.4 + fx, 0, Math.PI * 2);
        context.fill();
      }
      context.shadowColor = "#f5f6ed";
      context.shadowBlur = 28;
      context.fillStyle = "#f5f6ed";
      context.globalAlpha = 0.9;
      context.beginPath();
      context.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;
    };

    const drawDust = (time: number, fx: number) => {
      clear("#030605");
      context.globalCompositeOperation = "screen";
      for (const particle of particles) {
        const swirlX = Math.sin(particle.y * 12 + time * 0.09 + particle.seed * 8);
        const swirlY = Math.cos(particle.x * 10 - time * 0.07 + particle.seed * 6);
        const attractX = (pointerRef.current.x - particle.x) * 0.015 * fx;
        const attractY = (pointerRef.current.y - particle.y) * 0.015 * fx;
        particle.x += (swirlX * 0.00018 * particle.z + attractX * 0.015) * fx;
        particle.y += (swirlY * 0.00015 * particle.z + attractY * 0.015) * fx;
        if (particle.x < -0.02) particle.x = 1.02;
        if (particle.x > 1.02) particle.x = -0.02;
        if (particle.y < -0.02) particle.y = 1.02;
        if (particle.y > 1.02) particle.y = -0.02;
        const x = particle.x * width;
        const y = particle.y * height;
        const copyShelter = Math.exp(
          -Math.pow((x - width * 0.28) / (width * 0.25), 2) -
            Math.pow((y - height * 0.55) / (height * 0.32), 2),
        );
        context.globalAlpha = (0.12 + particle.z * 0.52) * (1 - copyShelter * 0.85);
        context.fillStyle = particle.seed > 0.82 ? "#79d6ae" : particle.seed > 0.55 ? "#b9e6df" : "#ecf0e8";
        context.beginPath();
        context.arc(x, y, 0.35 + particle.z * 1.1, 0, Math.PI * 2);
        context.fill();
      }
    };

    const drawTopography = (time: number, fx: number) => {
      clear("#e8e2d5");
      context.globalCompositeOperation = "multiply";
      context.lineWidth = 0.7;
      for (let line = 0; line < 42; line += 1) {
        const base = (line / 41) * height;
        context.beginPath();
        for (let x = -5; x <= width + 5; x += 8) {
          const nx = x / width;
          const niche = Math.exp(-Math.pow((nx - 0.66) * 3.5, 2));
          const fold =
            Math.sin(nx * 7 + line * 0.17 + time * 0.018) * 5 +
            Math.sin(nx * 19 - line * 0.11) * 2;
          const y = base + fold * fx - niche * Math.sin((line / 41) * Math.PI) * height * 0.18;
          if (x === -5) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = line % 6 === 0 ? "#78623d" : "#273d35";
        context.globalAlpha = line % 6 === 0 ? 0.48 : 0.27;
        context.stroke();
      }
      const shade = context.createLinearGradient(0, 0, width, height);
      shade.addColorStop(0, "rgba(40,61,53,.18)");
      shade.addColorStop(0.48, "transparent");
      shade.addColorStop(1, "rgba(164,113,44,.18)");
      context.fillStyle = shade;
      context.fillRect(0, 0, width, height);
    };

    const render = (now: number) => {
      const delta = Math.min(40, now - previous);
      previous = now;
      const settings = stateRef.current;
      if (visible && !settings.paused && !settings.reduced) elapsed += delta / 1000;
      const fx = 0.35 + settings.intensity * 0.65;
      if (mode === "caustics") drawCaustics(elapsed, fx);
      if (mode === "rails") drawRails(elapsed, fx);
      if (mode === "dust") drawDust(elapsed, fx);
      if (mode === "topography") drawTopography(elapsed, fx);
      pointerRef.current.vx *= 0.88;
      pointerRef.current.vy *= 0.88;
      frame = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    host.addEventListener("pointermove", onPointer);
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="xlab-canvas" aria-hidden="true" />;
}
