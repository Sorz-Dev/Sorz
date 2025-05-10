"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { i18n, type Locale } from "@/i18n"

interface LanguageSwitcherProps {
  currentLocale: Locale
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter()

  const switchLanguage = (locale: Locale) => {
    // Obter o caminho atual sem o prefixo de idioma
    const currentPath = window.location.pathname
    const pathWithoutLocale = currentPath.replace(/^\/(pt|en)/, "")

    // Redirecionar para o mesmo caminho com o novo idioma
    router.push(`/${locale}${pathWithoutLocale}`)
  }

  return (
    <div className="flex space-x-2">
      {i18n.locales.map((locale) => (
        <Button
          key={locale}
          variant={currentLocale === locale ? "default" : "outline"}
          size="sm"
          onClick={() => switchLanguage(locale as Locale)}
          className="text-xs"
        >
          {locale === "pt" ? "PT" : "EN"}
        </Button>
      ))}
    </div>
  )
}
