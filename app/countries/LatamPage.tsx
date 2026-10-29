import Image from "next/image";
import { SiteHeader } from "../home/SiteHeader";
import { CountryFooter } from "./CountryFooter";
import { AccordionList } from "../home/AccordionList";
import { ResponsiveImage } from "../home/ResponsiveImage";
import { CountryDownloadLink } from "./CountryDownloadLink";
import { countryAppDownloadUrl } from "../site-paths";
import { latamCountries, type LatamCountry } from "./latam";
import { LatamLangSwitch, LatamText, latamLangScript } from "./LatamLang";
import "../styles/section.css";
import "../styles/faq.css";
import "../styles/country-pages.css";
import "../styles/how.css";
import "../styles/latam-pages.css";
import { LatamRates } from "./LatamRates";
import { ClabeShowcase, LatamCard } from "./LatamInteractive";
import "../styles/interactions.css";

function Download() { return <LatamText es="Descarga la app" en="Download App" />; }
function T({ t }: { t: { es: string; en: string } }) { return <LatamText es={t.es} en={t.en} />; }

export function LatamPage({ country }: { country: LatamCountry }) {
  const c = latamCountries[country];
  const slug = country.toLowerCase();
  return <main className={`country-shell latam-shell country-${slug}`}>
    <script dangerouslySetInnerHTML={{ __html: latamLangScript }} />
    <SiteHeader mode="country" country={country} actions={<LatamLangSwitch />} downloadLabel={<Download />} />
    <header className="country-hero" id="top">
      <div className="country-hero-copy">
        <h1><T t={c.headline} /></h1>
        <p><T t={c.intro} /></p>
        <CountryDownloadLink country={country} placement="hero" className="country-primary-action" downloadUrl={countryAppDownloadUrl}><Download /></CountryDownloadLink>
      </div>
      <div className="country-hero-media">
        <ResponsiveImage fallback={`/images/countries/${slug}-sender.webp`} stem={`/images/countries/${slug}-sender`} widths={[480, 960, 1440]} width={1536} height={1024} alt={c.heroAlt} sizes="(max-width: 900px) calc(100vw - 40px), 52vw" loading="eager" fetchPriority="high" />
      </div>
    </header>

    <section className="country-section latam-rates" id="rates" aria-labelledby="latam-rates-title">
      <div className="review-block">
        <div className="review-copy">
          <h2 id="latam-rates-title"><T t={c.clearTitle} /></h2>
          <p><T t={c.clearCopy} /></p>
          <CountryDownloadLink country={country} placement="rates" className="country-primary-action" downloadUrl={countryAppDownloadUrl}><Download /></CountryDownloadLink>
        </div>
        <LatamRates currency={country === "Mexico" ? "MXN" : "COP"} flag={country === "Mexico" ? "/images/flags/mx.png" : "/images/flags/co.png"} />
      </div>
    </section>

    <section className="country-section latam-pesos" aria-labelledby="latam-pesos-title">
      <div>
        <h2 id="latam-pesos-title"><T t={c.pesosTitle} /></h2>
        <p className="country-description"><T t={c.pesosCopy} /></p>
      </div>
      <LatamCard className="latam-compare"><div role="table" aria-label="Jazari One vs. otros">
        <div className="latam-compare-head" role="row">
          <span role="columnheader"><Image src="/images/brand/jazari-one-logo.svg" alt="Jazari One" width={1638} height={217} /></span>
          <span role="columnheader"><LatamText es="Otros" en="Others" /></span>
        </div>
        {c.rows.map(row => <div className="latam-compare-row" role="row" key={row.ours.en}>
          <span role="cell" className="ours"><i aria-hidden="true" /><span><T t={row.ours} /></span></span>
          <span role="cell" className="others"><T t={row.others} /></span>
        </div>)}
      </div></LatamCard>
    </section>

    <section className="country-wallet country-section" aria-labelledby="latam-bank-title">
      {c.clabe ? <LatamCard className="latam-clabe-card"><ClabeShowcase /></LatamCard> : <Image className="country-product-art" src="/images/journeys/send-globe.png" width={1024} height={1024} alt="" />}
      <div><h2 id="latam-bank-title"><T t={c.bankTitle} /></h2><p className="country-description"><T t={c.bankCopy} /></p></div>
    </section>


    <section className="country-receive country-section" aria-labelledby="latam-family-title">
      <div>
        <h2 id="latam-family-title"><T t={c.familyTitle} /></h2>
        <p className="country-description"><T t={c.familyCopy} /></p>
      </div>
      <div className="latam-family-media">
        <ResponsiveImage fallback={`/images/countries/${slug}-family.webp`} stem={`/images/countries/${slug}-family`} widths={[480, 960, 1440]} width={1536} height={1024} alt={c.familyAlt} sizes="(max-width: 900px) calc(100vw - 40px), 45vw" loading="lazy" />
      </div>
    </section>

    <section className="country-faq faq section" id="faq" aria-labelledby="country-faq-title">
      <header className="chapter-heading"><h2 id="country-faq-title"><LatamText es="Preguntas frecuentes" en="FAQ" /></h2><p className="faq-contact"><LatamText es="¿Te quedó alguna duda?" en="Something we missed?" /> <a href="mailto:hello@jazari.xyz"><LatamText es="Escríbenos" en="Email us" /></a></p></header>
      <div className="faq-content" data-l="es" lang="es"><AccordionList items={c.faq.map(f => ({ question: f.question.es, answer: f.answer.es }))} /></div>
      <div className="faq-content" data-l="en" lang="en"><AccordionList items={c.faq.map(f => ({ question: f.question.en, answer: f.answer.en }))} /></div>
    </section>
    <CountryFooter country={country} />
    <div className="country-mobile-download"><CountryDownloadLink country={country} placement="mobile-sticky" className="country-primary-action" downloadUrl={countryAppDownloadUrl}><Download /></CountryDownloadLink></div>
  </main>;
}
