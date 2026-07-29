"use client";

import Link from "next/link";
import { useState } from "react";
import type { LabVariantMeta } from "./lab-data";
import { labVariants } from "./lab-data";
import type { LabSettings } from "./useLabSettings";

export function LabControls({
  meta,
  settings,
  onSettings,
  paused,
  onTogglePause,
  onReplay,
  showPreviewToggle = true,
  basePath = "/hero-lab",
}: {
  meta?: LabVariantMeta;
  settings: LabSettings;
  onSettings: (patch: Partial<LabSettings>) => void;
  paused: boolean;
  onTogglePause: () => void;
  onReplay: () => void;
  showPreviewToggle?: boolean;
  basePath?: string;
}) {
  const [infoOpen, setInfoOpen] = useState(false);
  const index = meta ? labVariants.findIndex((v) => v.id === meta.id) : -1;
  const prev = index >= 0 ? labVariants[(index + labVariants.length - 1) % labVariants.length] : null;
  const next = index >= 0 ? labVariants[(index + 1) % labVariants.length] : null;

  return (
    <div className="hlab-controls">
      <div className="hlab-controls-row">
        <div className="hlab-controls-left">
          <Link className="hlab-back" href={`${basePath}/`}>
            Lab
          </Link>
          {meta && prev && next && (
            <nav className="hlab-switcher" aria-label="Hero variants">
              <Link className="hlab-arrow" href={`${basePath}/${prev.id}/`} aria-label="Previous variant">
                ←
              </Link>
              <div className="hlab-numbers">
                {labVariants.map((variant) => (
                  <Link
                    key={variant.id}
                    href={`${basePath}/${variant.id}/`}
                    className={variant.id === meta.id ? "is-active" : ""}
                    aria-current={variant.id === meta.id ? "page" : undefined}
                  >
                    {variant.id}
                  </Link>
                ))}
              </div>
              <Link className="hlab-arrow" href={`${basePath}/${next.id}/`} aria-label="Next variant">
                →
              </Link>
            </nav>
          )}
          {meta && (
            <button
              type="button"
              className={`hlab-name ${infoOpen ? "is-open" : ""}`}
              onClick={() => setInfoOpen((open) => !open)}
              aria-expanded={infoOpen}
            >
              <strong>{meta.name}</strong>
              <span>{meta.tagline}</span>
            </button>
          )}
        </div>

        <div className="hlab-controls-right">
          <button type="button" className="hlab-control" onClick={onReplay}>
            Replay intro
          </button>
          <button type="button" className="hlab-control" onClick={onTogglePause} aria-pressed={paused}>
            {paused ? "Play" : "Pause"}
          </button>
          <button
            type="button"
            className="hlab-control"
            onClick={() =>
              onSettings({ motion: settings.motion === "full" ? "reduced" : "full" })
            }
            aria-pressed={settings.motion === "reduced"}
          >
            {settings.motion === "reduced" ? "Reduced motion" : "Full motion"}
          </button>
          <button
            type="button"
            className="hlab-control"
            onClick={() => onSettings({ cursor: !settings.cursor })}
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
                onSettings({ intensity: Number(event.target.value) })
              }
            />
          </label>
          {showPreviewToggle && (
            <div className="hlab-segmented" role="group" aria-label="Preview width">
              <button
                type="button"
                className={settings.preview === "desktop" ? "is-active" : ""}
                onClick={() => onSettings({ preview: "desktop" })}
              >
                Desktop
              </button>
              <button
                type="button"
                className={settings.preview === "mobile" ? "is-active" : ""}
                onClick={() => onSettings({ preview: "mobile" })}
              >
                Mobile
              </button>
            </div>
          )}
          <Link className="hlab-control" href={`${basePath}/compare/`}>
            Compare
          </Link>
        </div>
      </div>

      {meta && infoOpen && (
        <div className="hlab-info">
          <p className="hlab-info-idea">{meta.idea}</p>
          <dl>
            <div>
              <dt>Product link</dt>
              <dd>{meta.productLink}</dd>
            </div>
            <div>
              <dt>Composition</dt>
              <dd>
                {meta.composition === "container"
                  ? "Rounded container"
                  : meta.composition === "edge"
                    ? "Edge-to-edge"
                    : "Hybrid — breaks its container"}
                {" · "}
                {meta.layout === "center" ? "centered" : "editorial / asymmetric"}
              </dd>
            </div>
            <div>
              <dt>Palette</dt>
              <dd>
                <span className="hlab-palette">
                  {meta.palette.map((color) => (
                    <i key={color} style={{ background: color }} />
                  ))}
                </span>
                {meta.paletteName}
              </dd>
            </div>
            <div>
              <dt>Motion</dt>
              <dd>{meta.motion}</dd>
            </div>
            <div>
              <dt>Tech</dt>
              <dd>{meta.tech}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
