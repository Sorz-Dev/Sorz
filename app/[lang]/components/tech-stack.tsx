"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { Tag } from "./ui/tag"

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
      skills: [
        "React",
        "Next.js",
        "React Native",
        "Expo",
        "NativeWind",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
      ],
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
      skills: ["SEO", "Google Analytics", "Google Business Profile", "Security", "Performance", "Optimization"],
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
          className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <Card className="p-6 bg-[#252525] border border-zinc-800">
            <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
            <div className="flex flex-wrap gap-2">
              {tech.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
