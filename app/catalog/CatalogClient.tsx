'use client'

import { useCallback, useMemo, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { plural, JEWELLERY } from '@/lib/plural'
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

/**
 * Фильтры живут в query-строке: ссылку на «золото 750, сначала дешёвые» можно отправить клиенту,
 * а кнопка «назад» возвращает прежнюю выборку.
 * Читаем через useSyncExternalStore, а не через useSearchParams: последний выкидывает страницу
 * из статической генерации, и каталог пропал бы из HTML для поисковиков.
 */
const SEARCH_EVENT = 'aiau:filters'

function subscribeSearch(listener: () => void) {
  window.addEventListener('popstate', listener)
  window.addEventListener(SEARCH_EVENT, listener)
  return () => {
    window.removeEventListener('popstate', listener)
    window.removeEventListener(SEARCH_EVENT, listener)
  }
}

const getSearch = () => window.location.search
const getServerSearch = () => ''

export default function CatalogClient({ products, categories }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const search = useSyncExternalStore(subscribeSearch, getSearch, getServerSearch)

  const params = useMemo(() => new URLSearchParams(search), [search])
  const rawMetal = params.get('metal') ?? ''
  const metal = METALS.some((m) => m.value === rawMetal) ? rawMetal : ''
  const rawSort = params.get('sort') ?? 'default'
  const sort = SORT_OPTIONS.some((o) => o.value === rawSort) ? rawSort : 'default'
  const inStockOnly = params.get('stock') === '1'

  const setParam = useCallback((key: string, value: string | null) => {
    const next = new URLSearchParams(window.location.search)
    if (value) next.set(key, value)
    else next.delete(key)
    const qs = next.toString()
    window.history.replaceState(null, '', qs ? `${window.location.pathname}?${qs}` : window.location.pathname)
    window.dispatchEvent(new Event(SEARCH_EVENT))
  }, [])

  const resetFilters = useCallback(() => {
    window.history.replaceState(null, '', window.location.pathname)
    window.dispatchEvent(new Event(SEARCH_EVENT))
    if (window.location.pathname !== '/catalog') router.push('/catalog')
  }, [router])

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
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-gold-ink transition-colors">Главная</Link>
        <ChevronRight size={12} />
        {currentCategory ? (
          <>
            <Link href="/catalog" className="hover:text-gold-ink transition-colors">Каталог</Link>
            <ChevronRight size={12} />
            <span className="text-gray-600">{currentCategory.name}</span>
          </>
        ) : (
          <span className="text-gray-600">Каталог</span>
        )}
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-heading">
        {currentCategory ? currentCategory.name : 'Все украшения'}
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Category pills — теперь ссылки, меняют URL */}
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/catalog${search}`}
            className={`inline-flex items-center min-h-11 px-4 rounded-full text-sm border transition-colors ${
              category === '' ? 'border-gold-ink text-gold-ink bg-[#FAF6EC] font-medium' : 'border-gray-200 text-gray-600 hover:border-gold-ink hover:text-gold-ink'
            }`}
          >
            Все
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalog/${cat.slug}${search}`}
              className={`inline-flex items-center min-h-11 px-4 rounded-full text-sm border transition-colors ${
                category === cat.slug ? 'border-gold-ink text-gold-ink bg-[#FAF6EC] font-medium' : 'border-gray-200 text-gray-600 hover:border-gold-ink hover:text-gold-ink'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3 flex-wrap">
          <select
            value={metal}
            onChange={(e) => setParam('metal', e.target.value || null)}
            aria-label="Фильтр по металлу"
            className="text-base min-h-11 border border-gray-200 rounded px-3 focus:border-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-ink"
          >
            {METALS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setParam('sort', e.target.value === 'default' ? null : e.target.value)}
            aria-label="Сортировка"
            className="text-base min-h-11 border border-gray-200 rounded px-3 focus:border-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-ink"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <label className="inline-flex items-center min-h-11 gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setParam('stock', e.target.checked ? '1' : null)}
              className="size-5 accent-[#846822]"
            />
            В наличии
          </label>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 mb-6">{filtered.length} {plural(filtered.length, JEWELLERY)}</p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">Украшений не найдено</p>
          <button
            onClick={resetFilters}
            className="mt-4 inline-flex items-center min-h-11 text-gold-ink hover:underline text-sm"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  )
}
