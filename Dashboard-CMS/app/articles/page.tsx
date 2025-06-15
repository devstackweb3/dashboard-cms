'use client'
import { TextEditor } from '@/app/components/texteditor/texteditor'

export default function AuthorsPage() {
  return (
    <div className="flex justify-center bg-white text-black">
      <div className="relative w-4/6 h-lvh">
        <h1>Nouvelle page</h1>

        <div className="pt-8 w[50%]">
          {/*Zone d'édition des composants REACT*/}
          <TextEditor />
        </div>
      </div>
    </div>
  )
}
