"use client";

import { HeroCopy } from "../HeroCopy";
import { LabHeader } from "../LabHeader";
import { LabPhone } from "../LabPhone";
import { ShaderCanvas } from "../gl/ShaderCanvas";
import { useStagePointer } from "../gl/useStagePointer";
import type { VariantProps } from "../types";

/**
 * 09 — Edge-to-Edge Color Event.
 * Choreography: pure black → one spectral band sweeps left-to-right with a
 * steep symmetric ease (slow entry, hard acceleration through the middle,
 * slow exit) → behind its wake a very slow, fine dust field settles in with
 * a 2–3% warm memory at the bottom edge. The copy reveal is timed in CSS to
 * introMs/2 — the exact frame the band crosses screen center (a symmetric
 * sigmoid always reaches x=0.5 at t=0.5, independent of steepness).
 */
const INTRO_MS = 2000;

const COLOR_EVENT = `
float sig(float x){
  float k=5.5;
  float e=1./(1.+exp(-k*(x*2.-1.)));
  float e0=1./(1.+exp(k));
  float e1=1./(1.+exp(-k));
  return (e-e0)/(e1-e0);
}
float mote(vec2 p,float scale,float rpx,float t,float resY){
  vec2 g=p*scale;
  vec2 id=floor(g);
  vec2 f=fract(g);
  float rnd=hash21(id);
  float keep=step(.56,rnd);
  vec2 c=vec2(.2)+.6*vec2(hash21(id+7.31),hash21(id+3.17));
  c+=.07*vec2(sin(t*.11+rnd*6.28),cos(t*.09+rnd*4.7));
  float cellPx=resY/scale;
  float d=length(f-c)*cellPx;
  float m=1.-smoothstep(rpx*.5,rpx,d);
  float tw=.6+.4*sin(t*(.22+.34*rnd)+rnd*40.);
  return keep*m*tw*(.35+.65*hash21(id+11.7));
}
void main(){
  vec2 uv=v_uv;
  float asp=u_res.x/u_res.y;
  float prog=sig(u_intro);
  float pos=mix(-.3,1.3,prog);

  // The event: vermilion edge, amber core, deep-teal trail.
  float bend=.05*sin(uv.y*6.5+u_time*.1);
  float g=uv.x-pos+bend;
  float core=exp(-g*g*160.);
  float lead=exp(-pow((g-.05)*13.,2.));
  float trail=exp(-pow((g+.14)*7.5,2.));
  vec3 band=vec3(1.,.3,.16)*lead*.9+vec3(1.,.72,.34)*core*1.1+vec3(.1,.45,.44)*trail*.55;
  band*=.75+.45*u_fx;
  band*=.82+.25*sin(uv.y*3.1+u_time*.15);
  band*=1.-smoothstep(.965,1.,u_intro);

  // Wake: everything the band has already passed.
  float wake=smoothstep(pos+.03,pos-.22,uv.x);

  // Living dust settles in behind the event: tiny, sparse, very slow.
  vec2 p=vec2(uv.x*asp,uv.y);
  p+=vec2(u_time*.0022,u_time*.0011);
  p+=(u_ptr-.5)*vec2(.012,-.008);
  float dfine=mote(p,26.,1.15,u_time,u_res.y);
  float dbig=mote(p+13.7,14.,1.8,u_time*.8+7.,u_res.y);
  float dustA=wake*smoothstep(.3,.85,u_intro)*min(u_fx,1.2);
  vec3 dust=(vec3(.96,.94,.88)*dfine*.5+vec3(.85,.9,.86)*dbig*.32)*dustA;

  // 2–3% warm memory of the event along the bottom edge, breathing slowly.
  float after=smoothstep(.85,1.,u_intro);
  float breath=.85+.15*sin(u_time*.22);
  vec3 warm=vec3(.55,.3,.12)*exp(-abs(uv.y-.07)*5.5)*.05*after*breath;

  vec3 col=band+dust+warm*wake;
  col+=(grain(gl_FragCoord.xy,u_time)-.5)*.012;
  gl_FragColor=vec4(col,1.);
}`;

export function V09ColorEvent(props: VariantProps) {
  const { pointer, handlers } = useStagePointer(props.cursor && !props.reduced);
  return (
    <section className="hlab-scene hlab-v09" {...handlers}>
      <ShaderCanvas
        className="hlab-effect"
        fragment={COLOR_EVENT}
        pointer={pointer}
        paused={props.paused}
        reduced={props.reduced}
        intensity={props.intensity}
        introMs={INTRO_MS}
        speed={0.45}
        dprCap={1.4}
        fallbackStyle={{
          background:
            "radial-gradient(1px 1px at 18% 32%, rgba(244,236,221,.7), transparent 100%), radial-gradient(1px 1px at 64% 18%, rgba(244,236,221,.5), transparent 100%), radial-gradient(1.5px 1.5px at 82% 62%, rgba(244,236,221,.6), transparent 100%), radial-gradient(1px 1px at 38% 76%, rgba(244,236,221,.45), transparent 100%), radial-gradient(120% 26% at 50% 102%, rgba(120,60,25,.22), transparent 70%), #000",
        }}
      />
      <LabHeader />
      <HeroCopy layout="center" />
      <LabPhone paused={props.paused} reduced={props.reduced} className="hlab-phone-event" />
    </section>
  );
}
