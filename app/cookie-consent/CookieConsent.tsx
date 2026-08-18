"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { siteBasePath } from "../site-paths";

const CONSENT_COOKIE = "jazari_cookie_consent";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

type ConsentState = "loading" | "unknown" | "granted" | "denied";

type CookieConsentContextValue = {
  openPreferences: () => void;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function getStoredConsent(): Exclude<ConsentState, "loading"> {
  const rawCookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));

  if (!rawCookie) return "unknown";

  try {
    const value = JSON.parse(decodeURIComponent(rawCookie.slice(CONSENT_COOKIE.length + 1)));
    if (typeof value?.analytics !== "boolean") return "unknown";
    return value.analytics ? "granted" : "denied";
  } catch {
    return "unknown";
  }
}

function storeConsent(analytics: boolean) {
  const value = encodeURIComponent(
    JSON.stringify({
      analytics,
      updatedAt: new Date().toISOString().slice(0, 10),
    }),
  );
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const path = siteBasePath || "/";

  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=${path}; SameSite=Lax${secure}`;
}

function ensureGtag() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

function disableAnalytics() {
  ensureGtag();
  window.gtag?.("consent", "update", { analytics_storage: "denied" });

  if (measurementId) {
    window[`ga-disable-${measurementId}`] = true;
  }
}

function enableAnalytics() {
  if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return;

  ensureGtag();
  window[`ga-disable-${measurementId}`] = false;
  window.gtag?.("consent", "update", { analytics_storage: "granted" });

  if (document.querySelector(`script[data-jazari-ga="${measurementId}"]`)) return;

  window.gtag?.("js", new Date());
  window.gtag?.("config", measurementId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.dataset.jazariGa = measurementId;
  document.head.append(script);
}

function PreferencesDialog({
  analyticsEnabled,
  onClose,
  onSave,
}: {
  analyticsEnabled: boolean;
  onClose: () => void;
  onSave: (analytics: boolean) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draftAnalytics, setDraftAnalytics] = useState(analyticsEnabled);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="cookie-dialog"
      aria-labelledby="cookie-preferences-title"
      onClose={onClose}
    >
      <div className="cookie-dialog-card">
        <header className="cookie-dialog-header">
          <div>
            <p className="cookie-dialog-eyebrow">Privacy controls</p>
            <h2 id="cookie-preferences-title">Cookie Preferences</h2>
          </div>
          <button
            className="cookie-dialog-close"
            type="button"
            aria-label="Close Cookie Preferences"
            onClick={() => dialogRef.current?.close()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <p className="cookie-dialog-intro">
          Choose whether Jazari may use analytics cookies. Necessary storage keeps
          your preference and is always active.
        </p>

        <div className="cookie-preference-list">
          <section className="cookie-preference-row" aria-labelledby="necessary-cookie-title">
            <div>
              <h3 id="necessary-cookie-title">Necessary</h3>
              <p>Stores your cookie preference.</p>
            </div>
            <span className="cookie-always-active">Always active</span>
          </section>

          <section className="cookie-preference-row" aria-labelledby="analytics-cookie-title">
            <div>
              <h3 id="analytics-cookie-title">Analytics</h3>
              <p>Helps us understand website usage and improve Jazari.</p>
            </div>
            <label className="cookie-switch">
              <span className="sr-only">Allow analytics cookies</span>
              <input
                type="checkbox"
                checked={draftAnalytics}
                onChange={(event) => setDraftAnalytics(event.target.checked)}
              />
              <span aria-hidden="true" />
            </label>
          </section>
        </div>

        <div className="cookie-dialog-actions">
          <button
            className="cookie-action cookie-action-primary"
            type="button"
            onClick={() => {
              onSave(draftAnalytics);
              dialogRef.current?.close();
            }}
          >
            Save preferences
          </button>
        </div>
      </div>
    </dialog>
  );
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>("loading");
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const loadStoredConsent = window.setTimeout(() => {
      setConsent(getStoredConsent());
    }, 0);
    return () => window.clearTimeout(loadStoredConsent);
  }, []);

  useEffect(() => {
    if (consent === "granted") enableAnalytics();
    if (consent === "denied" || consent === "unknown") disableAnalytics();
  }, [consent]);

  const saveConsent = useCallback((analytics: boolean) => {
    storeConsent(analytics);
    setConsent(analytics ? "granted" : "denied");
  }, []);

  const contextValue = useMemo(
    () => ({ openPreferences: () => setPreferencesOpen(true) }),
    [],
  );

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}

      {consent === "unknown" && (
        <aside className="cookie-banner" aria-labelledby="cookie-banner-title">
          <div className="cookie-banner-copy">
            <h2 id="cookie-banner-title">Your privacy choices</h2>
            <p>We use cookies to understand how people use Jazari and improve the website.</p>
          </div>
          <div className="cookie-banner-actions">
            <button
              className="cookie-preferences-button"
              type="button"
              onClick={() => setPreferencesOpen(true)}
            >
              Cookie Preferences
            </button>
            <button
              className="cookie-action cookie-action-secondary"
              type="button"
              onClick={() => saveConsent(false)}
            >
              Reject
            </button>
            <button
              className="cookie-action cookie-action-primary"
              type="button"
              onClick={() => saveConsent(true)}
            >
              Accept all
            </button>
          </div>
        </aside>
      )}

      {preferencesOpen && (
        <PreferencesDialog
          analyticsEnabled={consent === "granted"}
          onClose={() => setPreferencesOpen(false)}
          onSave={saveConsent}
        />
      )}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return context;
}
