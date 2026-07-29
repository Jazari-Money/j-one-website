"use client";

import { HeroCopy } from "../HeroCopy";
import { LabHeader } from "../LabHeader";
import { LabPhone } from "../LabPhone";
import { ShaderCanvas } from "../gl/ShaderCanvas";
import { useStagePointer } from "../gl/useStagePointer";
import type { VariantProps } from "../types";

const MONOLITH = `
void main(){
  vec2 uv=v_uv;
  vec2 p=uv-.5;
  p.x*=u_res.x/u_res.y;
  p+=vec2((u_ptr.x-.5)*.035,(u_ptr.y-.5)*.025);
  float d=fbm(p*3.2+vec2(u_time*.025,-u_time*.018));
  float stripes=.5+.5*cos((p.y*6.+p.x*2.4+d*.9-u_time*.08)*6.283);
  float edge=pow(stripes,3.);
  vec3 spectrum=cpal(p.y*.55+d*.28+u_time*.012,vec3(.52),vec3(.44),vec3(1.),vec3(.58,.18,.02));
  vec3 col=mix(vec3(.018,.025,.03),spectrum,edge*.72);
  col+=vec3(.65,.9,1.)*pow(max(0.,1.-abs(p.x+p.y*.18-.08)*7.),5.)*.32;
  col*=.5+u_fx*.52;
  col*=ease(u_intro);
  col+=(grain(gl_FragCoord.xy,u_time)-.5)*.016;
  gl_FragColor=vec4(col,1.);
}`;

export function V06Monolith(props: VariantProps) {
  const { pointer, handlers } = useStagePointer(props.cursor && !props.reduced);
  return (
    <section className="hlab-scene hlab-v06" {...handlers}>
      <span className="hlab-monolith-stage" aria-hidden="true" />
      <div className="hlab-monolith-object" aria-hidden="true">
        <ShaderCanvas
          className="hlab-effect"
          fragment={MONOLITH}
          pointer={pointer}
          paused={props.paused}
          reduced={props.reduced}
          intensity={props.intensity}
          introMs={1850}
          speed={0.7}
          dprCap={1.4}
          fallbackStyle={{
            background:
              "repeating-linear-gradient(155deg,#11151a 0 7%,#57d3e8 9%,#a36be5 12%,#231820 17%,#090b0d 21%)",
          }}
        />
        <span className="hlab-monolith-glint" />
      </div>
      <LabHeader />
      <HeroCopy layout="left" />
      <LabPhone paused={props.paused} reduced={props.reduced} className="hlab-phone-monolith" />
    </section>
  );
}
