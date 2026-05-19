import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { categories, products } from '@/lib/data'
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
  return { title: cat.name, description: cat.description }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = categories.find((c) => c.slug === category)
  if (!cat) notFound()

  return <CatalogClient key={category} products={products} categories={categories} initialCategory={category} />
}
