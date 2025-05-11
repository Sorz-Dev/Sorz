"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"
import type { Locale } from "@/i18n"

interface CookieConsentProps {
  locale: Locale
  translations: {
    title: string
    description: string
    accept: string
    reject: string
    privacyPolicy: string
    privacyPolicyLink: string
  }
  onClose?: () => void
  forceShow?: boolean
}

export function CookieConsent({ locale, translations, onClose, forceShow = false }: CookieConsentProps) {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já deu consentimento
    const consent = localStorage.getItem("cookie-consent")
    if (!consent || forceShow) {
      setShowConsent(true)
    }
  }, [forceShow])

  // Atualizar quando forceShow mudar
  useEffect(() => {
    if (forceShow) {
      setShowConsent(true)
    }
  }, [forceShow])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)

    // Disparar evento para notificar outros componentes
    window.dispatchEvent(new Event("storage"))

    if (onClose) onClose()
  }

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowConsent(false)

    // Disparar evento para notificar outros componentes
    window.dispatchEvent(new Event("storage"))

    if (onClose) onClose()
  }

  const handleClose = () => {
    setShowConsent(false)
    if (onClose) onClose()
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[#252525] border-t border-zinc-800 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{translations.title}</h3>
            <p className="text-sm text-gray-300 mb-2">{translations.description}</p>
            <p className="text-xs text-gray-400">
              <Link href={`/${locale}${translations.privacyPolicyLink}`} className="underline hover:text-white">
                {translations.privacyPolicy}
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={rejectCookies}
              className="text-white border-white hover:bg-gray-700"
            >
              {translations.reject}
            </Button>
            <Button size="sm" onClick={acceptCookies} className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              {translations.accept}
            </Button>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          aria-label="Fechar"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
