export interface Page {
  id_page: number
  title: string
  imageURL: string
  date_publication: string // using string for DATE
  lien_de_page: string
  isActive: boolean
  isParent: boolean
  isShared: boolean
  collection_id_collection: number
  page_id_page?: number
}
