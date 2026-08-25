"use client";

/* eslint-disable @next/next/no-img-element -- local flags are art-directed assets */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  currencies,
  queuedReceivingCountries,
  receivingCountries,
  type CurrencyCode,
} from "./data";
import { resetPointer, trackPointer } from "./hooks";

const exchangeRatesUrl = "https://api.jazari.xyz/public/exchange_rates";
const exchangeRateTimeout = 2_000;
const fallbackRefreshDelay = 30_000;

export function RatesCalculator() {
  const [amount, setAmount] = useState("1,000.00");
  const [currency, setCurrency] = useState<CurrencyCode>("MXN");
  const [exchangeRates, setExchangeRates] = useState<{
    rates: Partial<Record<CurrencyCode, number>>;
    live: boolean;
  }>();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const currencyPicker = useRef<HTMLDivElement | null>(null);
  const countriesDialog = useRef<HTMLDialogElement | null>(null);
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
          if (typeof item !== "object" || item === null) throw new Error("Invalid exchange rate response");
          const { from, to, rate: itemRate } = item as Record<string, unknown>;
          if (
            from !== "USDC"
            || typeof to !== "string"
            || typeof itemRate !== "number"
            || !Number.isFinite(itemRate)
            || itemRate <= 0
          ) throw new Error("Invalid exchange rate response");
          if (Object.hasOwn(currencies, to)) rates[to as CurrencyCode] = itemRate;
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
    const dialog = countriesDialog.current;
    if (countriesOpen && dialog && !dialog.open) dialog.showModal();
  }, [countriesOpen]);

  const rateLabel = rate?.toLocaleString(undefined, {
    minimumFractionDigits: Number.isInteger(rate) ? 0 : 2,
    maximumFractionDigits: 2,
  }) ?? "—";

  return (
    <section className="rates-section section" id="rates" aria-labelledby="rates-title">
      <div className="review-block">
        <div className="review-copy">
          <h2 id="rates-title">Know what arrives before you send</h2>
          <p>Preview the current rate and estimated recipient amount before you confirm in the app.</p>
          <div className="review-metrics">
            <div className="review-fee" aria-label="Transaction fee: zero percent">
              <strong>0%</strong>
              <b>Transaction fee</b>
            </div>
            <div className="review-fee is-timing" aria-label="Delivery time: two to five minutes">
              <strong>2–5 min.</strong>
              <b>Typical delivery time</b>
            </div>
          </div>
        </div>

        <div className="rate-card pointer-card" onPointerMove={trackPointer} onPointerLeave={resetPointer}>
          <span className={`rate-freshness ${rateStatus === "Live" ? "is-live" : ""}`} role="status">
            <span aria-hidden="true">●</span>{rateStatus}
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

          <output className="prominent-rate" htmlFor="send-amount receive-currency" aria-live="polite">
            <span className="rate-side"><b className="numeric">$1</b></span>
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
                <img src={selectedCurrency.flag} alt="" width="80" height="80" loading="lazy" decoding="async" />
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
                      onClick={() => { setCurrency(code); setCurrencyOpen(false); }}
                    >
                      <img src={item.flag} alt="" width="80" height="80" loading="lazy" decoding="async" />
                      <span>{item.country}</span>
                      <b className="numeric">{code}</b>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="receive-countries-link" type="button" onClick={() => setCountriesOpen(true)}>
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
        onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
      >
        <div className="receive-countries-modal">
          <header>
            <div>
              <h3>Receiving countries</h3>
              <p>{receivingCountries.length} destinations today. More countries coming soon.</p>
            </div>
            <button className="realism-icon-button" type="button" aria-label="Close receiving countries" onClick={() => countriesDialog.current?.close()}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </header>
          <section className="receiving-country-group" aria-label="Current receiving countries">
            <ul>
              {receivingCountries.map((country) => (
                <li key={country.name}>
                  <img src={countriesOpen ? country.flag : undefined} alt="" width="80" height="80" loading="lazy" decoding="async" />
                  <span>{country.name}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="receiving-country-queue" aria-labelledby="receiving-country-queue-title">
            <header><h4 id="receiving-country-queue-title">Coming soon</h4></header>
            <ul>
              {queuedReceivingCountries.map((country) => (
                <li key={country.name}>
                  <img src={countriesOpen ? country.flag : undefined} alt="" width="80" height="80" loading="lazy" decoding="async" />
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
