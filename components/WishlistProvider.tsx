'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface WishlistContextType {
  items: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  toggle: () => {},
  has: () => false,
  count: 0,
})

interface Props {
  children: React.ReactNode
  validIds: string[]
}

export function WishlistProvider({ children, validIds }: Props) {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wishlist')
      if (saved) {
        const parsed: unknown = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          // отфильтровываем ID удалённых товаров
          const clean = parsed.filter((id): id is string =>
            typeof id === 'string' && validIds.includes(id)
          )
          setItems(clean)
          localStorage.setItem('wishlist', JSON.stringify(clean))
        }
      }
    } catch {}
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (id: string) => {
    setItems((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      localStorage.setItem('wishlist', JSON.stringify(next))
      return next
    })
  }

  return (
    <WishlistContext.Provider value={{ items, toggle, has: (id) => items.includes(id), count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
