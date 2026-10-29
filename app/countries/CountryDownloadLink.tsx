"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { appDownloadUrl } from "../site-paths";
import { useCookieConsent } from "../cookie-consent/CookieConsent";

export function CountryDownloadLink({ country, placement, className, children, onClick, downloadUrl = appDownloadUrl }: {
  country?: "Kenya" | "Nigeria" | "Mexico" | "Colombia";
  placement: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  downloadUrl?: string;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { consent } = useCookieConsent();
  useEffect(() => {
    if (!country) return;
    const url = new URL(downloadUrl);
    const incoming = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const value = incoming.get(key);
      if (value) url.searchParams.set(key, value);
    }
    if (!url.searchParams.has("utm_content")) url.searchParams.set("utm_content", `${country.toLowerCase()}-${placement}`);
    if (linkRef.current) linkRef.current.href = url.toString();
  }, [country, placement, downloadUrl]);

  return <a ref={linkRef} href={downloadUrl} className={className} target="_blank" rel="noreferrer" onClick={() => {
    if (country && consent === "granted") window.gtag?.("event", "app_download_click", { country, placement });
    onClick?.();
  }}>{children}</a>;
}
