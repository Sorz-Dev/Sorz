import { i18n, type Locale } from "@/i18n"

export function generateSchemaMarkup(lang: Locale) {
  const t = i18n.messages[lang]

  // Schema para a organização
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sorz",
    url: "https://sorz.com.br",
    logo: {
      "@type": "ImageObject",
      url: "https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/og.png",
      width: 1200,
      height: 630,
    },
    description: t.meta.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressRegion: "SP",
      addressLocality: "Campinas",
      postalCode: "13041-000",
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

  // Schema para serviços locais
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sorz - Desenvolvimento Digital",
    image: "https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/og.png",
    "@id": "https://sorz.com.br",
    url: "https://sorz.com.br",
    telephone: "+5519998817808",
    email: "soarxz.dev@gmail.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Campinas",
      addressLocality: "Campinas",
      addressRegion: "SP",
      postalCode: "13041-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -22.9099,
      longitude: -47.0626,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    sameAs: [
      "https://github.com/Sorz-Dev",
      "https://www.linkedin.com/in/bruno-soares-7885311b2/",
      "https://x.com/Sorz_dev",
      "https://www.instagram.com/sorz.dev/",
    ],
  }

  // Schema para serviços oferecidos
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Desenvolvimento Digital",
    provider: {
      "@type": "Organization",
      name: "Sorz",
      url: "https://sorz.com.br",
    },
    areaServed: {
      "@type": "City",
      name: "Campinas",
    },
    description: t.meta.description,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "BRL",
      },
    },
  }

  // Combinar todos os schemas
  const schemas = [organizationSchema, localBusinessSchema, servicesSchema]
  return JSON.stringify(schemas)
}
