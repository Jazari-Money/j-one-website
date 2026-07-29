"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";
import { LAB_GLSL_HEADER, LAB_VERT } from "./glsl";

export type LabPointer = { x: number; y: number };

type ShaderCanvasProps = {
  /** Fragment shader body; LAB_GLSL_HEADER (uniforms + helpers) is prepended. */
  fragment: string;
  paused: boolean;
  reduced: boolean;
  intensity: number;
  pointer?: RefObject<LabPointer>;
  introMs?: number;
  introMsMobile?: number;
  /** Multiplier on the internal clock. */
  speed?: number;
  /** Hold the intro at frame zero until an external trigger starts it. */
  started?: boolean;
  dprCap?: number;
  className?: string;
  /** Static background shown when WebGL is unavailable. */
  fallbackStyle?: CSSProperties;
};

export function ShaderCanvas({
  fragment,
  paused,
  reduced,
  intensity,
  pointer,
  introMs = 1800,
  introMsMobile,
  speed = 1,
  started = true,
  dprCap = 1.6,
  className,
  fallbackStyle,
}: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const liveProps = useRef({ paused, reduced, intensity, speed, started });
  const kickRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    liveProps.current = { paused, reduced, intensity, speed, started };
    kickRef.current?.();
  }, [paused, reduced, intensity, speed, started]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      setFailed(true);
      return;
    }
    if (gl.isContextLost()) {
      // A StrictMode remount can briefly see a context that is still being
      // restored; try again on the next tick instead of failing permanently.
      const timer = window.setTimeout(() => {
        if (retry < 5) setRetry((r) => r + 1);
        else setFailed(true);
      }, 40);
      return () => window.clearTimeout(timer);
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("[hero-lab] shader compile:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = compile(gl.VERTEX_SHADER, LAB_VERT);
    const frag = compile(gl.FRAGMENT_SHADER, LAB_GLSL_HEADER + fragment);
    if (!vert || !frag) {
      setFailed(true);
      return;
    }
    const program = gl.createProgram();
    if (!program) {
      setFailed(true);
      return;
    }
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[hero-lab] program link:", gl.getProgramInfoLog(program));
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "a");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const loc = {
      res: gl.getUniformLocation(program, "u_res"),
      time: gl.getUniformLocation(program, "u_time"),
      intro: gl.getUniformLocation(program, "u_intro"),
      ptr: gl.getUniformLocation(program, "u_ptr"),
      fx: gl.getUniformLocation(program, "u_fx"),
    };

    let raf = 0;
    let disposed = false;
    let inView = true;
    let docVisible = typeof document === "undefined" ? true : !document.hidden;
    let time = 0;
    let intro = 0;
    let last = performance.now();
    const smooth = { x: 0.5, y: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const schedule = () => {
      if (!disposed && !raf && inView && docVisible) {
        raf = requestAnimationFrame(render);
      }
    };
    kickRef.current = () => {
      last = performance.now();
      schedule();
    };

    const render = (now: number) => {
      raf = 0;
      if (disposed) return;
      const props = liveProps.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (props.started && !props.paused && !props.reduced) {
        time += dt * props.speed;
      }
      if (props.reduced) intro = 1;
      else if (props.started && !props.paused) {
        const activeIntroMs =
          introMsMobile && canvas.clientWidth <= 620
            ? introMsMobile
            : introMs;
        intro = Math.min(1, intro + (dt * 1000) / activeIntroMs);
      }

      const target = pointer?.current ?? smooth;
      smooth.x += (target.x - smooth.x) * 0.08;
      smooth.y += (target.y - smooth.y) * 0.08;

      resize();
      gl.uniform2f(loc.res, canvas.width, canvas.height);
      gl.uniform1f(loc.time, time);
      gl.uniform1f(loc.intro, intro);
      gl.uniform2f(loc.ptr, smooth.x, 1 - smooth.y);
      gl.uniform1f(loc.fx, props.intensity);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      const settled =
        Math.abs(smooth.x - target.x) < 0.001 &&
        Math.abs(smooth.y - target.y) < 0.001;
      const waitingForTrigger = !props.started && intro === 0;
      if (
        !waitingForTrigger &&
        !(props.paused && (intro >= 1 || props.reduced) && settled)
      ) {
        schedule();
      }
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
      gl.deleteBuffer(quad);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      // Release the context only when the canvas actually left the DOM.
      // Under React StrictMode the same canvas remounts immediately, and a
      // synchronously lost context would poison the second mount.
      setTimeout(() => {
        if (!canvas.isConnected) {
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        }
      }, 0);
    };
  }, [fragment, introMs, introMsMobile, dprCap, pointer, retry]);

  if (failed) {
    return <div className={className} style={fallbackStyle} aria-hidden="true" />;
  }

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
