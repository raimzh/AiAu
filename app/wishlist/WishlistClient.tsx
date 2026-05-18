'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useWishlist } from '@/components/WishlistProvider'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/types'

export default function WishlistClient({ allProducts }: { allProducts: Product[] }) {
  const { items } = useWishlist()
  const wishlistProducts = allProducts.filter((p) => items.includes(p.id))

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
        Избранное
      </h1>
      <p className="text-sm text-gray-400 mb-8">{wishlistProducts.length} украшений</p>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <Heart size={48} className="mx-auto mb-4 text-gray-200" />
          <p className="text-lg text-gray-500 mb-2">Список избранного пуст</p>
          <p className="text-sm text-gray-400 mb-8">Нажимайте ♡ на карточках, чтобы сохранять украшения</p>
          <Link
            href="/catalog"
            className="px-6 py-2.5 rounded font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C9A84C' }}
          >
            Перейти в каталог
          </Link>
        </div>
      )}
    </div>
  )
}
