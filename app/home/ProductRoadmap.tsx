"use client";

/* eslint-disable @next/next/no-img-element -- local flag assets */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { withBasePath } from "../site-paths";
import { resetPointer, trackPointer } from "./hooks";
import { ResponsiveImage } from "./ResponsiveImage";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

export const milestones = [
  {
    title: "Remit Now Pay Later",
    copy:
      "Choose a loan amount and repayment plan at confirmation",
    notes: [],
  },
  {
    title: "Visa card",
    copy:
      "Pay for subscriptions, software, and everyday spending directly from your Jazari One balance.",
    notes: [],
    art: {
      src: withBasePath("/images/roadmap/visa-card.png"),
      stem: "/images/roadmap/visa-card",
      alt: "Jazari One Visa card",
      width: 988,
      height: 673,
      widths: [320, 640],
      variant: "card",
    },
  },
  {
    title: "Additional payout countries",
    copy: "",
    notes: [],
    flags: [
      { name: "India", src: withBasePath("/images/flags/in.png") },
      { name: "Bangladesh", src: withBasePath("/images/flags/bd.png") },
      { name: "Pakistan", src: withBasePath("/images/flags/pk.png") },
      { name: "Nigeria", src: withBasePath("/images/flags/ng.png") },
      { name: "Philippines", src: withBasePath("/images/flags/ph.png") },
    ],
  },
  {
    title: "Higher-return Yields",
    copy:
      "More Yields options, with higher APY. Non-custodial Yields for increased privacy and autonomy.",
    notes: [],
  },
] as const;

type Milestone = (typeof milestones)[number];

export function RoadmapCardBody({
  milestone,
  headingLevel,
}: {
  milestone: Milestone;
  headingLevel: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <>
      <div className="roadmap-milestone-copy">
        <Heading>{milestone.title}</Heading>
        {milestone.copy && <p>{milestone.copy}</p>}
        {milestone.notes.length > 0 && (
          <ul>
            {milestone.notes.map((note) => <li key={note}>{note}</li>)}
          </ul>
        )}
      </div>
      {("art" in milestone || "flags" in milestone) && (
        <div className="roadmap-milestone-visual">
          {"art" in milestone && (
            <ResponsiveImage
              className="roadmap-milestone-art"
              pictureClassName="roadmap-art-media"
              fallback={milestone.art.src}
              stem={milestone.art.stem}
              widths={milestone.art.widths}
              width={milestone.art.width}
              height={milestone.art.height}
              sizes="(max-width: 620px) 220px, 350px"
              alt={milestone.art.alt}
              loading="lazy"
              decoding="async"
            />
          )}
          {"flags" in milestone && (
            <div className="roadmap-flags" aria-label="Planned receive countries">
              {milestone.flags.map((flag) => (
                <span key={flag.name}>
                  <img
                    src={flag.src}
                    alt=""
                    width="80"
                    height="80"
                    loading="lazy"
                    decoding="async"
                  />
                  {flag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function ProductRoadmap() {
  const track = useRef<HTMLDivElement>(null);
  const [edgeState, setEdgeState] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const node = track.current;
    if (!node) return;

    const updateEdges = () => {
      const remaining = node.scrollWidth - node.clientWidth - node.scrollLeft;
      setEdgeState({
        atStart: node.scrollLeft <= 1,
        atEnd: remaining <= 1,
      });
    };

    updateEdges();
    node.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      node.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  function move(direction: -1 | 1) {
    const node = track.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>(".roadmap-card");
    const styles = window.getComputedStyle(node);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "16") || 16;
    const cardsPerPage = window.matchMedia("(max-width: 620px)").matches ? 1 : 2;
    const distance = card
      ? (card.getBoundingClientRect().width + gap) * cardsPerPage
      : node.clientWidth;
    node.scrollBy({ left: distance * direction, behavior: "smooth" });
  }

  return (
    <section className="roadmap section" id="roadmap">
      <header className="roadmap-heading">
        <div className="chapter-heading">
          <h2>Coming soon</h2>
          <p>What you&apos;ll be able to do next.</p>
        </div>
        <div className="roadmap-controls" aria-label="Coming soon navigation">
          <Link className="roadmap-all-link neutral-control" href="/roadmap">View All</Link>
          <button className="realism-icon-button" type="button" onClick={() => move(-1)} aria-label="Previous milestone">
            <ArrowIcon direction="left" />
          </button>
          <button className="realism-icon-button" type="button" onClick={() => move(1)} aria-label="Next milestone">
            <ArrowIcon direction="right" />
          </button>
        </div>
      </header>

      <div
        className={`roadmap-window${edgeState.atStart ? " is-at-start" : ""}${edgeState.atEnd ? " is-at-end" : ""}`}
      >
        <div className="roadmap-track" ref={track}>
          {milestones.map((milestone) => (
            <article
              className={`roadmap-card pointer-card${"art" in milestone ? " has-art" : ""}${"art" in milestone && "variant" in milestone.art ? ` art-${milestone.art.variant}` : ""}`}
              key={milestone.title}
              onPointerMove={trackPointer}
              onPointerLeave={resetPointer}
            >
              <RoadmapCardBody milestone={milestone} headingLevel="h3" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
