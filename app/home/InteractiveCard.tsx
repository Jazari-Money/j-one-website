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
  const rotation = useRef({ x: -11, y: 21 });
  const drag = useRef({ active: false, x: 0, y: 0, rx: -11, ry: 21 });
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
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    cardRef.current?.style.setProperty("--card-px", `${x * 100}%`);
    cardRef.current?.style.setProperty("--card-py", `${y * 100}%`);

    if (drag.current.active) {
      const nextY = drag.current.ry + (event.clientX - drag.current.x) * 0.36;
      const nextX = Math.max(-26, Math.min(26, drag.current.rx - (event.clientY - drag.current.y) * 0.22));
      commit(nextX, nextY);
      return;
    }
    if (event.pointerType !== "mouse") return;
    commit(-11 + (y - 0.5) * -18, 21 + (x - 0.5) * 32);
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
      x = -11;
      y = 21;
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
        if (!drag.current.active && !reduced) {
          cardRef.current?.style.setProperty("--card-px", "50%");
          cardRef.current?.style.setProperty("--card-py", "50%");
          commit(-11, 21);
        }
      }}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="group"
      aria-roledescription="interactive 3D card preview"
      aria-label="Jazari One Visa card"
      aria-describedby="card-interaction-help"
    >
      <span className="sr-only" id="card-interaction-help">
        Drag the card or use the arrow keys to rotate it.
      </span>
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
        <i className="card-edge card-edge-top" aria-hidden="true" />
        <i className="card-edge card-edge-right" aria-hidden="true" />
        <i className="card-edge card-edge-bottom" aria-hidden="true" />
        <i className="card-edge card-edge-left" aria-hidden="true" />
      </div>
    </div>
  );
}
