import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { i18n, type Locale } from "@/i18n"
import "../globals.css"
import type React from "react"
import Script from "next/script"

// Otimização: Carregamento de fonte com display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const messages = i18n.messages[params.lang]
  const locale = params.lang === "pt" ? "pt_BR" : "en_US"
  const siteUrl = "https://sorz.com.br"

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: messages.meta.keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        pt: "/pt",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/${params.lang}`,
      title: messages.meta.title,
      description: messages.meta.description,
      siteName: "Sorz",
      images: [
        {
          url: "https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/og.png",
          width: 1200,
          height: 630,
          alt: messages.meta.title,
        },
      ],
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.title,
      description: messages.meta.description,
      images: ["https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/Frame-1.svg",
    },
    verification: {
      google: "google-site-verification-code", // Substitua pelo seu código de verificação do Google
    },
    other: {
      "geo.region": params.lang === "pt" ? "BR-SP" : "BR-SP",
      "geo.placename": "Campinas",
      "geo.position": "-22.9099;-47.0626",
      ICBM: "-22.9099, -47.0626",
      "place:location:latitude": "-22.9099",
      "place:location:longitude": "-47.0626",
      "business:contact_data:street_address": "Campinas",
      "business:contact_data:locality": "Campinas",
      "business:contact_data:postal_code": "13041-000",
      "business:contact_data:country_name": "Brasil",
      "business:contact_data:email": "soarxz.dev@gmail.com",
      "business:contact_data:phone_number": "+5519998817808",
      "business:hours:day": "mon,tue,wed,thu,fri,sat",
      "business:hours:start": "09:00",
      "business:hours:end": "21:00",
    },
  }
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  // Garantir que o idioma seja válido
  const lang = i18n.locales.includes(params.lang as Locale) ? params.lang : i18n.defaultLocale

  return (
    <html lang={lang} className={`dark lang-${lang}`}>
      <head>
        {/* Preconectar a domínios externos */}
        <link rel="preconnect" href="https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com" />
        <link rel="dns-prefetch" href="https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com" />

        {/* Script para garantir que os estilos sejam aplicados corretamente */}
        <Script id="apply-styles" strategy="beforeInteractive">
          {`
            (function() {
              // Garantir que a classe de idioma seja aplicada imediatamente
              document.documentElement.classList.add('lang-${lang}');
              
              // Forçar o navegador a recalcular os estilos
              document.documentElement.style.display = 'none';
              setTimeout(function() {
                document.documentElement.style.display = '';
              }, 10);
            })();
          `}
        </Script>
      </head>
      <body className={cn("min-h-screen bg-[#1d1d1d] text-foreground font-sans antialiased", inter.className)}>
        {children}
      </body>
    </html>
  )
}
