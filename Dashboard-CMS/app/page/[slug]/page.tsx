'use client'

import { useParams } from 'next/navigation'
import { useQuery, gql } from '@apollo/client'

const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: String!) {
    page(where: { lien_de_page: { _eq: $slug } }) {
      id_page
      title
      imageurl
      date_publication
      lien_de_page
      isactive
    }
  }
`

export default function PageDetail() {
  const params = useParams()
  const slug = params?.slug as string

  const { data, loading, error } = useQuery(GET_PAGE_BY_SLUG, {
    variables: { slug },
    skip: !slug,
  })

  if (loading) return <p className="p-8 text-gray-500">Loading…</p>
  if (error)   return <p className="p-8 text-red-500">Error: {error.message}</p>

  const page = data?.page?.[0]
  if (!page) return <p className="p-8 text-gray-500">Page not found.</p>

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">{page.title}</h1>
      {page.imageurl && (
        <div className="w-full h-64 relative rounded overflow-hidden">
          <img
            src={page.imageurl}
            alt={page.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {page.date_publication && (
        <p className="text-sm text-gray-400">
          Published: {new Date(page.date_publication).toLocaleDateString()}
        </p>
      )}
      {/* Render the rest of your page content here */}
      <p>This is where your page's body/content would go.</p>
    </div>
  )
}
