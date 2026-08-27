/**
 * Аналитика подключается только если задан ID счётчика в переменных окружения.
 * Ничего не задано — на сайте нет ни одного стороннего скрипта, а вызовы событий
 * тихо ничего не делают.
 */
const rawMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || ''
/** Метрика ждёт номер счётчика числом; мусор в переменной просто выключает аналитику */
export const METRIKA_ID = /^\d+$/.test(rawMetrikaId) ? Number(rawMetrikaId) : 0
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''
export const analyticsEnabled = Boolean(METRIKA_ID || GA_ID)

type YandexMetrika = (id: number, action: string, ...args: unknown[]) => void
type Gtag = (command: string, target: string, params?: Record<string, unknown>) => void

declare global {
  interface Window {
    ym?: YandexMetrika
    gtag?: Gtag
  }
}

/** Цель: клик по кнопке WhatsApp. `source` — откуда кликнули (товар, подвал, контакты…) */
export function trackEvent(goal: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  try {
    if (METRIKA_ID) window.ym?.(METRIKA_ID, 'reachGoal', goal, params)
    if (GA_ID) window.gtag?.('event', goal, params)
  } catch {
    // аналитика не должна ломать интерфейс
  }
}

/** Переход между страницами: в App Router его нужно отправлять вручную */
export function trackPageview(url: string) {
  if (typeof window === 'undefined') return
  try {
    if (METRIKA_ID) window.ym?.(METRIKA_ID, 'hit', url)
    if (GA_ID) window.gtag?.('event', 'page_view', { page_path: url })
  } catch {
    // см. выше
  }
}
