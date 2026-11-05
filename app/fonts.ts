import localFont from "next/font/local";

// Headline faces, matching the US sender landings (/Pakistan/, /India/,
// /Mexico/). next/font/local preloads both files, so the headline does not
// pop from a fallback on a cold first visit. Latin subset only: anything
// outside it falls through to Inter.
export const momoDisplay = localFont({
  src: "./fonts/momo-trust-display-latin.woff2",
  variable: "--font-momo-display",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const momoSans = localFont({
  src: "./fonts/momo-trust-sans-latin.woff2",
  variable: "--font-momo-sans",
  weight: "200 800",
  style: "normal",
  display: "swap",
});
