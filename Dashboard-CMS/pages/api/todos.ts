'use server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { queryHasura } from '@/app/lib/hasura-client'

const GET_TO_DOS = `query {
  to_do_status {
        id_to_do,
        content,
    }
}`
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await queryHasura(GET_TO_DOS)
    res.status(200).json(data.to_do_status)
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'Erreur inconnue' })
    }
  }
}
