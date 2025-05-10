"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useRef, useState } from "react"
import { useForm, ValidationError } from "@formspree/react"

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
}

export default function ContactForm({ labels }: ContactFormProps) {
  const [state, handleSubmit] = useForm("xovdlgky") // Usando Formspree
  const formRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
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
          <form onSubmit={handleSubmit} method="POST" className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {labels.name}
              </label>
              <Input id="name" name="name" required className="bg-[#1d1d1d] border-gray-700" />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {labels.email}
              </label>
              <Input id="email" name="email" type="email" required className="bg-[#1d1d1d] border-gray-700" />
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
                className="bg-[#1d1d1d] border-gray-700"
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
              <Textarea id="message" name="message" required className="bg-[#1d1d1d] border-gray-700" />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={state.submitting}>
              {state.submitting ? labels.sending : labels.submit}
            </Button>
            <ValidationError errors={state.errors} className="text-red-500 text-sm mt-1" />
          </form>
        )}
      </Card>
    </div>
  )
}
