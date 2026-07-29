"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { VariantProps } from "../types";

/**
 * Variants are code-split so only the open scene's WebGL/Canvas code loads.
 * Copy renders on the server; effect layers attach after hydration.
 */
export const variantComponents: Record<string, ComponentType<VariantProps>> = {
  "01": dynamic(() => import("./V01Caustics").then((m) => m.V01Caustics)),
  "02": dynamic(() => import("./V02Portal").then((m) => m.V02Portal)),
  "03": dynamic(() => import("./V03Rails").then((m) => m.V03Rails)),
  "04": dynamic(() => import("./V04Chamber").then((m) => m.V04Chamber)),
  "05": dynamic(() => import("./V05Dust").then((m) => m.V05Dust)),
  "06": dynamic(() => import("./V06Monolith").then((m) => m.V06Monolith)),
  "07": dynamic(() => import("./V07Membrane").then((m) => m.V07Membrane)),
  "08": dynamic(() => import("./V08Dither").then((m) => m.V08Dither)),
  "09": dynamic(() => import("./V09ColorEvent").then((m) => m.V09ColorEvent)),
  "10": dynamic(() => import("./V10QuietBlack").then((m) => m.V10QuietBlack)),
};
