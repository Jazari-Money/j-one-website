"use client";

/* eslint-disable @next/next/no-img-element -- art-directed local product artwork */

import Link from "next/link";
import { withBasePath } from "../site-paths";
import { resetPointer, trackPointer } from "./hooks";

const journeys = [
  {
    id: "receive-money",
    title: "Receive",
    copy: "Add your own dollars or receive payments through a USD account or in stablecoins—all in one balance.",
    action: "Explore receiving",
    href: "/receive/",
    actionHref: "/receive/",
    image: "/images/features/new/dollar-balance.webp",
    alt: "Dollar symbol",
  },
  {
    id: "earn",
    title: "Earn",
    copy: "Choose how much to put into Yields, earn a variable rate, and return funds to your balance whenever you need them.",
    action: "Explore Yields",
    href: "/yields/",
    actionHref: "/yields/",
    image: "/images/journeys/yields-wheat.png",
    alt: "Wheat containing coins",
  },
  {
    id: "send-money",
    title: "Send",
    copy: "Send to bank accounts in 30+ countries with the rate shown before you confirm. Or send stablecoins to supported wallets worldwide.",
    action: "Explore sending",
    href: "/send/",
    actionHref: "/send/#rates",
    image: "/images/journeys/send-globe.png",
    alt: "Earth",
  },
] as const;

export function JourneyCards() {
  return (
    <section className="journeys section" id="product" aria-label="Receive, Earn, and Send">
      <div className="journey-grid">
        {journeys.map((journey) => (
          <article
            className="journey-card pointer-card"
            id={journey.id}
            key={journey.id}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            <Link className="journey-card-hit" href={journey.href} aria-label={journey.title} />
            <div className="journey-art-plate">
              <img
                className="journey-art"
                src={withBasePath(journey.image)}
                alt={journey.alt}
                width="1024"
                height="1024"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="journey-card-copy">
              <h3>{journey.title}</h3>
              <p>{journey.copy}</p>
            </div>
            <Link className="journey-action neutral-control" href={journey.actionHref}>
              {journey.action}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
