"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Github } from "lucide-react"
import Link from "next/link"
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
  isFirstCard?: boolean
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
  isFirstCard = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <div ref={cardRef} className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <Card className="overflow-hidden border border-gray-800 bg-[#252525]">
        <Link href={link} target="_blank">
          <div className="scroll-preview h-48 rounded-lg overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full object-top"
              loading={isFirstCard ? "eager" : "lazy"}
              width="768"
              height="384"
            />
          </div>
        </Link>
        <CardContent className="p-4">
          <h3 className="font-semibold text-xl mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-gray-800 px-2 py-1 text-xs font-medium text-gray-300 ring-1 ring-inset ring-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Link
            href={link}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm hover:underline text-primary"
          >
            {viewWebsite}
          </Link>
          {github && typeof github === "string" && (
            <Link href={github} target="_blank" className="inline-flex items-center gap-2 text-sm hover:underline ml-4">
              <Github className="h-4 w-4" />
              {viewGithub}
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
