import { type NextRequest, NextResponse } from "next/server"
import { i18n } from "@/i18n"

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Ignorar arquivos públicos
  if (PUBLIC_FILE.test(pathname)) return

  // Verificar se o caminho já tem um prefixo de idioma
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  // Se já tiver um prefixo de idioma, não fazer nada
  if (pathnameHasLocale) return

  // Obter o idioma preferido do usuário com base no Accept-Language
  const acceptLanguage = request.headers.get("accept-language") || ""

  // Verificar se o idioma é português (qualquer variante)
  const isPortuguese = acceptLanguage.toLowerCase().includes("pt")

  // Definir o locale com base na verificação
  const locale = isPortuguese ? "pt" : "en"

  // Criar uma nova URL com o prefixo de idioma
  const newUrl = new URL(`/${locale}${pathname}`, request.url)

  // Preservar os parâmetros de consulta
  newUrl.search = request.nextUrl.search

  // Adicionar cabeçalho de Vary para informar que a resposta varia com base no Accept-Language
  const response = NextResponse.redirect(newUrl)
  response.headers.set("Vary", "Accept-Language")

  return response
}

export const config = {
  matcher: [
    // Ignorar arquivos estáticos e API
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
}
