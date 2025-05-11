import type { MetadataRoute } from "next"
import { i18n } from "@/i18n"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sorz.com.br"

  const routes = ["", "/privacy", "/terms", "/privacy-settings"]

  const sitemap: MetadataRoute.Sitemap = []

  // Adicionar URLs para cada idioma
  for (const locale of i18n.locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8,
      })
    }
  }

  return sitemap
}
