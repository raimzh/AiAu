'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import type { Product, Category } from '@/types'

const METALS = [
  { value: '', label: 'Любой металл' },
  { value: 'gold-585', label: 'Золото 585' },
  { value: 'gold-750', label: 'Золото 750' },
]

const SORT_OPTIONS = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Дешевле' },
  { value: 'price-desc', label: 'Дороже' },
  { value: 'new', label: 'Новинки' },
]

interface Props {
  products: Product[]
  categories: Category[]
}

export default function CatalogClient({ products, categories }: Props) {
  const pathname = usePathname()
  const [metal, setMetal] = useState('')
  const [sort, setSort] = useState('default')
  const [inStockOnly, setInStockOnly] = useState(false)

  // Категория всегда берётся из URL — единственный источник истины
  const parts = pathname.split('/')
  const category = parts[1] === 'catalog' && parts[2] ? parts[2] : ''

  const currentCategory = category ? categories.find((c) => c.slug === category) : null

  const filtered = useMemo(() => {
    let list = [...products]
    if (category) list = list.filter((p) => p.category === category)
    if (metal) list = list.filter((p) => p.metal === metal)
    if (inStockOnly) list = list.filter((p) => p.inStock)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'new') list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew))
    return list
  }, [products, category, metal, sort, inStockOnly])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-[#C9A84C] transition-colors">Главная</Link>
        <ChevronRight size={12} />
        {currentCategory ? (
          <>
            <Link href="/catalog" className="hover:text-[#C9A84C] transition-colors">Каталог</Link>
            <ChevronRight size={12} />
            <span className="text-gray-600">{currentCategory.name}</span>
          </>
        ) : (
          <span className="text-gray-600">Каталог</span>
        )}
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
        {currentCategory ? currentCategory.name : 'Все украшения'}
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Category pills — теперь ссылки, меняют URL */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/catalog"
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              category === '' ? 'border-[#C9A84C] text-[#C9A84C]' : 'border-gray-200 text-gray-600 hover:border-[#C9A84C] hover:text-[#C9A84C]'
            }`}
          >
            Все
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalog/${cat.slug}`}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                category === cat.slug ? 'border-[#C9A84C] text-[#C9A84C]' : 'border-gray-200 text-gray-600 hover:border-[#C9A84C] hover:text-[#C9A84C]'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3 flex-wrap">
          <select
            value={metal}
            onChange={(e) => setMetal(e.target.value)}
            className="text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-[#C9A84C]"
          >
            {METALS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-[#C9A84C]"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="accent-[#C9A84C]"
            />
            В наличии
          </label>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-400 mb-6">{filtered.length} украшений</p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Украшений не найдено</p>
          <Link href="/catalog" className="mt-4 inline-block text-[#C9A84C] hover:underline text-sm">
            Сбросить фильтры
          </Link>
        </div>
      )}
    </div>
  )
}
