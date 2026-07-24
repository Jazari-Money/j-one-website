"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import {
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
} from "react";
import { withBasePath } from "../site-paths";
import { useReducedMotion } from "./hooks";

export function InteractiveCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rotation = useRef({ x: -7, y: 16 });
  const drag = useRef({ active: false, x: 0, y: 0, rx: -7, ry: 16 });
  const frame = useRef(0);

  function commit(x: number, y: number) {
    rotation.current = { x, y };
    window.cancelAnimationFrame(frame.current);
    frame.current = window.requestAnimationFrame(() => {
      cardRef.current?.style.setProperty("--card-rx", `${x}deg`);
      cardRef.current?.style.setProperty("--card-ry", `${y}deg`);
    });
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduced) return;
    drag.current = {
      active: true,
      x: event.clientX,
      y: event.clientY,
      rx: rotation.current.x,
      ry: rotation.current.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduced) return;
    if (drag.current.active) {
      const nextY = drag.current.ry + (event.clientX - drag.current.x) * 0.36;
      const nextX = Math.max(-26, Math.min(26, drag.current.rx - (event.clientY - drag.current.y) * 0.22));
      commit(nextX, nextY);
      return;
    }
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    commit(py * -14, px * 24);
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    drag.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let { x, y } = rotation.current;
    if (event.key === "ArrowLeft") y -= 12;
    else if (event.key === "ArrowRight") y += 12;
    else if (event.key === "ArrowUp") x -= 8;
    else if (event.key === "ArrowDown") x += 8;
    else if (event.key === "Home") {
      x = -7;
      y = 16;
    } else return;
    event.preventDefault();
    commit(x, y);
  }

  useEffect(() => () => window.cancelAnimationFrame(frame.current), []);

  return (
    <div
      className="card-interaction"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={() => {
        if (!drag.current.active && !reduced) commit(-7, 16);
      }}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="group"
      aria-roledescription="interactive 3D card preview"
      aria-label="Jazari One Visa card"
      aria-describedby="card-interaction-help"
    >
      <div className="card-object" ref={cardRef}>
        <div className="card-face card-front">
          <img
            className="card-brand"
            src={withBasePath("/images/brand/jazari-one-logo.svg")}
            alt=""
            draggable={false}
          />
          <img
            className="card-visa"
            src={withBasePath("/images/brand/visa-white.svg")}
            alt=""
            draggable={false}
          />
        </div>
        <div className="card-face card-back" aria-hidden="true">
          <img
            className="card-brand"
            src={withBasePath("/images/brand/jazari-one-logo.svg")}
            alt=""
            draggable={false}
          />
          <img
            className="card-visa"
            src={withBasePath("/images/brand/visa-white.svg")}
            alt=""
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
