"use client"

import { Github, Linkedin, Mail, Twitter, Instagram, Menu } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"
import TagList from "./components/tag-list"
import Image from "next/image"
import { i18n, type Locale } from "@/i18n"
import LanguageSwitcher from "./components/language-switcher"
import { useState, useEffect, useRef } from "react"
import { CookieConsent } from "@/components/cookie-consent"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ExpandableText } from "@/app/[lang]/components/ui/expandable-text"

export default function ClientPage({ params }: { params: { lang: Locale } }) {
  // Garantir que estamos usando um idioma válido
  const lang = i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale
  const t = i18n.messages[lang]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cookieConsentShown, setCookieConsentShown] = useState(false)
  const [stylesLoaded, setStylesLoaded] = useState(false)
  const initialRenderRef = useRef(true)

  // Garantir que o Tailwind seja aplicado corretamente
  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false

      // Forçar o navegador a recalcular os estilos após o carregamento inicial
      const timer = setTimeout(() => {
        // Adicionar e remover uma classe temporária para forçar o recálculo
        document.body.classList.add("force-recalc")
        setTimeout(() => {
          document.body.classList.remove("force-recalc")
          setStylesLoaded(true)
        }, 50)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [])

  // Garantir que o texto seja renderizado corretamente em ambos os idiomas
  useEffect(() => {
    // Forçar um re-render quando o idioma mudar para garantir que os estilos sejam aplicados corretamente
    document.documentElement.classList.remove("lang-pt", "lang-en")
    document.documentElement.classList.add(`lang-${lang}`)

    // Pequeno hack para forçar o reflow do layout
    const timer = setTimeout(() => {
      document.body.style.opacity = "0.99"
      setTimeout(() => {
        document.body.style.opacity = "1"
      }, 10)
    }, 0)

    return () => clearTimeout(timer)
  }, [lang])

  // Tradução para as tecnologias específicas
  const marketingTechTranslations = {
    pt: {
      googleBusiness: "Google Meu Negócio",
      security: "Segurança",
      performance: "Desempenho",
      optimization: "Otimização",
    },
    en: {
      googleBusiness: "Google Business Profile",
      security: "Security",
      performance: "Performance",
      optimization: "Optimization",
    },
  }

  useEffect(() => {
    // Verificar se o usuário já deu consentimento
    const consent = localStorage.getItem("cookie-consent")
    setCookieConsentShown(!!consent)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    const header = document.querySelector("header")
    const headerHeight = header ? header.offsetHeight : 0

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      })
    }

    // Fechar o menu móvel após clicar
    setMobileMenuOpen(false)
  }

  // Fechar o menu móvel quando a tela for redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Definir as tags para cada serviço
  const serviceTags = {
    webDevelopment: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/UI",
      "Headless UI",
      "PWA",
      "Responsive",
    ],
    ecommerce: ["Next.js", "PWA", "Node.js", "PostgreSQL", "Stripe", "Admin Panel", "SEO", "Marketing"],
    mobileDevelopment: ["React Native", "Expo", "NativeWind", "Node.js", "App Store", "Play Store"],
    backend: ["Node.js", "Nest.js", "Bun", "PostgreSQL", "Auth0", "API REST"],
    seo: ["PageSpeed", "Google Business", "Search Console", "Schema.org", "Local SEO"],
    marketing: ["Google Ads", "Meta Ads", "Social Media", "Lead Generation", "Content Design"],
    freelance: ["Campinas", "Brasil", "Worldwide", "Remote"],
  }

  return (
    <div className={`min-h-screen bg-[#1d1d1d] ${stylesLoaded ? "styles-loaded" : "styles-loading"}`}>
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#1d1d1d]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1d1d1d]/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center">
            <Link href="/" className="mr-4 flex items-center" aria-label="Sorz - Página inicial">
              <div className="h-6 w-12 relative">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 420 206"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M33.4455 127.662L98.8823 169.732V206L0 142.169V113.155L98.8823 49.3239V85.5915L33.4455 127.662Z"
                    fill="#FFA600"
                  />
                  <path d="M222.428 0L152.629 203.099H114.821L184.62 0H222.428Z" fill="#FF4000" />
                  <path
                    d="M420 139.137C420 145.682 419.148 151.59 417.444 156.86C415.825 162.045 413.652 166.635 410.926 170.631C408.199 174.626 405.004 178.026 401.34 180.831C397.676 183.636 393.885 185.931 389.966 187.716C386.046 189.501 382.042 190.819 377.952 191.669C373.947 192.519 370.156 192.944 366.577 192.944H238.387V159.793H366.577C372.967 159.793 377.909 157.923 381.402 154.183C384.981 150.443 386.77 145.427 386.77 139.137C386.77 136.077 386.302 133.272 385.364 130.722C384.427 128.172 383.064 125.962 381.275 124.092C379.571 122.222 377.44 120.777 374.884 119.757C372.413 118.737 369.644 118.227 366.577 118.227H290.149C284.781 118.227 278.987 117.292 272.767 115.422C266.547 113.467 260.753 110.364 255.385 106.114C250.103 101.864 245.672 96.2962 242.094 89.411C238.6 82.5258 236.854 74.1106 236.854 64.1653C236.854 54.2201 238.6 45.8474 242.094 39.0472C245.672 32.162 250.103 26.5944 255.385 22.3443C260.753 18.0091 266.547 14.9066 272.767 13.0365C278.987 11.0815 284.781 10.1039 290.149 10.1039H403.257V43.2548H290.149C283.844 43.2548 278.902 45.1673 275.323 48.9924C271.83 52.8175 270.083 57.8752 270.083 64.1653C270.083 70.5405 271.83 75.5981 275.323 79.3382C278.902 82.9933 283.844 84.8209 290.149 84.8209H366.833C370.411 84.9059 374.203 85.4159 378.207 86.3509C382.212 87.2009 386.174 88.561 390.093 90.431C394.098 92.3011 397.889 94.6811 401.468 97.5712C405.047 100.376 408.199 103.776 410.926 107.771C413.737 111.767 415.953 116.357 417.572 121.542C419.191 126.727 420 132.592 420 139.137Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="sr-only">Sorz</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <button onClick={() => scrollToSection("about")} className="transition-colors hover:text-foreground/80">
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="transition-colors hover:text-foreground/80"
              >
                {t.nav.projects}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="transition-colors hover:text-foreground/80"
              >
                {t.services.title}
              </button>
              <button onClick={() => scrollToSection("tech")} className="transition-colors hover:text-foreground/80">
                {t.nav.tech}
              </button>
              <button onClick={() => scrollToSection("contact")} className="transition-colors hover:text-foreground/80">
                {t.nav.contact}
              </button>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <LanguageSwitcher currentLocale={lang} />
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Menu móvel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#252525] border-b border-gray-800">
            <nav className="flex flex-col p-4 space-y-4">
              <button onClick={() => scrollToSection("about")} className="text-left py-2">
                {t.nav.about}
              </button>
              <button onClick={() => scrollToSection("projects")} className="text-left py-2">
                {t.nav.projects}
              </button>
              <button onClick={() => scrollToSection("services")} className="text-left py-2">
                {t.services.title}
              </button>
              <button onClick={() => scrollToSection("tech")} className="text-left py-2">
                {t.nav.tech}
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-left py-2">
                {t.nav.contact}
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="container px-4 md:px-6">
        <section id="about" className="py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="h-[48px] w-[218px] relative mb-4">
                <Image src="/images/logo.webp" alt="Sorz Logo" fill className="object-contain" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {t.hero.title}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">{t.hero.description}</p>
              </div>
              <div className="space-x-4">
                <Link href="https://github.com/Sorz-Dev" target="_blank" className="inline-block">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/bruno-soares-7885311b2/"
                  target="_blank"
                  className="inline-block"
                >
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

        <section id="projects" className="py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-center">
              {t.projects.title}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title={t.projects.items[0].title}
                description={t.projects.items[0].description}
                image="/images/delivery.jpeg"
                link="https://delivery.sorz.com.br/"
                tags={t.projects.items[0].tags}
                github={false}
                viewWebsite={t.projects.viewWebsite}
                viewGithub={t.projects.viewGithub}
              />
              <ProjectCard
                title={t.projects.items[1].title}
                description={t.projects.items[1].description}
                image="/images/jlmudancas.jpeg"
                link="https://www.jlmudancas.com"
                tags={t.projects.items[1].tags}
                github="https://github.com/Sorz-Dev/jlmudancas"
                viewWebsite={t.projects.viewWebsite}
                viewGithub={t.projects.viewGithub}
              />
              <ProjectCard
                title={t.projects.items[2].title}
                description={t.projects.items[2].description}
                image="/images/cardapio.jpeg"
                link="https://cardapio.sorz.com.br/"
                tags={t.projects.items[2].tags}
                github="https://github.com/Sorz-Dev/cardapio"
                viewWebsite={t.projects.viewWebsite}
                viewGithub={t.projects.viewGithub}
              />
            </div>
          </div>
        </section>

        {/* Nova seção de serviços para melhorar SEO */}
        <section id="services" className="py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-center">
              {t.services.title}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">{t.services.webDevelopment.title}</h3>
                <ExpandableText
                  text={t.services.webDevelopment.description}
                  maxLines={4}
                  className="mb-4"
                  expandLabel={lang === "pt" ? "Leia mais" : "Read more"}
                  collapseLabel={lang === "pt" ? "Leia menos" : "Read less"}
                />
                <TagList tags={serviceTags.webDevelopment} />
              </div>
              <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">{t.services.ecommerce.title}</h3>
                <ExpandableText
                  text={t.services.ecommerce.description}
                  maxLines={4}
                  className="mb-4"
                  expandLabel={lang === "pt" ? "Leia mais" : "Read more"}
                  collapseLabel={lang === "pt" ? "Leia menos" : "Read less"}
                />
                <TagList tags={serviceTags.ecommerce} />
              </div>
              <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">{t.services.mobileDevelopment.title}</h3>
                <ExpandableText
                  text={t.services.mobileDevelopment.description}
                  maxLines={4}
                  className="mb-4"
                  expandLabel={lang === "pt" ? "Leia mais" : "Read more"}
                  collapseLabel={lang === "pt" ? "Leia menos" : "Read less"}
                />
                <TagList tags={serviceTags.mobileDevelopment} />
              </div>
              <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">{t.services.backend.title}</h3>
                <ExpandableText
                  text={t.services.backend.description}
                  maxLines={4}
                  className="mb-4"
                  expandLabel={lang === "pt" ? "Leia mais" : "Read more"}
                  collapseLabel={lang === "pt" ? "Leia menos" : "Read less"}
                />
                <TagList tags={serviceTags.backend} />
              </div>
              <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">{t.services.seo.title}</h3>
                <ExpandableText
                  text={t.services.seo.description}
                  maxLines={4}
                  className="mb-4"
                  expandLabel={lang === "pt" ? "Leia mais" : "Read more"}
                  collapseLabel={lang === "pt" ? "Leia menos" : "Read less"}
                />
                <TagList tags={serviceTags.seo} />
              </div>
              <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">{t.services.marketing.title}</h3>
                <ExpandableText
                  text={t.services.marketing.description}
                  maxLines={4}
                  className="mb-4"
                  expandLabel={lang === "pt" ? "Leia mais" : "Read more"}
                  collapseLabel={lang === "pt" ? "Leia menos" : "Read less"}
                />
                <TagList tags={serviceTags.marketing} />
              </div>
              <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Freelance</h3>
                <ExpandableText
                  text={
                    lang === "pt"
                      ? "Serviços de desenvolvimento freelance para clientes no Brasil e no mundo todo. Atendimento presencial em Campinas e região, e trabalho remoto para qualquer lugar do planeta."
                      : "Freelance development services for clients in Brazil and worldwide. In-person service in Campinas region, and remote work for anywhere in the world."
                  }
                  maxLines={4}
                  className="mb-4"
                  expandLabel={lang === "pt" ? "Leia mais" : "Read more"}
                  collapseLabel={lang === "pt" ? "Leia menos" : "Read less"}
                />
                <TagList tags={serviceTags.freelance} />
              </div>
            </div>
          </div>
        </section>

        <section id="tech" className="py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-center">
              {t.tech.title}
            </h2>
            <TechStack
              categories={{
                frontend: t.tech.categories.frontend,
                backend: t.tech.categories.backend,
                devops: t.tech.categories.devops,
                tools: t.tech.categories.tools,
                marketing: t.tech.categories.marketing,
              }}
            />
          </div>
        </section>

        <section id="contact" className="py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-center">
                {t.contact.title}
              </h2>
              <ContactForm
                labels={{
                  name: t.contact.name,
                  email: t.contact.email,
                  whatsapp: t.contact.whatsapp,
                  message: t.contact.message,
                  submit: t.contact.submit,
                  sending: t.contact.sending,
                  success: t.contact.success,
                  error: t.contact.error,
                }}
                locale={lang}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 mt-6">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-gray-400">{t.footer.copyright}</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href={`/${lang}/terms`}>
              {t.footer.terms}
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href={`/${lang}/privacy`}>
              {t.footer.privacy}
            </Link>
          </nav>
        </div>
      </footer>

      {/* Botão de WhatsApp */}
      <WhatsAppButton locale={lang} />

      {/* Banner de consentimento de cookies */}
      {!cookieConsentShown && (
        <CookieConsent
          locale={lang}
          translations={{
            title: t.cookies.title,
            description: t.cookies.description,
            accept: t.cookies.accept,
            reject: t.cookies.reject,
            privacyPolicy: t.cookies.privacyPolicy,
            privacyPolicyLink: "/privacy",
          }}
          onClose={() => setCookieConsentShown(true)}
        />
      )}
    </div>
  )
}
