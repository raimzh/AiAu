import { Metadata } from 'next'
import WishlistClient from './WishlistClient'
import { products } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Избранное',
  robots: { index: false, follow: true },
}

export default function WishlistPage() {
  return <WishlistClient allProducts={products} />
}
