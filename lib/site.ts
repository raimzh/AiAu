// Домен задаётся один раз здесь (или через NEXT_PUBLIC_SITE_URL на Vercel),
// чтобы sitemap, robots, canonical, JSON-LD и ссылка в WhatsApp не разъезжались.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aiau.kz').replace(/\/$/, '')

export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : SITE_URL + (path.startsWith('/') ? path : '/' + path)
}
