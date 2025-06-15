'use client'

import { useState, useEffect } from 'react'
import { Bloc_Category } from '@/app/types/Bloc_Category'
import { BlockCategory } from '@/app/types/BlockCategory'
import Image from 'next/image'

export function ListCategories({ onSelect }: { onSelect: (block: BlockCategory) => void }) {
  const [categories, setCategories] = useState<Bloc_Category[]>([])

  useEffect(() => {
    fetch('/api/bloc_category')
      .then(res => res.json())
      .then(setCategories)
  }, [])

  const createBlockFromCategory = (name: string): BlockCategory | null => {
    switch (name.toLowerCase()) {
      case 'title 1':
        return { type: 'heading', level: 1, content: 'Titre 1' }
      case 'title 2':
        return { type: 'heading', level: 2, content: 'Titre 2' }
      case 'title 3':
        return { type: 'heading', level: 3, content: 'Titre 3' }
      case 'bulleted list':
        return { type: 'bulleted-list', items: ['Item 1', 'Item 2'] }
      // case "task's list":
      //   return { type: 'task-list', items: [{ text: 'Tâche 1', done: false }] }
      // case 'numbered list':
      //   return { type: 'numbered-list', items: ['Étape 1', 'Étape 2'] }
      // case 'citation':
      //   return { type: 'citation', content: 'Citation inspirante.' }
      // case 'file':
      //   return { type: 'file', name: 'document.pdf', url: '/document.pdf' }
      // case 'web link overview':
      //   return { type: 'link-preview', url: 'https://example.com' }
      // case 'table':
      //   return { type: 'table', rows: [['Col A', 'Col B'], ['Valeur A', 'Valeur B']] }
      // case 'code snippet':
      //   return { type: 'code', language: 'ts', code: 'console.log("Code")' }
      // case 'fold-out menu':
      //   return {
      //     type: 'fold-out',
      //     title: 'Titre Pliable',
      //     content: [{ type: 'heading', level: 3, content: 'Contenu interne' }]
      //   }
      // case 'image':
      //   return { type: 'image', src: '/placeholder.jpg', alt: 'Image' }
      // case 'video':
      //   return { type: 'video', src: '/placeholder.mp4' }
      // case 'audio':
      //   return { type: 'audio', src: '/placeholder.mp3' }
      // case 'color':
      //   return { type: 'color', hex: '#00bfff' }
      // case 'title 1 fold-out':
      //   return {
      //     type: 'fold-out',
      //     title: 'Titre 1',
      //     content: [{ type: 'heading', level: 1, content: 'Contenu plié' }]
      //   }
      // case 'title 2 fold-out':
      //   return {
      //     type: 'fold-out',
      //     title: 'Titre 2',
      //     content: [{ type: 'heading', level: 2, content: 'Contenu plié' }]
      //   }
      // case 'title 3 fold-out':
      //   return {
      //     type: 'fold-out',
      //     title: 'Titre 3',
      //     content: [{ type: 'heading', level: 3, content: 'Contenu plié' }]
      //   }
      // case '2 columns':
      //   return {
      //     type: 'columns',
      //     columns: [
      //       [{ type: 'heading', level: 2, content: 'Colonne 1' }],
      //       [{ type: 'heading', level: 2, content: 'Colonne 2' }]
      //     ]
      //   }
      // case '3 columns':
      //   return {
      //     type: 'columns',
      //     columns: [
      //       [{ type: 'heading', level: 3, content: 'Col 1' }],
      //       [{ type: 'heading', level: 3, content: 'Col 2' }],
      //       [{ type: 'heading', level: 3, content: 'Col 3' }]
      //     ]
      //   }
      // case '4 columns':
      //   return {
      //     type: 'columns',
      //     columns: new Array(4).fill([{ type: 'heading', level: 3, content: 'Colonne' }])
      //   }
      default:
        return null
    }
  }

  return (
    <ul className="space-y-2">
      {categories.map((cat) => {
        const block = createBlockFromCategory(cat.category_name)

        return (
          <li
            key={cat.id_bloc_category}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => block && onSelect(block)}
          >
            <Image
              src={cat.category_icon}
              alt={cat.category_name}
              width={20}
              height={20}
              className="opacity-60"
            />
            <span>{cat.category_name}</span>
          </li>
        )
      })}
    </ul>
  )
}