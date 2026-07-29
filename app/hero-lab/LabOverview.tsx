"use client";

import Link from "next/link";
import { labVariants } from "./lab-data";

export function LabOverview({ basePath = "/hero-lab" }: { basePath?: string }) {
  return (
    <div className="hlab-overview">
      <header className="hlab-overview-head">
        <p className="hlab-overview-kicker">Jazari One · internal review surface</p>
        <h1>Hero Lab</h1>
        <p className="hlab-overview-intro">
          Ten art-direction studies for the first screen. Each is a working,
          responsive hero with its own spatial idea, palette, entrance
          choreography and calm resting state. Open a study for the live scene
          and its controls, or compare two side by side. Previews below are
          static — the full scene runs only on its own page.
        </p>
        <div className="hlab-overview-actions">
          <Link className="hlab-control" href={`${basePath}/compare/`}>
            Compare two variants
          </Link>
          <Link className="hlab-control" href="/">
            Current production hero
          </Link>
        </div>
      </header>

      <ul className="hlab-grid">
        {labVariants.map((variant) => (
          <li key={variant.id}>
            <Link className="hlab-card" href={`${basePath}/${variant.id}/`}>
              <span
                className="hlab-card-preview"
                style={{ background: variant.preview }}
                aria-hidden="true"
              >
                <span className="hlab-card-id">{variant.id}</span>
                <span className="hlab-card-comp">
                  {variant.composition === "container"
                    ? "Container"
                    : variant.composition === "edge"
                      ? "Edge-to-edge"
                      : "Hybrid"}
                </span>
              </span>
              <span className="hlab-card-body">
                <strong>{variant.name}</strong>
                <em>{variant.tagline}</em>
                <span className="hlab-card-desc">{variant.idea}</span>
                <span className="hlab-palette">
                  {variant.palette.map((color) => (
                    <i key={color} style={{ background: color }} />
                  ))}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
