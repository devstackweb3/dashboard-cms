'use server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { queryHasura } from '@/app/lib/hasura-client'

const GET_AUTHORS = `query {
  author {
    id_author
    name
    surname
    email
  }
}`

const INSERT_AUTHOR = `
mutation InsertAuthor($surname: String!, $name: String!, $email: String!) {
    insert_author(objects: {surname: $surname, name: $name, email: $email}) {
      returning {
        id_author
        surname
        name
        email
      }
    }
  }
`

const UPDATE_AUTHOR = `
mutation UpdateAuthor($id: Int!, $surname: String!, $name: String!, $email: String!) {
    update_author(
      where: {id_author: {_eq: $id}},
      _set: {surname: $surname, name: $name, email: $email}
    ) {
      returning {
        id_author
        surname
        name
        email
      }
    }
  }
`

const DELETE_AUTHOR = `
mutation DeleteAuthor($id: Int!) {
    delete_author(where: {id_author: {_eq: $id}}) {
      affected_rows
      returning {
        id_author
      }
    }
  }
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const data = await queryHasura(GET_AUTHORS)
      return res.status(200).json(data.author)
    }

    if (req.method === 'POST') {
      const { surname, name, email } = req.body

      if (!surname || !name || !email) {
        return res.status(400).json({ error: 'Missing surname, name or email' })
      }

      const data = await queryHasura(INSERT_AUTHOR, { surname, name, email })
      return res.status(200).json(data.insert_author.returning[0])
    }

    if (req.method === 'PUT') {
      const { id, surname, name, email } = req.body

      if (!id || !surname || !name || !email) {
        return res
          .status(400)
          .json({ error: 'Missing id, surname, name or email' })
      }
      const data = await queryHasura(UPDATE_AUTHOR, {
        id,
        surname,
        name,
        email,
      })
      return res.status(200).json(data.update_author.returning[0])
    }

    if (req.method === 'DELETE') {
      const { id } = req.body

      if (!id) {
        return res.status(400).json({ error: 'Missing id' })
      }
      const data = await queryHasura(DELETE_AUTHOR, { id })
      return res
        .status(200)
        .json({ deletedId: data.delete_author.returning[0].id_author })
    }

    return res.status(405).json({ error: 'Method Not Allowed' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
