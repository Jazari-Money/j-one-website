import type { Metadata } from "next";
import "../styles/help-page.css";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";

export const metadata: Metadata = {
  title: "Help — Jazari One",
  description: "Contact the Jazari One team if you have a question or need help.",
};

export default function HelpPage() {
  return (
    <main className="help-shell">
      <InternalSiteHeader />

      <section className="help-hero" aria-labelledby="help-title">
        <h1 id="help-title">Help</h1>
        <div className="help-card">
          <h2>Have a question?</h2>
          <p>If you have any questions, please reach us. We&apos;ll be happy to help.</p>
          <a className="help-email neutral-control" href="mailto:hello@jazari.xyz">
            hello@jazari.xyz
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
