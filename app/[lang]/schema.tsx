import { i18n, type Locale } from "@/i18n"

export function generateSchemaMarkup(lang: Locale) {
  const t = i18n.messages[lang]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sorz",
    url: "https://sorz.com.br",
    logo: {
      "@type": "ImageObject",
      url: "https://sorz.com.br/logo-og.webp",
      width: 1200,
      height: 630,
    },
    description: t.meta.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressRegion: "SP",
      addressLocality: "Campinas",
      postalCode: "13000-000",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "soarxz.dev@gmail.com",
      telephone: "+5519998817808",
    },
    sameAs: [
      "https://github.com/Sorz-Dev",
      "https://www.linkedin.com/in/bruno-soares-7885311b2/",
      "https://x.com/Sorz_dev",
      "https://www.instagram.com/sorz.dev/",
    ],
  }

  return JSON.stringify(schema)
}
