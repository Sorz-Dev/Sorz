"use client"

import { useState, useEffect } from "react"
import { i18n, type Locale } from "@/i18n"

interface WhatsAppButtonProps {
  locale: Locale
}

export function WhatsAppButton({ locale }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isNearFooter, setIsNearFooter] = useState(false)
  const [cookiesAccepted, setCookiesAccepted] = useState(false)
  const messages = i18n.messages[locale]
  // Texto mais curto para o botão
  const buttonText = locale === "pt" ? "Fale conosco" : "Talk to us"
  const whatsappNumber = "+5519998817808"
  const whatsappMessage =
    locale === "pt"
      ? "Olá! Vim do site da Sorz e gostaria de mais informações."
      : "Hello! I came from the Sorz website and would like more information."

  // Verificar consentimento de cookies e rolagem
  useEffect(() => {
    const checkCookieConsent = () => {
      const consent = localStorage.getItem("cookie-consent")
      setCookiesAccepted(consent === "accepted")
    }

    const handleScroll = () => {
      // Mostrar o botão após um scroll mínimo (reduzido para aparecer mais cedo)
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Verificar se está próximo ao rodapé
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollPosition = window.scrollY + windowHeight

      // Ajustado: Reduzir a margem para que o botão suba apenas quando estiver muito próximo ao rodapé
      // Usando 60px como margem (altura aproximada do rodapé)
      const footerThreshold = 60

      // Se estiver próximo ao rodapé, ajustar a posição
      if (documentHeight - scrollPosition < footerThreshold) {
        setIsNearFooter(true)
      } else {
        setIsNearFooter(false)
      }
    }

    // Verificar inicialmente
    checkCookieConsent()

    // Verificar quando o armazenamento local mudar
    const handleStorageChange = () => {
      checkCookieConsent()
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("storage", handleStorageChange)

    // Verificar periodicamente (caso o usuário aceite em outra aba)
    const intervalId = setInterval(checkCookieConsent, 1000)

    // Executar handleScroll inicialmente para configurar o estado
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(intervalId)
    }
  }, [])

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(url, "_blank")
  }

  // Só mostrar o botão se o usuário aceitou os cookies E rolou a página
  if (!cookiesAccepted) return null

  return (
    <div
      className={`fixed z-50 transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${isNearFooter ? "bottom-24 md:bottom-20" : "bottom-6"} right-6`}
    >
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-2 px-3 rounded-full shadow-lg transition-all text-sm whitespace-nowrap"
        aria-label={buttonText}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="white"
          className="inline-block shrink-0"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="inline-block font-medium">{buttonText}</span>
      </button>
    </div>
  )
}
