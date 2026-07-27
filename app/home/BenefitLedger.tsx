/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import { features } from "./data";

function BenefitRow({
  feature,
}: {
  feature: (typeof features)[number];
}) {
  return (
    <li className="benefit-row">
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
  return (
    <section className="benefit-ledger section">
      <header className="ledger-heading">
        <h2>One app for money that crosses borders</h2>
        <p>Receive payments, hold dollars, and move money through supported routes from one clear account.</p>
      </header>
      <ul className="benefit-list">
        {features.map((feature) => (
          <BenefitRow feature={feature} key={feature.title} />
        ))}
      </ul>
    </section>
  );
}
