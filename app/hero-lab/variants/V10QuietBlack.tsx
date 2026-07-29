"use client";

import { HeroCopy } from "../HeroCopy";
import { LabHeader } from "../LabHeader";
import { LabPhone } from "../LabPhone";
import { ShaderCanvas } from "../gl/ShaderCanvas";
import { useStagePointer } from "../gl/useStagePointer";
import type { VariantProps } from "../types";

const QUIET_RING = `
void main(){
  vec2 uv=v_uv;
  vec2 p=(uv-vec2(.66,.52))*vec2(u_res.x/u_res.y,1.);
  p+=vec2((u_ptr.x-.5)*.025,(u_ptr.y-.5)*.018);
  float a=atan(p.y,p.x);
  float r=length(p);
  float noise=fbm(vec2(a*1.7,r*5.)+u_time*.018);
  float radius=.29+.009*sin(a*3.+u_time*.04)+.006*(noise-.5);
  float ring=exp(-abs(r-radius)*180.);
  float halo=exp(-abs(r-radius)*28.)*.18;
  float draw=smoothstep(-3.1416,3.1416,mix(-3.2,3.2,ease(u_intro))-a);
  vec3 spectral=cpal(a/6.283+u_time*.004,vec3(.52),vec3(.47),vec3(1.),vec3(.58,.18,.02));
  vec3 col=spectral*(ring*(.76+u_fx*.45)+halo*.34)*draw;
  float tear=exp(-abs(a-mix(-3.1,3.1,ease(u_intro)))*20.)*exp(-abs(r-radius)*55.);
  col+=vec3(.95,.98,1.)*tear;
  col+=(grain(gl_FragCoord.xy,u_time)-.5)*.006;
  gl_FragColor=vec4(col,1.);
}`;

export function V10QuietBlack(props: VariantProps) {
  const { pointer, handlers } = useStagePointer(props.cursor && !props.reduced);
  return (
    <section className="hlab-scene hlab-v10" {...handlers}>
      <ShaderCanvas
        className="hlab-effect"
        fragment={QUIET_RING}
        pointer={pointer}
        paused={props.paused}
        reduced={props.reduced}
        intensity={props.intensity}
        introMs={1800}
        speed={0.4}
        dprCap={1.5}
        fallbackStyle={{
          background:
            "radial-gradient(circle at 66% 52%,transparent 0 27%,rgba(123,209,255,.5) 27.3%,rgba(210,107,255,.32) 28%,transparent 28.5%),#000",
        }}
      />
      <span className="hlab-singular-cutline" />
      <span className="hlab-singular-label">USD</span>
      <LabHeader />
      <HeroCopy layout="left" lines={["One balance.", "Everywhere."]} />
      <LabPhone paused={props.paused} reduced={props.reduced} className="hlab-phone-singular" />
      <div className="hlab-after-intro" aria-label="Phone appears after the intro">
        <span>Product revealed after the phenomenon</span>
      </div>
    </section>
  );
}
