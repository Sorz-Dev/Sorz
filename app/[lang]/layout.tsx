import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { i18n, type Locale } from "@/i18n"
import "../globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const messages = i18n.messages[params.lang]

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: messages.meta.keywords,
    metadataBase: new URL("https://sorz.com.br"),
    alternates: {
      canonical: "/",
      languages: {
        pt: "/pt",
        en: "/en",
      },
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: "https://sorz.com.br",
      siteName: "Sorz",
      images: [
        {
          url: "https://sorz.com.br/logo-og.webp", // URL absoluta
          width: 1200,
          height: 1200,
          alt: "Sorz - Digital Development",
        },
      ],
      locale: params.lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.title,
      description: messages.meta.description,
      images: ["https://sorz.com.br/logo-og.webp"], // URL absoluta
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
    verification: {
      google: "verification_token",
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    other: {
      "geo.region": "BR-SP",
      "geo.placename": "Campinas, São Paulo",
      "geo.position": "-22.9099;-47.0626",
      ICBM: "-22.9099, -47.0626",
    },
  }
}

export function generateViewport(): Viewport {
  return {
    themeColor: "#3b82f6",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    charSet: "UTF-8",
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
  return (
    <html lang={params.lang} className="dark">
      <head>
        {/* Favicon principal (SVG) */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        {/* Fallback para navegadores que não suportam SVG */}
        <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />

        {/* Para iOS */}
        <link rel="apple-touch-icon" href="/favicon.svg" />

        <link rel="canonical" href={`https://sorz.com.br/${params.lang}`} />

        {/* Meta tags explícitas para Open Graph */}
        <meta property="og:image" content="https://sorz.com.br/logo-og.webp"" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:image:alt" content="Sorz - Digital Development" />

        {/* Meta tags explícitas para Twitter */}
        <meta name="twitter:image" content="https://sorz.com.br/logo-og.webp"" />
      </head>
      <body className={cn("min-h-screen bg-[#1d1d1d] text-foreground font-sans antialiased", inter.className)}>
        {children}
      </body>
    </html>
  )
}
