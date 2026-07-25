import type { Metadata } from "next";
import "@fontsource/instrument-serif/400.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jazari.xyz"),
  title: "Jazari One — Your dollars, wherever you are",
  description:
    "A global digital dollar account for getting paid, holding dollars, and sending money across borders in minutes.",
  openGraph: {
    title: "Jazari One — Your dollars, wherever you are",
    description:
      "A global digital dollar account for getting paid, holding dollars, and sending money across borders in minutes.",
    images: [{ url: "/og-v2.png", width: 1729, height: 910 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jazari One — Your dollars, wherever you are",
    description:
      "A global digital dollar account for getting paid, holding dollars, and sending money across borders in minutes.",
    images: ["/og-v2.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
