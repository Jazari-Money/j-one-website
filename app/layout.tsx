import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource-variable/inter";
import { CookieConsentProvider } from "./cookie-consent/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jazari.xyz"),
  title: "Jazari One — Get paid. Earn. Send worldwide.",
  description:
    "Receive money by bank transfer or digital dollars, earn with Yields, and send across borders in minutes.",
  openGraph: {
    title: "Jazari One — Get paid. Earn. Send worldwide.",
    description:
      "Receive money by bank transfer or digital dollars, earn with Yields, and send across borders in minutes.",
    images: [{ url: "/og-v2.png", width: 1729, height: 910 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jazari One — Get paid. Earn. Send worldwide.",
    description:
      "Receive money by bank transfer or digital dollars, earn with Yields, and send across borders in minutes.",
    images: ["/og-v2.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="jazari" data-shader="beam">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(Array.from(arguments))};window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});",
          }}
        />
      </head>
      <body>
        <CookieConsentProvider>{children}</CookieConsentProvider>
      </body>
    </html>
  );
}
