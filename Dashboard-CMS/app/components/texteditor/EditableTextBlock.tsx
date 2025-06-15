'use client'

import { useRef, useEffect } from 'react'
import { BlockCategory } from '@/app/types/BlockCategory'

export function EditableTextBlock({
  block,
  onChange,
  onKeyDown
}: {
  block: Extract<BlockCategory, { type: 'text' }>
  onChange: (updated: BlockCategory) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  // Remplir le contenu au premier mount seulement
  useEffect(() => {
    if (ref.current && ref.current.textContent !== block.content) {
      ref.current.textContent = block.content
    }
  }, [])

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className="outline-none whitespace-pre-wrap min-h-[1.5rem] w-full"
      onBlur={(e) => {
        onChange({ ...block, content: e.currentTarget.textContent || '' })
      }}
      onKeyDown={onKeyDown}
    />
  )
}
