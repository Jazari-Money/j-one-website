import localFont from "next/font/local";

// This page is often a cold first visit (shared invite link, no prior
// navigation to warm the cache), so the site's normal @fontsource CSS
// import — font-display: swap with no preload — produces a visible
// fallback-to-serif "pop" right on the hero headline. next/font/local
// preloads this exact file and guarantees the preload URL matches the
// one actually requested, which a manually-added <link rel="preload">
// can't (Next content-hashes the real @font-face src at build time).
export const referralSerif = localFont({
  src: "./fonts/instrument-serif-400.woff2",
  variable: "--referral-serif-font",
  weight: "400",
  style: "normal",
  display: "swap",
});
