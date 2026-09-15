"use client";

/* eslint-disable @next/next/no-img-element -- small art-directed benefit icons, shared with JourneyCards */

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import "../styles/referral-page.css";
import { resetPointer, trackPointer } from "../home/hooks";
import { ResponsiveImage } from "../home/ResponsiveImage";
import { SiteFooter } from "../home/SiteFooter";
import { SiteHeader } from "../home/SiteHeader";
import {
  appDownloadUrl,
  referralApiUrl,
  referralRecaptchaAction,
  referralRecaptchaSiteKey,
  withBasePath,
} from "../site-paths";
import { dialCountries, findDialCountry, flagEmoji } from "./countries";

// Same three pillars and copy as the homepage's Receive/Earn/Send cards
// (app/home/JourneyCards.tsx) — reused verbatim rather than rewritten.
const benefits = [
  {
    id: "receive",
    title: "Receive",
    copy: "Add your own dollars or receive payments through a USD account or in stablecoins—all in one balance.",
    image: "/images/features/new/dollar-balance.webp",
    alt: "Dollar symbol",
  },
  {
    id: "earn",
    title: "Earn",
    copy: "Choose how much to put into Yields, earn a variable rate, and return funds to your balance whenever you need them.",
    image: "/images/journeys/yields-wheat.png",
    alt: "Wheat containing coins",
  },
  {
    id: "send",
    title: "Send",
    copy: "Send to bank accounts in 30+ countries with the rate shown before you confirm. Or send stablecoins to supported wallets worldwide.",
    image: "/images/journeys/send-globe.png",
    alt: "Earth",
  },
] as const;

declare global {
  interface Window {
    grecaptcha?: {
      enterprise: {
        ready(callback: () => void): void;
        execute(siteKey: string, options: { action: string }): Promise<string>;
      };
    };
  }
}

const recaptchaScriptSrc = `https://www.google.com/recaptcha/enterprise.js?render=${referralRecaptchaSiteKey}`;

function loadRecaptcha(): Promise<void> {
  if (window.grecaptcha?.enterprise) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${recaptchaScriptSrc}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load reCAPTCHA")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = recaptchaScriptSrc;
    script.async = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Failed to load reCAPTCHA")),
      { once: true },
    );
    document.head.appendChild(script);
  });
}

async function getRecaptchaToken(): Promise<string> {
  await loadRecaptcha();
  return new Promise((resolve, reject) => {
    window.grecaptcha?.enterprise.ready(() => {
      window.grecaptcha?.enterprise
        .execute(referralRecaptchaSiteKey, { action: referralRecaptchaAction })
        .then(resolve, reject);
    });
  });
}

type Status = "idle" | "submitting" | "success" | "error";

export function ReferralPage() {
  const [referralCode] = useState(() =>
    typeof window === "undefined"
      ? ""
      : new URLSearchParams(window.location.search).get("code") ?? "",
  );
  const [countryIso2, setCountryIso2] = useState("US");
  const [phoneInput, setPhoneInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const country = useMemo(() => findDialCountry(countryIso2), [countryIso2]);
  const digits = phoneInput.replace(/\D/g, "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    if (digits.length < 6) {
      setStatus("error");
      setErrorMessage("Enter a valid phone number.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const token = await getRecaptchaToken();

      const response = await fetch(referralApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: `+${country.dial}${digits}`,
          referral_code: referralCode,
          recaptcha_token: token,
        }),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Check your number and try again.");
    }
  }

  if (status === "success") {
    return (
      <main>
        <SiteHeader mode="minimal" />
        <section className="referral-success" aria-labelledby="referral-success-title">
          <h1 id="referral-success-title">You&apos;re in.</h1>
          <p>Download Jazari One to finish setting up your account.</p>
          <a
            className="realism-button referral-download-button"
            href={appDownloadUrl}
            target="_blank"
            rel="noreferrer"
          >
            Download App
          </a>
        </section>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main>
      <SiteHeader mode="minimal" />

      <section className="referral-hero" aria-labelledby="referral-title">
        <div className="referral-card-stage">
          <ResponsiveImage
            className="referral-card-image"
            alt="Jazari One balance and recent transactions"
            fallback="/images/screens/j-one-app-main.png"
            stem="/images/screens/j-one-app-main"
            widths={[360, 720, 1080]}
            width={1263}
            height={2580}
            sizes="(max-width: 620px) 60vw, 300px"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="referral-copy">
          <h1 id="referral-title">
            You&apos;re invited to <em>Jazari One</em>
          </h1>
          <p>
            Accept your invite, then invite friends and earn rewards together.
          </p>

          <form className="referral-form" onSubmit={handleSubmit} aria-label="Accept your invite">
            <label htmlFor="referral-phone" className="referral-label">
              Enter your phone number
            </label>
            <div className="referral-input-row">
              <div className="referral-phone-group">
                <div className="referral-country-select">
                  <span className="referral-country-flag" aria-hidden="true">
                    {flagEmoji(country.iso2)}
                  </span>
                  <span className="referral-country-dial" aria-hidden="true">
                    +{country.dial}
                  </span>
                  <select
                    aria-label="Phone number country code"
                    value={countryIso2}
                    onChange={(event) => setCountryIso2(event.target.value)}
                  >
                    {dialCountries.map((option) => (
                      <option key={option.iso2} value={option.iso2}>
                        {option.name} (+{option.dial})
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  id="referral-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="555 123 4567"
                  value={phoneInput}
                  onChange={(event) => setPhoneInput(event.target.value)}
                />
              </div>

              <button type="submit" className="realism-button referral-submit">
                {status === "submitting" ? "Checking…" : "Accept Invite"}
              </button>
            </div>

            <p className="referral-error" role="alert">
              {status === "error" ? errorMessage : ""}
            </p>
          </form>

          <p className="referral-footnote">
            By continuing, you agree to Jazari One&apos;s{" "}
            <Link href="/terms">Terms &amp; Conditions</Link> and{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>. Message and data rates may
            apply.
          </p>
        </div>
      </section>

      <section className="referral-benefits" aria-label="What you get with Jazari One">
        {benefits.map((benefit) => (
          <div
            className="referral-benefit pointer-card"
            key={benefit.id}
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
            <img
              className="referral-benefit-icon"
              src={withBasePath(benefit.image)}
              alt={benefit.alt}
              width="64"
              height="64"
              loading="lazy"
              decoding="async"
            />
            <h2>{benefit.title}</h2>
            <p>{benefit.copy}</p>
          </div>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
