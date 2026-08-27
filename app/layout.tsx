import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { WishlistProvider } from '@/components/WishlistProvider'
import { settings, products } from '@/lib/data'
import { SITE_URL } from '@/lib/site'
import { storeJsonLd } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import Analytics from '@/components/Analytics'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
})

const playfair = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: settings.siteName + ' — ' + settings.siteNameSub,
    template: `%s | ${settings.siteName}`,
  },
  description: settings.description,
  applicationName: settings.siteName,
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: settings.siteName,
    url: SITE_URL,
    title: settings.siteName + ' — ' + settings.siteNameSub,
    description: settings.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={storeJsonLd()} />
        <WishlistProvider validIds={products.map((p) => p.id)}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </WishlistProvider>
        <Analytics />
      </body>
    </html>
  )
}
