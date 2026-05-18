import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { products, categories, getFeaturedProducts, formatPrice } from '@/lib/data'
import { settings } from '@/lib/data'
import ProductPageClient from './ProductPageClient'

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: product.images },
  }
}

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params
  const product = products.find((p) => p.slug === slug && p.category === category)
  if (!product) notFound()

  const cat = categories.find((c) => c.slug === category)
  const related = products.filter((p) => p.category === category && p.id !== product.id).slice(0, 4)

  return <ProductPageClient product={product} category={cat} related={related} whatsapp={settings.whatsapp} />
}
