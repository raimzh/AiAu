import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { categories, products } from '@/lib/data'
import { breadcrumbsJsonLd, itemListJsonLd, OG_IMAGE } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import CatalogClient from '../CatalogClient'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = categories.find((c) => c.slug === category)
  if (!cat) return {}
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `/catalog/${cat.slug}` },
    openGraph: { title: cat.name, description: cat.description, url: `/catalog/${cat.slug}`, images: [OG_IMAGE] },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = categories.find((c) => c.slug === category)
  if (!cat) notFound()

  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: 'Главная', path: '/' },
          { name: 'Каталог', path: '/catalog' },
          { name: cat.name, path: `/catalog/${cat.slug}` },
        ])}
      />
      <JsonLd data={itemListJsonLd(products.filter((p) => p.category === cat.slug), cat.name)} />
      <CatalogClient products={products} categories={categories} />
    </>
  )
}
