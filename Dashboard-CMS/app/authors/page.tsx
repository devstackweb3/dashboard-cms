'use client'
import { useState } from 'react'
import { Modal } from '@/app/components/modals/modal'
import AuthorsEdit from '@/app/authors/authorEdit/page'

export default function AuthorsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div>
      <h1>Auteurs</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        Editer les Auteurs
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
      >
        <AuthorsEdit />
      </Modal>
    </div>
  )
}
