'use client'

import { useState } from 'react'
import { Modal } from '@/app/components/modals/modal'
import { ListCategories } from '@/app/components/listcategories/listcategories'
import { BlockCategory } from '@/app/types/BlockCategory'
import { BlockRenderer } from './blockRenderer'
import { EditableTextBlock } from './EditableTextBlock'

export function TextEditor() {
  const [blocks, setBlocks] = useState<BlockCategory[]>([
    { type: 'text', content: '' }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index)
    setIsModalOpen(true)
  }

  const handleAddBlock = (block: BlockCategory) => {
    if (selectedIndex === null) return
    const updated = [...blocks]
    updated.splice(selectedIndex + 1, 0, block)
    setBlocks(updated)
    setIsModalOpen(false)
  }

  const handleUpdateBlock = (index: number, updated: BlockCategory) => {
    const newBlocks = [...blocks]
    newBlocks[index] = updated
    setBlocks(newBlocks)
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const updated = [...blocks]
      updated.splice(index + 1, 0, { type: 'text', content: '' })
      setBlocks(updated)
    }
  }

  return (
    <div className="p-6 bg-white min-h-screen text-black">
      <h1 className="text-xl font-bold mb-4">Nouvelle page</h1>

      <div className="border border-black rounded-md p-4 space-y-2">
        {blocks.map((block, index) => (
          <div key={index} className="flex items-start group">
            <button
              onClick={() => handleOpenModal(index)}
              className="opacity-0 group-hover:opacity-100 mr-2 text-gray-500 hover:text-black text-xl font-bold"
            >
              +
            </button>

            <div className="flex-1">
              {block.type === 'text' ? (
                <EditableTextBlock
                  block={block}
                  onChange={(updated) => handleUpdateBlock(index, updated)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ) : (
                <BlockRenderer
                  block={block}
                  onChange={(updated) => handleUpdateBlock(index, updated)}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold mb-2">Choisissez un bloc de contenu</h2>
          <ListCategories onSelect={handleAddBlock} />
        </Modal>
      )}
    </div>
  )
}