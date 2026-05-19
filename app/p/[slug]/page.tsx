import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { products, categories, settings } from '@/lib/data'
import ProductPageClient from '@/app/catalog/[category]/[slug]/ProductPageClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
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
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const cat = categories.find((c) => c.slug === product.category)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <ProductPageClient
      product={product}
      category={cat}
      related={related}
      whatsapp={settings.whatsapp}
    />
  )
}
