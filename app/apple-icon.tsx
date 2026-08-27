import { ImageResponse } from 'next/og'
import { playfair } from '@/lib/og-font'
import { settings } from '@/lib/data'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
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
          color: '#C9A84C',
          fontFamily: 'Playfair Display',
        }}
      >
        <div style={{ display: 'flex', fontSize: 84, lineHeight: 1 }}>Au</div>
        <div style={{ display: 'flex', fontSize: 20, color: '#ffffff', marginTop: 10, letterSpacing: 3 }}>
          {settings.siteName}
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: 'Playfair Display', data: font, style: 'normal', weight: 700 }] : undefined }
  )
}
