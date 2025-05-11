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
          url: "https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/Frame-IMFWPn3eh8JYSrQtejrjD6aBPiqXlJ.png",
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
      images: ["https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/Frame-IMFWPn3eh8JYSrQtejrjD6aBPiqXlJ.png"],
    },
    icons: {
      icon: "https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/Frame-1.svg",
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
      <body className={cn("min-h-screen bg-[#1d1d1d] text-foreground font-sans antialiased", inter.className)}>
        {children}
      </body>
    </html>
  )
}
