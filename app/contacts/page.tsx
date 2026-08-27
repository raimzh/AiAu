import { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { settings } from '@/lib/data'
import { OG_IMAGE } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с нами по телефону, WhatsApp или email',
  alternates: { canonical: '/contacts' },
  openGraph: { title: 'Контакты', description: 'Свяжитесь с нами по телефону, WhatsApp или email', url: '/contacts', images: [OG_IMAGE] },
}

// «@aiau.kz» из ссылки в настройках — раньше здесь был захардкожен чужой аккаунт
const instagramHandle = '@' + settings.instagram.replace(/\/$/, '').split('/').pop()

export default function ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
        Контакты
      </h1>
      <p className="text-gray-500 mb-12">Мы на связи ежедневно. Напишите или позвоните — ответим быстро.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Contact list */}
        <div className="space-y-6">
          {[
            {
              icon: <Phone size={18} style={{ color: 'var(--gold-dark)' }} />,
              label: 'Телефон',
              value: settings.phone,
              href: `tel:${settings.phone}`,
            },
            {
              icon: <Mail size={18} style={{ color: 'var(--gold-dark)' }} />,
              label: 'Email',
              value: settings.email,
              href: `mailto:${settings.email}`,
            },
            {
              icon: <MapPin size={18} style={{ color: 'var(--gold-dark)' }} />,
              label: 'Адрес',
              value: settings.address,
              href: null,
            },
            {
              icon: <Clock size={18} style={{ color: 'var(--gold-dark)' }} />,
              label: 'Часы работы',
              value: settings.workingHours,
              href: null,
            },
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
              label: 'Instagram',
              value: instagramHandle,
              href: settings.instagram.startsWith('https://') ? settings.instagram : null,
            },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#E8D5A3' }}>
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="inline-flex items-center min-h-11 text-gray-900 hover:text-gold-ink transition-colors font-medium">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-900 font-medium">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-4">💬</div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Напишите в WhatsApp</h2>
          <p className="text-sm text-gray-500 mb-6">Самый быстрый способ связи. Отвечаем в течение нескольких минут.</p>
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-12 flex items-center justify-center rounded font-medium text-gray-900 text-center transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--gold)' }}
          >
            Открыть WhatsApp
          </a>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="rounded-lg overflow-hidden border border-gray-100 h-64 bg-gray-100 flex items-center justify-center text-gray-600">
        <div className="text-center">
          <MapPin size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">{settings.address}</p>
        </div>
      </div>
    </div>
  )
}
