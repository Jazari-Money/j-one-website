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
    notes: ["No US residency required", "Details shown before every transfer"],
  },
  {
    title: "More countries",
    copy:
      "New receive routes open as local banking partners and regulatory approvals are ready.",
    notes: ["Selected African markets"],
    flags: [
      { name: "India", src: withBasePath("/images/flags/in.png") },
      { name: "Bangladesh", src: withBasePath("/images/flags/bd.png") },
      { name: "Pakistan", src: withBasePath("/images/flags/pk.png") },
    ],
  },
  {
    title: "More yield strategies",
    copy:
      "Additional independently managed yield strategies with different assets, risk profiles, and variable APYs.",
    notes: ["Variable rates", "Risk shown before funding"],
  },
  {
    title: "VISA Virtual card",
    copy:
      "Pay for subscriptions, software, and everyday spending directly from your Jazari balance.",
    notes: ["Country availability will vary", "Controls stay in the app"],
  },
  {
    title: "Remit Now Pay Later",
    copy:
      "Eligible members may choose a support amount and repayment option before confirming.",
    notes: ["Limits and pricing shown upfront", "Eligibility will vary"],
  },
] as const;

export function ProductRoadmap() {
  const track = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const node = track.current;
    if (!node) return;
    node.scrollBy({ left: node.clientWidth * 0.72 * direction, behavior: "smooth" });
  }

  return (
    <section className="roadmap section" id="roadmap">
      <header className="roadmap-heading">
        <div className="chapter-heading">
          <h2>Roadmap</h2>
          <p>One useful layer at a time, starting with the USD account.</p>
        </div>
        <div className="roadmap-controls" aria-label="Roadmap navigation">
          <Link className="roadmap-all-link" href="/roadmap">View All</Link>
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
        </div>
      </div>
    </section>
  );
}
