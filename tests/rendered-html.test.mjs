import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const route = path === "/" ? "" : `${path.replace(/\/$/, "")}/`;
  const html = await readFile(
    new URL(`../out/${route}index.html`, import.meta.url),
    "utf8",
  );

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

test("server-renders the Jazari One landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Jazari One — Use dollars\. Anywhere\.<\/title>/i);
  assert.match(html, /Use dollars\./);
  assert.match(html, /Anywhere\./);
  assert.match(html, /Hold them\. Send them\. Grow them\./);
  assert.match(html, /j-one-app-main\.png/);
  assert.match(html, /Download App/);
  assert.match(html, /Hold dollars\. Keep their value\./);
  assert.match(html, /Send to 30\+ countries in local currency\./);
  assert.match(html, /Earn on the dollars you&#x27;re not using\./);
  assert.match(html, /No transfer fees\. No hidden fees\./);
  assert.match(html, /How it works/);
  assert.match(html, /Estimate what may arrive before you send/);
  assert.match(html, /Preview the amount at the current rate before you confirm\./);
  assert.match(html, /Receiving countries/);
  assert.match(html, /All receiving countries/);
  assert.match(html, /30(?:<!-- -->)? destinations today\. More countries coming soon\./);
  assert.match(html, /Coming soon/);
  assert.match(html, /Andorra/);
  assert.match(html, /United Kingdom/);
  assert.match(html, /class="numeric">\$1<\/b>/);
  assert.match(html, /class="numeric">18\.72<\/b><small class="numeric">MXN/);
  assert.match(html, /Estimated recipient amount/);
  assert.match(html, /Transaction fee/);
  assert.match(html, />Yields</);
  assert.match(html, /Coming soon/);
  assert.match(html, /USD account/);
  assert.match(html, /Expanded payout corridors/);
  assert.match(html, /Higher-yield strategies/);
  assert.match(html, /Visa card/);
  assert.match(html, /Nigeria/);
  assert.match(html, /usa-flag\.png/);
  assert.match(html, /mexico-transfer\.webp/);
  assert.match(html, /brazil\.jpg/);
  assert.match(html, /colombia\.jpg/);
  assert.match(html, /europe\.jpg/);
  assert.match(html, />Partners</);
  assert.match(html, />About us</);
  assert.match(html, />FAQ</);
  assert.match(html, />Email us<\/a>/);
  assert.doesNotMatch(html, />Email us\.<\/a>/);
  assert.ok(html.indexOf('id="roadmap"') < html.indexOf('id="blog"'));
  assert.ok(html.indexOf('id="blog"') < html.indexOf('id="networks"'));
  assert.ok(html.indexOf('id="networks"') < html.indexOf('id="faq"'));
  assert.match(html, />Blog</);
  assert.match(html, /Bridge/);
  assert.match(html, /Lido/);
  assert.match(html, /2–5 min\./);
  assert.doesNotMatch(html, /Hidden FX rate fee/);
  assert.doesNotMatch(
    html,
    /Private beta · No commitment · Availability varies by country/,
  );
  assert.match(html, /building every day<\/h2>/);
  assert.doesNotMatch(html, /building every day\.<\/h2>/);
  assert.doesNotMatch(html, /audience-index/);
});

