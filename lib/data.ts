import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'
import settingsData from '@/data/settings.json'
import type { Product, Category, SiteSettings } from '@/types'

export const products = productsData as Product[]
export const settings = settingsData as SiteSettings

// count вычисляется из реальных данных, а не берётся из JSON
export const categories: Category[] = (categoriesData as Category[]).map((cat) => ({
  ...cat,
  count: (productsData as Product[]).filter((p) => p.category === cat.id).length,
}))

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ru-KZ') + ' ₸'
}
