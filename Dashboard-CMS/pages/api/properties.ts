'use server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { queryHasura } from '@/app/lib/hasura-client'

const GET_PROPERTIES = `query {
  property {
    id_property
    name
    prop_date { content }
    prop_number { content }
    prop_selection {
      prop_selection_items {
        id_selection_item
        content
      }
    }
    prop_text { content }
    prop_url { content }
    prop_file_and_media { content }
    prop_related_page {
      page {
        id_page
        title
      }
    }
    prop_to_do {
      to_do_status { id_to_do content }
    }
    prop_person {
      author {
        id_author
        name
        surname
      }
    }
  }
}`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await queryHasura(GET_PROPERTIES)
    res.status(200).json(data.property)
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'Erreur inconnue' })
    }
  }
}
