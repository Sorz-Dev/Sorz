"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react"
import { ExpandableText } from "./ui/expandable-text"
import type { Locale } from "@/i18n"

interface HeroSectionProps {
  title: string
  description: string
  locale: Locale
}

export default function HeroSection({ title, description, locale }: HeroSectionProps) {
  return (
    <section id="about" className="py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="h-[48px] w-[218px] relative mb-4">
            <Image src="/images/logo.webp" alt="Sorz Logo" fill className="object-contain" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">{title}</h1>
            <ExpandableText
              text={description}
              maxLines={3}
              className="mx-auto max-w-[700px] text-gray-400 md:text-xl"
              expandLabel={locale === "pt" ? "Leia mais" : "Read more"}
              collapseLabel={locale === "pt" ? "Leia menos" : "Read less"}
            />
          </div>
          <div className="space-x-4">
            <Link href="https://github.com/Sorz-Dev" target="_blank" className="inline-block">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/bruno-soares-7885311b2/" target="_blank" className="inline-block">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://x.com/Sorz_dev" target="_blank" className="inline-block">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://www.instagram.com/sorz.dev/" target="_blank" className="inline-block">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="mailto:soarxz.dev@gmail.com" className="inline-block">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
