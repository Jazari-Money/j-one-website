"use client";

import { HeroCopy } from "../HeroCopy";
import { LabHeader } from "../LabHeader";
import { LabPhone } from "../LabPhone";
import { ShaderCanvas } from "../gl/ShaderCanvas";
import { useStagePointer } from "../gl/useStagePointer";
import type { VariantProps } from "../types";

const PORTAL = `
void main(){
  vec2 uv=v_uv;
  vec2 asp=vec2(u_res.x/u_res.y,1.);
  vec2 p=(uv-vec2(.69,.53))*asp;
  p+=vec2((u_ptr.x-.5)*.025,(u_ptr.y-.5)*.018);
  p.x*=.83;
  float r=length(p);
  float angle=atan(p.y,p.x);
  float wob=.016*sin(angle*5.+u_time*.22)+.01*sin(angle*11.-u_time*.15);
  float rim=exp(-abs(r-.285-wob)*52.);
  float rim2=exp(-abs(r-.36+wob*.6)*28.);
  float cavity=smoothstep(.37,.11,r);
  vec3 col=vec3(.006,.008,.007);
  col+=vec3(.08,.03,.14)*rim2*.55*u_fx;
  col+=mix(vec3(.86,.82,.72),vec3(.15,1.,.48),.25+.25*sin(angle+u_time*.08))*rim*(.65+u_fx*.55);
  col*=1.-cavity*.82;
  col+=vec3(.015,.002,.03)*cavity;
  float open=mix(.08,1.,ease(u_intro));
  col*=smoothstep(.48*open+.05,.05,r)+rim+rim2;
  gl_FragColor=vec4(col,1.);
}`;

export function V02Portal(props: VariantProps) {
  const { pointer, handlers } = useStagePointer(props.cursor && !props.reduced);
  return (
    <section className="hlab-scene hlab-v02" {...handlers}>
      <div className="hlab-rounded-chamber" aria-hidden="true">
        <ShaderCanvas
          className="hlab-effect"
          fragment={PORTAL}
          pointer={pointer}
          paused={props.paused}
          reduced={props.reduced}
          intensity={props.intensity}
          introMs={1750}
          dprCap={1.45}
          fallbackStyle={{
            background:
              "radial-gradient(ellipse at 69% 53%,#000 0 20%,rgba(126,77,164,.25) 25%,rgba(35,242,120,.15) 29%,transparent 38%),#08090c",
          }}
        />
        <span className="hlab-portal-depth" />
      </div>
      <LabHeader />
      <HeroCopy layout="left" />
      <LabPhone paused={props.paused} reduced={props.reduced} className="hlab-phone-portal" />
    </section>
  );
}
