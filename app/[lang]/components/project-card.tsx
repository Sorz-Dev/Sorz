"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
  github?: string | boolean
  viewWebsite: string
  viewGithub: string
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  tags,
  github = true,
  viewWebsite,
  viewGithub,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showAllTags, setShowAllTags] = useState(false)

  // Definir o número máximo de tags a serem exibidas inicialmente
  const maxVisibleTags = 6
  const hasManyTags = tags.length > maxVisibleTags

  // Tags a serem exibidas com base no estado atual
  const visibleTags = showAllTags ? tags : tags.slice(0, maxVisibleTags)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  // Determinar se esta é a imagem LCP (Largest Contentful Paint)
  const isLCP = image.includes("delivery")

  return (
    <div ref={cardRef} className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <Card className="overflow-hidden border border-gray-800 bg-[#252525]">
        <Link href={link} target="_blank">
          <div className="scroll-preview h-48 rounded-lg overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={600}
              height={300}
              className="w-full object-top"
              priority={isLCP} // Prioriza a imagem do LCP
              loading={isLCP ? undefined : "lazy"} // Não usar lazy loading para a imagem LCP
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
        <CardContent className="p-4">
          <h3 className="font-semibold text-xl mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-gray-800 px-2 py-1 text-xs font-medium text-gray-300 ring-1 ring-inset ring-gray-700"
              >
                {tag}
              </span>
            ))}

            {hasManyTags && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="inline-flex items-center rounded-md bg-blue-900 px-2 py-1 text-xs font-medium text-blue-300 ring-1 ring-inset ring-blue-700 hover:bg-blue-800 cursor-pointer transition-colors"
              >
                {showAllTags ? "Ver menos" : "Ver mais"}
              </button>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Link
            href={link}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm hover:underline font-medium text-blue-400" // Melhorado o contraste
            aria-label={`${viewWebsite}: ${title}`} // Adicionado aria-label descritivo
          >
            {viewWebsite}
          </Link>
          {github && typeof github === "string" && (
            <Link
              href={github}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm hover:underline ml-4 font-medium text-blue-400" // Melhorado o contraste
              aria-label={`${viewGithub}: ${title}`} // Adicionado aria-label descritivo
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              {viewGithub}
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
