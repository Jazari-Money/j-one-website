"use client";

/* eslint-disable @next/next/no-img-element -- local flags use exact downloaded assets */

import { useRef } from "react";
import { withBasePath } from "../site-paths";
import { InteractiveCard } from "./InteractiveCard";
import { Phone } from "./Phone";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

export function ProductRoadmap() {
  const track = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const node = track.current;
    if (!node) return;
    node.scrollBy({ left: node.clientWidth * 0.76 * direction, behavior: "smooth" });
  }

  return (
    <section className="roadmap section" id="roadmap">
      <header className="roadmap-heading">
        <div className="chapter-heading">
          <h2>Roadmap</h2>
          <p>One useful layer at a time, starting with the USD account.</p>
        </div>
        <div className="roadmap-controls" aria-label="Roadmap navigation">
          <button type="button" onClick={() => move(-1)} aria-label="Previous milestone">
            <ArrowIcon direction="left" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next milestone">
            <ArrowIcon direction="right" />
          </button>
        </div>
      </header>

      <div className="roadmap-window">
        <div className="roadmap-track" ref={track}>
          <article className="roadmap-card live-product">
            <div className="roadmap-copy">
              <h3>USD account</h3>
              <p>
                Hold and receive supported digital dollars, then send through
                the bank routes available to you.
              </p>
              <ul>
                <li>Hold, receive, and send from one account</li>
                <li>Review every transfer before confirmation</li>
              </ul>
            </div>
            <div className="roadmap-visual live-phone">
              <Phone
                src={withBasePath("/images/screens/home.webp")}
                alt="Jazari One dollar account home screen"
              />
            </div>
          </article>

          <article className="roadmap-card routes-row">
            <div className="roadmap-copy">
              <h3>More receive countries</h3>
              <p>
                We&apos;re preparing new routes as local banking and compliance
                requirements become ready.
              </p>
            </div>
            <div className="roadmap-visual route-roster" aria-label="Planned receive countries">
              <section className="route-group">
                <h4>South Asia</h4>
                <ul className="route-country-list">
                  <li><img className="route-flag" src={withBasePath("/images/flags/in.png")} alt="" /><span>India</span></li>
                  <li><img className="route-flag" src={withBasePath("/images/flags/bd.png")} alt="" /><span>Bangladesh</span></li>
                  <li><img className="route-flag" src={withBasePath("/images/flags/pk.png")} alt="" /><span>Pakistan</span></li>
                </ul>
              </section>
              <section className="route-group africa-group">
                <h4>Africa</h4>
                <p>Countries will be announced as routes are confirmed.</p>
              </section>
            </div>
          </article>

          <article className="roadmap-card card-row">
            <div className="roadmap-copy">
              <h3>VISA Virtual card</h3>
              <p>
                Spend from the same balance, with purchase history and controls
                in the app.
              </p>
              <p id="card-interaction-help" className="interaction-note">
                Drag or use the arrow keys to rotate the card.
              </p>
            </div>
            <div className="roadmap-visual">
              <InteractiveCard />
            </div>
          </article>

          <article className="roadmap-card rnpl-row">
            <div className="roadmap-copy">
              <h3>Remit Now Pay Later</h3>
              <p>
                Eligible members may choose a support amount and repayment
                option before confirming.
              </p>
              <dl className="rnpl-example">
                <div><dt>Example support</dt><dd>$500</dd></div>
                <div><dt>Repayment</dt><dd>Shown upfront</dd></div>
              </dl>
            </div>
            <div className="roadmap-visual rnpl-phone">
              <Phone
                src={withBasePath("/images/screens/amount-entry.webp")}
                alt="Remit Now Pay Later amount screen"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
