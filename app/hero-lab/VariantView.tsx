"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../home/hooks";
import { LabControls } from "./LabControls";
import { getVariant, labVariants } from "./lab-data";
import { variantComponents } from "./variants";
import { useLabSettings } from "./useLabSettings";

export function VariantView({
  id,
  basePath = "/hero-lab",
}: {
  id: string;
  basePath?: string;
}) {
  const router = useRouter();
  const meta = getVariant(id);
  const [settings, updateSettings] = useLabSettings();
  const [paused, setPaused] = useState(false);
  const [replayToken, setReplayToken] = useState(0);
  const systemReduced = useReducedMotion();
  const reduced = systemReduced || settings.motion === "reduced";

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      const index = labVariants.findIndex((variant) => variant.id === id);
      if (event.key === "ArrowRight") {
        router.push(`${basePath}/${labVariants[(index + 1) % labVariants.length].id}/`);
      } else if (event.key === "ArrowLeft") {
        router.push(
          `${basePath}/${labVariants[(index + labVariants.length - 1) % labVariants.length].id}/`,
        );
      } else if (event.key === "r" || event.key === "R") {
        setReplayToken((token) => token + 1);
        setPaused(false);
      } else if (event.key === " ") {
        event.preventDefault();
        setPaused((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [basePath, id, router]);

  if (!meta) return null;
  const Variant = variantComponents[meta.id];

  return (
    <div className="hlab-view">
      <LabControls
        meta={meta}
        settings={settings}
        onSettings={updateSettings}
        paused={paused}
        onTogglePause={() => setPaused((value) => !value)}
        onReplay={() => {
          setReplayToken((token) => token + 1);
          setPaused(false);
        }}
        basePath={basePath}
      />
      <div className={`hlab-stage is-${settings.preview} ${paused ? "is-paused" : ""} ${reduced ? "is-reduced" : ""}`}>
        <div className={`hlab-frame ${reduced ? "is-reduced" : ""}`}>
          <Variant
            key={replayToken}
            intensity={settings.intensity}
            paused={paused}
            reduced={reduced}
            cursor={settings.cursor}
          />
        </div>
      </div>
    </div>
  );
}
