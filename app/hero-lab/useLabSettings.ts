"use client";

import { useEffect, useState } from "react";

export type LabSettings = {
  intensity: number;
  cursor: boolean;
  motion: "full" | "reduced";
  preview: "desktop" | "mobile";
};

export const defaultLabSettings: LabSettings = {
  intensity: 1,
  cursor: true,
  motion: "full",
  preview: "desktop",
};

const STORAGE_KEY = "jazari-hero-lab-settings";

/** Lab controls persist across variants and reloads via localStorage. */
export function useLabSettings() {
  const [settings, setSettings] = useState<LabSettings>(defaultLabSettings);

  useEffect(() => {
    let timer = 0;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<LabSettings>;
      timer = window.setTimeout(() => {
        setSettings((current) => ({
          ...current,
          ...parsed,
          intensity:
            typeof parsed.intensity === "number"
              ? Math.min(1.5, Math.max(0.4, parsed.intensity))
              : current.intensity,
        }));
      }, 0);
    } catch {
      // Ignore unreadable stored settings.
    }
    return () => window.clearTimeout(timer);
  }, []);

  const update = (patch: Partial<LabSettings>) => {
    setSettings((current) => {
      const next = { ...current, ...patch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage may be unavailable; controls still work for the session.
      }
      return next;
    });
  };

  return [settings, update] as const;
}
