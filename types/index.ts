export interface Product {
  id: string
  name: string
  slug: string
  category: string
  price: number
  oldPrice: number | null
  metal: string
  metalLabel: string
  color: string
  colorLabel: string
  images: string[]
  sizes: string[]
  description: string
  weight: string
  inStock: boolean
  featured: boolean
  isNew: boolean
  isSale: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  count: number
}

export interface SiteSettings {
  siteName: string
  siteNameSub: string
  description: string
  phone: string
  whatsapp: string
  email: string
  address: string
  workingHours: string
  instagram: string
  whatsappMessage: string
}
