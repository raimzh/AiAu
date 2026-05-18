import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { settings } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <p className="text-xl font-bold tracking-widest text-white" style={{ fontFamily: 'Georgia, serif' }}>
                {settings.siteName}
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
                {settings.siteNameSub}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">{settings.description}</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Каталог</p>
            <nav className="flex flex-col gap-2">
              {[
                ['Кольца', '/catalog/rings'],
                ['Серьги', '/catalog/earrings'],
                ['Браслеты', '/catalog/bracelets'],
                ['Колье и цепи', '/catalog/necklaces'],
                ['Шармы', '/catalog/charms'],
                ['Все украшения', '/catalog'],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm text-gray-400 hover:text-gold transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Контакты</p>
            <div className="flex flex-col gap-3 text-sm">
              <a href={`tel:${settings.phone}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone size={14} /> {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Mail size={14} /> {settings.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" /> {settings.address}
              </div>
              <a href={settings.instagram.startsWith('https://') ? settings.instagram : '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                Instagram
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-white text-sm font-medium mt-2"
                style={{ backgroundColor: 'var(--gold)' }}
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {settings.siteName}. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
