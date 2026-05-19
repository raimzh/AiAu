'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useWishlist } from './WishlistProvider'
import { formatPrice } from '@/lib/data'
import type { Product } from '@/types'

export default function ProductCard({ product }: { product: Product }) {
  const { toggle, has } = useWishlist()
  const wishlisted = has(product.id)

  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <Link href={`/p/${product.slug}`}>
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.src = '/images/placeholder.svg'
            }}
            unoptimized
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && <Badge className="bg-gray-900 text-white text-[10px]">Новинка</Badge>}
            {product.isSale && <Badge className="text-white text-[10px]" style={{ backgroundColor: 'var(--gold)' }}>Скидка</Badge>}
            {!product.inStock && <Badge className="text-[10px] bg-white text-gray-600 border border-gray-200">Нет в наличии</Badge>}
          </div>
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        onClick={() => toggle(product.id)}
        className="absolute top-2 right-2 p-2.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
        aria-label={wishlisted ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        <Heart
          size={16}
          className={wishlisted ? 'fill-current text-red-500' : 'text-gray-400'}
        />
      </button>

      {/* Info */}
      <div className="p-3">
        <Link href={`/p/${product.slug}`}>
          <p className="text-sm text-gray-800 font-medium leading-snug hover:text-gold transition-colors line-clamp-2">
            {product.name}
          </p>
        </Link>
        <p className="text-[11px] text-gray-400 mt-1">{product.metalLabel} · {product.colorLabel}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-gray-900">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
