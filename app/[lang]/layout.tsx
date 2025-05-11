import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { i18n, type Locale } from "@/i18n"
import "../globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const messages = i18n.messages[params.lang]
  const locale = params.lang === "pt" ? "pt_BR" : "en_US"

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: messages.meta.keywords,
    metadataBase: new URL("https://sorz.com.br"),
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        pt: "/pt",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      url: `https://sorz.com.br/${params.lang}`,
      title: messages.meta.title,
      description: messages.meta.description,
      siteName: "Sorz",
      images: [
        {
          url: "/logo-og.webp",
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
      images: ["/logo-og.webp"],
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
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/logo-og.webp" />
        <meta name="twitter:image" content="/logo-og.webp" />
      </head>
      <body className={cn("min-h-screen bg-[#1d1d1d] text-foreground font-sans antialiased", inter.className)}>
        {children}
      </body>
    </html>
  )
}
