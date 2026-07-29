"use client";

import { HeroCopy } from "../HeroCopy";
import { LabHeader } from "../LabHeader";
import { LabPhone } from "../LabPhone";
import { ShaderCanvas } from "../gl/ShaderCanvas";
import { useStagePointer } from "../gl/useStagePointer";
import type { VariantProps } from "../types";

const CAUSTICS = `
void main(){
  vec2 uv=v_uv;
  vec2 p=(uv-.5)*vec2(u_res.x/u_res.y,1.);
  vec2 mouse=(u_ptr-.5)*.08;
  p+=mouse;
  float t=u_time*.13;
  float w=0.;
  for(int i=0;i<7;i++){
    float fi=float(i);
    vec2 q=p+vec2(sin(t*.8+fi)*.13,cos(t*.63+fi*1.7)*.1);
    float a=sin(q.x*(8.+fi*1.7)+sin(q.y*5.-t)+t*(.7+fi*.03));
    float b=cos(q.y*(12.-fi*.6)-cos(q.x*7.+t*.7)-t*.9);
    w+=pow(max(0.,1.-abs(a+b)*.62),7.)/(2.4+fi*.18);
  }
  float lens=smoothstep(.72,.05,length(p-vec2(.22,-.02)));
  vec3 spectral=cpal(w*.44+p.x*.28+t*.035,vec3(.48,.52,.5),vec3(.48),vec3(1.),vec3(.05,.42,.67));
  spectral=mix(spectral,vec3(.98,.91,.73),smoothstep(.55,1.2,w)*.45);
  float vign=smoothstep(1.15,.12,length(p));
  float intro=ease(u_intro);
  float reveal=smoothstep(.02,.62,intro+uv.x*.12);
  vec3 col=spectral*w*(.48+u_fx*.7)*lens*vign;
  col+=vec3(.03,.07,.075)*lens*.34;
  col*=reveal;
  col+=(grain(gl_FragCoord.xy,u_time)-.5)*.018;
  gl_FragColor=vec4(col,1.);
}`;

export function V01Caustics(props: VariantProps) {
  const { pointer, handlers } = useStagePointer(props.cursor && !props.reduced);
  return (
    <section className="hlab-scene hlab-v01" {...handlers}>
      <ShaderCanvas
        className="hlab-effect"
        fragment={CAUSTICS}
        pointer={pointer}
        paused={props.paused}
        reduced={props.reduced}
        intensity={props.intensity}
        introMs={1900}
        dprCap={1.45}
        fallbackStyle={{
          background:
            "radial-gradient(ellipse at 72% 45%,rgba(83,209,255,.22),transparent 34%),radial-gradient(ellipse at 58% 55%,rgba(234,72,149,.18),transparent 31%),#020304",
        }}
      />
      <span className="hlab-caustic-lens" aria-hidden="true" />
      <LabHeader />
      <HeroCopy layout="left" />
      <LabPhone paused={props.paused} reduced={props.reduced} className="hlab-phone-caustic" />
    </section>
  );
}
