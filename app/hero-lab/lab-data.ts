export type LabVariantMeta = {
  id: string;
  name: string;
  tagline: string;
  idea: string;
  productLink: string;
  composition: "container" | "edge" | "hybrid";
  layout: "center" | "editorial";
  palette: string[];
  paletteName: string;
  motion: string;
  tech: "WebGL" | "Canvas 2D" | "WebGL + CSS" | "Canvas 2D + CSS";
  preview: string;
};

export const labVariants: LabVariantMeta[] = [
  {
    id: "01",
    name: "Chromatic Caustics",
    tagline: "Light refracted through a dark pool",
    idea: "Optical caustics — the patterns light makes through moving water — rendered in amber, ice, magenta and milk over near-black. Movement reads as physical refraction, not drifting blur.",
    productLink: "Value in motion: money as light finding its path across a surface.",
    composition: "container",
    layout: "editorial",
    palette: ["#f0a84b", "#8cc8ff", "#e06fb2", "#f6efe2", "#21f668"],
    paletteName: "Amber / ice / magenta / milk + lime accent",
    motion: "Slow physical refraction; intro focuses from soft to sharp",
    tech: "WebGL",
    preview:
      "radial-gradient(90% 120% at 30% 20%, rgba(240,168,75,.34), transparent 55%), radial-gradient(80% 110% at 75% 60%, rgba(140,200,255,.28), transparent 60%), radial-gradient(60% 90% at 55% 90%, rgba(224,111,178,.2), transparent 65%), #030404",
  },
  {
    id: "02",
    name: "Sculpted Portal",
    tagline: "A carved cavity of structured green light",
    idea: "A precise elliptical opening carved into the site's own rounded container — depth walls, a luminous rim, darkness inside. The phone rises out of the opening past the container edge.",
    productLink: "A single account as a doorway: one opening, everything behind it.",
    composition: "hybrid",
    layout: "editorial",
    palette: ["#01130a", "#0d3a1f", "#21f668", "#4eff9e", "#dfe8e2"],
    paletteName: "Deep structured greens with a mint rim",
    motion: "Iris opening + rim light sweep; interior slowly breathes",
    tech: "WebGL + CSS",
    preview:
      "radial-gradient(42% 58% at 66% 52%, #000 38%, rgba(33,246,104,.5) 47%, rgba(13,58,31,.4) 56%, transparent 70%), #020806",
  },
  {
    id: "03",
    name: "One Account, Many Rails",
    tagline: "Spectral routes converging on one device",
    idea: "Thin light routes enter from the edges — each a different spectral tint, each a different payment rail — and converge into the phone. Pulses of value travel the lines.",
    productLink: "Literal product diagram made abstract: one balance, many rails — SPEI, Pix, Bre-B, SEPA.",
    composition: "edge",
    layout: "center",
    palette: ["#5aa7ff", "#8f7bff", "#ff7ad9", "#ffb45e", "#4eff9e"],
    paletteName: "Multi-spectral lines on black, lime at the node",
    motion: "Routes draw in, then carry slow pulses toward the device",
    tech: "Canvas 2D + CSS",
    preview:
      "linear-gradient(112deg, transparent 30%, rgba(90,167,255,.25) 44%, transparent 46%), linear-gradient(78deg, transparent 52%, rgba(255,122,217,.22) 62%, transparent 64%), linear-gradient(96deg, transparent 64%, rgba(78,255,158,.3) 74%, transparent 76%), #020303",
  },
  {
    id: "04",
    name: "Volumetric Light Chamber",
    tagline: "One cold shaft of light in true darkness",
    idea: "A cinematic chamber: a single volumetric beam falls from above, full of drifting dust, and is the only thing that reveals the product. Controlled bloom, real depth, no CSS spotlight.",
    productLink: "Clarity before you send: one beam of light shows exactly what's there.",
    composition: "container",
    layout: "editorial",
    palette: ["#dfe9e6", "#9fd8c0", "#39423e", "#0a0c0b", "#000000"],
    paletteName: "Cold optical white-mint over black",
    motion: "Beam swells from darkness; dust drifts down through it",
    tech: "WebGL",
    preview:
      "linear-gradient(178deg, rgba(223,233,230,.4) 0%, rgba(159,216,192,.14) 42%, transparent 72%), radial-gradient(50% 14% at 50% 88%, rgba(223,233,230,.18), transparent 70%), #000",
  },
  {
    id: "05",
    name: "Living Dust Field",
    tagline: "The site's dust becomes the protagonist",
    idea: "A multi-layer flow field of hundreds of motes on three depth planes, steered by curl noise and slow vortices. Streams form and dissolve; nothing repeats. The phone materializes only after the field settles.",
    productLink: "Millions of small movements forming one calm current — remittances as weather.",
    composition: "edge",
    layout: "center",
    palette: ["#f4ecdd", "#cfd8d2", "#8d928f", "#4eff9e", "#000000"],
    paletteName: "Warm champagne dust, rare lime motes, black air",
    motion: "Very slow curl-noise drift with local vortices; soft cursor displacement",
    tech: "Canvas 2D + CSS",
    preview:
      "radial-gradient(1.5px 1.5px at 20% 30%, rgba(244,236,221,.9), transparent 100%), radial-gradient(1px 1px at 60% 20%, rgba(244,236,221,.7), transparent 100%), radial-gradient(2px 2px at 75% 55%, rgba(244,236,221,.8), transparent 100%), radial-gradient(1px 1px at 40% 70%, rgba(78,255,158,.8), transparent 100%), radial-gradient(1.5px 1.5px at 85% 80%, rgba(244,236,221,.6), transparent 100%), radial-gradient(1px 1px at 10% 85%, rgba(244,236,221,.5), transparent 100%), #010202",
  },
  {
    id: "06",
    name: "Liquid Glass Monolith",
    tagline: "A standing optical slab of dispersion",
    idea: "One tall glass monolith refracts a hidden spectrum — chromatic dispersion, internal light, a bright machined edge. Not a glassmorphism card: a solid art-directed object that breaks out of its container.",
    productLink: "The account as a solid, inspectable object — light passes through, nothing is hidden.",
    composition: "hybrid",
    layout: "editorial",
    palette: ["#b9e8ff", "#ffd9ec", "#ffe9b8", "#171a19", "#050606"],
    paletteName: "Milky iridescence on graphite",
    motion: "Slab rises into place; a dispersion flare passes once, then stills",
    tech: "WebGL + CSS",
    preview:
      "linear-gradient(180deg, rgba(185,232,255,.3) 0%, rgba(255,217,236,.22) 40%, rgba(255,233,184,.18) 75%, transparent 100%) 68% 0 / 26% 100% no-repeat, #060707",
  },
  {
    id: "07",
    name: "Topographic Membrane",
    tagline: "An architectural contour surface",
    idea: "A procedural membrane described by fine topographic contours, lit from one side, folding slowly. The surface calms into a flat niche that holds the phone — form with a purpose, not decorative noise.",
    productLink: "Terrain as the map of corridors: the product sits where the landscape goes calm.",
    composition: "container",
    layout: "editorial",
    palette: ["#ebe8e1", "#8d928f", "#21f668", "#101312", "#060707"],
    paletteName: "Near-monochrome ink and bone, one lime contour",
    motion: "Contours rise from a flat plane; a light band sweeps once",
    tech: "WebGL",
    preview:
      "repeating-radial-gradient(80% 120% at 30% 40%, rgba(235,232,225,.16) 0 1px, transparent 1px 14px), repeating-radial-gradient(70% 100% at 75% 70%, rgba(33,246,104,.12) 0 1px, transparent 1px 22px), #0a0c0b",
  },
  {
    id: "08",
    name: "Dithered Value Field",
    tagline: "Light expressed as a discrete field",
    idea: "A luminous value field rendered through ordered dithering — cream and rare lime cells on ink. Digital and graphic, but paired with editorial serif type; the field resolves from coarse to fine at load.",
    productLink: "Continuous value, discrete units — money as a field of countable light.",
    composition: "container",
    layout: "editorial",
    palette: ["#f2ede2", "#0a0b0a", "#21f668", "#5b5f5c", "#000000"],
    paletteName: "Ink, cream, one lime — editorial halftone",
    motion: "Field refines from coarse cells to fine grain; waves cross slowly",
    tech: "WebGL",
    preview:
      "repeating-conic-gradient(rgba(242,237,226,.18) 0% 25%, transparent 0% 50%) 60% 0 / 7px 7px, radial-gradient(70% 90% at 70% 50%, rgba(242,237,226,.14), transparent 70%), #050505",
  },
  {
    id: "09",
    name: "Edge-to-Edge Color Event",
    tagline: "One staged spectral sweep, then quiet",
    idea: "At load, a single wide band of color — vermilion into amber into deep teal — crosses the full screen once, distorting space as it passes. Then the room goes almost dark and the copy owns the frame.",
    productLink: "The moment of a transfer: one decisive event, then certainty.",
    composition: "edge",
    layout: "editorial",
    palette: ["#ff4d2e", "#ffb45e", "#0e3b3b", "#f6efe2", "#050404"],
    paletteName: "Editorial warm: vermilion, amber, deep teal",
    motion: "Black frame, then one eased sweep (slow in, fast center, slow out); copy is born as the band crosses center; a slow fine dust field remains",
    tech: "WebGL",
    preview:
      "linear-gradient(100deg, transparent 30%, rgba(255,77,46,.5) 46%, rgba(255,180,94,.4) 54%, rgba(14,59,59,.5) 66%, transparent 80%), #050404",
  },
  {
    id: "10",
    name: "Quiet Black",
    tagline: "A single iridescent phenomenon",
    idea: "Near-total black and one exceptional object: a thin chromatic ring, drawn once around its circumference, with a slow tear of light where it began. No phone, no field, no gradient wash.",
    productLink: "Confidence as restraint: one perfect circle — one account that simply holds.",
    composition: "edge",
    layout: "editorial",
    palette: ["#8cc8ff", "#e06fb2", "#ffd9a0", "#4eff9e", "#000000"],
    paletteName: "Thin-film iridescence on absolute black",
    motion: "Ring draws itself in 1.8s, then rotates its hue imperceptibly",
    tech: "WebGL",
    preview:
      "radial-gradient(46% 62% at 64% 50%, transparent 55%, rgba(140,200,255,.5) 57.5%, rgba(224,111,178,.4) 59%, transparent 61%), #000",
  },
];

export function getVariant(id: string) {
  return labVariants.find((variant) => variant.id === id);
}
