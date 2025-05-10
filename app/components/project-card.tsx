"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Transition } from "@headlessui/react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
  github?: string | boolean
}

export default function ProjectCard({ title, description, image, link, tags, github = true }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isInViewport, setIsInViewport] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting)
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
    <Transition
      show={isVisible}
      appear={true}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      as="div"
    >
      <Card ref={cardRef} className="overflow-hidden border border-gray-800 bg-[#252525]">
        <Link href={link} target="_blank">
          <div ref={imageRef} className="project-image-container relative aspect-video w-full">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className={`project-image object-cover ${isInViewport ? "in-viewport" : ""}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          <Link href={link} target="_blank" className="inline-flex items-center gap-2 text-sm hover:underline">
            Ver Website
          </Link>
          {github && typeof github === "string" && (
            <Link href={github} target="_blank" className="inline-flex items-center gap-2 text-sm hover:underline ml-4">
              <Github className="h-4 w-4" />
              Ver no GitHub
            </Link>
          )}
        </CardFooter>
      </Card>
    </Transition>
  )
}
