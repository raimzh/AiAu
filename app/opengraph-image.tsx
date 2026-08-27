import { ImageResponse } from 'next/og'
import { settings } from '@/lib/data'
import { playfair } from '@/lib/og-font'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${settings.siteName} — ${settings.siteNameSub}`

// Превью ссылки в WhatsApp, Instagram и поиске — весь трафик магазина идёт через мессенджеры
export default async function OpengraphImage() {
  const font = await playfair()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111827',
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(201,168,76,0.18) 0, rgba(201,168,76,0.18) 2px, transparent 2px, transparent 40px)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 18, color: '#C9A84C', marginBottom: 24 }}>
          {settings.siteNameSub.toUpperCase()}
        </div>
        <div style={{ display: 'flex', fontSize: 168, letterSpacing: 10, fontFamily: 'Playfair Display' }}>
          {settings.siteName}
        </div>
        <div style={{ display: 'flex', fontSize: 34, color: '#D1D5DB', marginTop: 28 }}>
          Золото 585 и 750 пробы · Доставка по Казахстану
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 48,
            padding: '14px 36px',
            borderRadius: 8,
            backgroundColor: '#C9A84C',
            color: '#111827',
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          {settings.city} · {settings.phone}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: 'Playfair Display', data: font, style: 'normal', weight: 700 }] : undefined,
    }
  )
}
