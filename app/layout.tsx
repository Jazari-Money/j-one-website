import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
