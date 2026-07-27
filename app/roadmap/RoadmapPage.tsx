"use client";

/* eslint-disable @next/next/no-img-element -- local flag assets */

import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { milestones } from "../home/ProductRoadmap";
import { SiteFooter } from "../home/SiteFooter";
import { resetPointer, trackPointer } from "../home/hooks";

export function RoadmapPage() {
  return (
    <main className="roadmap-full-shell">
      <InternalSiteHeader />

      <header className="roadmap-full-hero">
        <h1>Roadmap</h1>
        <p>One useful layer at a time, starting with the USD account.</p>
      </header>

      <section className="roadmap-full-grid" aria-label="Jazari One product roadmap">
        {milestones.map((milestone) => (
          <article
            className="roadmap-full-card pointer-card"
            key={milestone.title}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            <h2>{milestone.title}</h2>
            <div>
              <p>{milestone.copy}</p>
              {"flags" in milestone && (
                <div className="roadmap-flags" aria-label="Planned receive countries">
                  {milestone.flags.map((flag) => (
                    <span key={flag.name}>
                      <img src={flag.src} alt="" />
                      {flag.name}
                    </span>
                  ))}
                </div>
              )}
              <ul>
                {milestone.notes.map((note) => <li key={note}>{note}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
