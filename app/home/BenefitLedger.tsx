"use client";

/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import type { CSSProperties } from "react";
import { features } from "./data";
import { useRevealInViewport } from "./hooks";

function BenefitRow({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  return (
    <li
      className="benefit-row benefit-reveal"
      style={{ "--benefit-index": index } as CSSProperties}
    >
      <div className="benefit-row-inner">
        <img src={feature.image} alt="" aria-hidden="true" />
        <div className="benefit-copy">
          <h3>{feature.title}</h3>
          <p>{feature.copy}</p>
        </div>
      </div>
    </li>
  );
}

export function BenefitLedger() {
  const [listRef, revealed] = useRevealInViewport<HTMLUListElement>("-6% 0px");

  return (
    <section className="benefit-ledger" id="features" aria-label="Jazari One features">
      <ul className={`benefit-list ${revealed ? "is-visible" : ""}`} ref={listRef}>
        {features.map((feature, index) => (
          <BenefitRow feature={feature} index={index} key={feature.title} />
        ))}
      </ul>
    </section>
  );
}
