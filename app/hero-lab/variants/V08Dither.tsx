"use client";

import { HeroCopy } from "../HeroCopy";
import { LabHeader } from "../LabHeader";
import { LabPhone } from "../LabPhone";
import { ShaderCanvas } from "../gl/ShaderCanvas";
import { useStagePointer } from "../gl/useStagePointer";
import type { VariantProps } from "../types";

const DITHER = `
float bayer4(vec2 p){
  vec2 q=mod(floor(p),4.);
  return mod(q.x*2.+q.y*3.+floor(q.x/2.)*3.,16.)/16.;
}
void main(){
  vec2 uv=v_uv;
  vec2 p=(uv-.5)*vec2(u_res.x/u_res.y,1.);
  p+=vec2((u_ptr.x-.5)*.025,(u_ptr.y-.5)*.018);
  float field=.22+.24*sin(p.x*3.2+u_time*.08)+.14*cos(p.y*5.-u_time*.06);
  field+=fbm(p*2.1+u_time*.012)*.22;
  field+=exp(-dot(p-vec2(-.24,.02),p-vec2(-.24,.02))*4.)*.34;
  // Keep the copy zone (right of center) close to clean paper.
  vec2 shelter=(p-vec2(.5,-.04))/vec2(.66,.44);
  float calm=exp(-dot(shelter,shelter));
  field-=calm*.66;
  float coarse=mix(12.,4.,ease(u_intro));
  float threshold=bayer4(gl_FragCoord.xy/coarse);
  float dotv=step(threshold,clamp(field*.56,0.,.85));
  vec3 paper=vec3(.92,.9,.85);
  vec3 ink=vec3(.035,.043,.04);
  vec3 col=mix(paper,ink,dotv);
  float fx2=min(u_fx,1.1);
  float blue=smoothstep(.22,-.16,p.x+p.y*.28)*(1.-calm*.55);
  float red=smoothstep(.48,.0,length(p-vec2(.48,-.24)))*(1.-calm*.8);
  col=mix(col,vec3(.11,.24,.73),blue*.3*fx2);
  col=mix(col,vec3(.48,.07,.1),red*.15*fx2);
  gl_FragColor=vec4(col,1.);
}`;

export function V08Dither(props: VariantProps) {
  const { pointer, handlers } = useStagePointer(props.cursor && !props.reduced);
  return (
    <section className="hlab-scene hlab-v08" {...handlers}>
      <ShaderCanvas
        className="hlab-effect"
        fragment={DITHER}
        pointer={pointer}
        paused={props.paused}
        reduced={props.reduced}
        intensity={props.intensity}
        introMs={1600}
        speed={0.55}
        dprCap={1.35}
        fallbackStyle={{
          background:
            "radial-gradient(circle,#151515 .8px,transparent 1px) 0 0/5px 5px,#ebe8de",
        }}
      />
      <span className="hlab-editorial-blue" />
      <span className="hlab-editorial-red" />
      <span className="hlab-editorial-index">J / ONE · VALUE FIELD</span>
      <LabHeader />
      <HeroCopy layout="left" lines={["Value,", "without borders."]} ctaTone="dark" />
      <LabPhone paused={props.paused} reduced={props.reduced} className="hlab-phone-dither" />
    </section>
  );
}
