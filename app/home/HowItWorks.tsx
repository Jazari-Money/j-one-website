"use client";

import { KeyboardEvent, useRef, useState } from "react";
import { currencies, howSteps, type CurrencyCode } from "./data";
import { resetPointer, trackPointer } from "./hooks";
import { Phone } from "./Phone";

export function HowItWorks({
  amount,
  currency,
  converted,
  onAmount,
  onCurrency,
}: {
  amount: string;
  currency: CurrencyCode;
  converted: number;
  onAmount: (value: string) => void;
  onCurrency: (value: CurrencyCode) => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function moveStep(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % howSteps.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + howSteps.length) % howSteps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = howSteps.length - 1;
    else return;
    event.preventDefault();
    setActiveStep(next);
    tabRefs.current[next]?.focus();
  }

  const step = howSteps[activeStep];
  const rateLabel = currencies[currency].rate.toLocaleString(undefined, {
    minimumFractionDigits: Number.isInteger(currencies[currency].rate) ? 0 : 2,
    maximumFractionDigits: 2,
  });

  return (
    <section className="how section" id="how">
      <header className="chapter-heading">
        <h2>How it works</h2>
        <p>Three steps show the screen and information you use at each point.</p>
      </header>

      <div className="how-experience">
        <div className="step-tabs" role="tablist" aria-label="Jazari transfer steps">
          {howSteps.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              id={`step-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={activeStep === index}
              aria-controls="step-screen"
              tabIndex={activeStep === index ? 0 : -1}
              className={activeStep === index ? "is-active" : ""}
              onClick={() => setActiveStep(index)}
              onKeyDown={(event) => moveStep(event, index)}
            >
              <span>{item.title}</span>
              <small>{item.copy}</small>
            </button>
          ))}
        </div>

        <div
          className="step-screen"
          id="step-screen"
          role="tabpanel"
          aria-labelledby={`step-tab-${step.id}`}
        >
          <Phone
            key={step.id}
            src={step.screen}
            alt={step.alt}
            className="active-step-phone"
          />
        </div>
      </div>

      <div className="review-block" id="rates">
        <div className="review-copy">
          <h3>Know what arrives before you send</h3>
          <p>Everything is on screen before you confirm. Nothing hidden in the rate.</p>
          <div className="review-metrics">
            <div className="review-fee" aria-label="Hidden foreign exchange rate fee: zero percent">
              <strong className="numeric">0%</strong>
              <b>Hidden FX rate fee</b>
            </div>
            <div className="review-fee" aria-label="Transaction fee: zero percent">
              <strong className="numeric">0%</strong>
              <b>Transaction fee</b>
            </div>
          </div>
        </div>

        <div
          className="rate-card pointer-card"
          onPointerMove={trackPointer}
          onPointerLeave={resetPointer}
        >
          <label htmlFor="send-amount">You send</label>
          <div className="money-input">
            <input
              className="numeric"
              id="send-amount"
              inputMode="decimal"
              value={amount}
              onChange={(event) => onAmount(event.target.value)}
              aria-label="Amount in US dollars"
            />
            <span className="numeric">USD</span>
          </div>

          <output
            className="prominent-rate"
            htmlFor="send-amount receive-currency"
            aria-live="polite"
          >
            <span className="rate-side">
              <b className="numeric">1</b>
              <small className="numeric">USD</small>
            </span>
            <span className="rate-equals" aria-hidden="true">=</span>
            <span className="rate-side is-result">
              <b className="numeric">{rateLabel}</b>
              <small className="numeric">{currency}</small>
            </span>
          </output>

          <label htmlFor="receive-currency">Recipient receives</label>
          <div className="money-input result">
            <strong className="numeric" aria-live="polite">
              {currencies[currency].symbol}
              {converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </strong>
            <select
              className="currency-select numeric"
              id="receive-currency"
              value={currency}
              onChange={(event) => onCurrency(event.target.value as CurrencyCode)}
              aria-label="Recipient currency"
            >
              {Object.entries(currencies).map(([code, item]) => (
                <option value={code} key={code} aria-label={`${code}, ${item.name}`}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          <div className="rate-details">
            <span>Expected delivery</span>
            <strong className="numeric">2–5 minutes</strong>
          </div>
          <p className="rate-disclaimer">
            Live rate from our payment partner. Final rates, fees, delivery times,
            eligibility, and route availability are confirmed in the app before you send.
          </p>
        </div>
      </div>
    </section>
  );
}
