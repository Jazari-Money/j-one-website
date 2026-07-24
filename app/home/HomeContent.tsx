"use client";

/* eslint-disable @next/next/no-img-element -- local brand artwork uses its exact source */

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { withBasePath } from "../site-paths";
import { AudienceExplorer } from "./AudienceExplorer";
import { BenefitLedger } from "./BenefitLedger";
import { Blog } from "./Blog";
import {
  currencies,
  themeOptions,
  type CurrencyCode,
  type ThemeKey,
} from "./data";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { MoneyRain } from "./MoneyRain";
import { NetworkExplorer } from "./NetworkExplorer";
import { ProductRoadmap } from "./ProductRoadmap";
import { SiteHeader } from "./SiteHeader";

export function HomeContent() {
  const [theme, setTheme] = useState<ThemeKey>("carbon");
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
    const stored = window.localStorage.getItem("jazari-theme") as ThemeKey | null;
    if (!stored || !themeOptions.some((option) => option.key === stored)) return;
    const timer = window.setTimeout(() => setTheme(stored), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("jazari-theme", theme);
  }, [theme]);

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
    <main data-theme={theme}>
      <SiteHeader theme={theme} onThemeChange={setTheme} onAccess={openAccess} />
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
      <ProductRoadmap theme={selectedTheme} />
      <AudienceExplorer />
      <NetworkExplorer />
      <Blog />
      <MoneyRain onAccess={openAccess} />

      <footer>
        <div className="footer-top">
          <img src={withBasePath("/images/brand/jazari-one-logo.svg")} alt="Jazari One" />
          <div>
            <a href="#how">How it works</a>
            <a href="#roadmap">What&apos;s next</a>
            <a href="#blog">Blog</a>
            <a href="mailto:hello@jazari.xyz">Contact</a>
          </div>
        </div>
        <p>
          Jazari One is a technology service provider. Wallet, custody, and
          payment services are delivered by licensed and regulated third-party
          providers. Jazari does not hold customer funds or provide regulated
          financial services directly.
        </p>
        <div className="footer-bottom">
          <span>JAZARI FINTECH SERVICES — FZCO · Dubai, UAE</span>
          <span>© 2026 Jazari One. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
