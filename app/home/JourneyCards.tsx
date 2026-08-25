"use client";

/* eslint-disable @next/next/no-img-element -- art-directed local product artwork */

import Link from "next/link";
import { withBasePath } from "../site-paths";
import { resetPointer, trackPointer } from "./hooks";

const journeys = [
  {
    id: "receive-money",
    title: "Receive money",
    copy: "Add your own dollars or receive payments through a US account or in digital dollars—all in one balance.",
    action: "Explore receiving",
    href: "/receive/",
    actionHref: "/receive/",
    image: "/images/features/new/dollar-balance.webp",
    alt: "Dollar symbol",
  },
  {
    id: "send-money",
    title: "Send money",
    copy: "Send to bank accounts in 30+ countries or digital wallets worldwide, with the rate shown before you confirm.",
    action: "Check rates & destinations",
    href: "/send/",
    actionHref: "/send/#rates",
    image: "/images/journeys/send-globe.png",
    alt: "Earth",
  },
  {
    id: "earn",
    title: "Meet Yields",
    copy: "Choose how much to put into Yields, earn a variable rate, and return funds to your balance whenever you need them.",
    action: "Explore Yields",
    href: "/yields/",
    actionHref: "/yields/",
    image: "/images/journeys/yields-wheat.png",
    alt: "Wheat containing coins",
  },
] as const;

export function JourneyCards() {
  return (
    <section className="journeys section" id="product" aria-label="Receive, send, and Yields">
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
