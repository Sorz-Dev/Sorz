import { type NextRequest, NextResponse } from "next/server"
import { i18n } from "@/i18n"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const response = NextResponse.next()

  // Adicionar cabeçalhos de cache para recursos estáticos
  if (
    pathname.includes("/_next/") ||
    pathname.includes("/images/") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico")
  ) {
    // Cache por 1 ano para recursos estáticos
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable")
    return response
  }

  // Verificar se o caminho já tem um prefixo de idioma
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  // Se já tiver um prefixo de idioma, não fazer nada
  if (pathnameHasLocale) {
    // Cache por 1 dia para páginas de conteúdo
    response.headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800")
    return response
  }

  // Obter o idioma preferido do usuário com base no Accept-Language
  const acceptLanguage = request.headers.get("accept-language") || ""

  // Verificar se o idioma é português (qualquer variante)
  const isPortuguese = acceptLanguage.toLowerCase().includes("pt")

  // Definir o locale com base na verificação
  const locale = isPortuguese ? "pt" : "en"

  // Criar uma nova URL com o prefixo de idioma
  const newUrl = new URL(`/${locale}${pathname}`, request.url)

  // Redirecionar para a nova URL
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // Ignorar arquivos estáticos e API
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
    // Incluir arquivos de imagem para cache
    "/images/:path*",
  ],
}
