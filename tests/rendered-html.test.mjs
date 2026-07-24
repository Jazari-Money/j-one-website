import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Jazari One landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Jazari One — Your dollars, wherever you are<\/title>/i);
  assert.match(html, /Your dollars,/);
  assert.match(html, /wherever you are\./);
  assert.match(
    html,
    /Hold your money in dollars that keep their value — and send it to any bank account/,
  );
  assert.match(html, /jazari-app\.mp4/);
  assert.match(html, /Get early access/);
  assert.match(html, /One account for money that crosses borders/);
  assert.match(html, /Send in three clear steps/);
  assert.match(html, /Know what arrives before you send/);
  assert.match(html, /1<\/b><small>USD/);
  assert.match(html, /18\.72<\/b><small>MXN/);
  assert.match(html, /Transaction fee/);
  assert.match(html, /Live now\. Built next\./);
  assert.match(html, /One balance\. Multiple rails\./);
  assert.match(html, />Blog</);
  assert.match(html, /South Asia/);
  assert.match(html, /USDC/);
  assert.doesNotMatch(
    html,
    /Private beta · No commitment · Availability varies by country/,
  );
  assert.doesNotMatch(html, /audience-index/);
});

test("keeps the restrained interactions and clear content hierarchy in source", async () => {
  const [page, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /import \{ MeshGradient \}/);
  assert.match(page, /className="hero-shader"/);
  assert.match(page, /accessOpen/);
  assert.match(page, /activeStep/);
  assert.match(page, /role="tablist"/);
  assert.match(page, /View screen/);
  assert.match(page, /className="review-fee"/);
  assert.match(page, /className="numeric"/);
  assert.match(page, /Know what arrives before you send/);
  assert.match(page, /Indicative rate, for illustration only/);
  assert.match(page, /🇮🇳/);
  assert.match(page, /🇧🇩/);
  assert.match(page, /🇵🇰/);
  assert.match(page, /\/images\/brand\/visa-white\.svg/);
  assert.match(page, /className="audience-caption"/);
  assert.match(page, /\/images\/rails\/bridge\.svg/);
  assert.match(page, /\/images\/rails\/privy\.svg/);
  assert.match(page, /\/images\/rails\/gauntlet\.svg/);
  assert.match(page, /\/images\/rails\/usdt\.svg/);
  assert.match(page, /\/images\/rails\/usdc\.svg/);
  assert.match(page, /\/images\/rails\/ethereum\.svg/);
  assert.match(page, /\/images\/rails\/tron\.svg/);
  assert.match(page, /\/images\/rails\/solana\.svg/);
  assert.match(page, /\/images\/rails\/polygon-symbol\.svg/);
  assert.match(page, /\/images\/rails\/base\.svg/);
  assert.match(page, /\/images\/coins\/jazari-dollar-3d\.webp/);
  assert.match(page, /src=\{story\.logo\}/);
  assert.match(page, /--card-rx/);
  assert.match(page, /coinSeeds/);

  assert.match(css, /\.benefit-row-inner/);
  assert.match(css, /\.card-object/);
  assert.match(css, /\.coin-fall/);
  assert.match(css, /\.coin-fall img/);
  assert.match(css, /\.network-orbit img/);
  assert.match(css, /@media \(min-width: 901px\)/);
  assert.match(css, /--page:\s*min\(1160px/);
  assert.match(css, /\.access-control\.is-open/);
  assert.match(css, /\.hero-shader/);
  assert.match(css, /\[data-theme="aurora"\]/);
  assert.doesNotMatch(page, /GodRays|GrainGradient/);
  assert.doesNotMatch(page, /→|↗/);
  assert.doesNotMatch(page, /story\.name\.slice\(0, 2\)/);
  assert.doesNotMatch(page, /<i>\$<\/i>/);
  assert.doesNotMatch(page, /className="network-flow"/);
  assert.doesNotMatch(page, /className="step-screen-copy"/);
  assert.doesNotMatch(page, /from "glimm"|createShader|playSweep|PageLoadSweep/);
  assert.doesNotMatch(page, /LiquidMetal|LiquidFadeLayer/);
  assert.doesNotMatch(page, /className="hero-proof"/);
  assert.doesNotMatch(page, /className="audience-details"/);
  assert.doesNotMatch(page, /className="card-(?:shader|chip|number|holder)"/);
  assert.doesNotMatch(css, /\.liquid-metal-layer|\.hero-proof|\.audience-details/);
  assert.doesNotMatch(packageJson, /"glimm"/);
  assert.match(css, /filter:\s*brightness\(0\)\s*invert\(1\)/);
  assert.match(css, /mask-image:\s*linear-gradient\(to bottom, #000 0 88%, transparent 100%\)/);
});

test("ships local SVG rail marks and the transparent 3D coin asset", async () => {
  const svgAssets = [
    "bridge.svg",
    "privy.svg",
    "gauntlet.svg",
    "usdt.svg",
    "usdc.svg",
    "ethereum.svg",
    "tron.svg",
    "solana.svg",
    "polygon-symbol.svg",
    "base.svg",
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

  const coin = await readFile(
    new URL(
      "../public/images/coins/jazari-dollar-3d.webp",
      import.meta.url,
    ),
  );
  assert.ok(coin.byteLength > 50_000);
});

test("renders all four regional Blog guides", async () => {
  const routes = [
    ["/blog/send-money-to-mexico", /five checks before you confirm/],
    ["/blog/send-money-to-brazil", /Pix and bank checklist/],
    ["/blog/send-money-to-colombia", /without avoidable delays/],
    ["/blog/send-money-to-europe", /choose the right currency/],
  ];

  for (const [path, title] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title);
    assert.match(html, /Before confirming/);
    assert.match(html, /Availability, fees, exchange rates/);
  }
});
