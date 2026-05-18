'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
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
  initialCategory?: string
}

export default function CatalogClient({ products, categories, initialCategory = '' }: Props) {
  const [category, setCategory] = useState(initialCategory)
  const [metal, setMetal] = useState('')
  const [sort, setSort] = useState('default')
  const [inStockOnly, setInStockOnly] = useState(false)

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

  const currentCategory = category ? categories.find((c) => c.slug === category) : null

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
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory('')}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              category === '' ? 'border-gold text-gold' : 'border-gray-200 text-gray-600 hover:border-gold hover:text-gold'
            }`}
          >
            Все
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategory(cat.slug)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                category === cat.slug ? 'border-gold text-gold' : 'border-gray-200 text-gray-600 hover:border-gold hover:text-gold'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3 flex-wrap">
          {/* Metal filter */}
          <select
            value={metal}
            onChange={(e) => setMetal(e.target.value)}
            className="text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-gold"
          >
            {METALS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-gold"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {/* In stock */}
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="accent-gold"
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
          <button onClick={() => { setCategory(''); setMetal(''); setInStockOnly(false); setSort('default') }} className="mt-4 text-gold hover:underline text-sm">
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  )
}
