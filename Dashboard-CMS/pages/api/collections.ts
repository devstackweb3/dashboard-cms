'use server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { queryHasura } from '@/app/lib/hasura-client'

const GET_COLLECTIONS = `query {
  collection {
    id_collection
    name
  }
}`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  {
    try {
      {
        const data = await queryHasura(GET_COLLECTIONS)
        res.status(200).json(data.collection)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message })
      } else {
        res.status(500).json({ error: 'Erreur inconnue' })
      }
    }
  }
}
