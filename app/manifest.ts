import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  // Infelizmente o campo "lang" no manifesto aceita apenas um idioma principal
  // Vamos usar uma abordagem que indica melhor o suporte multilíngue

  return {
    name: "Sorz - Desenvolvimento Digital",
    short_name: "Sorz",
    description:
      "Empresa especializada em desenvolvimento de sites, web apps (PWA) e aplicativos nativos. | Company specialized in developing websites, web apps and native applications.",
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
    // Usando o idioma padrão do site, mas incluiremos informações sobre o multilinguismo em outros lugares
    lang: "pt-BR",
    dir: "ltr",
    orientation: "portrait",
    prefer_related_applications: false,
    // Incluindo atalhos para ambos os idiomas para indicar suporte multilíngue
    shortcuts: [
      {
        name: "Contato (PT)",
        url: "/pt#contact",
        description: "Entre em contato conosco",
      },
      {
        name: "Contact (EN)",
        url: "/en#contact",
        description: "Get in touch with us",
      },
      {
        name: "Projetos (PT)",
        url: "/pt#projects",
        description: "Veja nossos projetos",
      },
      {
        name: "Projects (EN)",
        url: "/en#projects",
        description: "View our projects",
      },
    ],
    // Adicionando uma propriedade personalizada para indicar os idiomas suportados
    // Isso não é padrão, mas pode ser útil para scripts personalizados
    related_applications: [
      {
        platform: "webapp",
        url: "https://sorz.com.br/pt",
        id: "sorz-pt",
      },
      {
        platform: "webapp",
        url: "https://sorz.com.br/en",
        id: "sorz-en",
      },
    ],
  }
}
