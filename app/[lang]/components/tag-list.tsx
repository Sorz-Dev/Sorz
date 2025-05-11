"use client"

import { useState } from "react"

interface TagListProps {
  tags: string[]
  maxVisible?: number
}

export default function TagList({ tags, maxVisible = 6 }: TagListProps) {
  const [showAllTags, setShowAllTags] = useState(false)

  const hasManyTags = tags.length > maxVisible
  const visibleTags = showAllTags ? tags : tags.slice(0, maxVisible)

  return (
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
          className="inline-flex items-center rounded-md bg-blue-900/60 backdrop-blur-sm px-2 py-1 text-xs font-medium text-blue-200 ring-1 ring-inset ring-blue-500/70 hover:bg-blue-800/70 cursor-pointer transition-all shadow-sm hover:shadow-blue-900/20 hover:shadow-md"
          aria-expanded={showAllTags}
        >
          {showAllTags ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </div>
  )
}
