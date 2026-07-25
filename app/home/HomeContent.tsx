"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AudienceExplorer } from "./AudienceExplorer";
import { BenefitLedger } from "./BenefitLedger";
import { Blog } from "./Blog";
import {
  currencies,
  themeOptions,
  type CurrencyCode,
} from "./data";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { FAQ } from "./FAQ";
import { MoneyRain } from "./MoneyRain";
import { NetworkExplorer } from "./NetworkExplorer";
import { ProductRoadmap } from "./ProductRoadmap";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { useVisualPreferences } from "./useVisualPreferences";

export function HomeContent() {
  const { theme, setTheme, shader, setShader } = useVisualPreferences();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [amount, setAmount] = useState("1000");
  const [currency, setCurrency] = useState<CurrencyCode>("MXN");
  const emailInput = useRef<HTMLInputElement>(null);
  const selectedTheme = themeOptions.find((option) => option.key === theme) ?? themeOptions[0];

  const converted = useMemo(() => {
    const number = Number.parseFloat(amount.replace(/,/g, ""));
    return Number.isFinite(number) ? number * currencies[currency].rate : 0;
  }, [amount, currency]);

  useEffect(() => {
    if (window.location.hash !== "#access") return;
    const openTimer = window.setTimeout(() => setAccessOpen(true), 80);
    const focusTimer = window.setTimeout(() => emailInput.current?.focus(), 620);
    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(focusTimer);
    };
  }, []);

  function openAccess() {
    setAccessOpen(true);
    document.getElementById("access")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => emailInput.current?.focus(), 520);
  }

  function submitWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setJoined(true);
  }

  return (
    <main data-theme={theme} data-shader={shader}>
      <SiteHeader
        theme={theme}
        shader={shader}
        onThemeChange={setTheme}
        onShaderChange={setShader}
        onAccess={openAccess}
      />
      <Hero
        theme={selectedTheme}
        accessOpen={accessOpen}
        joined={joined}
        email={email}
        emailInput={emailInput}
        onOpen={openAccess}
        onEmail={setEmail}
        onSubmit={submitWaitlist}
      />
      <BenefitLedger />
      <HowItWorks
        amount={amount}
        currency={currency}
        converted={converted}
        onAmount={setAmount}
        onCurrency={setCurrency}
      />
      <AudienceExplorer />
      <NetworkExplorer />
      <ProductRoadmap />
      <Blog />
      <MoneyRain onAccess={openAccess} />
      <FAQ />

      <SiteFooter />
    </main>
  );
}
