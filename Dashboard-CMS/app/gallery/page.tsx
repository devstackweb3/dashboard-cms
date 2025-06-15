'use client'
import { PropertiesProvider } from '../context/PropertiesContext'
import ConfigurePropertiesPanel from '../components/ConfigurePropertiesPanel'
import { useQuery } from '@apollo/client'
import { GET_GALLERY } from '../lib/queries'
import GalleryCard from '../components/GalleryCard'

export default function GalleryView() {
  return (
    <PropertiesProvider>
      <InnerGallery />
    </PropertiesProvider>
  )
}

function InnerGallery() {
  const { data, loading, error } = useQuery(GET_GALLERY)

  if (loading) return <p className="p-8 text-gray-500">Loading…</p>
  if (error)   return <p className="p-8 text-red-500">Error: {error.message}</p>

  const pages = (data.page || []).filter((pg: any) => pg.isactive)
  if (pages.length === 0) {
    return <p className="p-8 text-gray-500">No published pages yet.</p>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>

      {/* property toggles */}
      <ConfigurePropertiesPanel />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pages.map((pg: any) => (
          <GalleryCard
            key={pg.id_page}
            id={pg.id_page}
            title={pg.title}
            imageurl={pg.imageurl}
            date_publication={pg.date_publication}
            lien_de_page={pg.lien_de_page}
            isactive={pg.isactive}
          />
        ))}
      </div>
    </div>
  )
}
