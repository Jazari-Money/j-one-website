"use client";

/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import type { CSSProperties } from "react";
import { features } from "./data";
import { resetPointer, trackPointer, useRevealInViewport } from "./hooks";

function BenefitRow({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  return (
    <li
      className="benefit-row"
      style={{ "--reveal-index": index } as CSSProperties}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
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
  const [listRef, revealed] = useRevealInViewport<HTMLUListElement>("-12% 0px");

  return (
    <section className="benefit-ledger section">
      <header className="ledger-heading">
        <h2>One account for money that crosses borders.</h2>
        <p>Hold dollars, receive payments, and move money through supported routes from one clear account.</p>
      </header>
      <ul className={`benefit-list ${revealed ? "is-visible" : ""}`} ref={listRef}>
        {features.map((feature, index) => (
          <BenefitRow feature={feature} index={index} key={feature.title} />
        ))}
      </ul>
    </section>
  );
}
