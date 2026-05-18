'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

interface WishlistContextType {
  items: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
  count: number
  toast: string | null
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  toggle: () => {},
  has: () => false,
  count: 0,
  toast: null,
})

interface Props {
  children: React.ReactNode
  validIds: string[]
}

export function WishlistProvider({ children, validIds }: Props) {
  const [items, setItems] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wishlist')
      if (saved) {
        const parsed: unknown = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          const clean = parsed.filter((id): id is string =>
            typeof id === 'string' && validIds.includes(id)
          )
          setItems(clean)
          localStorage.setItem('wishlist', JSON.stringify(clean))
        }
      }
    } catch {}
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback((id: string) => {
    setItems((prev) => {
      const adding = !prev.includes(id)
      const next = adding ? [...prev, id] : prev.filter((i) => i !== id)
      localStorage.setItem('wishlist', JSON.stringify(next))
      setToast(adding ? 'Добавлено в избранное' : 'Удалено из избранного')
      setTimeout(() => setToast(null), 2000)
      return next
    })
  }, [])

  return (
    <WishlistContext.Provider value={{ items, toggle, has: (id) => items.includes(id), count: items.length, toast }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm shadow-lg pointer-events-none animate-in fade-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
