"use client";

import Link from "next/link";
import { useState } from "react";
import { useReducedMotion } from "../../home/hooks";
import { labVariants } from "../lab-data";
import { variantComponents } from "../variants";
import { useLabSettings } from "../useLabSettings";

function ComparePane({
  value,
  onChange,
  replayToken,
  paused,
  reduced,
  intensity,
  cursor,
  basePath,
}: {
  value: string;
  onChange: (id: string) => void;
  replayToken: number;
  paused: boolean;
  reduced: boolean;
  intensity: number;
  cursor: boolean;
  basePath: string;
}) {
  const Variant = variantComponents[value];
  return (
    <div className="hlab-compare-pane">
      <div className="hlab-compare-pick">
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {labVariants.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.id} — {variant.name}
            </option>
          ))}
        </select>
        <Link href={`${basePath}/${value}/`}>Open</Link>
      </div>
      <div className={`hlab-frame is-compare ${paused ? "is-paused" : ""} ${reduced ? "is-reduced" : ""}`}>
        <Variant
          key={`${value}-${replayToken}`}
          intensity={intensity}
          paused={paused}
          reduced={reduced}
          cursor={cursor}
        />
      </div>
    </div>
  );
}

export function LabCompare({ basePath = "/hero-lab" }: { basePath?: string }) {
  const [settings, updateSettings] = useLabSettings();
  const [left, setLeft] = useState("04");
  const [right, setRight] = useState("10");
  const [paused, setPaused] = useState(false);
  const [replayToken, setReplayToken] = useState(0);
  const systemReduced = useReducedMotion();
  const reduced = systemReduced || settings.motion === "reduced";

  return (
    <div className="hlab-view hlab-compare">
      <div className="hlab-controls">
        <div className="hlab-controls-row">
          <div className="hlab-controls-left">
            <Link className="hlab-back" href={`${basePath}/`}>
              Lab
            </Link>
            <span className="hlab-compare-title">Compare</span>
          </div>
          <div className="hlab-controls-right">
            <button
              type="button"
              className="hlab-control"
              onClick={() => {
                setReplayToken((token) => token + 1);
                setPaused(false);
              }}
            >
              Replay intros
            </button>
            <button
              type="button"
              className="hlab-control"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
            >
              {paused ? "Play" : "Pause"}
            </button>
            <button
              type="button"
              className="hlab-control"
              onClick={() =>
                updateSettings({
                  motion: settings.motion === "full" ? "reduced" : "full",
                })
              }
              aria-pressed={settings.motion === "reduced"}
            >
              {settings.motion === "reduced" ? "Reduced motion" : "Full motion"}
            </button>
            <button
              type="button"
              className="hlab-control"
              onClick={() => updateSettings({ cursor: !settings.cursor })}
              aria-pressed={settings.cursor}
            >
              {settings.cursor ? "Cursor on" : "Cursor off"}
            </button>
            <label className="hlab-slider">
              <span>Intensity</span>
              <input
                type="range"
                min={0.4}
                max={1.5}
                step={0.05}
                value={settings.intensity}
                onChange={(event) =>
                  updateSettings({ intensity: Number(event.target.value) })
                }
              />
            </label>
          </div>
        </div>
      </div>
      <div className="hlab-compare-grid">
        <ComparePane
          value={left}
          onChange={setLeft}
          replayToken={replayToken}
          paused={paused}
          reduced={reduced}
          intensity={settings.intensity}
          cursor={settings.cursor}
          basePath={basePath}
        />
        <ComparePane
          value={right}
          onChange={setRight}
          replayToken={replayToken}
          paused={paused}
          reduced={reduced}
          intensity={settings.intensity}
          cursor={settings.cursor}
          basePath={basePath}
        />
      </div>
    </div>
  );
}
