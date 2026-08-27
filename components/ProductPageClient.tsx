'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ChevronRight, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useWishlist } from '@/components/WishlistProvider'
import ProductCard from '@/components/ProductCard'
import ProductGallery from '@/components/ProductGallery'
import WhatsAppLink from '@/components/WhatsAppLink'
import { formatPrice } from '@/lib/data'
import { absoluteUrl } from '@/lib/site'
import type { Product, Category } from '@/types'

interface Props {
  product: Product
  category?: Category
  related: Product[]
}

const SIZE_GUIDE = {
  rings: { href: '/size-guide#rings', label: 'Как узнать размер?' },
  bracelets: { href: '/size-guide#bracelets', label: 'Как выбрать длину?' },
  necklaces: { href: '/size-guide#chains', label: 'Как выбрать длину?' },
} as const

export default function ProductPageClient({ product, category, related }: Props) {
  const { toggle, has } = useWishlist()
  const wishlisted = has(product.id)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [sizeWarning, setSizeWarning] = useState(false)

  const productUrl = absoluteUrl(`/p/${product.slug}`)
  const sizeGuide = category ? SIZE_GUIDE[category.slug as keyof typeof SIZE_GUIDE] : undefined

  // Кодирование берёт на себя WhatsAppLink
  const orderMessage = `Здравствуйте! Хочу заказать:\n*${product.name}*\nАртикул: ${product.id}${selectedSize ? `\nРазмер: ${selectedSize}` : ''}\n${productUrl}`

  const handleOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (product.sizes.length > 0 && !selectedSize) {
      e.preventDefault()
      setSizeWarning(true)
      setTimeout(() => setSizeWarning(false), 2500)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-8">
        <Link href="/" className="hover:text-gold-ink transition-colors">Главная</Link>
        <ChevronRight size={12} />
        <Link href="/catalog" className="hover:text-gold-ink transition-colors">Каталог</Link>
        {category && (
          <>
            <ChevronRight size={12} />
            <Link href={`/catalog/${category.slug}`} className="hover:text-gold-ink transition-colors">{category.name}</Link>
          </>
        )}
        <ChevronRight size={12} />
        <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Галерея */}
        <ProductGallery
          images={product.images}
          alt={product.name}
          badges={
            <>
              {product.isNew && <Badge className="bg-gray-900 text-white">Новинка</Badge>}
              {product.isSale && (
                <Badge className="text-gray-900" style={{ backgroundColor: 'var(--gold)' }}>
                  Скидка
                </Badge>
              )}
            </>
          }
        />

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-2">{product.metalLabel} · {product.colorLabel}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-500 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          {/* Stock */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="text-sm text-green-700 font-medium">✓ В наличии</span>
            ) : (
              <span className="text-sm text-gray-600">Нет в наличии</span>
            )}
          </div>

          {/* Size selector */}
          {product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4">
                <p className={`text-sm font-medium transition-colors ${sizeWarning ? 'text-red-600' : 'text-gray-700'}`}>
                  Размер{selectedSize ? `: ${selectedSize}` : ' — выберите'}
                  {sizeWarning && <span className="ml-2 font-normal">← пожалуйста, выберите размер</span>}
                </p>
                {sizeGuide && (
                  <Link href={sizeGuide.href} className="text-sm text-gold-ink hover:underline">
                    {sizeGuide.label}
                  </Link>
                )}
              </div>
              <div className={`flex flex-wrap gap-2 ${sizeWarning ? 'animate-pulse' : ''}`}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeWarning(false) }}
                    aria-pressed={selectedSize === size}
                    className={`inline-flex items-center justify-center min-w-11 min-h-11 px-3 text-sm border rounded transition-colors ${
                      selectedSize === size
                        ? 'border-gold-ink text-gold-ink bg-[#FAF6EC] font-medium'
                        : sizeWarning
                        ? 'border-red-400 text-red-600 hover:border-gold-ink hover:text-gold-ink'
                        : 'border-gray-200 text-gray-600 hover:border-gold-ink hover:text-gold-ink'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            {product.inStock ? (
              <WhatsAppLink
                message={orderMessage}
                goal="whatsapp_order"
                source={`product:${product.id}`}
                onClick={handleOrder}
                className="flex-1 flex items-center justify-center gap-2 min-h-12 py-3 rounded text-gray-900 font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--gold)' }}
              >
                <MessageCircle size={18} />
                Заказать через WhatsApp
              </WhatsAppLink>
            ) : (
              <span className="flex-1 flex items-center justify-center gap-2 py-3 rounded text-white font-medium cursor-not-allowed bg-gray-300">
                <MessageCircle size={18} />
                Нет в наличии
              </span>
            )}
            <button
              onClick={() => toggle(product.id)}
              className={`flex items-center justify-center min-w-12 min-h-12 border rounded transition-colors ${
                wishlisted ? 'border-red-400 text-red-600' : 'border-gray-200 text-gray-600 hover:border-gold-ink hover:text-gold-ink'
              }`}
              aria-pressed={wishlisted}
              aria-label={wishlisted ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              <Heart size={20} className={wishlisted ? 'fill-current' : ''} />
            </button>
          </div>

          <p className="-mt-4 mb-8 text-sm text-gray-500">
            Доставка по Казахстану, оплата при получении, обмен {' '}
            <Link href="/delivery" className="text-gold-ink hover:underline">
              в течение 14 дней
            </Link>
          </p>

          {/* Meta */}
          <div className="border-t border-gray-100 pt-6 space-y-2 text-sm text-gray-600">
            <p><span className="text-gray-500">Металл:</span> {product.metalLabel}</p>
            <p><span className="text-gray-500">Цвет:</span> {product.colorLabel}</p>
            {product.weight && <p><span className="text-gray-500">Вес:</span> {product.weight}</p>}
            <p><span className="text-gray-500">Артикул:</span> {product.id}</p>
          </div>

          {/* Description */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">Описание</p>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6 font-heading">
            Похожие украшения
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
