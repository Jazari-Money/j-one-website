"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { resetPointer, trackPointer, useReducedMotion } from "../home/hooks";
import { LatamText } from "./LatamLang";

// The homepage's pointer-card behaviour (tilt, lift, cursor-localised border) for server-rendered LatAm blocks.
export function LatamCard({ className, children }: { className: string; children: ReactNode }) {
  return <div className={`pointer-card ${className}`} onPointerMove={trackPointer} onPointerLeave={resetPointer}>{children}</div>;
}

const GROUPS = [[0, 3, "Banco", "Bank"], [3, 3, "Plaza", "City"], [6, 11, "Cuenta", "Account"], [17, 1, "Control", "Check"]] as const;
const randomDigits = () => Array.from({ length: 18 }, () => Math.floor(Math.random() * 10));

// A CLABE that keeps decoding into a new random example: digits flicker, then settle left to right.
export function ClabeShowcase() {
  const reduced = useReducedMotion();
  const [digits, setDigits] = useState<number[]>(() => [0, 1, 2, 1, 8, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 3]);
  const [settled, setSettled] = useState(18);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    let target = randomDigits(), frame = 0, raf = 0, timer = 0, visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "120px" });
    if (box.current) observer.observe(box.current);
    const tick = () => {
      frame += 1;
      const done = Math.min(18, Math.max(0, Math.floor((frame - 8) / 2)));
      setSettled(done);
      setDigits(target.map((d, i) => (i < done ? d : Math.floor(Math.random() * 10))));
      if (done < 18) raf = window.setTimeout(tick, 45);
      else timer = window.setTimeout(start, 3200);
    };
    const start = () => { if (!visible) { timer = window.setTimeout(start, 600); return; } target = randomDigits(); frame = 0; tick(); };
    timer = window.setTimeout(start, 900);
    return () => { observer.disconnect(); window.clearTimeout(raf); window.clearTimeout(timer); };
  }, [reduced]);

  return <div className="latam-clabe" ref={box}>
    <span className="latam-clabe-label">CLABE</span>
    <div className="latam-clabe-row" aria-label={`CLABE ${digits.join("")}`}>
      {GROUPS.map(([start, n, es, en]) => {
        return <div className="latam-clabe-group" key={es} style={{ flexGrow: n }}>
          <span className="latam-clabe-digits numeric" aria-hidden="true">
            {digits.slice(start, start + n).map((d, i) => <i key={i} className={start + i < settled ? "" : "is-rolling"}>{d}</i>)}
          </span>
          <small><LatamText es={es} en={en} /></small>
        </div>;
      })}
    </div>
  </div>;
}
