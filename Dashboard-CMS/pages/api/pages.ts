'use server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { queryHasura } from '@/app/lib/hasura-client'

const GET_PAGES = `query {
  page {
    id_page
    title
    imageurl
    date_publication
    lien_de_page
    isactive
    isparent
    isshared
    collection {
      id_collection
      name
    }
    parent {
      id_page
      title
    }
    participer {
      author {
        id_author
        name
        surname
      }
      date_de_modification
    }
    contain {
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
    }
    owns {
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
    }
  }
}`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await queryHasura(GET_PAGES)
    res.status(200).json(data.page)
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'Erreur inconnue' })
    }
  }
}
