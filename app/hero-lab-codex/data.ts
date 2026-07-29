export type CodexConcept = {
  id: string;
  name: string;
  thesis: string;
  product: string;
  composition: "contained" | "edge" | "hybrid";
  palette: string;
  tech: string;
};

export const codexConcepts: CodexConcept[] = [
  {
    id: "01",
    name: "Chromatic Caustics",
    thesis: "A dark optical pool crossed by physically drawn spectral refraction.",
    product: "One stable balance remains legible while value bends around it.",
    composition: "contained",
    palette: "Amber · ice · magenta · milk · green",
    tech: "Canvas 2D caustic paths",
  },
  {
    id: "02",
    name: "Sculpted Portal",
    thesis: "A machined aperture carves depth into a restrained rounded chamber.",
    product: "One account becomes the doorway into every financial rail.",
    composition: "hybrid",
    palette: "Black stone · ultraviolet · chalk · lime seam",
    tech: "CSS masks and optical layers",
  },
  {
    id: "03",
    name: "One Account / Many Rails",
    thesis: "Independent light routes converge on one controlled value node.",
    product: "The product promise is drawn directly: many rails, one dollar balance.",
    composition: "edge",
    palette: "Cobalt · coral · mint · warm white",
    tech: "Canvas 2D route system",
  },
  {
    id: "04",
    name: "Volumetric Light Chamber",
    thesis: "A single cinematic beam reveals the product through particulate depth.",
    product: "Clarity is the only illuminated object in a complex space.",
    composition: "contained",
    palette: "Warm black · tungsten · smoke blue · green",
    tech: "GodRays WebGL + CSS depth",
  },
  {
    id: "05",
    name: "Living Dust Field",
    thesis: "Layered motes form local vortices and directional currents.",
    product: "Millions of small money movements resolve into one useful flow.",
    composition: "edge",
    palette: "Silver · eucalyptus · pale cyan · black",
    tech: "Canvas 2D curl field",
  },
  {
    id: "06",
    name: "Liquid Glass Monolith",
    thesis: "A dense optical slab contains dispersion instead of imitating a glass card.",
    product: "Complex infrastructure becomes one tangible, trustworthy object.",
    composition: "hybrid",
    palette: "Obsidian · mineral cyan · copper · violet",
    tech: "LiquidMetal WebGL + CSS object",
  },
  {
    id: "07",
    name: "Topographic Membrane",
    thesis: "Architectural contour lines fold into a precise device niche.",
    product: "Financial layers become organized terrain around one account.",
    composition: "contained",
    palette: "Bone · ink · oxidized green · amber",
    tech: "Canvas 2D contour renderer",
  },
  {
    id: "08",
    name: "Dithered Value Field",
    thesis: "Light is converted into a discrete editorial field with controlled density.",
    product: "Continuous value sits above discrete payment infrastructure.",
    composition: "contained",
    palette: "Paper · ultramarine · oxblood · black",
    tech: "Dithering WebGL",
  },
  {
    id: "09",
    name: "Edge-to-Edge Color Event",
    thesis: "One decisive full-screen sweep changes the state, then becomes quiet.",
    product: "A transfer is staged as one clear event rather than permanent spectacle.",
    composition: "edge",
    palette: "Midnight · vermilion · amber · electric blue",
    tech: "CSS mask choreography",
  },
  {
    id: "10",
    name: "Quiet Black / Singular Phenomenon",
    thesis: "Almost nothing — except one exact chromatic rupture in black.",
    product: "A singular account becomes the point of control.",
    composition: "edge",
    palette: "Absolute black · pearl · spectral edge · green",
    tech: "SmokeRing WebGL + masking",
  },
];

export function getCodexConcept(id: string) {
  return codexConcepts.find((concept) => concept.id === id);
}
