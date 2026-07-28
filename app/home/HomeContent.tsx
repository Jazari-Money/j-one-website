"use client";

import { useEffect, useMemo, useState } from "react";
import { AudienceExplorer } from "./AudienceExplorer";
import { BenefitLedger } from "./BenefitLedger";
import { Blog } from "./Blog";
import {
  currencies,
  jazariVisualProfile,
  type CurrencyCode,
} from "./data";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { FAQ } from "./FAQ";
import { NetworkExplorer } from "./NetworkExplorer";
import { ProductRoadmap } from "./ProductRoadmap";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function HomeContent() {
  const [pageReady, setPageReady] = useState(false);
  const [amount, setAmount] = useState("1,000.00");
  const [currency, setCurrency] = useState<CurrencyCode>("MXN");
  const converted = useMemo(() => {
    const number = Number.parseFloat(amount.replace(/,/g, ""));
    return Number.isFinite(number) ? number * currencies[currency].rate : 0;
  }, [amount, currency]);

  useEffect(() => {
    let revealFrame = 0;
    const revealTimer = window.setTimeout(() => {
      revealFrame = window.requestAnimationFrame(() => setPageReady(true));
    }, 90);

    return () => {
      window.clearTimeout(revealTimer);
      window.cancelAnimationFrame(revealFrame);
    };
  }, []);

  return (
    <main
      className={`home-page ${pageReady ? "is-ready" : ""}`}
      data-theme={jazariVisualProfile.theme}
      data-shader={jazariVisualProfile.shader}
    >
      <SiteHeader />
      <Hero />
      <BenefitLedger />
      <HowItWorks
        amount={amount}
        currency={currency}
        converted={converted}
        onAmount={setAmount}
        onCurrency={setCurrency}
      />
      <AudienceExplorer />
      <ProductRoadmap />
      <Blog />
      <NetworkExplorer />
      <FAQ />

      <SiteFooter />
    </main>
  );
}
