"use client";

/* eslint-disable @next/next/no-img-element -- local flag assets */

import { useRef } from "react";
import Link from "next/link";
import { withBasePath } from "../site-paths";
import { resetPointer, trackPointer } from "./hooks";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

export const milestones = [
  {
    title: "USD account",
    copy:
      "A US routing and account number in your name, issued through a licensed US bank partner. Receive eligible payments by ACH, FedNow, domestic wire, or SWIFT.",
    notes: ["No US residency required"],
  },
  {
    title: "New receive countries",
    copy: "",
    notes: [],
    flags: [
      { name: "India", src: withBasePath("/images/flags/in.png") },
      { name: "Bangladesh", src: withBasePath("/images/flags/bd.png") },
      { name: "Pakistan", src: withBasePath("/images/flags/pk.png") },
      { name: "Nigeria", src: withBasePath("/images/flags/ng.png") },
    ],
  },
  {
    title: "Yields with higher APY",
    copy:
      "Additional independently managed strategies with different assets and potential APYs.",
    notes: [],
  },
  {
    title: "Visa card",
    copy:
      "Pay for subscriptions, software, and everyday spending directly from your Jazari One balance.",
    notes: [],
  },
  {
    title: "Remit Now Pay Later",
    copy:
      "Eligible members may choose a support amount and repayment option before confirming.",
    notes: [],
  },
] as const;

export function ProductRoadmap() {
  const track = useRef<HTMLDivElement>(null);

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
          <h2>Roadmap</h2>
          <p>What we&apos;re building next.</p>
        </div>
        <div className="roadmap-controls" aria-label="Roadmap navigation">
          <Link className="roadmap-all-link neutral-control" href="/roadmap">View All</Link>
          <button className="realism-icon-button" type="button" onClick={() => move(-1)} aria-label="Previous milestone">
            <ArrowIcon direction="left" />
          </button>
          <button className="realism-icon-button" type="button" onClick={() => move(1)} aria-label="Next milestone">
            <ArrowIcon direction="right" />
          </button>
        </div>
      </header>

      <div className="roadmap-window">
        <div className="roadmap-track" ref={track}>
          {milestones.map((milestone) => (
            <article
              className="roadmap-card pointer-card"
              key={milestone.title}
              onPointerMove={trackPointer}
              onPointerLeave={resetPointer}
            >
              <h3>{milestone.title}</h3>
              <div className="roadmap-card-bottom">
                {milestone.copy && <p>{milestone.copy}</p>}
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
                {milestone.notes.length > 0 && (
                  <ul>
                    {milestone.notes.map((note) => <li key={note}>{note}</li>)}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
