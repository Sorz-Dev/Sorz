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
          className="inline-flex items-center rounded-md bg-blue-900 px-2 py-1 text-xs font-medium text-blue-300 ring-1 ring-inset ring-blue-700 hover:bg-blue-800 cursor-pointer transition-colors"
          aria-expanded={showAllTags}
        >
          {showAllTags ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </div>
  )
}
