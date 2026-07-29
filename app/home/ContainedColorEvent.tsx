"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ShaderCanvas } from "../hero-lab/gl/ShaderCanvas";
import { useReducedMotion } from "./hooks";

const INTRO_MS = 1450;

const CONTAINED_COLOR_EVENT = `
float eventEase(float x){
  float k=5.2;
  float e=1./(1.+exp(-k*(x*2.-1.)));
  float e0=1./(1.+exp(k));
  float e1=1./(1.+exp(-k));
  return (e-e0)/(e1-e0);
}
float eventMote(vec2 p,float scale,float radiusPx,float t,float resY){
  vec2 g=p*scale;
  vec2 id=floor(g);
  vec2 f=fract(g);
  float rnd=hash21(id);
  float keep=step(.68,rnd);
  vec2 c=vec2(.18)+.64*vec2(hash21(id+7.31),hash21(id+3.17));
  c+=.045*vec2(sin(t*.13+rnd*6.28),cos(t*.1+rnd*4.7));
  float cellPx=resY/scale;
  float d=length(f-c)*cellPx;
  float mote=1.-smoothstep(radiusPx*.45,radiusPx,d);
  float twinkle=.62+.38*sin(t*(.2+.28*rnd)+rnd*40.);
  return keep*mote*twinkle*(.32+.68*hash21(id+11.7));
}
void main(){
  vec2 uv=v_uv;
  float asp=u_res.x/u_res.y;
  float progress=eventEase(u_intro);
  float position=mix(-.34,1.34,progress);

  float bend=.035*sin(uv.y*6.2+u_time*.08);
  float edge=uv.x-position+bend;
  float core=exp(-edge*edge*205.);
  float lead=exp(-pow((edge-.045)*15.,2.));
  float trail=exp(-pow((edge+.12)*8.5,2.));
  vec3 spectrum=
    vec3(1.,.26,.12)*lead*.62+
    vec3(1.,.7,.3)*core*.72+
    vec3(.06,.38,.36)*trail*.38;
  spectrum*=.48+.28*min(u_fx,1.25);
  spectrum*=.86+.16*sin(uv.y*3.2+u_time*.12);
  spectrum*=1.-smoothstep(.965,1.,u_intro);

  float wake=smoothstep(position+.025,position-.2,uv.x);
  float settled=smoothstep(.3,.86,u_intro);

  // Autonomous right-to-left drift. There is deliberately no pointer input.
  vec2 p=vec2(uv.x*asp,uv.y)+vec2(u_time*.0032,u_time*.00055);
  float fine=eventMote(p,24.,1.05,u_time,u_res.y);
  float depth=eventMote(p*.82+13.7,13.,1.55,u_time*.74+7.,u_res.y);
  float dustAlpha=wake*settled*min(u_fx,1.15);
  vec3 dust=(
    vec3(.96,.94,.89)*fine*.4+
    vec3(.77,.88,.84)*depth*.22
  )*dustAlpha;

  float after=smoothstep(.82,1.,u_intro);
  float breath=.88+.12*sin(u_time*.18);
  vec3 warm=vec3(.54,.27,.1)*exp(-abs(uv.y-.035)*6.8)*.035*after*breath;

  vec3 color=vec3(.006,.008,.0085)+spectrum+dust+warm;
  color+=(grain(gl_FragCoord.xy,u_time)-.5)*.009*settled;
  gl_FragColor=vec4(color,1.);
}`;

type ContainedColorEventProps = {
  className: string;
  labelledBy?: string;
  children: ReactNode;
};

export function ContainedColorEvent({
  className,
  labelledBy,
  children,
}: ContainedColorEventProps) {
  const panelRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || started || reduced) return;

    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setStarted(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;
        setStarted(true);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, [reduced, started]);

  const visible = started || reduced;

  return (
    <section
      ref={panelRef}
      className={`${className} color-event-cta${visible ? " is-started" : ""}`}
      aria-labelledby={labelledBy}
    >
      <ShaderCanvas
        className="contained-color-event-canvas"
        fragment={CONTAINED_COLOR_EVENT}
        paused={false}
        reduced={reduced}
        intensity={1}
        introMs={INTRO_MS}
        introMsMobile={1220}
        speed={0.52}
        started={visible}
        dprCap={1.35}
      />
      {children}
    </section>
  );
}
