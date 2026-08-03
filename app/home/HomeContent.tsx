import { preload } from "react-dom";
import { withBasePath } from "../site-paths";
import { AudienceExplorer } from "./AudienceExplorer";
import { BenefitLedger } from "./BenefitLedger";
import { Blog } from "./Blog";
import { Hero } from "./Hero";
import { HomeShell } from "./HomeShell";
import { HowItWorks } from "./HowItWorks";
import { FAQ } from "./FAQ";
import { NetworkExplorer } from "./NetworkExplorer";
import { ProductRoadmap } from "./ProductRoadmap";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function HomeContent() {
  preload(withBasePath("/images/screens/j-one-app-main-720.avif"), {
    as: "image",
    type: "image/avif",
    imageSrcSet: [360, 720, 1080]
      .map(
        (width) =>
          `${withBasePath(`/images/screens/j-one-app-main-${width}.avif`)} ${width}w`,
      )
      .join(", "),
    imageSizes: "(max-width: 620px) 72vw, 322px",
    fetchPriority: "high",
  });

  return (
    <HomeShell>
      <SiteHeader />
      <Hero />
      <BenefitLedger />
      <HowItWorks />
      <AudienceExplorer />
      <ProductRoadmap />
      <Blog />
      <NetworkExplorer />
      <FAQ />

      <SiteFooter />
    </HomeShell>
  );
}
