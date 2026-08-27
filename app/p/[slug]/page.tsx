import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { products, categories } from '@/lib/data'
import { breadcrumbsJsonLd, productJsonLd } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import ProductPageClient from '@/components/ProductPageClient'

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
  const price = product.price.toLocaleString('ru-KZ') + ' ₸'
  return {
    title: product.name,
    description: `${product.name} — ${product.metalLabel}, ${product.colorLabel}. ${price}. ${product.description}`.slice(0, 300),
    alternates: { canonical: `/p/${product.slug}` },
    openGraph: {
      type: 'website',
      title: `${product.name} — ${price}`,
      description: product.description,
      url: `/p/${product.slug}`,
      images: product.images,
    },
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
    <>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: 'Главная', path: '/' },
          { name: 'Каталог', path: '/catalog' },
          ...(cat ? [{ name: cat.name, path: `/catalog/${cat.slug}` }] : []),
          { name: product.name, path: `/p/${product.slug}` },
        ])}
      />
      <ProductPageClient product={product} category={cat} related={related} />
    </>
  )
}
