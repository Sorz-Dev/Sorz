import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sorz - Desenvolvimento Digital",
    short_name: "Sorz",
    description: "Empresa especializada em desenvolvimento de sites, web apps (PWA) e aplicativos nativos.",
    start_url: "/",
    display: "browser",
    background_color: "#1d1d1d",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/Frame-1.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
    categories: ["business", "productivity", "web development"],
    lang: "pt-BR",
    dir: "ltr",
    orientation: "portrait",
    prefer_related_applications: false,
    shortcuts: [
      {
        name: "Contato",
        url: "/pt#contact",
        description: "Entre em contato conosco",
      },
      {
        name: "Projetos",
        url: "/pt#projects",
        description: "Veja nossos projetos",
      },
    ],
  }
}
