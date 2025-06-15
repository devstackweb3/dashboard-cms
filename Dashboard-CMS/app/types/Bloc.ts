export interface Bloc {
  id_bloc: number
  content: string
  date_de_creation: Date
  date_de_modification: Date
  isActive: boolean
  isParent: boolean
  bloc_id_bloc?: number
}