test("server-renders plan, yields, coming soon, partners, and about pages", async () => {
  const [planResponse, yieldsResponse, roadmapResponse, partnersResponse, aboutResponse] = await Promise.all([
    render("/plan"),
    render("/yields"),
    render("/roadmap"),
    render("/partners"),
    render("/about"),
  ]);
  const [plan, yields, roadmap, partners, about] = await Promise.all([
    planResponse.text(),
    yieldsResponse.text(),
    roadmapResponse.text(),
    partnersResponse.text(),
    aboutResponse.text(),
  ]);

  assert.match(plan, /<h1>Plan<\/h1>/);
  assert.match(plan, /Preview pricing\. Final fees and availability are confirmed in the app\./);
  assert.ok(plan.indexOf("Money movement") < plan.indexOf("Account"));
  assert.ok(plan.indexOf("Account") < plan.indexOf("Earn"));
  assert.match(plan, /Free over \$10/);
  assert.match(plan, /Variable APY/);

  assert.match(yields, /Gauntlet USD Alpha/);
  assert.match(yields, /4\.66%/);
  assert.match(yields, /<h1>Yields<\/h1>/);
  assert.doesNotMatch(yields, /Return and risk move together/);
  assert.match(yields, /Ready to open a yield/);

  assert.match(roadmap, /<h1>Coming soon<\/h1>/);
  assert.match(roadmap, /Higher-yield strategies/);
  assert.match(roadmap, /Remit Now Pay Later/);

  assert.match(partners, /<h1>Partners<\/h1>/);
  assert.match(partners, /Lido/);
  assert.match(partners, /Networks and digital dollars/);
  assert.match(partners, /USDC/);

  assert.match(about, /<h1>About us<\/h1>/);
  assert.match(about, /<h2 id="about-manifest-title">Manifesto<\/h2>/);
  assert.match(about, /Every transfer begins with something real/);
  assert.match(about, /Alex and Has, founders of Jazari One/);
  assert.match(about, /jazari-founders\.webp/);
  assert.match(about, /jazari-founders-2560\.avif/);
  assert.match(about, /Built in the United States and UAE/);
  assert.match(about, /Registered in Dover, Delaware/);
  assert.match(about, /Registration #78870/);
  assert.doesNotMatch(about, /United States entity/);
  assert.doesNotMatch(about, /UAE entity/);
  assert.match(about, /<h2 id="about-trust-title">Our partners<\/h2>/);
  assert.match(about, /We&#x27;re not a bank/);
  assert.match(about, /Bridge, a Stripe company/);
  assert.match(about, /Lido logo/);
  assert.match(about, /Your account, your keys\./);
  assert.match(about, /not a bank and not us/);
  assert.match(about, /href="\/j-one-website\/partners\/?"/);
});

test("server-renders the standalone component board", async () => {
  const response = await render("/storyboard");
  const html = await response.text();

  assert.match(html, /<title>Jazari One Component Board<\/title>/);
  assert.match(html, /Jazari One/);
  assert.match(html, /component board/);
  assert.match(html, /Atomic UI inventory/);
  assert.match(html, /Use dollars\. Anywhere\./);
  assert.match(html, /Typography/);
  assert.match(html, /Fields &amp; values/);
  assert.match(html, /Dropdowns/);
  assert.match(html, /Segmented controls/);
  assert.match(html, /Accordions/);
  assert.match(html, /Badges &amp; media/);
  assert.match(html, /Desktop/);
  assert.match(html, /Mobile/);
});

test("server-renders the internal legal pages", async () => {
  const [termsResponse, privacyResponse] = await Promise.all([
    render("/terms"),
    render("/privacy-policy"),
  ]);
  const [terms, privacy] = await Promise.all([
    termsResponse.text(),
    privacyResponse.text(),
  ]);

  assert.match(terms, /<h1>US Terms and Conditions<\/h1>/);
  assert.match(terms, /Effective date: 21 April 2026/);
  assert.match(terms, /1\. INTRODUCTION/);
  assert.match(terms, /FinCEN MSB registration/);
  assert.match(terms, /29\. STATE-SPECIFIC DISCLOSURES/);
  assert.match(terms, /30\. CONTACT INFORMATION/);

  assert.match(privacy, /<h1>Privacy Policy<\/h1>/);
  assert.match(privacy, /Last updated: April 2026/);
  assert.match(privacy, /11\. Cookies/);
  assert.match(privacy, /jazari_cookie_consent/);
  assert.match(privacy, /href="\/j-one-website\/terms\/?"/);
});

test("keeps the restrained interactions and clear content hierarchy in source", async () => {
  const homeDirectory = new URL("../app/home/", import.meta.url);
  const homeFiles = (await readdir(homeDirectory))
    .filter((file) => /\.(?:ts|tsx)$/.test(file))
    .sort();
  const homeSource = (
    await Promise.all(
      homeFiles.map((file) => readFile(new URL(file, homeDirectory), "utf8")),
    )
  ).join("\n");

  const stylesDirectory = new URL("../app/styles/", import.meta.url);
  const styleFiles = (await readdir(stylesDirectory))
    .filter((file) => file.endsWith(".css"))
    .sort();
  const stylesSource = (
    await Promise.all(
      styleFiles.map((file) => readFile(new URL(file, stylesDirectory), "utf8")),
    )
  ).join("\n");

  const [pageEntry, globals, packageJson, heroColorEventSource] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/home/HeroColorEvent.tsx", import.meta.url), "utf8"),
  ]);
  const page = `${pageEntry}\n${homeSource}`;
  const css = `${globals}\n${stylesSource}`;

  assert.match(page, /HeroColorEvent/);
  assert.match(page, /className="hero-shader"/);
  assert.match(page, /className="hero-title-line"/);
  assert.match(page, /vec3\(1\., \.3, \.16\)/);
  assert.match(heroColorEventSource, /u_dust_time \* 9\.5 \/ cssHeight/);
  assert.match(heroColorEventSource, /u_dust_time \* 12\.5 \/ cssHeight/);
  assert.doesNotMatch(heroColorEventSource, /u_ptr|pointerTarget|pointerSmooth/);
  assert.doesNotMatch(heroColorEventSource, /addEventListener\("pointermove"/);
  assert.doesNotMatch(page, /accessOpen|Join Waitlist|Email address/);
  assert.match(page, /activeStep/);
  assert.match(page, /role="tablist"/);
  assert.doesNotMatch(page, /View screen|Showing screen/);
  assert.match(page, /className="review-fee"/);
  assert.match(page, /className="numeric"/);
  assert.match(page, /Estimate what may arrive before you send/);
  assert.match(page, /Live rate from our payment partner/);
  assert.match(page, /\/images\/features\/dollar-01\.png/);
  assert.match(page, /\/images\/features\/planet-02\.png/);
  assert.match(page, /\/images\/features\/plus-03\.png/);
  assert.match(page, /\/images\/features\/zero-04\.png/);
  assert.doesNotMatch(page, /\/images\/features\/new\/send\.webp/);
  assert.match(page, /guides\.slice\(0, 4\)/);
  assert.match(page, /\/images\/stores\/app-store-badge\.avif/);
  assert.match(page, /\/images\/stores\/google-play-badge\.avif/);
  assert.match(page, /\/images\/brand\/visa-white\.svg/);
  assert.match(page, /className="audience-caption"/);
  assert.match(page, /\/images\/rails\/bridge\.svg/);
  assert.match(page, /\/images\/rails\/privy\.svg/);
  assert.match(page, /\/images\/rails\/gauntlet-mark\.svg/);
  assert.match(page, /\/images\/rails\/usdt\.svg/);
  assert.match(page, /\/images\/rails\/usdc\.svg/);
  assert.match(page, /\/images\/rails\/ethereum\.svg/);
  assert.match(page, /\/images\/rails\/tron\.svg/);
  assert.match(page, /\/images\/rails\/solana\.svg/);
  assert.match(page, /\/images\/rails\/polygon-symbol\.svg/);
  assert.match(page, /\/images\/rails\/base-mark\.svg/);
  assert.match(page, /src=\{item\.logo\}/);
  assert.match(page, /--card-rx/);
  assert.match(page, /createShader/);
  assert.match(page, /playSweep/);
  assert.match(page, /bandTight:\s*40/);

  assert.match(css, /\.benefit-row-inner/);
  assert.match(css, /\.card-object/);
  assert.match(css, /\.pointer-card::after/);
  assert.match(css, /\.provider-logo img/);
  assert.match(css, /\.faq-list/);
  assert.match(css, /@media \(min-width: 901px\)/);
  assert.match(css, /--page:\s*min\(1320px/);
  assert.match(css, /\.hero-download-control/);
  assert.match(css, /\.hero-shader/);
  assert.match(css, /hero-event-line/);
  assert.match(css, /"Instrument Serif"/);
  assert.match(css, /\[data-theme="jazari"\]/);
  assert.doesNotMatch(css, /\[data-theme="(?:black|dark|blue|sea|toxic|solar|magenta|violet|infrared|aurora)"\]/);
  assert.doesNotMatch(css, /\[data-shader="(?:horizon|orbital|ribbon)"\]/);
  assert.doesNotMatch(page, /Choose color theme|themeOptions|shaderOptions/);
  assert.doesNotMatch(page, /GodRays|GrainGradient/);
  assert.doesNotMatch(page, /→|↗/);
  assert.doesNotMatch(page, /story\.name\.slice\(0, 2\)/);
  assert.doesNotMatch(page, /<i>\$<\/i>/);
  assert.doesNotMatch(page, /className="network-flow"/);
  assert.doesNotMatch(page, /className="step-screen-copy"/);
  assert.doesNotMatch(page, /PageLoadSweep/);
  assert.doesNotMatch(page, /LiquidMetal|LiquidFadeLayer/);
  assert.doesNotMatch(page, /className="hero-proof"/);
  assert.doesNotMatch(page, /className="audience-details"/);
  assert.doesNotMatch(page, /className="card-(?:shader|chip|number|holder)"/);
  assert.doesNotMatch(css, /\.liquid-metal-layer|\.hero-proof|\.audience-details/);
  assert.match(packageJson, /"glimm"/);
  assert.match(css, /filter:\s*grayscale\(1\)\s*brightness\(0\)\s*invert\(1\)/);
  assert.match(css, /\.hero-device-image/);
  assert.match(css, /rgba\(0, 0, 0, 0\.8\) 72%/);
});

test("ships local provider marks and product artwork", async () => {
  const svgAssets = [
    "privy.svg",
    "gauntlet-mark.svg",
    "usdt.svg",
    "usdc.svg",
    "ethereum.svg",
    "tron.svg",
    "solana.svg",
    "polygon-symbol.svg",
    "base-mark.svg",
  ];

  for (const asset of svgAssets) {
    const svg = await readFile(
      new URL(`../public/images/rails/${asset}`, import.meta.url),
      "utf8",
    );
    assert.match(svg, /<svg\b/i, asset);
  }

  const visa = await readFile(
    new URL("../public/images/brand/visa-white.svg", import.meta.url),
    "utf8",
  );
  assert.match(visa, /<svg\b/i);

  const bridge = await readFile(
    new URL("../public/images/rails/bridge.svg", import.meta.url),
    "utf8",
  );
  assert.match(bridge, /<svg\b/i);
  assert.match(bridge, /<path\b/i);
  assert.doesNotMatch(bridge, /data:image|<image\b/i);
});

test("renders the Blog index and all seven guides", async () => {
  const indexResponse = await render("/blog");
  assert.equal(indexResponse.status, 200);
  const indexHtml = await indexResponse.text();
  assert.match(indexHtml, /7(?:<!--.*?-->)?\s*practical articles/);
  assert.equal((indexHtml.match(/Read Article/g) ?? []).length, 7);
  assert.match(indexHtml, /mexico-transfer\.webp/);
  assert.doesNotMatch(indexHtml, /min read/i);
  assert.doesNotMatch(indexHtml, /<span>Mexico<\/span>/);
  assert.doesNotMatch(indexHtml, /<span>Brazil<\/span>/);

  const routes = [
    ["/blog/send-money-to-mexico", /How to send dollars to Mexico in 3 steps/],
    ["/blog/send-money-to-brazil", /How to send dollars to Brazil in 3 steps/],
    ["/blog/send-money-to-colombia", /How to send dollars to Colombia in 3 steps/],
    ["/blog/send-money-to-europe", /How to send dollars to Europe in 3 steps/],
    ["/blog/compare-transfer-costs", /beyond the headline rate/],
    ["/blog/verify-recipient-details", /before sending money to a new recipient/],
    ["/blog/digital-dollars-bank-payouts", /what each part does/],
  ];

  for (const [path, title] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title);
    assert.match(html, /aria-label="Breadcrumb"/);
    assert.match(html, /Ready to join Jazari One\?/);
    assert.match(html, /Jazari Fintech Services/);
    assert.doesNotMatch(html, /At a glance/);
    assert.doesNotMatch(html, /class="article-note"/);
    assert.doesNotMatch(html, /min read/i);
    assert.match(html, /href="\/j-one-website\/#top"/);
    assert.match(html, /href="\/j-one-website\/blog\/?"/);
    assert.match(html, /href="\/j-one-website\/#access"/);
    assert.doesNotMatch(html, /\/j-one-website\/j-one-website\//);
  }

  const mexico = await (await render("/blog/send-money-to-mexico")).text();
  assert.match(mexico, /mexico-transfer\.webp/);

  const corridorGuides = [
    {
      path: "/blog/send-money-to-mexico",
      rail: "SPEI",
      description:
        "Send dollars to Mexico through SPEI in three steps. Learn which 18-digit CLABE and recipient details you need, plus timing and confirmation checks.",
    },
    {
      path: "/blog/send-money-to-brazil",
      rail: "Pix",
      description:
        "Send dollars to Brazil through Pix in three steps. Learn which Pix key and recipient details you need, what to review, and when the reais should arrive.",
    },
    {
      path: "/blog/send-money-to-colombia",
      rail: "Bre-B",
      description:
        "Send dollars to Colombia through Bre-B in three steps. Learn which llave and recipient details you need, what to check, and typical payout timing.",
    },
    {
      path: "/blog/send-money-to-europe",
      rail: "SEPA",
      description:
        "Send dollars to Europe through SEPA in three steps. Learn which IBAN, BIC or SWIFT details you need, what to review, and typical bank payout timing.",
    },
  ];

  for (const guide of corridorGuides) {
    const html = await (await render(guide.path)).text();
    assert.match(html, /class="quick-answer"/);
    assert.match(html, /<h2>Short answer<\/h2>/);
    assert.match(html, new RegExp(guide.rail));
    assert.ok(html.includes(`<meta name="description" content="${guide.description}"/>`));
    assert.ok(html.includes(`<meta property="og:description" content="${guide.description}"/>`));

    const quickAnswer = html.match(
      /<div class="quick-answer"><h2>Short answer<\/h2><p>(.*?)<\/p><\/div>/,
    )?.[1];
    assert.ok(quickAnswer, guide.path);
    const wordCount = quickAnswer.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
    assert.ok(wordCount >= 40 && wordCount <= 60, `${guide.path}: ${wordCount} words`);
    assert.ok(guide.description.length >= 140 && guide.description.length <= 155);
  }
});
