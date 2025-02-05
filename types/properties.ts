export type Property = {
  id: string
  name: string
  address: string
  type: "residential" | "commercial" | "industrial" | "land"
  units: number
  created_at: string
  user_id: string
  image_url?: string
  description?: string
  status: "active" | "inactive"
}

export type PropertyFormData = Omit<Property, "id" | "created_at" | "user_id">

