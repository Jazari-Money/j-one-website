"use client";

/* eslint-disable @next/next/no-img-element -- local flags are art-directed assets */

import { useEffect, useMemo, useState } from "react";
import { withBasePath } from "../site-paths";
import { resetPointer, trackPointer } from "../home/hooks";
import { LatamText } from "./LatamLang";

// The homepage RatesCalculator, fixed to one currency. No stale fallback number: if the live rate
// can't load, the card points to the app instead of showing an old rate.
const exchangeRatesUrl = "https://api.jazari.xyz/public/api/v1/exchange_rates";
const refreshDelay = 30_000;

export function LatamRates({ currency, flag }: { currency: "MXN" | "COP"; flag: string }) {
  const [amount, setAmount] = useState("100.00");
  const [rate, setRate] = useState<number | null | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    let timeout: number | undefined;
    async function refresh() {
      try {
        const response = await fetch(exchangeRatesUrl, { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(2_000)]) });
        if (!response.ok) throw new Error(String(response.status));
        const payload = await response.json() as unknown;
        const item = Array.isArray(payload) ? payload.find((x: { from?: unknown; to?: unknown }) => x?.from === "USDC" && x?.to === currency) as { rate?: unknown } | undefined : undefined;
        if (typeof item?.rate !== "number" || !Number.isFinite(item.rate) || item.rate <= 0) throw new Error("no rate");
        setRate(item.rate);
      } catch {
        if (controller.signal.aborted) return;
        setRate((current) => current ?? null);
      }
      timeout = window.setTimeout(refresh, refreshDelay);
    }
    void refresh();
    return () => { controller.abort(); if (timeout !== undefined) window.clearTimeout(timeout); };
  }, [currency]);

  const converted = useMemo(() => {
    const number = Number.parseFloat(amount.replace(/,/g, ""));
    return rate ? (Number.isFinite(number) ? number * rate : 0) : undefined;
  }, [amount, rate]);
  const fmt = (n: number, digits: number) => n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

  return <div className="rate-card pointer-card latam-rate-card" onPointerMove={trackPointer} onPointerLeave={resetPointer}>
    <span className={`rate-freshness ${rate ? "is-live" : ""}`} role="status">
      <span aria-hidden="true">●</span>
      {rate ? <LatamText es="En vivo" en="Live" /> : rate === null ? <LatamText es="En la app" en="In the app" /> : <LatamText es="Cargando" en="Loading" />}
    </span>
    <label htmlFor="latam-send-amount"><LatamText es="Envías" en="You send" /></label>
    <div className="money-input">
      <input className="numeric" id="latam-send-amount" inputMode="decimal" value={`$${amount}`} onChange={(event) => setAmount(event.target.value.replace(/^\$/, ""))} aria-label="USD" />
      <span className="numeric latam-ccy">USD</span>
    </div>
    <output className="prominent-rate" htmlFor="latam-send-amount" aria-live="polite">
      <span className="rate-side"><b className="numeric">$1</b></span>
      <span className="rate-equals" aria-hidden="true">=</span>
      <span className="rate-side is-result"><b className="numeric">{rate ? fmt(rate, 2) : "—"}</b><small className="numeric">{currency}</small></span>
    </output>
    <label id="latam-receive-label"><LatamText es="Tu familia recibe (estimado)" en="Your family gets (estimate)" /></label>
    <div className="money-input result">
      <strong className="numeric" aria-live="polite">{converted === undefined ? (rate === null ? <LatamText es="Ve el tipo de cambio en la app" en="See the rate in the app" /> : "…") : `~$${fmt(converted, 2)}`}</strong>
      <span className="latam-ccy-chip"><img src={withBasePath(flag)} alt="" width="80" height="80" /><span className="numeric">{currency}</span></span>
    </div>
    <p className="rate-disclaimer"><LatamText
      es="Tipo de cambio en vivo de nuestro socio de pagos, con todas las comisiones incluidas. El tipo de cambio final y el tiempo de entrega se confirman en la app antes de enviar."
      en="Live rate from our payment partner, with every fee included. The final rate and delivery time are confirmed in the app before you send." /></p>
  </div>;
}
