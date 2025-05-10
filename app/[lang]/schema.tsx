import { i18n, type Locale } from "@/i18n"

export function generateSchemaMarkup(lang: Locale) {
  const t = i18n.messages[lang]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sorz",
    url: "https://sorz.com.br",
    logo: "https://sorz.com.br/images/logo-og.webp",
    description: t.meta.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressRegion: "SP",
      addressLocality: "Campinas",
      postalCode: "13000-000",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-22.9099",
      longitude: "-47.0626",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "soarxz.dev@gmail.com",
    },
    sameAs: [
      "https://github.com/Sorz-Dev",
      "https://www.linkedin.com/in/bruno-soares-7885311b2/",
      "https://x.com/Sorz_dev",
      "https://www.instagram.com/sorz.dev/",
    ],
    knowsAbout: ["Web Development", "Progressive Web Apps", "Native Applications", "Digital Solutions"],
  }

  return JSON.stringify(schema)
}
