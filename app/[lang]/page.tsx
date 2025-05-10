import type { Metadata } from "next"
import { i18n, type Locale } from "@/i18n"
import ClientPage from "./client-page"

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const messages = i18n.messages[params.lang]

  return {
    title: messages.meta.title,
    description: messages.meta.description,
  }
}

export default function Page({ params }: { params: { lang: Locale } }) {
  // Verificar se o idioma existe e usar o padrão se não existir
  const lang = i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale

  return <ClientPage params={{ lang }} />
}
