"use client"

import type { ReactNode } from "react"

interface TagProps {
  children: ReactNode
  variant?: "default" | "button"
  onClick?: () => void
  expanded?: boolean
}

export function Tag({ children, variant = "default", onClick, expanded }: TagProps) {
  // Estilos base compartilhados por ambas as variantes
  const baseStyles =
    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-gray-300 shadow-sm backdrop-blur-sm"

  // Estilos específicos para cada variante
  const variantStyles = {
    default: "bg-zinc-900/60 ring-1 ring-inset ring-zinc-700",
    button:
      "bg-indigo-900/70 ring-1 ring-inset ring-indigo-700 hover:bg-indigo-800/80 cursor-pointer transition-all hover:shadow-indigo-900/20 hover:shadow-md",
  }

  // Combinar estilos base com os específicos da variante
  const className = `${baseStyles} ${variantStyles[variant]}`

  // Se for um botão, retornar um elemento button, caso contrário, um span
  if (variant === "button") {
    return (
      <button onClick={onClick} className={className} aria-expanded={expanded}>
        {children}
      </button>
    )
  }

  return <span className={className}>{children}</span>
}
