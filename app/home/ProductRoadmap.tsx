"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { withBasePath } from "../site-paths";
import type { ThemeOption } from "./data";
import { useInViewport, useReducedMotion } from "./hooks";
import { InteractiveCard } from "./InteractiveCard";
import { Phone } from "./Phone";

export function ProductRoadmap({ theme }: { theme: ThemeOption }) {
  const reduced = useReducedMotion();
  const [liveRef, liveShaderVisible] = useInViewport<HTMLElement>("260px");

  return (
    <section className="roadmap section" id="roadmap">
      <header className="chapter-heading">
        <h2>Live now. Built next.</h2>
        <p>Jazari is growing one useful layer at a time, starting with the dollar account.</p>
      </header>

      <article className="live-product" ref={liveRef}>
        <div className="live-shader" aria-hidden="true">
          {liveShaderVisible && (
            <MeshGradient
              width="100%"
              height="100%"
              colors={[theme.mesh[0], theme.mesh[1], theme.mesh[3], theme.mesh[0]]}
              distortion={0.5}
              swirl={0.14}
              grainMixer={0}
              grainOverlay={0}
              speed={reduced ? 0 : 0.16}
            />
          )}
        </div>
        <div className="roadmap-copy">
          <span className="live-mark">LIVE</span>
          <h3>Your dollar account</h3>
          <p>Hold and receive supported digital dollars, then send through the bank routes available to you.</p>
          <ul>
            <li>One account for holding, receiving, and sending</li>
            <li>Transfer information visible before confirmation</li>
            <li>Available routes collected in one experience</li>
          </ul>
        </div>
        <div className="roadmap-visual live-phone">
          <Phone src={withBasePath("/images/screens/home.webp")} alt="Jazari One dollar account home screen" />
        </div>
      </article>

      <div className="next-stack">
        <article className="roadmap-row routes-row">
          <div className="roadmap-copy">
            <span className="roadmap-state">Next</span>
            <h3>More local routes</h3>
            <p>
              We&apos;re preparing routes for India, Bangladesh, and Pakistan,
              followed by selected African markets. Each route opens only when
              its local banking and compliance requirements are ready.
            </p>
          </div>
          <div className="roadmap-visual route-roster" aria-label="Planned local routes">
            <section className="route-group">
              <h4>South Asia</h4>
              <ul className="route-country-list">
                <li><span className="route-flag" aria-hidden="true">🇮🇳</span><span>India</span></li>
                <li><span className="route-flag" aria-hidden="true">🇧🇩</span><span>Bangladesh</span></li>
                <li><span className="route-flag" aria-hidden="true">🇵🇰</span><span>Pakistan</span></li>
              </ul>
            </section>
            <section className="route-group">
              <h4>Africa</h4>
              <p className="route-note">
                Specific countries will be announced as routes are confirmed.
              </p>
            </section>
          </div>
        </article>

        <article className="roadmap-row card-row">
          <div className="roadmap-copy">
            <span className="roadmap-state">Then</span>
            <h3>The Jazari card</h3>
            <p>
              Use the same balance for card spending, with purchase history and
              controls in the app. Availability and terms will depend on country
              and eligibility.
            </p>
            <p id="card-interaction-help" className="interaction-note">
              Drag the card or use your arrow keys to rotate it.
            </p>
          </div>
          <div className="roadmap-visual">
            <InteractiveCard />
          </div>
        </article>

        <article className="roadmap-row rnpl-row">
          <div className="roadmap-copy">
            <span className="roadmap-state">Later</span>
            <h3>Remit Now Pay Later</h3>
            <p>
              Eligible members may be able to choose a support amount and a
              repayment option before confirming. Limits, pricing, terms, and
              availability will vary.
            </p>
            <dl className="rnpl-example">
              <div><dt>Example support</dt><dd>$500</dd></div>
              <div><dt>Repayment selection</dt><dd>Shown upfront</dd></div>
            </dl>
          </div>
          <div className="roadmap-visual rnpl-phone">
            <Phone src={withBasePath("/images/screens/amount-entry.webp")} alt="Remit Now Pay Later amount screen" />
          </div>
        </article>
      </div>
    </section>
  );
}
