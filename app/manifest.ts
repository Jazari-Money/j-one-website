import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jazari One",
    short_name: "Jazari One",
    description:
      "Hold digital dollars, send them in local currency, and access variable yield with Jazari One.",
    start_url: "./",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
