import { Volume } from "./Types"
import { Category, OrderBy } from "./components/app/App"

export type VolumesResponse = {
  items: Array<Volume>
  kind: string
  totalItems: number
}

const BOOKS_API_BASE_URL = "https://www.googleapis.com/books/v1/volumes"
const KEY = "AIzaSyCe2JsmWBjV6Sg5do4S7lNPitIrl3iaNIY"

export async function requestVolumes(search: string, category: Category, orderBy: OrderBy): Promise<VolumesResponse> {
  const cat = category === 'all' ? '' : `+subject:${category}`
  const response = await fetch(
    `${BOOKS_API_BASE_URL}?q=${search}${cat}&orderBy=${orderBy}&key=${KEY}&maxResults=30`
  )
  return await response.json()
}
