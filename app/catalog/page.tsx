import { Metadata } from 'next'
import { products, categories } from '@/lib/data'
import { breadcrumbsJsonLd, itemListJsonLd, OG_IMAGE } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import CatalogClient from './CatalogClient'

export const metadata: Metadata = {
  title: 'Каталог украшений',
  description: 'Все золотые украшения — кольца, серьги, браслеты, колье и шармы',
  alternates: { canonical: '/catalog' },
  openGraph: {
    title: 'Каталог украшений',
    description: 'Все золотые украшения — кольца, серьги, браслеты, колье и шармы',
    url: '/catalog',
    images: [OG_IMAGE],
  },
}

export default function CatalogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: 'Главная', path: '/' },
          { name: 'Каталог', path: '/catalog' },
        ])}
      />
      <JsonLd data={itemListJsonLd(products, 'Каталог украшений')} />
      <CatalogClient products={products} categories={categories} />
    </>
  )
}
