"use client"

import { useEffect } from "react"
import { i18n } from "@/i18n"

export default function Home() {
  useEffect(() => {
    // Detectar o idioma do navegador
    const detectLanguage = () => {
      if (typeof window !== "undefined" && navigator.language) {
        const browserLang = navigator.language.split("-")[0]
        return i18n.locales.includes(browserLang) ? browserLang : i18n.defaultLocale
      }
      return i18n.defaultLocale
    }

    const detectedLang = detectLanguage()
    window.location.href = `/${detectedLang}`
  }, [])

  // Isso nunca será renderizado, pois o redirecionamento acontecerá antes
  return null
}
