"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Tag } from "./ui/tag"
import { ExpandableText } from "./ui/expandable-text"

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
          <ExpandableText
            text={description}
            maxLines={3}
            className="mb-4"
            expandLabel="Leia mais"
            collapseLabel="Leia menos"
          />
          <div className="flex flex-wrap gap-2">
            {visibleTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}

            {hasManyTags && (
              <Tag variant="button" onClick={() => setShowAllTags(!showAllTags)} expanded={showAllTags}>
                {showAllTags ? "Ver menos" : "Ver mais"}
              </Tag>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Link
            href={link}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm hover:underline font-medium text-blue-400"
            aria-label={`${viewWebsite}: ${title}`}
          >
            {viewWebsite}
          </Link>
          {github && typeof github === "string" && (
            <Link
              href={github}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm hover:underline ml-4 font-medium text-blue-400"
              aria-label={`${viewGithub}: ${title}`}
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
