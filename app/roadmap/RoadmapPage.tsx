"use client";

import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { milestones, RoadmapCardBody } from "../home/ProductRoadmap";
import { SiteFooter } from "../home/SiteFooter";
import { resetPointer, trackPointer } from "../home/hooks";

export function RoadmapPage() {
  return (
    <main className="roadmap-full-shell">
      <InternalSiteHeader />

      <header className="roadmap-full-hero">
        <h1>Coming soon</h1>
        <p>What you&apos;ll be able to do next.</p>
      </header>

      <section className="roadmap-full-grid" aria-label="Jazari One product roadmap">
        {milestones.map((milestone) => (
          <article
            className={`roadmap-full-card pointer-card${"art" in milestone ? " has-art" : ""}${"art" in milestone && "variant" in milestone.art ? ` art-${milestone.art.variant}` : ""}`}
            key={milestone.title}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            <RoadmapCardBody milestone={milestone} headingLevel="h2" />
          </article>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
