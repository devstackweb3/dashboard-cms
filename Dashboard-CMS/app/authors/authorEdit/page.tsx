'use client'
import { useEffect, useState } from 'react'
import { Author } from '@/app/types/Author'
import Image from 'next/image'

export default function AuthorsEdit() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [surname, setSurname] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [editSurname, setEditSurname] = useState('')
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')

  useEffect(() => {
    fetch('/api/authors')
      .then((res) => res.json())
      .then(setAuthors)
      .catch(console.error)
  }, [])

  const saveAuthor = async () => {
    if (!surname || !name || !email) return

    setLoading(true)

    const res = await fetch('/api/authors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ surname, name, email }),
    })

    if (res.ok) {
      const newAuthor = await res.json()
      setAuthors((prev) => [...prev, newAuthor])
      setSurname('')
      setName('')
      setEmail('')
    } else {
      console.error('Erreur à la création :', await res.text())
    }

    setLoading(false)
  }

  const startEdit = (author: Author) => {
    setEditId(author.id_author)
    setEditSurname(author.surname)
    setEditName(author.name)
    setEditEmail(author.email)
  }

  const cancelEdit = () => {
    setEditId(null)
    setEditSurname('')
    setEditName('')
    setEditEmail('')
  }

  const saveEdit = async () => {
    const res = await fetch('/api/authors', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editId,
        surname: editSurname,
        name: editName,
        email: editEmail,
      }),
    })

    if (res.ok) {
      const updated = await res.json()
      setAuthors((prev) =>
        prev.map((a) => (a.id_author === updated.id_author ? updated : a))
      )
      cancelEdit()
    } else {
      console.error('Erreur à l’édition :', await res.text())
    }
  }

  const deleteAuthor = async (id: number) => {
    if (!confirm('Tu veux vraiment supprimer cet auteur ?')) return

    const res = await fetch('/api/authors', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    if (res.ok) {
      const { deletedId } = await res.json()
      setAuthors((prev) => prev.filter((a) => a.id_author !== deletedId))
    } else {
      console.error('Erreur à la suppression :', await res.text())
    }
  }

  return (
    <div>
      <h1>Auteurs</h1>
      <ul>
        {authors.map((a) => (
          <li key={a.id_author}>
            {editId === a.id_author ? (
              <div className="flex m-4">
                <input
                  value={editSurname}
                  onChange={(e) => setEditSurname(e.target.value)}
                  className="bg-gray-100 bg-opacity-10 rounded-md text-black placeholder-gray-600 max-w-32 mr-2 p-1.5 px-2"
                />
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="bg-gray-100 bg-opacity-10 rounded-md text-black placeholder-gray-600 max-w-32 mr-2 px-2"
                />
                <input
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="bg-gray-100 bg-opacity-10 rounded-md text-black placeholder-gray-600 max-w-32 mr-2 px-2"
                />
                <button
                  onClick={saveEdit}
                  className="mx-1 px-2 text-white rounded-md bg-cyan-300 hover:cursor-pointer hover:bg-cyan-400"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="mx-1 text-white bg-red-300 px-2 rounded-md hover:cursor-pointer hover:bg-red-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <div className="flex m-4 items-center justify-between">
                  <div>
                    {a.surname} {a.name}
                  </div>
                  <div className="flex min-w-24">
                    <button
                      onClick={() => startEdit(a)}
                      className="group relative left-0 bg-transparent border-none cursor-pointer flex items-center w-1/2"
                    >
                      <Image
                        src="/icons/user-pen.svg"
                        alt="remove"
                        width={20}
                        height={20}
                        className="mr-1"
                      />
                      <p className="absolute right-[-10px] opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 text-sm text-gray-800 p-2">
                        Edit
                      </p>
                    </button>
                    <button
                      onClick={() => deleteAuthor(a.id_author)}
                      className="group relative bg-transparent border-none cursor-pointer flex items-center w-1/2"
                    >
                      <Image
                        src="/icons/x.svg"
                        alt="remove"
                        width={20}
                        height={20}
                        className="mr-1"
                      />
                      <p className="absolute right-[-30px] left-0 opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 text-sm text-gray-800 p-2">
                        Delete
                      </p>
                    </button>
                  </div>
                </div>
                <div className="border-t-1 border-gray-200 my-2 mx-4"></div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <h2>Ajouter un auteur</h2>
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={saveAuthor} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}
