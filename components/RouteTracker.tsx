'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageview } from '@/lib/analytics'

/**
 * В App Router переходы между страницами происходят без перезагрузки, поэтому
 * счётчик сам их не видит — отправляем просмотр вручную. Первый просмотр
 * фиксирует сам счётчик при инициализации, его пропускаем.
 */
export default function RouteTracker() {
  const pathname = usePathname()
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    trackPageview(pathname + window.location.search)
  }, [pathname])

  return null
}
