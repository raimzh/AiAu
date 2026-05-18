import { Metadata } from 'next'
import { products, categories } from '@/lib/data'
import CatalogClient from './CatalogClient'

export const metadata: Metadata = {
  title: 'Каталог украшений',
  description: 'Все золотые украшения — кольца, серьги, браслеты, колье и шармы',
}

export default function CatalogPage() {
  return <CatalogClient products={products} categories={categories} />
}
