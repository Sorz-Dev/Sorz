"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Transition } from "@headlessui/react"
import { Fragment, useEffect, useRef, useState } from "react"
import { submitContactForm } from "../actions"

export default function ContactForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
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

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      const response = await submitContactForm(formData)
      setMessage(response.message)
    } catch (error) {
      setMessage("Algo deu errado. Por favor, tente novamente.")
    } finally {
      setPending(false)
    }
  }

  return (
    <div ref={formRef}>
      <Transition
        show={isVisible}
        appear={true}
        enter="transition-all duration-500"
        enterFrom="opacity-0 translate-y-6"
        enterTo="opacity-100 translate-y-0"
        as={Fragment}
      >
        <Card className="p-6 bg-[#252525] border-gray-800">
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nome
              </label>
              <Input id="name" name="name" required className="bg-[#1d1d1d] border-gray-700" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input id="email" name="email" type="email" required className="bg-[#1d1d1d] border-gray-700" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Mensagem
              </label>
              <Textarea id="message" name="message" required className="bg-[#1d1d1d] border-gray-700" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={pending}>
              {pending ? "Enviando..." : "Enviar Mensagem"}
            </Button>
            {message && <p className="text-sm text-center mt-4 text-muted-foreground">{message}</p>}
          </form>
        </Card>
      </Transition>
    </div>
  )
}
