import { useState } from 'react'
import { BlockCategory } from '@/app/types/BlockCategory'

type Props = {
  block: Extract<BlockCategory, { type: 'heading' }>
  onChange: (updated: BlockCategory) => void
}

export function EditableHeading({ block, onChange }: Props) {
  const [content, setContent] = useState(block.content)

  const handleBlur = () => {
    onChange({ ...block, content })
  }

  const Tag = `h${block.level}` as keyof React.JSX.IntrinsicElements

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => setContent(e.currentTarget.textContent || '')}
      onBlur={handleBlur}
      className="font-bold text-xl my-2"
    >
      {content}
    </Tag>
  )
}
