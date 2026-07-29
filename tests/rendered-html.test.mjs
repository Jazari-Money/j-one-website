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
  assert.match(html, /jazari-app\.mp4/);
  assert.match(html, /Download App/);
  assert.match(html, /Hold in dollars\. Keep its value\./);
  assert.match(html, /Send to 30\+ countries in local currency\./);
  assert.match(html, /Earn on the dollars you&#x27;re not using\./);
  assert.match(html, /No transfer fees\. No hidden fees\./);
  assert.match(html, /How it works/);
  assert.match(html, /Know what arrives before you send/);
  assert.match(html, /class="numeric">\$1<\/b>/);
  assert.match(html, /class="numeric">18\.72<\/b><small class="numeric">MXN/);
  assert.match(html, /Recipient gets/);
  assert.match(html, /Transaction fee/);
  assert.match(html, />Yields</);
  assert.doesNotMatch(html, /Roadmap 2026/);
  assert.match(html, /USD account/);
  assert.match(html, /New receive countries/);
  assert.match(html, /Visa card/);
  assert.match(html, /Nigeria/);
  assert.match(html, /mexico-transfer\.webp/);
  assert.match(html, /brazil\.jpg/);
  assert.match(html, /colombia\.jpg/);
  assert.match(html, /europe\.jpg/);
  assert.match(html, />Partners</);
  assert.match(html, />FAQ</);
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
  assert.doesNotMatch(html, /audience-index/);
});

test("server-renders plan, yields, roadmap, and partners pages", async () => {
  const [planResponse, yieldsResponse, roadmapResponse, partnersResponse] = await Promise.all([
    render("/plan"),
    render("/yields"),
    render("/roadmap"),
    render("/partners"),
  ]);
  const [plan, yields, roadmap, partners] = await Promise.all([
    planResponse.text(),
    yieldsResponse.text(),
    roadmapResponse.text(),
    partnersResponse.text(),
  ]);

  assert.match(plan, /<h1>Plan<\/h1>/);
  assert.match(plan, /Preview pricing only/);
  assert.ok(plan.indexOf("Money movement") < plan.indexOf("Account"));
  assert.ok(plan.indexOf("Account") < plan.indexOf("Earn"));
  assert.match(plan, /Free over \$10/);
  assert.match(plan, /Variable APY/);

  assert.match(yields, /Gauntlet USD Alpha/);
  assert.match(yields, /4\.66%/);
  assert.match(yields, /<h1>Yields<\/h1>/);
  assert.doesNotMatch(yields, /Return and risk move together/);
  assert.match(yields, /Ready to open a yield/);

  assert.match(roadmap, /<h1>Roadmap<\/h1>/);
  assert.match(roadmap, /Yields with higher APY/);
  assert.match(roadmap, /Remit Now Pay Later/);

  assert.match(partners, /<h1>Partners<\/h1>/);
  assert.match(partners, /Lido/);
  assert.match(partners, /Networks and digital dollars/);
  assert.match(partners, /USDC/);
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

  assert.match(terms, /<h1>Terms &amp; Conditions<\/h1>/);
  assert.match(terms, /Effective date: April 2026/);
  assert.match(terms, /20\. How We Use Your Information/);
  assert.match(terms, /href="\/j-one-website\/privacy-policy\/?"/);

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

  const [pageEntry, globals, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  const page = `${pageEntry}\n${homeSource}`;
  const css = `${globals}\n${stylesSource}`;

  assert.match(page, /import \{ MeshGradient \}/);
  assert.match(page, /className="hero-shader"/);
  assert.doesNotMatch(page, /accessOpen|Join Waitlist|Email address/);
  assert.match(page, /activeStep/);
  assert.match(page, /role="tablist"/);
  assert.doesNotMatch(page, /View screen|Showing screen/);
  assert.match(page, /className="review-fee"/);
  assert.match(page, /className="numeric"/);
  assert.match(page, /Know what arrives before you send/);
  assert.match(page, /Live rate from our payment partner/);
  assert.match(page, /\/images\/features\/new\/dollar-balance\.webp/);
  assert.match(page, /\/images\/features\/new\/get-paid\.webp/);
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
  assert.match(css, /mask-image:\s*linear-gradient\(to bottom, #000 0 72%, transparent 96%\)/);
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

  const routes = [
    ["/blog/send-money-to-mexico", /3 steps before you confirm/],
    ["/blog/send-money-to-brazil", /3 steps before you confirm/],
    ["/blog/send-money-to-colombia", /3 steps before you confirm/],
    ["/blog/send-money-to-europe", /3 steps before you confirm/],
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
});
