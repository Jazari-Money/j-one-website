import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { countryGuides } from "../../countries/guides";
import { CountryDownloadLink } from "../../countries/CountryDownloadLink";
import { SiteHeader } from "../../home/SiteHeader";
import { SiteFooter } from "../../home/SiteFooter";
import { ResponsiveImage } from "../../home/ResponsiveImage";

export const dynamicParams = false;
export function generateStaticParams() { return countryGuides.map(({ slug }) => ({ slug })); }
function getGuide(slug: string) { const guide = countryGuides.find(guide => guide.slug === slug); if (!guide) notFound(); return guide; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  return { title: `${guide.title} — Jazari One`, description: guide.deck, alternates: { canonical: `/blog/${guide.slug}/` },
    openGraph: { title: guide.title, description: guide.deck, type: "article", url: `/blog/${guide.slug}/`, images: [{ url: guide.image, width: 1536, height: 1024 }] },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.deck, images: [guide.image] },
  };
}
export default async function CountryGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.deck, image: `https://jazari.xyz${guide.image}`, mainEntityOfPage: `https://jazari.xyz/blog/${guide.slug}/`, publisher: { "@type": "Organization", name: "Jazari One" } };
  return <main className="article-shell">
    <SiteHeader mode="internal" country={guide.country} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <article className="guide-article">
      <nav className="article-breadcrumbs" aria-label="Breadcrumb"><Link href="/blog/">Blog</Link><span aria-hidden="true">/</span><Link href={`/${guide.country}/`}>{guide.country}</Link></nav>
      <header className="article-header"><h1>{guide.title}</h1><div className="quick-answer"><h2>Short answer</h2><p>{guide.quickAnswer}</p></div><p>{guide.deck}</p></header>
      <figure className="article-hero-image"><ResponsiveImage fallback={guide.image} stem={guide.imageStem} widths={[480, 960, 1440]} width={1536} height={1024} sizes="(max-width: 900px) calc(100vw - 40px), 900px" alt={`Illustrative ${guide.country === "Kenya" ? "Kenyan" : "Nigerian"} professional using a phone at a workspace`} loading="eager" fetchPriority="high" /></figure>
      <div className="article-layout"><div className="article-copy">
        {guide.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}
        {guide.sources && <section><h2>Sources</h2><p>Provider requirements can change. Check the current official guidance.</p><ul>{guide.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul></section>}
        <section><h2>More for {guide.country}</h2><p><Link href={`/${guide.country}/`}>Explore Jazari One in {guide.country}</Link></p><ul>{countryGuides.filter(other => other.country === guide.country && other.slug !== guide.slug).map(other => <li key={other.slug}><Link href={`/blog/${other.slug}/`}>{other.title}</Link></li>)}</ul><p><Link href="/plan/">Check Pricing</Link> · <Link href="/yields/">Understand Yields</Link> · <Link href="/help/">Get help</Link></p></section>
      </div></div>
    </article>
    <section className="country-article-cta"><h2>Your next step starts here.</h2><p>Explore your USD account and wallet routes in {guide.country}.</p><CountryDownloadLink country={guide.country} placement="article" className="neutral-control">Download App</CountryDownloadLink></section>
    <SiteFooter country={guide.country} />
  </main>;
}
