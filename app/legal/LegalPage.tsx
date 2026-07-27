import type { ReactNode } from "react";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  title: string;
  date: string;
  introduction: ReactNode;
  sections: LegalSection[];
};

export function LegalPage({
  title,
  date,
  introduction,
  sections,
}: LegalPageProps) {
  return (
    <main className="legal-shell">
      <InternalSiteHeader />

      <header className="legal-hero">
        <h1>{title}</h1>
        <div className="legal-hero-meta">
          <p>{date}</p>
          <div>{introduction}</div>
        </div>
      </header>

      <div className="legal-layout">
        <nav className="legal-index" aria-label={`${title} sections`}>
          {sections.map((section, index) => (
            <a
              href={`#${section.id}`}
              key={section.id}
              aria-label={section.title}
              title={section.title.replace(/^\d+\.\s*/, "")}
            >
              <span>{index + 1}</span>
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
