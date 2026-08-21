"use client";

/* eslint-disable @next/next/no-img-element -- local flags are art-directed assets */

import Link from "next/link";
import {
  type CSSProperties,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  currencies,
  howScenarios,
  queuedReceivingCountries,
  receivingCountries,
  type CurrencyCode,
  type HowScenario,
} from "./data";
import { resetPointer, trackPointer } from "./hooks";
import { Phone } from "./Phone";

const scenarioKeys = Object.keys(howScenarios) as HowScenario[];
const exchangeRatesUrl = "https://api.jazari.xyz/public/exchange_rates";
const exchangeRateTimeout = 2_000;
const fallbackRefreshDelay = 30_000;

export function HowItWorks() {
  const [amount, setAmount] = useState("1,000.00");
  const [currency, setCurrency] = useState<CurrencyCode>("MXN");
  const [exchangeRates, setExchangeRates] = useState<{
    rates: Partial<Record<CurrencyCode, number>>;
    live: boolean;
  }>();
  const [activeScenario, setActiveScenario] = useState<HowScenario>("receive");
  const [activeStep, setActiveStep] = useState(0);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scenarioRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const currencyPicker = useRef<HTMLDivElement | null>(null);
  const countriesDialog = useRef<HTMLDialogElement | null>(null);
  const scenario = howScenarios[activeScenario];
  const step = scenario.steps[activeStep];
  const selectedCurrency = currencies[currency];
  const apiRate = exchangeRates?.rates[currency];
  const rate = apiRate ?? (exchangeRates ? selectedCurrency.rate : undefined);
  const rateStatus = rate === undefined
    ? "Checking"
    : exchangeRates?.live && apiRate !== undefined ? "Live" : "Estimate";
  const converted = useMemo(() => {
    const number = Number.parseFloat(amount.replace(/,/g, ""));
    return rate === undefined ? undefined : Number.isFinite(number) ? number * rate : 0;
  }, [amount, rate]);

  useEffect(() => {
    const controller = new AbortController();
    let timeout: number | undefined;

    async function refreshRate() {
      let delay = fallbackRefreshDelay;
      setExchangeRates((current) => current ? { ...current, live: false } : current);

      try {
        const response = await fetch(exchangeRatesUrl, {
          signal: AbortSignal.any([
            controller.signal,
            AbortSignal.timeout(exchangeRateTimeout),
          ]),
        });
        if (!response.ok) throw new Error(`Exchange rate request failed: ${response.status}`);

        const payload = await response.json() as unknown;
        if (!Array.isArray(payload)) throw new Error("Invalid exchange rate response");

        const rates: Partial<Record<CurrencyCode, number>> = {};
        for (const item of payload) {
          if (typeof item !== "object" || item === null) {
            throw new Error("Invalid exchange rate response");
          }

          const { from, to, rate } = item as Record<string, unknown>;
          if (
            from !== "USDC"
            || typeof to !== "string"
            || typeof rate !== "number"
            || !Number.isFinite(rate)
            || rate <= 0
          ) {
            throw new Error("Invalid exchange rate response");
          }

          if (Object.hasOwn(currencies, to)) rates[to as CurrencyCode] = rate;
        }
        if (Object.keys(rates).length === 0) throw new Error("Invalid exchange rate response");

        setExchangeRates({ rates, live: true });
        const maxAge = response.headers
          .get("cache-control")
          ?.match(/(?:^|,)\s*max-age="?(\d+)"?/i)?.[1];
        delay = Math.min(
          Math.max(Number(maxAge ?? fallbackRefreshDelay / 1_000), 1) * 1_000,
          fallbackRefreshDelay,
        );
      } catch {
        if (controller.signal.aborted) return;
        setExchangeRates({ rates: {}, live: false });
      }

      timeout = window.setTimeout(refreshRate, delay);
    }

    void refreshRate();
    return () => {
      controller.abort();
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const closeCurrencyPicker = (event: MouseEvent) => {
      if (!currencyPicker.current?.contains(event.target as Node)) setCurrencyOpen(false);
    };
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setCurrencyOpen(false);
    };
    document.addEventListener("pointerdown", closeCurrencyPicker);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeCurrencyPicker);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    const syncScenarioFromHash = () => {
      const key = window.location.hash.replace("#how-", "") as HowScenario;
      if (!scenarioKeys.includes(key)) return;
      setActiveScenario(key);
      setActiveStep(0);
    };

    syncScenarioFromHash();
    window.addEventListener("hashchange", syncScenarioFromHash);
    return () => window.removeEventListener("hashchange", syncScenarioFromHash);
  }, []);

  useEffect(() => {
    const openCountries = () => {
      setCountriesOpen(true);
    };
    window.addEventListener("jazari:open-countries", openCountries);
    return () => window.removeEventListener("jazari:open-countries", openCountries);
  }, []);

  useEffect(() => {
    const dialog = countriesDialog.current;
    if (countriesOpen && dialog && !dialog.open) dialog.showModal();
  }, [countriesOpen]);

  function selectScenario(next: HowScenario) {
    setActiveScenario(next);
    setActiveStep(0);
    window.history.replaceState(null, "", `#how-${next}`);
  }

  function moveScenario(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % scenarioKeys.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + scenarioKeys.length) % scenarioKeys.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = scenarioKeys.length - 1;
    else return;
    event.preventDefault();
    selectScenario(scenarioKeys[next]);
    scenarioRefs.current[next]?.focus();
  }

  function moveStep(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % scenario.steps.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + scenario.steps.length) % scenario.steps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = scenario.steps.length - 1;
    else return;
    event.preventDefault();
    setActiveStep(next);
    tabRefs.current[next]?.focus();
  }

  const rateLabel = rate?.toLocaleString(undefined, {
    minimumFractionDigits: Number.isInteger(rate) ? 0 : 2,
    maximumFractionDigits: 2,
  }) ?? "—";

  return (
    <section className="how section" id="how">
      {scenarioKeys.map((key) => (
        <span className="how-anchor" id={`how-${key}`} key={key} />
      ))}
      <header className="chapter-heading">
        <h2>How it works</h2>
      </header>

      <div
        className="how-scenario-tabs"
        role="tablist"
        aria-label="Jazari actions"
        style={{ "--scenario-index": scenarioKeys.indexOf(activeScenario) } as CSSProperties}
      >
        {scenarioKeys.map((key, index) => (
          <button
            key={key}
            ref={(node) => { scenarioRefs.current[index] = node; }}
            type="button"
            role="tab"
            aria-selected={activeScenario === key}
            tabIndex={activeScenario === key ? 0 : -1}
            className={activeScenario === key ? "is-active" : ""}
            onClick={() => selectScenario(key)}
            onKeyDown={(event) => moveScenario(event, index)}
          >
            {howScenarios[key].label}
          </button>
        ))}
      </div>

      <div className="how-experience" key={activeScenario}>
        <div className="step-copy-column">
          <div className="step-tabs" role="tablist" aria-label={`${scenario.label} steps`}>
            {scenario.steps.map((item, index) => (
              <div className={`step-tab-item ${activeStep === index ? "is-active" : ""}`} key={item.id}>
                <button
                  ref={(node) => { tabRefs.current[index] = node; }}
                  id={`step-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === index}
                  aria-controls="step-screen"
                  tabIndex={activeStep === index ? 0 : -1}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(event) => moveStep(event, index)}
                >
                  <span className="step-title-line">
                    <span>{item.title}</span>
                  </span>
                  <small>{item.copy}</small>
                </button>
              </div>
            ))}
          </div>
          {activeScenario === "yields" && (
            <Link className="how-learn-more neutral-control" href="/yields/">
              Learn more about Yields
            </Link>
          )}
        </div>

        <div
          className="step-screen"
          id="step-screen"
          role="tabpanel"
          aria-labelledby={`step-tab-${step.id}`}
        >
          <div className="step-screen-stack">
            <Phone
              key={step.id}
              src={step.screen}
              stem={step.screenStem}
              alt={step.alt}
              className="active-step-phone is-active"
            />
          </div>
        </div>
      </div>

      <div className="review-block" id="rates">
        <div className="review-copy">
          <h3>Calculate your rate</h3>
          <p>Preview the amount at the current rate before you confirm.</p>
          <div className="review-metrics">
            <div className="review-fee" aria-label="Transaction fee: zero percent">
              <strong>0%</strong>
              <b>Transaction fee</b>
            </div>
            <div className="review-fee is-timing" aria-label="Delivery time: two to five minutes">
              <strong>2–5 min.</strong>
              <b>Delivery time</b>
            </div>
          </div>
        </div>

        <div
          className="rate-card pointer-card"
          onPointerMove={trackPointer}
          onPointerLeave={resetPointer}
        >
          <span
            className={`rate-freshness ${rateStatus === "Live" ? "is-live" : ""}`}
            role="status"
          >
            <span aria-hidden="true">●</span>
            {rateStatus}
          </span>
          <label htmlFor="send-amount">You send</label>
          <div className="money-input">
            <input
              className="numeric"
              id="send-amount"
              inputMode="decimal"
              value={`$${amount}`}
              onChange={(event) => setAmount(event.target.value.replace(/^\$/, ""))}
              aria-label="Amount in US dollars"
            />
          </div>

          <output
            className="prominent-rate"
            htmlFor="send-amount receive-currency"
            aria-live="polite"
          >
            <span className="rate-side">
              <b className="numeric">$1</b>
            </span>
            <span className="rate-equals" aria-hidden="true">=</span>
            <span className="rate-side is-result">
              <b className="numeric">{rateLabel}</b>
              <small className="numeric">{currency}</small>
            </span>
          </output>

          <label id="receive-currency-label">Estimated recipient amount</label>
          <div className="money-input result">
            <strong className="numeric" aria-live="polite">
              {converted === undefined
                ? "Loading…"
                : `~${selectedCurrency.symbol}${converted.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
            </strong>
            <div className="currency-picker" ref={currencyPicker}>
              <button
                className="currency-trigger neutral-control"
                id="receive-currency"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={currencyOpen}
                aria-labelledby="receive-currency-label"
                onClick={() => setCurrencyOpen((open) => !open)}
              >
                <img
                  src={selectedCurrency.flag}
                  alt=""
                  width="80"
                  height="80"
                  loading="lazy"
                  decoding="async"
                />
                <span className="numeric">{currency}</span>
                <svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" /></svg>
              </button>
              {currencyOpen && (
                <div className="currency-menu" role="listbox" aria-label="Recipient currency">
                  {(Object.entries(currencies) as Array<[CurrencyCode, (typeof currencies)[CurrencyCode]]>).map(([code, item]) => (
                    <button
                      key={code}
                      type="button"
                      role="option"
                      aria-selected={currency === code}
                      className="currency-option"
                      onClick={() => {
                        setCurrency(code);
                        setCurrencyOpen(false);
                      }}
                    >
                      <img
                        src={item.flag}
                        alt=""
                        width="80"
                        height="80"
                        loading="lazy"
                        decoding="async"
                      />
                      <span>{item.country}</span>
                      <b className="numeric">{code}</b>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            className="receive-countries-link"
            type="button"
            onClick={() => setCountriesOpen(true)}
          >
            All receiving countries
          </button>
          <p className="rate-disclaimer">
            Live rate from our payment partner. Final rates, fees, delivery times,
            eligibility, and route availability are confirmed in the app before you send.
          </p>
        </div>
      </div>

      <dialog
        id="receiving-countries"
        className="receive-countries-dialog"
        ref={countriesDialog}
        onClose={() => setCountriesOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="receive-countries-modal">
          <header>
            <div>
              <h3>Receiving countries</h3>
              <p>{receivingCountries.length} destinations today. More countries coming soon.</p>
            </div>
            <button
              className="realism-icon-button"
              type="button"
              aria-label="Close receiving countries"
              onClick={() => countriesDialog.current?.close()}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </header>
          <section className="receiving-country-group" aria-label="Current receiving countries">
            <ul>
              {receivingCountries.map((country) => (
                <li key={country.name}>
                  <img
                    src={countriesOpen ? country.flag : undefined}
                    alt=""
                    width="80"
                    height="80"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{country.name}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="receiving-country-queue" aria-labelledby="receiving-country-queue-title">
            <header>
              <div>
                <h4 id="receiving-country-queue-title">Coming soon</h4>
              </div>
            </header>
            <ul>
              {queuedReceivingCountries.map((country) => (
                <li key={country.name}>
                  <img
                    src={countriesOpen ? country.flag : undefined}
                    alt=""
                    width="80"
                    height="80"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{country.name}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </dialog>
    </section>
  );
}
