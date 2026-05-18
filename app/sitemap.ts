import { MetadataRoute } from 'next'
import { products, categories } from '@/lib/data'

const BASE = 'https://aiau.kz'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/catalog`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${BASE}/about`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/contacts`, priority: 0.5, changeFrequency: 'monthly' },
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE}/catalog/${cat.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/catalog/${p.category}/${p.slug}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
}
