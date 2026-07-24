"use client";

/* eslint-disable @next/next/no-img-element -- local, art-directed assets use exact source files */

import {
  CSSProperties,
  FormEvent,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { withBasePath } from "./site-paths";
import {
  audiences,
  coinSeeds,
  currencies,
  features,
  guides,
  howSteps,
  networkStories,
  themeOptions,
  type CurrencyCode,
  type ThemeKey,
  type ThemeOption,
} from "./home/data";
import { useInViewport, useReducedMotion } from "./home/hooks";

function Phone({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`phone ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
}

function SiteHeader({
  theme,
  onThemeChange,
  onAccess,
}: {
  theme: ThemeKey;
  onThemeChange: (theme: ThemeKey) => void;
  onAccess: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const selected = themeOptions.find((option) => option.key === theme) ?? themeOptions[0];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const close = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setThemeOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header className={`site-header ${scrolled || mobileOpen ? "is-scrolled" : ""}`}>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Jazari One home" onClick={closeMobile}>
          <img src={withBasePath("/images/brand/jazari-one-logo.svg")} alt="Jazari One" />
        </a>

        <div className={`nav-menu ${mobileOpen ? "is-open" : ""}`}>
          <a href="#how" onClick={closeMobile}>How it works</a>
          <a href="#roadmap" onClick={closeMobile}>What&apos;s next</a>
          <a href="#audience" onClick={closeMobile}>For whom</a>
          <a href="#blog" onClick={closeMobile}>Blog</a>
        </div>

        <div className="nav-actions">
          <div className="theme-control">
            <button
              className="theme-trigger"
              type="button"
              onClick={() => setThemeOpen((open) => !open)}
              aria-expanded={themeOpen}
              aria-controls="theme-menu"
            >
              Palette: {selected.name}
            </button>
            <div
              className={`theme-menu ${themeOpen ? "is-open" : ""}`}
              id="theme-menu"
              aria-hidden={!themeOpen}
            >
              {themeOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  className={theme === option.key ? "is-active" : ""}
                  onClick={() => {
                    onThemeChange(option.key);
                    setThemeOpen(false);
                  }}
                  aria-pressed={theme === option.key}
                  style={{ "--swatch": option.mesh.at(-1) } as CSSProperties}
                >
                  <span>{option.name}</span>
                  <small>{option.family}</small>
                </button>
              ))}
            </div>
          </div>
          <button className="nav-cta" type="button" onClick={onAccess}>
            Get early access
          </button>
          <button
            className="mobile-toggle"
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
    </header>
  );
}

function MagicAccess({
  theme,
  shaderActive,
  open,
  joined,
  email,
  emailInput,
  onOpen,
  onEmail,
  onSubmit,
}: {
  theme: ThemeOption;
  shaderActive: boolean;
  open: boolean;
  joined: boolean;
  email: string;
  emailInput: React.RefObject<HTMLInputElement | null>;
  onOpen: () => void;
  onEmail: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={`access-control ${open ? "is-open" : ""}`} id="access">
      <button
        className="magic-access-button"
        type="button"
        onClick={onOpen}
        aria-expanded={open}
        aria-controls="access-form"
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
      >
        <span className="button-shader" aria-hidden="true">
          {shaderActive && (
            <MeshGradient
              width="100%"
              height="100%"
              colors={[theme.mesh[1], theme.mesh[3], "#eaffdf", theme.mesh[2]]}
              distortion={0.56}
              swirl={0.18}
              grainMixer={0}
              grainOverlay={0}
              speed={reduced ? 0 : 0.45}
            />
          )}
        </span>
        <span className="button-label">Get early access</span>
      </button>
      <form
        className="access-form"
        id="access-form"
        onSubmit={onSubmit}
        aria-hidden={!open}
      >
        {joined ? (
          <div className="success-message" role="status">
            You&apos;re on the list. We&apos;ll be in touch.
          </div>
        ) : (
          <>
            <label className="sr-only" htmlFor="email">Email address</label>
            <input
              ref={emailInput}
              id="email"
              type="email"
              value={email}
              onChange={(event) => onEmail(event.target.value)}
              placeholder="Email address"
              autoComplete="email"
              tabIndex={open ? 0 : -1}
              required
            />
            <button type="submit" tabIndex={open ? 0 : -1}>Join waitlist</button>
          </>
        )}
      </form>
    </div>
  );
}

function Hero({
  theme,
  accessOpen,
  joined,
  email,
  emailInput,
  onOpen,
  onEmail,
  onSubmit,
}: {
  theme: ThemeOption;
  accessOpen: boolean;
  joined: boolean;
  email: string;
  emailInput: React.RefObject<HTMLInputElement | null>;
  onOpen: () => void;
  onEmail: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const reduced = useReducedMotion();
  const [shaderRef, shaderVisible] = useInViewport<HTMLDivElement>("160px");

  return (
    <section className="hero" id="top">
      <div className="hero-shader" aria-hidden="true" ref={shaderRef}>
        {shaderVisible && (
          <MeshGradient
            width="100%"
            height="100%"
            colors={[...theme.mesh]}
            distortion={0.42}
            swirl={0.08}
            grainMixer={0}
            grainOverlay={0}
            speed={reduced ? 0 : 0.18}
            scale={1.15}
          />
        )}
      </div>
      <div className="hero-copy">
        <h1>Your dollars,<br />wherever you are.</h1>
        <p>
          Hold your money in dollars that keep their value — and send it to any
          bank account in Mexico, Colombia, Brazil, Europe and 26 more countries.
        </p>
        <MagicAccess
          theme={theme}
          shaderActive={shaderVisible}
          open={accessOpen}
          joined={joined}
          email={email}
          emailInput={emailInput}
          onOpen={onOpen}
          onEmail={onEmail}
          onSubmit={onSubmit}
        />
      </div>

      <div className="hero-product" aria-label="Jazari One app preview">
        <div className="hero-device-glow" aria-hidden="true" />
        <div className="hero-device">
          <img
            className="hero-device-frame"
            src={withBasePath("/images/iphone-12-pro-graphite.webp")}
            alt=""
            aria-hidden="true"
          />
          <video
            className="hero-device-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Jazari One app experience"
          >
            <source src={withBasePath("/videos/jazari-app.mp4")} type="video/mp4" />
          </video>
        </div>
      </div>

    </section>
  );
}

function BenefitRow({ feature }: { feature: (typeof features)[number] }) {
  return (
    <li className="benefit-row">
      <div className="benefit-row-inner">
        <img src={feature.image} alt="" aria-hidden="true" />
        <h3>{feature.title}</h3>
        <p>{feature.copy}</p>
      </div>
    </li>
  );
}

function BenefitLedger() {
  return (
    <section className="benefit-ledger section">
      <header className="ledger-heading">
        <h2>One account for money that crosses borders.</h2>
        <p>Hold dollars, receive payments, and move money through supported routes from one clear account.</p>
      </header>
      <ul className="benefit-list">
        {features.map((feature) => (
          <BenefitRow feature={feature} key={feature.title} />
        ))}
      </ul>
    </section>
  );
}

function HowItWorks({
  amount,
  currency,
  converted,
  onAmount,
  onCurrency,
}: {
  amount: string;
  currency: CurrencyCode;
  converted: number;
  onAmount: (value: string) => void;
  onCurrency: (value: CurrencyCode) => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function moveStep(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % howSteps.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + howSteps.length) % howSteps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = howSteps.length - 1;
    else return;
    event.preventDefault();
    setActiveStep(next);
    tabRefs.current[next]?.focus();
  }

  const step = howSteps[activeStep];
  const rateLabel = currencies[currency].rate.toLocaleString(undefined, {
    minimumFractionDigits: Number.isInteger(currencies[currency].rate) ? 0 : 2,
    maximumFractionDigits: 2,
  });

  return (
    <section className="how section" id="how">
      <header className="chapter-heading">
        <h2>Send in three clear steps.</h2>
        <p>Choose a step to see the screen and information you use at that point.</p>
      </header>

      <div className="how-experience">
        <div className="step-tabs" role="tablist" aria-label="Jazari transfer steps">
          {howSteps.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              id={`step-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={activeStep === index}
              aria-controls="step-screen"
              tabIndex={activeStep === index ? 0 : -1}
              className={activeStep === index ? "is-active" : ""}
              onClick={() => setActiveStep(index)}
              onKeyDown={(event) => moveStep(event, index)}
            >
              <span>{item.title}</span>
              <small>{item.copy}</small>
              <em>{activeStep === index ? "Showing screen" : "View screen"}</em>
            </button>
          ))}
        </div>

        <div
          className="step-screen"
          id="step-screen"
          role="tabpanel"
          aria-labelledby={`step-tab-${step.id}`}
        >
          <Phone
            key={step.id}
            src={step.screen}
            alt={step.alt}
            className="active-step-phone"
          />
        </div>
      </div>

      <div className="review-block" id="rates">
        <div className="review-copy">
          <h3>Know what arrives before you send.</h3>
          <p>
            See the exchange rate, transaction fee, recipient amount, and
            expected delivery before you confirm.
          </p>
          <div
            className="review-fee"
            aria-label="Transaction fee: zero percent for this illustrative route"
          >
            <strong className="numeric">0%</strong>
            <span>
              <b>Transaction fee</b>
              <small>For this illustrative route</small>
            </span>
          </div>
        </div>

        <div className="rate-card">
          <div className="rate-card-top">
            <strong>FX preview</strong>
          </div>

          <label htmlFor="send-amount">You send</label>
          <div className="money-input">
            <input
              className="numeric"
              id="send-amount"
              inputMode="decimal"
              value={amount}
              onChange={(event) => onAmount(event.target.value)}
              aria-label="Amount in US dollars"
            />
            <span>USD</span>
          </div>

          <output
            className="prominent-rate"
            htmlFor="send-amount receive-currency"
            aria-live="polite"
          >
            <span className="rate-side">
              <b className="numeric">1</b>
              <small>USD</small>
            </span>
            <span className="rate-equals" aria-hidden="true">=</span>
            <span className="rate-side is-result">
              <b className="numeric">{rateLabel}</b>
              <small>{currency}</small>
            </span>
          </output>

          <label htmlFor="receive-currency">Recipient receives</label>
          <div className="money-input result">
            <strong className="numeric" aria-live="polite">
              {currencies[currency].symbol}
              {converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </strong>
            <select
              id="receive-currency"
              value={currency}
              onChange={(event) => onCurrency(event.target.value as CurrencyCode)}
              aria-label="Recipient currency"
            >
              {Object.entries(currencies).map(([code, item]) => (
                <option value={code} key={code}>{code} · {item.name}</option>
              ))}
            </select>
          </div>

          <div className="rate-details">
            <span>Transaction fee</span>
            <strong className="numeric">0%</strong>
            <span>Expected delivery</span>
            <strong>Shown before confirmation</strong>
          </div>
          <p className="rate-disclaimer">
            Indicative rate, for illustration only. Final rates, fees, delivery
            times, eligibility, and route availability are shown before confirmation.
          </p>
        </div>
      </div>
    </section>
  );
}

function InteractiveCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rotation = useRef({ x: -7, y: 16 });
  const drag = useRef({ active: false, x: 0, y: 0, rx: -7, ry: 16 });
  const frame = useRef(0);

  function commit(x: number, y: number) {
    rotation.current = { x, y };
    window.cancelAnimationFrame(frame.current);
    frame.current = window.requestAnimationFrame(() => {
      cardRef.current?.style.setProperty("--card-rx", `${x}deg`);
      cardRef.current?.style.setProperty("--card-ry", `${y}deg`);
    });
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduced) return;
    drag.current = {
      active: true,
      x: event.clientX,
      y: event.clientY,
      rx: rotation.current.x,
      ry: rotation.current.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduced) return;
    if (drag.current.active) {
      const nextY = drag.current.ry + (event.clientX - drag.current.x) * 0.36;
      const nextX = Math.max(-26, Math.min(26, drag.current.rx - (event.clientY - drag.current.y) * 0.22));
      commit(nextX, nextY);
      return;
    }
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    commit(py * -14, px * 24);
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    drag.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let { x, y } = rotation.current;
    if (event.key === "ArrowLeft") y -= 12;
    else if (event.key === "ArrowRight") y += 12;
    else if (event.key === "ArrowUp") x -= 8;
    else if (event.key === "ArrowDown") x += 8;
    else if (event.key === "Home") {
      x = -7;
      y = 16;
    } else return;
    event.preventDefault();
    commit(x, y);
  }

  useEffect(() => () => window.cancelAnimationFrame(frame.current), []);

  return (
    <div
      className="card-interaction"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={() => {
        if (!drag.current.active && !reduced) commit(-7, 16);
      }}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="group"
      aria-roledescription="interactive 3D card preview"
      aria-label="Jazari One Visa card"
      aria-describedby="card-interaction-help"
    >
      <div className="card-object" ref={cardRef}>
        <div className="card-face card-front">
          <img
            className="card-brand"
            src={withBasePath("/images/brand/jazari-one-logo.svg")}
            alt=""
            draggable={false}
          />
          <img
            className="card-visa"
            src={withBasePath("/images/brand/visa-white.svg")}
            alt=""
            draggable={false}
          />
        </div>
        <div className="card-face card-back" aria-hidden="true">
          <img
            className="card-brand"
            src={withBasePath("/images/brand/jazari-one-logo.svg")}
            alt=""
            draggable={false}
          />
          <img
            className="card-visa"
            src={withBasePath("/images/brand/visa-white.svg")}
            alt=""
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

function ProductRoadmap({ theme }: { theme: ThemeOption }) {
  const reduced = useReducedMotion();
  const [liveRef, liveShaderVisible] = useInViewport<HTMLElement>("260px");

  return (
    <section className="roadmap section" id="roadmap">
      <header className="chapter-heading">
        <h2>Live now. Built next.</h2>
        <p>Jazari is growing one useful layer at a time, starting with the dollar account.</p>
      </header>

      <article className="live-product" ref={liveRef}>
        <div className="live-shader" aria-hidden="true">
          {liveShaderVisible && (
            <MeshGradient
              width="100%"
              height="100%"
              colors={[theme.mesh[0], theme.mesh[1], theme.mesh[3], theme.mesh[0]]}
              distortion={0.5}
              swirl={0.14}
              grainMixer={0}
              grainOverlay={0}
              speed={reduced ? 0 : 0.16}
            />
          )}
        </div>
        <div className="roadmap-copy">
          <span className="live-mark">LIVE</span>
          <h3>Your dollar account</h3>
          <p>Hold and receive supported digital dollars, then send through the bank routes available to you.</p>
          <ul>
            <li>One account for holding, receiving, and sending</li>
            <li>Transfer information visible before confirmation</li>
            <li>Available routes collected in one experience</li>
          </ul>
        </div>
        <div className="roadmap-visual live-phone">
          <Phone src={withBasePath("/images/screens/home.webp")} alt="Jazari One dollar account home screen" />
        </div>
      </article>

      <div className="next-stack">
        <article className="roadmap-row routes-row">
          <div className="roadmap-copy">
            <span className="roadmap-state">Next</span>
            <h3>More local routes</h3>
            <p>
              We&apos;re preparing routes for India, Bangladesh, and Pakistan,
              followed by selected African markets. Each route opens only when
              its local banking and compliance requirements are ready.
            </p>
          </div>
          <div className="roadmap-visual route-roster" aria-label="Planned local routes">
            <section className="route-group">
              <h4>South Asia</h4>
              <ul className="route-country-list">
                <li><span className="route-flag" aria-hidden="true">🇮🇳</span><span>India</span></li>
                <li><span className="route-flag" aria-hidden="true">🇧🇩</span><span>Bangladesh</span></li>
                <li><span className="route-flag" aria-hidden="true">🇵🇰</span><span>Pakistan</span></li>
              </ul>
            </section>
            <section className="route-group">
              <h4>Africa</h4>
              <p className="route-note">
                Specific countries will be announced as routes are confirmed.
              </p>
            </section>
          </div>
        </article>

        <article className="roadmap-row card-row">
          <div className="roadmap-copy">
            <span className="roadmap-state">Then</span>
            <h3>The Jazari card</h3>
            <p>
              Use the same balance for card spending, with purchase history and
              controls in the app. Availability and terms will depend on country
              and eligibility.
            </p>
            <p id="card-interaction-help" className="interaction-note">
              Drag the card or use your arrow keys to rotate it.
            </p>
          </div>
          <div className="roadmap-visual">
            <InteractiveCard />
          </div>
        </article>

        <article className="roadmap-row rnpl-row">
          <div className="roadmap-copy">
            <span className="roadmap-state">Later</span>
            <h3>Remit Now Pay Later</h3>
            <p>
              Eligible members may be able to choose a support amount and a
              repayment option before confirming. Limits, pricing, terms, and
              availability will vary.
            </p>
            <dl className="rnpl-example">
              <div><dt>Example support</dt><dd>$500</dd></div>
              <div><dt>Repayment selection</dt><dd>Shown upfront</dd></div>
            </dl>
          </div>
          <div className="roadmap-visual rnpl-phone">
            <Phone src={withBasePath("/images/screens/amount-entry.webp")} alt="Remit Now Pay Later amount screen" />
          </div>
        </article>
      </div>
    </section>
  );
}

function AudienceExplorer() {
  return (
    <section className="audience section" id="audience">
      <header className="chapter-heading">
        <h2>Built for the way global lives work.</h2>
        <p>Three common ways one dollar balance can support work, movement, and family.</p>
      </header>

      <div className="audience-explorer">
        {audiences.map((item) => (
          <article className="audience-panel" key={item.title}>
            <img src={item.image} alt={item.alt} />
            <div className="audience-scrim" />
            <div className="audience-caption">
              <h3>{item.title}</h3>
              <p>{item.line}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NetworkExplorer() {
  const [active, setActive] = useState(0);
  const story = networkStories[active];

  return (
    <section className="networks section" id="networks">
      <header className="chapter-heading">
        <h2>One balance. Multiple rails.</h2>
        <p>
          Jazari brings digital dollars, wallet infrastructure, risk tooling,
          and public networks into one experience. The route determines what is used.
        </p>
      </header>

      <div className="network-explorer">
        <div className="network-list" role="tablist" aria-label="Jazari technology and networks">
          {networkStories.map((item, index) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              id={`network-tab-${index}`}
              aria-selected={active === index}
              aria-controls="network-story"
              className={active === index ? "is-active" : ""}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span
                className={`network-name ${item.logoFormat === "wide" ? "is-wide" : ""}`}
                style={{ "--logo-scale": item.logoScale } as CSSProperties}
              >
                <span className="network-logo-box" aria-hidden="true">
                  <img src={item.logo} alt="" />
                </span>
                <b>{item.name}</b>
              </span>
              <small>{item.short}</small>
            </button>
          ))}
        </div>
        <div
          className="network-story"
          id="network-story"
          role="tabpanel"
          aria-labelledby={`network-tab-${active}`}
        >
          <div className="network-orbit" aria-hidden="true">
            <i />
            <i />
            <i />
            <img
              className={story.logoFormat === "wide" ? "is-wide" : ""}
              style={{ "--logo-scale": story.featureScale } as CSSProperties}
              src={story.logo}
              alt=""
            />
          </div>
          <span>{story.kind}</span>
          <h3>{story.name}</h3>
          <p>{story.detail}</p>
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section className="blog section" id="blog">
      <header className="chapter-heading">
        <h2>Blog</h2>
        <p>Brief, practical answers for checking a route before you send.</p>
      </header>
      <div className="blog-grid">
        {guides.map((guide, index) => (
          <a
            className={`blog-card ${index === 0 ? "blog-card-featured" : ""}`}
            href={withBasePath(`/blog/${guide.slug}`)}
            key={guide.slug}
          >
            <div className="blog-card-meta">
              <span>{guide.route}</span>
              <span>{guide.read}</span>
            </div>
            <h3>{guide.title}</h3>
            <p>{guide.deck}</p>
            <span className="blog-read">Read guide</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function MoneyRain({ onAccess }: { onAccess: () => void }) {
  const [raining, setRaining] = useState(false);
  const timeout = useRef(0);
  const reduced = useReducedMotion();

  function runForTouch() {
    setRaining(true);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setRaining(false), 4200);
  }

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  return (
    <section
      className={`money-rain section ${raining ? "is-raining" : ""}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && !reduced) setRaining(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setRaining(false);
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse" && !reduced) runForTouch();
      }}
      onFocusCapture={() => {
        if (!reduced) setRaining(true);
      }}
      onBlurCapture={() => setRaining(false)}
    >
      {raining && !reduced && (
        <div className="coin-rain" aria-hidden="true">
          {coinSeeds.map((coin, index) => (
            <span
              className="coin-fall"
              key={index}
              style={{
                "--coin-left": `${coin.left}%`,
                "--coin-delay": `${coin.delay}s`,
                "--coin-duration": `${coin.duration}s`,
                "--coin-size": `${coin.size}px`,
                "--coin-drift": `${coin.drift}px`,
                "--coin-spin": `${coin.spin}deg`,
              } as CSSProperties}
            >
              <img
                src={withBasePath("/images/coins/jazari-dollar-3d.webp")}
                alt=""
                draggable="false"
              />
            </span>
          ))}
        </div>
      )}
      <div className="money-rain-glow" aria-hidden="true" />
      <div className="money-rain-content">
        <h2>Your dollars should move with you.</h2>
        <p>Join the waitlist and we&apos;ll tell you when Jazari becomes available in your country.</p>
        <button type="button" onClick={onAccess}>Get early access</button>
      </div>
    </section>
  );
}

function HomeContent() {
  const [theme, setTheme] = useState<ThemeKey>("carbon");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [amount, setAmount] = useState("1000");
  const [currency, setCurrency] = useState<CurrencyCode>("MXN");
  const emailInput = useRef<HTMLInputElement>(null);
  const selectedTheme = themeOptions.find((option) => option.key === theme) ?? themeOptions[0];

  const converted = useMemo(() => {
    const number = Number.parseFloat(amount.replace(/,/g, ""));
    return Number.isFinite(number) ? number * currencies[currency].rate : 0;
  }, [amount, currency]);

  useEffect(() => {
    const stored = window.localStorage.getItem("jazari-theme") as ThemeKey | null;
    if (!stored || !themeOptions.some((option) => option.key === stored)) return;
    const timer = window.setTimeout(() => setTheme(stored), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("jazari-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (window.location.hash !== "#access") return;
    const openTimer = window.setTimeout(() => setAccessOpen(true), 80);
    const focusTimer = window.setTimeout(() => emailInput.current?.focus(), 620);
    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(focusTimer);
    };
  }, []);

  function openAccess() {
    setAccessOpen(true);
    document.getElementById("access")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => emailInput.current?.focus(), 520);
  }

  function submitWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setJoined(true);
  }

  return (
    <main data-theme={theme}>
      <SiteHeader theme={theme} onThemeChange={setTheme} onAccess={openAccess} />
      <Hero
        theme={selectedTheme}
        accessOpen={accessOpen}
        joined={joined}
        email={email}
        emailInput={emailInput}
        onOpen={openAccess}
        onEmail={setEmail}
        onSubmit={submitWaitlist}
      />
      <BenefitLedger />
      <HowItWorks
        amount={amount}
        currency={currency}
        converted={converted}
        onAmount={setAmount}
        onCurrency={setCurrency}
      />
      <ProductRoadmap theme={selectedTheme} />
      <AudienceExplorer />
      <NetworkExplorer />
      <Blog />
      <MoneyRain onAccess={openAccess} />

      <footer>
        <div className="footer-top">
          <img src={withBasePath("/images/brand/jazari-one-logo.svg")} alt="Jazari One" />
          <div>
            <a href="#how">How it works</a>
            <a href="#roadmap">What&apos;s next</a>
            <a href="#blog">Blog</a>
            <a href="mailto:hello@jazari.xyz">Contact</a>
          </div>
        </div>
        <p>
          Jazari One is a technology service provider. Wallet, custody, and
          payment services are delivered by licensed and regulated third-party
          providers. Jazari does not hold customer funds or provide regulated
          financial services directly.
        </p>
        <div className="footer-bottom">
          <span>JAZARI FINTECH SERVICES — FZCO · Dubai, UAE</span>
          <span>© 2026 Jazari One. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return <HomeContent />;
}
