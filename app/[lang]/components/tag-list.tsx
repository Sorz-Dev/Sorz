"use client"

import { useState } from "react"
import { Tag } from "./ui/tag"

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
        <Tag key={tag}>{tag}</Tag>
      ))}

      {hasManyTags && (
        <Tag variant="button" onClick={() => setShowAllTags(!showAllTags)} expanded={showAllTags}>
          {showAllTags ? "Ver menos" : "Ver mais"}
        </Tag>
      )}
    </div>
  )
}
