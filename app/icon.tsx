import { ImageResponse } from 'next/og'
import { playfair } from '@/lib/og-font'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

// Фавикон: «Au» — золото в таблице Менделеева и вторая половина названия
export default async function Icon() {
  const font = await playfair()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111827',
          color: '#C9A84C',
          fontSize: 40,
          fontFamily: 'Playfair Display',
        }}
      >
        Au
      </div>
    ),
    { ...size, fonts: font ? [{ name: 'Playfair Display', data: font, style: 'normal', weight: 700 }] : undefined }
  )
}
