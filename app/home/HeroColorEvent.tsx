"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 a;
varying vec2 v_uv;
void main() {
  v_uv = a * .5 + .5;
  gl_Position = vec4(a, 0., 1.);
}`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_time;
uniform float u_intro;
uniform float u_dust_time;
uniform float u_css_height;

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float grain(vec2 p, float t) {
  return hash21(p + fract(t) * vec2(17.13, 7.77));
}

float sig(float x) {
  float k = 5.5;
  float e = 1. / (1. + exp(-k * (x * 2. - 1.)));
  float e0 = 1. / (1. + exp(k));
  float e1 = 1. / (1. + exp(-k));
  return (e - e0) / (e1 - e0);
}

float mote(vec2 p, float scale, float rpx, float t, float resY) {
  vec2 g = p * scale;
  vec2 id = floor(g);
  vec2 f = fract(g);
  float rnd = hash21(id);
  float keep = step(.56, rnd);
  vec2 c = vec2(.2) + .6 * vec2(hash21(id + 7.31), hash21(id + 3.17));
  float cellPx = resY / scale;
  float d = length(f - c) * cellPx;
  float m = 1. - smoothstep(rpx * .5, rpx, d);
  float tw = .6 + .4 * sin(t * (.22 + .34 * rnd) + rnd * 40.);
  return keep * m * tw * (.35 + .65 * hash21(id + 11.7));
}

void main() {
  vec2 uv = v_uv;
  float asp = u_res.x / u_res.y;
  float prog = sig(u_intro);
  float pos = mix(-.3, 1.3, prog);

  float bend = .05 * sin(uv.y * 6.5 + u_time * .1);
  float g = uv.x - pos + bend;
  float core = exp(-g * g * 160.);
  float lead = exp(-pow((g - .05) * 13., 2.));
  float trail = exp(-pow((g + .14) * 7.5, 2.));
  vec3 band =
    vec3(1., .3, .16) * lead * .9 +
    vec3(1., .72, .34) * core * 1.1 +
    vec3(.1, .45, .44) * trail * .55;
  band *= .75 + .45;
  band *= .82 + .25 * sin(uv.y * 3.1 + u_time * .15);
  band *= 1. - smoothstep(.965, 1., u_intro);

  float wake = smoothstep(pos + .03, pos - .22, uv.x);
  float cssHeight = max(u_css_height, 1.);
  vec2 dustSpace = vec2(uv.x * asp, uv.y);
  vec2 fineP =
    dustSpace + vec2(u_dust_time * 9.5 / cssHeight, 0.);
  vec2 nearP =
    dustSpace + vec2(u_dust_time * 12.5 / cssHeight, 0.);
  float dfine = mote(fineP, 26., 1.4, u_time, u_res.y);
  float dbig =
    mote(nearP + vec2(13.7), 14., 2.15, u_time * .8 + 7., u_res.y);
  float dustA = wake * smoothstep(.3, .85, u_intro);
  vec3 dust =
    (vec3(.96, .94, .88) * dfine * .5 +
    vec3(.85, .9, .86) * dbig * .32) * dustA;

  float after = smoothstep(.85, 1., u_intro);
  float breath = .85 + .15 * sin(u_time * .22);
  vec3 warm =
    vec3(.55, .3, .12) *
    exp(-abs(uv.y - .07) * 5.5) *
    .05 *
    after *
    breath;

  vec3 col = band + dust + warm * wake;
  col += (grain(gl_FragCoord.xy, u_time) - .5) * .012;
  gl_FragColor = vec4(col, 1.);
}`;

export function HeroColorEvent({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedRef = useRef(reduced);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "a");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "u_res");
    const clock = gl.getUniformLocation(program, "u_time");
    const introProgress = gl.getUniformLocation(program, "u_intro");
    const dustClock = gl.getUniformLocation(program, "u_dust_time");
    const cssHeight = gl.getUniformLocation(program, "u_css_height");

    let raf = 0;
    let disposed = false;
    let inView = true;
    let documentVisible = !document.hidden;
    let time = 0;
    let dustTime = 0;
    let intro = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.4);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    const schedule = () => {
      if (!disposed && !raf && inView && documentVisible) {
        raf = requestAnimationFrame(render);
      }
    };

    const render = (now: number) => {
      raf = 0;
      if (disposed) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const pageReady =
        canvas.closest(".home-page")?.classList.contains("is-ready") ?? true;

      if (pageReady) {
        if (reducedRef.current) {
          intro = 1;
        } else {
          time += dt * 0.45;
          dustTime += dt;
          intro = Math.min(1, intro + (dt * 1000) / 2000);
        }
      }

      resize();
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(clock, time);
      gl.uniform1f(introProgress, intro);
      gl.uniform1f(dustClock, dustTime);
      gl.uniform1f(cssHeight, Math.max(1, canvas.clientHeight));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.dataset.rendered = "true";
      canvas.dataset.intro = intro.toFixed(3);
      canvas.dataset.dustTime = dustTime.toFixed(3);

      if (!reducedRef.current || !pageReady) schedule();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) schedule();
    });
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(canvas);

    const onVisibilityChange = () => {
      documentVisible = !document.hidden;
      if (documentVisible) schedule();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    schedule();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.deleteBuffer(quad);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return (
    <div className="hero-color-event" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
