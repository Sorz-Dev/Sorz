"use client"

import { i18n, type Locale } from "@/i18n"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function PrivacySettingsPage({ params }: { params: { lang: Locale } }) {
  const lang = i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale
  const t = i18n.messages[lang]

  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Sempre ativo
    analytics: false,
    marketing: false,
  })

  const [saved, setSaved] = useState(false)

  // Carregar preferências salvas
  useEffect(() => {
    const savedPreferences = localStorage.getItem("cookie-preferences")
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences))
    }
  }, [])

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-preferences", JSON.stringify(cookiePreferences))
    localStorage.setItem("cookie-consent", "custom")
    setSaved(true)

    // Resetar mensagem após 3 segundos
    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#1d1d1d]">
      <div className="container px-4 py-8 md:py-12">
        <Link href={`/${lang}`} className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {lang === "pt" ? "Voltar para a página inicial" : "Back to home"}
        </Link>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{t.privacySettings.title}</h1>
          <p className="text-gray-300 mb-8">{t.privacySettings.description}</p>

          <Card className="p-6 bg-[#252525] border-gray-800 mb-6">
            <h2 className="text-xl font-semibold mb-4">{t.privacySettings.cookiePreferences}</h2>

            <div className="space-y-6">
              {/* Cookies necessários */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">{t.cookies.necessary}</Label>
                  <p className="text-sm text-gray-400">{t.cookies.necessaryDescription}</p>
                </div>
                <Switch checked={true} disabled />
              </div>

              {/* Cookies analíticos */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">{t.cookies.analytics}</Label>
                  <p className="text-sm text-gray-400">{t.cookies.analyticsDescription}</p>
                </div>
                <Switch
                  checked={cookiePreferences.analytics}
                  onCheckedChange={(checked) => setCookiePreferences({ ...cookiePreferences, analytics: checked })}
                />
              </div>

              {/* Cookies de marketing */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">{t.cookies.marketing}</Label>
                  <p className="text-sm text-gray-400">{t.cookies.marketingDescription}</p>
                </div>
                <Switch
                  checked={cookiePreferences.marketing}
                  onCheckedChange={(checked) => setCookiePreferences({ ...cookiePreferences, marketing: checked })}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSavePreferences}>
              {saved ? (lang === "pt" ? "Salvo!" : "Saved!") : t.privacySettings.save}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
