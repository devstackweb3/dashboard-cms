'use server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { queryHasura } from '@/app/lib/hasura-client'

const GET_BLOCS_CATEGORY = `
query {
  bloc_category {
    id_bloc_category
    category_icon
    category_name
  }
}
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  {
    try {
      {
        const data = await queryHasura(GET_BLOCS_CATEGORY)
        console.log(data.bloc_category)
        res.status(200).json(data.bloc_category)
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
