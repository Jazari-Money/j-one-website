"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { appDownloadUrl } from "../site-paths";
import { useCookieConsent } from "../cookie-consent/CookieConsent";

export function CountryDownloadLink({ country, placement, className, children, onClick }: {
  country?: "Kenya" | "Nigeria";
  placement: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { consent } = useCookieConsent();
  useEffect(() => {
    if (!country) return;
    const url = new URL(appDownloadUrl);
    const incoming = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const value = incoming.get(key);
      if (value) url.searchParams.set(key, value);
    }
    if (!url.searchParams.has("utm_content")) url.searchParams.set("utm_content", `${country.toLowerCase()}-${placement}`);
    if (linkRef.current) linkRef.current.href = url.toString();
  }, [country, placement]);

  return <a ref={linkRef} href={appDownloadUrl} className={className} target="_blank" rel="noreferrer" onClick={() => {
    if (country && consent === "granted") window.gtag?.("event", "app_download_click", { country, placement });
    onClick?.();
  }}>{children}</a>;
}
