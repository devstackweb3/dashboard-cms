'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const views = [
  { name: 'Table',    href: '/table'   },
  { name: 'List',     href: '/list'    },
  { name: 'Board',    href: '/board'   },
  { name: 'Gallery',  href: '/gallery' },
]

export default function ViewSelector() {
  const path = usePathname()

  return (
    <nav className="flex space-x-4 border-b border-gray-700 mb-6">
      {views.map((view) => {
        const isActive = path === view.href
        return (
          <Link
            key={view.href}
            href={view.href}
            className={`
              px-3 py-2 -mb-px font-medium text-sm 
              ${isActive 
                ? 'border-b-2 border-blue-400 text-blue-400' 
                : 'text-gray-400 hover:text-gray-200'}
            `}
          >
            {view.name}
          </Link>
        )
      })}
    </nav>
  )
}
