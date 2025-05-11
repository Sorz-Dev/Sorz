import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sorz - Desenvolvimento Web",
  description: "Portfólio de projetos de desenvolvimento web da Sorz",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
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
