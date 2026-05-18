import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { WishlistProvider } from '@/components/WishlistProvider'
import { settings, products } from '@/lib/data'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
})

const playfair = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://aiau.kz'),
  title: {
    default: settings.siteName + ' — Ювелирные украшения',
    template: `%s | ${settings.siteName}`,
  },
  description: settings.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <WishlistProvider validIds={products.map((p) => p.id)}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </WishlistProvider>
      </body>
    </html>
  )
}
