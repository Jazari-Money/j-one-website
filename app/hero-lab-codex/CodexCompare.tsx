"use client";

import Link from "next/link";
import { useState } from "react";
import { CodexScene } from "./CodexScene";
import { codexConcepts } from "./data";

function Pane({ id, onChange }: { id: string; onChange: (id: string) => void }) {
  const concept = codexConcepts.find((item) => item.id === id) ?? codexConcepts[0];
  return (
    <section className="xlab-compare-pane">
      <header>
        <select value={id} onChange={(event) => onChange(event.target.value)} aria-label="Choose concept">
          {codexConcepts.map((item) => (
            <option key={item.id} value={item.id}>
              {item.id} — {item.name}
            </option>
          ))}
        </select>
        <Link href={`/hero-lab-codex/${id}/`}>Open</Link>
      </header>
      <CodexScene
        concept={concept}
        paused={false}
        reduced
        cursor={false}
        intensity={0.7}
        introKey={0}
        compact
      />
    </section>
  );
}

export function CodexCompare() {
  const [left, setLeft] = useState("01");
  const [right, setRight] = useState("06");
  return (
    <main className="xlab-compare">
      <header className="xlab-compare-head">
        <div>
          <p className="xlab-kicker">Codex Lab</p>
          <h1>Side-by-side</h1>
        </div>
        <p>Comparison uses reduced-motion frames to keep two heavy scenes from competing for resources.</p>
        <Link href="/hero-lab-codex/">Back to overview</Link>
      </header>
      <div className="xlab-compare-grid">
        <Pane id={left} onChange={setLeft} />
        <Pane id={right} onChange={setRight} />
      </div>
    </main>
  );
}
