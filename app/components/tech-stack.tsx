"use client"

import { Card } from "@/components/ui/card"
import { Transition } from "@headlessui/react"
import { Fragment, useEffect, useRef, useState } from "react"

const technologies = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "Auth0", "Stripe"],
  },
  {
    category: "DevOps",
    skills: ["Vercel", "Neon", "Blob Storage", "Git", "GitHub"],
  },
  {
    category: "Ferramentas",
    skills: ["VS Code", "Figma", "Photoshop", "SEO", "Google Analytics"],
  },
]

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null)
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
        <Transition
          key={tech.category}
          show={isVisible}
          appear={true}
          enter="transition-all duration-500 delay-[200ms]"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          as={Fragment}
        >
          <Card className="p-6 bg-[#252525] border-gray-800" style={{ transitionDelay: `${index * 100}ms` }}>
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
        </Transition>
      ))}
    </div>
  )
}
