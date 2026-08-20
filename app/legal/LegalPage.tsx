import type { ReactNode } from "react";
import "../styles/legal-page.css";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  title: string;
  introduction: ReactNode;
  sections: LegalSection[];
};

export function LegalPage({
  title,
  introduction,
  sections,
}: LegalPageProps) {
  return (
    <main className="legal-shell">
      <InternalSiteHeader />

      <header className="legal-hero">
        <h1>{title}</h1>
        <div className="legal-hero-meta">
          <div>{introduction}</div>
        </div>
      </header>

      <div className="legal-layout">
        <nav className="legal-index" aria-label={`${title} sections`}>
          <strong>Contents</strong>
          {sections.map((section) => (
            <a
              href={`#${section.id}`}
              key={section.id}
            >
              {section.title.replace(/^\d+\.\s*/, "")}
            </a>
          ))}
        </nav>

        <article className="legal-document">
          {sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              <div className="legal-copy">{section.content}</div>
            </section>
          ))}
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
