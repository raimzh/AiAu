'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'wishlist'
const EMPTY: string[] = []

/**
 * localStorage — внешнее хранилище, поэтому читаем его через useSyncExternalStore,
 * а не через setState в эффекте: нет каскадных рендеров и нет расхождения при гидрации
 * (на сервере и в первом клиентском рендере снапшот одинаковый — EMPTY).
 */
let snapshot: string[] = EMPTY
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

function readStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return EMPTY
    return parsed.filter((id): id is string => typeof id === 'string')
  } catch {
    return EMPTY
  }
}

function writeStorage(next: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {}
  snapshot = next
  emit()
}

function handleStorageEvent(e: StorageEvent) {
  if (e.key !== null && e.key !== STORAGE_KEY) return
  snapshot = readStorage()
  emit()
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener('storage', handleStorageEvent)
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener('storage', handleStorageEvent)
  }
}

const getSnapshot = () => snapshot
const getServerSnapshot = () => EMPTY

interface WishlistContextType {
  items: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
  count: number
  toast: string | null
}

const WishlistContext = createContext<WishlistContextType>({
  items: EMPTY,
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
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Разовая синхронизация с localStorage после монтирования + чистка удалённых товаров
  const validKey = validIds.join(',')
  useEffect(() => {
    const valid = new Set(validKey ? validKey.split(',') : [])
    const clean = readStorage().filter((id) => valid.has(id))
    if (clean.length !== snapshot.length || clean.some((id, i) => id !== snapshot[i])) {
      writeStorage(clean)
    }
  }, [validKey])

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
  }, [])

  const toggle = useCallback((id: string) => {
    const adding = !snapshot.includes(id)
    writeStorage(adding ? [...snapshot, id] : snapshot.filter((i) => i !== id))
    setToast(adding ? 'Добавлено в избранное' : 'Удалено из избранного')
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2000)
  }, [])

  return (
    <WishlistContext.Provider
      value={{ items, toggle, has: (id) => items.includes(id), count: items.length, toast }}
    >
      {children}
      <div aria-live="polite" className="sr-only">{toast}</div>
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm shadow-lg pointer-events-none animate-in fade-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
