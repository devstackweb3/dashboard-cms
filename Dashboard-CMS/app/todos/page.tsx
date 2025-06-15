'use client'
import { useEffect, useState } from 'react'
import { ToDoStatus } from '@/app/types/ToDoStatus'

export default function ToDoPage() {
  const [toDos, setToDos] = useState([])

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then(setToDos)
  }, [])

  return (
    <div>
      <h1>Tasks Status</h1>
      <ul>
        {toDos.map((t: ToDoStatus) => (
          <li key={t.id_to_do}>{t.content}</li>
        ))}
      </ul>
    </div>
  )
}
