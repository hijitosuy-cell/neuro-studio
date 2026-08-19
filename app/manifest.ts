import type { MetadataRoute } from "next";

/**
 * Permite instalar la web como app: icono propio en el escritorio (Windows/Mac)
 * y en la pantalla de inicio del celular, abriendo sin barra del navegador.
 * El atajo lleva directo al panel interno.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Neuro Studio · Sistemas para automotoras",
    short_name: "Neuro Studio",
    description:
      "Diagnóstico y sistema comercial para automotoras: encontramos dónde perdés ventas y construimos el sistema para recuperarlas.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#060a16",
    theme_color: "#060a16",
    lang: "es-UY",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Panel interno",
        short_name: "Panel",
        description: "Ver los diagnósticos recibidos",
        url: "/panel",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Agendar reunión",
        short_name: "Agendar",
        url: "/#agendar",
      },
    ],
  };
}
