'use server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { queryHasura } from '@/app/lib/hasura-client'

const GET_BLOCS = `query {
  bloc {
    id_bloc
    content
    date_de_creation
    date_de_modification
    isactive
    isparent
    parent_bloc {
      id_bloc
    }
  }
}`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  {
    try {
      {
        const data = await queryHasura(GET_BLOCS)
        res.status(200).json(data.bloc)
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
