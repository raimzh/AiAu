'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ChevronRight, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useWishlist } from '@/components/WishlistProvider'
import ProductCard from '@/components/ProductCard'
import { formatPrice } from '@/lib/data'
import type { Product, Category } from '@/types'

interface Props {
  product: Product
  category?: Category
  related: Product[]
  whatsapp: string
}

export default function ProductPageClient({ product, category, related, whatsapp }: Props) {
  const { toggle, has } = useWishlist()
  const wishlisted = has(product.id)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const waMessage = encodeURIComponent(
    `Здравствуйте! Хочу заказать:\n*${product.name}*\nАртикул: ${product.id}${selectedSize ? `\nРазмер: ${selectedSize}` : ''}`
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-gold transition-colors">Главная</Link>
        <ChevronRight size={12} />
        <Link href="/catalog" className="hover:text-gold transition-colors">Каталог</Link>
        {category && (
          <>
            <ChevronRight size={12} />
            <Link href={`/catalog/${category.slug}`} className="hover:text-gold transition-colors">{category.name}</Link>
          </>
        )}
        <ChevronRight size={12} />
        <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            unoptimized
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.src = '/images/placeholder.svg'
            }}
          />
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            {product.isNew && <Badge className="bg-gray-900 text-white">Новинка</Badge>}
            {product.isSale && <Badge className="text-white" style={{ backgroundColor: 'var(--gold)' }}>Скидка</Badge>}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-400 mb-2">{product.metalLabel} · {product.colorLabel}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          {/* Stock */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="text-sm text-green-600 font-medium">✓ В наличии</span>
            ) : (
              <span className="text-sm text-gray-400">Нет в наличии</span>
            )}
          </div>

          {/* Size selector */}
          {product.sizes.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Размер{selectedSize ? `: ${selectedSize}` : ' — выберите'}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-sm border rounded transition-colors ${
                      selectedSize === size
                        ? 'border-gold text-gold'
                        : 'border-gray-200 text-gray-600 hover:border-gold hover:text-gold'
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
              <a
                href={`https://wa.me/${whatsapp}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded text-white font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--gold)' }}
              >
                <MessageCircle size={18} />
                Заказать через WhatsApp
              </a>
            ) : (
              <span className="flex-1 flex items-center justify-center gap-2 py-3 rounded text-white font-medium cursor-not-allowed bg-gray-300">
                <MessageCircle size={18} />
                Нет в наличии
              </span>
            )}
            <button
              onClick={() => toggle(product.id)}
              className={`p-3 border rounded transition-colors ${
                wishlisted ? 'border-red-300 text-red-500' : 'border-gray-200 text-gray-400 hover:border-gold hover:text-gold'
              }`}
              aria-label="В избранное"
            >
              <Heart size={20} className={wishlisted ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Meta */}
          <div className="border-t border-gray-100 pt-6 space-y-2 text-sm text-gray-600">
            <p><span className="text-gray-400">Металл:</span> {product.metalLabel}</p>
            <p><span className="text-gray-400">Цвет:</span> {product.colorLabel}</p>
            {product.weight && <p><span className="text-gray-400">Вес:</span> {product.weight}</p>}
            <p><span className="text-gray-400">Артикул:</span> {product.id}</p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
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
