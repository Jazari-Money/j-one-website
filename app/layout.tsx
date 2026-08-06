import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jazari.xyz"),
  title: "Jazari One — Use digital dollars. Anywhere.",
  description:
    "Hold digital dollars, send them in local currency to 30+ countries, and access variable yield with Jazari One.",
  openGraph: {
    title: "Jazari One — Use digital dollars. Anywhere.",
    description:
      "Hold digital dollars, send them in local currency to 30+ countries, and access variable yield with Jazari One.",
    images: [{ url: "/og-v2.png", width: 1729, height: 910 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jazari One — Use digital dollars. Anywhere.",
    description:
      "Hold digital dollars, send them in local currency to 30+ countries, and access variable yield with Jazari One.",
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
      <body>{children}</body>
    </html>
  );
}
