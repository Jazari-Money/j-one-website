"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../home/hooks";
import { CodexScene } from "./CodexScene";
import { codexConcepts, type CodexConcept } from "./data";

export function CodexDetail({ concept }: { concept: CodexConcept }) {
  const router = useRouter();
  const systemReduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [cursor, setCursor] = useState(true);
  const [intensity, setIntensity] = useState(0.72);
  const [preview, setPreview] = useState<"desktop" | "mobile">("desktop");
  const [introKey, setIntroKey] = useState(0);
  const effectiveReduced = systemReduced || reduced;
  const index = codexConcepts.findIndex((item) => item.id === concept.id);
  const previous = codexConcepts[(index + codexConcepts.length - 1) % codexConcepts.length];
  const next = codexConcepts[(index + 1) % codexConcepts.length];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) return;
      if (event.key === "ArrowLeft") router.push(`/hero-lab-codex/${previous.id}/`);
      if (event.key === "ArrowRight") router.push(`/hero-lab-codex/${next.id}/`);
      if (event.key.toLowerCase() === "r") {
        setIntroKey((value) => value + 1);
        setPaused(false);
      }
      if (event.key === " ") {
        event.preventDefault();
        setPaused((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next.id, previous.id, router]);

  return (
    <main className="xlab-detail">
      <aside className="xlab-controls">
        <div className="xlab-control-head">
          <Link href="/hero-lab-codex/">Codex Lab</Link>
          <span>{concept.id} / 10</span>
        </div>
        <div className="xlab-control-title">
          <p>{concept.composition}</p>
          <h1>{concept.name}</h1>
          <span>{concept.thesis}</span>
        </div>
        <div className="xlab-control-row">
          <button
            type="button"
            onClick={() => {
              setIntroKey((value) => value + 1);
              setPaused(false);
            }}
          >
            Replay intro
          </button>
          <button type="button" onClick={() => setPaused((value) => !value)}>
            {paused ? "Play" : "Pause"}
          </button>
        </div>
        <label className="xlab-range">
          <span>Intensity</span>
          <input
            aria-label="Intensity"
            type="range"
            min="0.2"
            max="1"
            step="0.01"
            value={intensity}
            onChange={(event) => setIntensity(Number(event.target.value))}
          />
          <output>{Math.round(intensity * 100)}%</output>
        </label>
        <label className="xlab-switch">
          <input type="checkbox" checked={cursor} onChange={(event) => setCursor(event.target.checked)} />
          <span>Cursor response</span>
        </label>
        <label className="xlab-switch">
          <input type="checkbox" checked={reduced} onChange={(event) => setReduced(event.target.checked)} />
          <span>Reduced motion</span>
        </label>
        <div className="xlab-segmented" aria-label="Preview size">
          <button
            type="button"
            aria-pressed={preview === "desktop"}
            onClick={() => setPreview("desktop")}
          >
            Desktop
          </button>
          <button type="button" aria-pressed={preview === "mobile"} onClick={() => setPreview("mobile")}>
            Mobile
          </button>
        </div>
        <dl className="xlab-facts">
          <div>
            <dt>Product</dt>
            <dd>{concept.product}</dd>
          </div>
          <div>
            <dt>Palette</dt>
            <dd>{concept.palette}</dd>
          </div>
          <div>
            <dt>Renderer</dt>
            <dd>{concept.tech}</dd>
          </div>
        </dl>
        <div className="xlab-pager">
          <Link href={`/hero-lab-codex/${previous.id}/`}>← {previous.id}</Link>
          <Link href="/hero-lab-codex/compare/">Compare</Link>
          <Link href={`/hero-lab-codex/${next.id}/`}>{next.id} →</Link>
        </div>
      </aside>
      <div className={`xlab-stage is-${preview}`}>
        <div className="xlab-frame">
          <CodexScene
            concept={concept}
            paused={paused}
            reduced={effectiveReduced}
            cursor={cursor}
            intensity={intensity}
            introKey={introKey}
          />
        </div>
      </div>
    </main>
  );
}
