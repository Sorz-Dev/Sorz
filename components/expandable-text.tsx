"use client"

import { useState, useRef, useEffect } from "react"

interface ExpandableTextProps {
  text: string
  maxLines?: number
  className?: string
  expandLabel?: string
  collapseLabel?: string
}

export default function ExpandableText({
  text,
  maxLines = 4,
  className = "",
  expandLabel = "Read more",
  collapseLabel = "Read less",
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  // Verificar se o texto precisa ser truncado
  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const lineHeight = Number.parseInt(window.getComputedStyle(textRef.current).lineHeight) || 24
        const height = textRef.current.scrollHeight
        const lines = Math.round(height / lineHeight)
        setIsTruncated(lines > maxLines)
      }
    }

    checkTruncation()
    window.addEventListener("resize", checkTruncation)
    return () => window.removeEventListener("resize", checkTruncation)
  }, [text, maxLines])

  return (
    <div className={className}>
      {isExpanded ? (
        // Texto expandido
        <div>
          <p className="text-gray-300">{text}</p>
          <button
            onClick={() => setIsExpanded(false)}
            className="text-indigo-400 hover:text-indigo-300 font-medium focus:outline-none mt-1"
          >
            {collapseLabel}
          </button>
        </div>
      ) : (
        // Texto truncado com "ler mais"
        <div>
          <div ref={textRef} className="relative">
            <p className={`text-gray-300 ${isTruncated ? `line-clamp-${maxLines} overflow-hidden` : ""}`}>{text}</p>

            {/* "Ler mais" sem os "..." explícitos */}
            {isTruncated && (
              <div className="inline">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-indigo-400 hover:text-indigo-300 font-medium focus:outline-none"
                >
                  {expandLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
