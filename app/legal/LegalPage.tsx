import type { ReactNode } from "react";
import "../styles/legal-page.css";
import { InternalSiteHeader } from "../home/InternalSiteHeader";
import { SiteFooter } from "../home/SiteFooter";
import {
  TermsVersionSwitcher,
  type TermsVersion,
} from "./TermsVersionSwitcher";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  title: string;
  date: string;
  introduction: ReactNode;
  sections?: LegalSection[];
  indexSections?: ReadonlyArray<Pick<LegalSection, "id" | "title">>;
  document?: ReactNode;
  termsVersion?: TermsVersion;
};

export function LegalPage({
  title,
  date,
  introduction,
  sections = [],
  indexSections,
  document,
  termsVersion,
}: LegalPageProps) {
  const contents = indexSections ?? sections;

  return (
    <main className="legal-shell">
      <InternalSiteHeader />

      <header className="legal-hero">
        <h1>{title}</h1>
        {termsVersion ? (
          <TermsVersionSwitcher activeVersion={termsVersion} />
        ) : null}
        <div className="legal-hero-meta">
          <p>{date}</p>
          <div>{introduction}</div>
        </div>
      </header>

      <div className="legal-layout">
        <nav className="legal-index" aria-label={`${title} sections`}>
          <strong>Contents</strong>
          {contents.map((section) => (
            <a
              href={`#${section.id}`}
              key={section.id}
            >
              {section.title.replace(/^\d+\.\s*/, "")}
            </a>
          ))}
        </nav>

        <article className="legal-document">
          {document ? (
            <div className="legal-copy legal-copy-flow">{document}</div>
          ) : (
            sections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                <div className="legal-copy">{section.content}</div>
              </section>
            ))
          )}
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
