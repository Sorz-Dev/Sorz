import type { Metadata } from "next"
import { i18n, type Locale } from "@/i18n"
import ClientPage from "./client-page"
import Script from "next/script"
import { generateSchemaMarkup } from "./schema"

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const messages = i18n.messages[params.lang]

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    openGraph: {
      images: [
        {
          url: "https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/Frame-1.png",
        },
      ],
    },
  }
}

export default function Page({ params }: { params: { lang: Locale } }) {
  // Verificar se o idioma existe e usar o padrão se não existir
  const lang = i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale
  const schemaMarkup = generateSchemaMarkup(lang)

  return (
    <>
      <Script id="schema-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaMarkup }} />
      <ClientPage params={{ lang }} />
    </>
  )
}
