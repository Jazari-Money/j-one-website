"use client";

import { HeroCopy } from "../HeroCopy";
import { LabHeader } from "../LabHeader";
import { LabPhone } from "../LabPhone";
import { ShaderCanvas } from "../gl/ShaderCanvas";
import { useStagePointer } from "../gl/useStagePointer";
import type { VariantProps } from "../types";

const MEMBRANE = `
void main(){
  vec2 uv=v_uv;
  vec2 p=(uv-.5)*vec2(u_res.x/u_res.y,1.);
  p+=vec2((u_ptr.x-.5)*.028,(u_ptr.y-.5)*.018);
  float t=u_time*.08;
  float terrain=
    sin(p.x*4.2+sin(p.y*3.-t)*.7)*.22+
    sin(p.y*6.1-p.x*1.3+t*.7)*.13+
    fbm(p*2.7+vec2(t,-t*.4))*.46;
  float niche=exp(-dot(p-vec2(.3,-.02),p-vec2(.3,-.02))*8.);
  terrain-=niche*.34;
  float bands=abs(fract(terrain*16.)-.5);
  float contour=1.-smoothstep(.025,.075,bands);
  float major=1.-smoothstep(.018,.045,abs(fract(terrain*4.)-.5));
  vec3 ink=mix(vec3(.43,.49,.45),vec3(.78,.61,.36),smoothstep(.2,.75,uv.x));
  vec3 col=ink*(contour*.44+major*.22)*(0.4+u_fx*.46);
  col+=vec3(.08,.38,.18)*niche*.08;
  float wipe=smoothstep(uv.x-.18,uv.x+.24,ease(u_intro));
  col*=wipe;
  gl_FragColor=vec4(col,1.);
}`;

export function V07Membrane(props: VariantProps) {
  const { pointer, handlers } = useStagePointer(props.cursor && !props.reduced);
  return (
    <section className="hlab-scene hlab-v07" {...handlers}>
      <div className="hlab-membrane-shell">
        <ShaderCanvas
          className="hlab-effect"
          fragment={MEMBRANE}
          pointer={pointer}
          paused={props.paused}
          reduced={props.reduced}
          intensity={props.intensity}
          introMs={2050}
          speed={0.6}
          dprCap={1.45}
          fallbackStyle={{
            background:
              "repeating-radial-gradient(ellipse at 72% 52%,transparent 0 13px,rgba(198,211,202,.18) 14px,transparent 15px),#080b09",
          }}
        />
        <span className="hlab-membrane-niche" />
        <span className="hlab-membrane-axis">ONE / LAYER 01</span>
      </div>
      <LabHeader />
      <HeroCopy layout="left" />
      <LabPhone paused={props.paused} reduced={props.reduced} className="hlab-phone-membrane" />
    </section>
  );
}
