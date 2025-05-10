"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

interface TechStackProps {
  categories: {
    frontend: string
    backend: string
    devops: string
    tools: string
    marketing: string
  }
}

export default function TechStack({ categories }: TechStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const technologies = [
    {
      category: categories.frontend,
      skills: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      category: categories.backend,
      skills: ["Node.js", "Bun", "Nest.js", "PostgreSQL", "Auth0", "Stripe", "Firebase", "Supabase"],
    },
    {
      category: categories.devops,
      skills: ["Vercel", "Render", "Neon", "Blob Storage", "Bucket Storage", "Git", "GitHub"],
    },
    {
      category: categories.tools,
      skills: ["VS Code", "Figma", "Photoshop", "Canvas", "ChatGPT"],
    },
    {
      category: categories.marketing,
      skills: ["SEO", "Google Analytics", "Google Meu Negócio", "Segurança", "Desempenho", "Otimização"],
    },
  ]

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

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="grid gap-6 md:grid-cols-2">
      {technologies.map((tech, index) => (
        <div
          key={tech.category}
          className={`transition-all duration-500 opacity-${isVisible ? "100" : "0"} translate-y-${isVisible ? "0" : "6"}`}
          style={{ transitionDelay: `${index * 100}ms` }} // Usando style para o delay em vez de classe
        >
          <Card className="p-6 bg-[#252525] border-gray-800">
            <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
            <div className="flex flex-wrap gap-2">
              {tech.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-md bg-gray-800 px-2 py-1 text-sm font-medium text-gray-300 ring-1 ring-inset ring-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
