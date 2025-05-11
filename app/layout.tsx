import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sorz - Desenvolvimento Web",
  description: "Portfólio de projetos de desenvolvimento web da Sorz",
  metadataBase: new URL("https://sorz.com.br"),
  icons: {
    icon: "https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/Frame-1.svg",
  },
  openGraph: {
    type: "website",
    url: "https://sorz.com.br",
    title: "Sorz - Desenvolvimento Web",
    description: "Portfólio de projetos de desenvolvimento web da Sorz",
    siteName: "Sorz",
    images: [
      {
        url: "https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/og.png",
        width: 1200,
        height: 630,
        alt: "Sorz - Desenvolvimento Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sorz - Desenvolvimento Web",
    description: "Portfólio de projetos de desenvolvimento web da Sorz",
    images: ["https://d7hd88ngyqaw6jtz.public.blob.vercel-storage.com/og.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={cn("min-h-screen bg-[#1d1d1d] text-foreground font-sans antialiased", inter.className)}>
        {children}
      </body>
    </html>
  )
}
