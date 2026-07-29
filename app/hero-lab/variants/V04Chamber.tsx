"use client";

import { HeroCopy } from "../HeroCopy";
import { LabHeader } from "../LabHeader";
import { LabPhone } from "../LabPhone";
import { ShaderCanvas } from "../gl/ShaderCanvas";
import { useStagePointer } from "../gl/useStagePointer";
import type { VariantProps } from "../types";

const CHAMBER = `
void main(){
  vec2 uv=v_uv;
  vec2 p=uv;
  p.x+=(u_ptr.x-.5)*.012;
  float axis=.64+(p.y-.5)*.27;
  float beam=exp(-abs(p.x-axis)*(16.-p.y*7.));
  float cone=smoothstep(.02,.27,p.y)*smoothstep(1.08,.45,p.y);
  float depth=pow(max(0.,1.-p.y),1.6);
  float n=fbm(vec2(p.x*5.-u_time*.025,p.y*8.+u_time*.045));
  float dust=step(.78,hash21(floor(gl_FragCoord.xy/vec2(3.))))*beam*(.22+.78*n);
  float bloom=exp(-abs(p.x-axis)*5.)*.13;
  vec3 warm=vec3(.94,.82,.61);
  vec3 cold=vec3(.5,.75,.72);
  vec3 col=mix(cold,warm,p.y*.7)*beam*cone*(.28+.3*u_fx)*(n*.45+.58);
  col+=warm*bloom*cone*.12;
  col+=vec3(.9,.96,.92)*dust*.28*u_fx;
  col*=ease(u_intro);
  col*=smoothstep(.0,.13,uv.x)*smoothstep(1.,.86,uv.x);
  gl_FragColor=vec4(col,1.);
}`;

export function V04Chamber(props: VariantProps) {
  const { pointer, handlers } = useStagePointer(props.cursor && !props.reduced);
  return (
    <section className="hlab-scene hlab-v04" {...handlers}>
      <div className="hlab-chamber-shell">
        <ShaderCanvas
          className="hlab-effect"
          fragment={CHAMBER}
          pointer={pointer}
          paused={props.paused}
          reduced={props.reduced}
          intensity={props.intensity}
          introMs={2100}
          speed={0.65}
          dprCap={1.35}
          fallbackStyle={{
            background:
              "linear-gradient(112deg,transparent 34%,rgba(244,224,180,.34) 50%,transparent 67%),#030504",
          }}
        />
        <span className="hlab-chamber-floor" />
      </div>
      <LabHeader />
      <HeroCopy layout="left" />
      <LabPhone paused={props.paused} reduced={props.reduced} className="hlab-phone-chamber" />
    </section>
  );
}
