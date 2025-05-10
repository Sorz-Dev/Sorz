"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Locale } from "@/i18n"

interface CookieConsentProps {
  locale: Locale
  translations: {
    title: string
    description: string
    accept: string
    reject: string
    settings: string
    privacyPolicy: string
    privacyPolicyLink: string
  }
}

export function CookieConsent({ locale, translations }: CookieConsentProps) {
  const [showConsent, setShowConsent] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário já deu consentimento
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowConsent(false)
  }

  const openSettings = () => {
    router.push(`/${locale}/privacy-settings`)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[#252525] border-t border-gray-800 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{translations.title}</h3>
            <p className="text-sm text-gray-300 mb-2">{translations.description}</p>
            <p className="text-xs text-gray-400">
              <Link href={`/${locale}${translations.privacyPolicyLink}`} className="underline hover:text-primary">
                {translations.privacyPolicy}
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={rejectCookies}>
              {translations.reject}
            </Button>
            <Button variant="outline" size="sm" onClick={openSettings}>
              {translations.settings}
            </Button>
            <Button size="sm" onClick={acceptCookies}>
              {translations.accept}
            </Button>
          </div>
        </div>
        <button
          onClick={rejectCookies}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  )
}
