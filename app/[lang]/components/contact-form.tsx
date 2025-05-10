"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useRef, useState } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { CookieConsent } from "@/components/cookie-consent"
import { i18n, type Locale } from "@/i18n"

interface ContactFormProps {
  labels: {
    name: string
    email: string
    whatsapp: string
    message: string
    submit: string
    sending: string
    success: string
    error: string
  }
  locale: Locale
}

export default function ContactForm({ labels, locale }: ContactFormProps) {
  const [state, handleSubmit] = useForm("xovdlgky") // Usando Formspree
  const formRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [cookiesAccepted, setCookiesAccepted] = useState(false)
  const [showCookieConsent, setShowCookieConsent] = useState(false)
  const t = i18n.messages[locale]

  // Verificar consentimento de cookies
  useEffect(() => {
    const checkCookieConsent = () => {
      const consent = localStorage.getItem("cookie-consent")
      setCookiesAccepted(consent === "accepted")
    }

    // Verificar inicialmente
    checkCookieConsent()

    // Verificar quando o armazenamento local mudar
    const handleStorageChange = () => {
      checkCookieConsent()
    }

    window.addEventListener("storage", handleStorageChange)

    // Verificar periodicamente (caso o usuário aceite em outra aba)
    const intervalId = setInterval(checkCookieConsent, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(intervalId)
    }
  }, [])

  // Efeito de animação ao entrar na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (formRef.current) {
      observer.observe(formRef.current)
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current)
      }
    }
  }, [])

  // Função para lidar com o foco nos campos quando não há consentimento
  const handleFieldFocus = () => {
    if (!cookiesAccepted) {
      setShowCookieConsent(true)
    }
  }

  return (
    <>
      <div
        ref={formRef}
        className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <Card className="p-6 bg-[#252525] border-gray-800">
          {state.succeeded ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">{labels.success}</h3>
              <p className="text-gray-400">Entraremos em contato em breve.</p>
              <Button className="mt-6" variant="outline" onClick={() => window.location.reload()}>
                Enviar outra mensagem
              </Button>
            </div>
          ) : (
            <>
              {!cookiesAccepted && (
                <div className="mb-6 p-4 bg-amber-900/20 border border-amber-700/30 rounded-md">
                  <p className="text-amber-200 text-sm">
                    {locale === "pt"
                      ? "Para utilizar este formulário, você precisa aceitar nossa política de cookies e privacidade."
                      : "To use this form, you need to accept our cookies and privacy policy."}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} method="POST" className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {labels.name}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    className={`bg-[#1d1d1d] border-gray-700 ${
                      !cookiesAccepted ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!cookiesAccepted}
                    onFocus={handleFieldFocus}
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {labels.email}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={`bg-[#1d1d1d] border-gray-700 ${
                      !cookiesAccepted ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!cookiesAccepted}
                    onFocus={handleFieldFocus}
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
                    {labels.whatsapp}
                  </label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder="+55 (00) 00000-0000"
                    className={`bg-[#1d1d1d] border-gray-700 ${
                      !cookiesAccepted ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!cookiesAccepted}
                    onFocus={handleFieldFocus}
                  />
                  <ValidationError
                    prefix="WhatsApp"
                    field="whatsapp"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {labels.message}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    className={`bg-[#1d1d1d] border-gray-700 ${
                      !cookiesAccepted ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!cookiesAccepted}
                    onFocus={handleFieldFocus}
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  className={`w-full bg-primary hover:bg-primary/90 ${
                    !cookiesAccepted ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={state.submitting || !cookiesAccepted}
                  onClick={!cookiesAccepted ? handleFieldFocus : undefined}
                >
                  {state.submitting ? labels.sending : labels.submit}
                </Button>
                <ValidationError errors={state.errors} className="text-red-500 text-sm mt-1" />
              </form>
            </>
          )}
        </Card>
      </div>

      {/* Banner de consentimento de cookies (exibido quando o usuário tenta usar o formulário) */}
      {showCookieConsent && !cookiesAccepted && (
        <CookieConsent
          locale={locale}
          translations={{
            title: t.cookies.title,
            description: t.cookies.description,
            accept: t.cookies.accept,
            reject: t.cookies.reject,
            settings: t.cookies.settings,
            privacyPolicy: t.cookies.privacyPolicy,
            privacyPolicyLink: "/privacy",
          }}
          onClose={() => setShowCookieConsent(false)}
        />
      )}
    </>
  )
}
