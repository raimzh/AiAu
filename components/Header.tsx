'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Heart, Menu, X, Phone } from 'lucide-react'
import { useWishlist } from './WishlistProvider'
import { settings } from '@/lib/data'

const navLinks = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/catalog/rings', label: 'Кольца' },
  { href: '/catalog/earrings', label: 'Серьги' },
  { href: '/catalog/bracelets', label: 'Браслеты' },
  { href: '/catalog/necklaces', label: 'Колье' },
  { href: '/about', label: 'О нас' },
  { href: '/contacts', label: 'Контакты' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { count } = useWishlist()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-xs text-gray-500 border-b border-gray-50">
          <span>{settings.workingHours}</span>
          <a href={`tel:${settings.phone}`} className="flex items-center gap-1 py-1 hover:text-gold-ink transition-colors">
            <Phone size={12} />
            {settings.phone}
          </a>
        </div>

        {/* Main bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-widest text-gray-900 font-heading">
              {settings.siteName}
            </span>
            <span className="text-[10px] tracking-[0.3em] text-gold-ink uppercase">{settings.siteNameSub}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-700 hover:text-gold-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <Link href="/wishlist" className="relative flex size-11 items-center justify-center hover:text-gold-ink transition-colors" aria-label="Избранное">
              <Heart size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-gray-900 font-medium text-[10px] rounded-full min-w-[16px] h-4 px-0.5 flex items-center justify-center">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden flex size-11 items-center justify-center hover:text-gold-ink transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Закрыть меню' : 'Меню'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-11 items-center text-sm text-gray-700 hover:text-gold-ink transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href={`tel:${settings.phone}`} className="flex min-h-11 items-center text-sm text-gold-ink font-medium">
              {settings.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
