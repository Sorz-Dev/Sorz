import { i18n, type Locale } from "@/i18n"
import { format } from "date-fns"
import { ptBR, enUS } from "date-fns/locale"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const messages = i18n.messages[params.lang]

  return {
    title: `${messages.terms.title} | Sorz`,
  }
}

export default function TermsPage({ params }: { params: { lang: Locale } }) {
  const lang = i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale
  const t = i18n.messages[lang]

  const dateLocale = lang === "pt" ? ptBR : enUS
  const currentDate = format(new Date(), "dd MMMM yyyy", { locale: dateLocale })

  return (
    <div className="min-h-screen bg-[#1d1d1d]">
      <div className="container px-4 py-8 md:py-12">
        <Link href={`/${lang}`} className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {lang === "pt" ? "Voltar para a página inicial" : "Back to home"}
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{t.terms.title}</h1>
          <p className="text-sm text-gray-400 mb-8">
            {t.terms.lastUpdated} {currentDate}
          </p>

          <div className="space-y-8">
            {t.terms.content.map((section, index) => (
              <div key={index} className="space-y-2">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="text-gray-300">{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
