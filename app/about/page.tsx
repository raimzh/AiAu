import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Award, Truck, Heart } from 'lucide-react'
import { OG_IMAGE } from '@/lib/seo'
import WhatsAppLink from '@/components/WhatsAppLink'

export const metadata: Metadata = {
  title: 'О нас',
  description: 'Ювелирный магазин золотых украшений в Казахстане',
  alternates: { canonical: '/about' },
  openGraph: { title: 'О нас', description: 'Ювелирный магазин золотых украшений в Казахстане', url: '/about', images: [OG_IMAGE] },
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
        О нас
      </h1>
      <p className="text-gray-500 text-lg mb-12 max-w-2xl">
        Мы продаём золотые украшения высокого качества с доставкой по всему Казахстану.
        Каждое украшение проходит контроль качества и имеет подтверждённую пробу.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-14">
        {[
          {
            icon: <Award size={24} style={{ color: 'var(--gold-dark)' }} />,
            title: 'Сертифицированное золото',
            text: 'Все украшения выполнены из золота 585 и 750 пробы с государственным клеймом.',
          },
          {
            icon: <Shield size={24} style={{ color: 'var(--gold-dark)' }} />,
            title: 'Гарантия и возврат',
            text: 'Мы даём гарантию на каждое украшение. Возврат в течение 14 дней при сохранении товарного вида.',
          },
          {
            icon: <Truck size={24} style={{ color: 'var(--gold-dark)' }} />,
            title: 'Доставка по Казахстану',
            text: 'Отправляем в любой город курьером или почтой. Украшение упаковано в фирменную подарочную коробку.',
          },
          {
            icon: <Heart size={24} style={{ color: 'var(--gold-dark)' }} />,
            title: 'Индивидуальный подход',
            text: 'Помогаем выбрать украшение под конкретный запрос. Консультация — в WhatsApp, быстро и без давления.',
          },
        ].map((item) => (
          <div key={item.title} className="flex gap-4 p-6 border border-gray-100 rounded-lg">
            <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#E8D5A3' }}>
              {item.icon}
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">
          Есть вопросы?
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Свяжитесь с нами — ответим на любой вопрос об украшениях, доставке и размерах
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <WhatsAppLink
            source="about"
            className="inline-flex items-center justify-center min-h-11 px-6 rounded font-medium text-gray-900 transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--gold)' }}
          >
            WhatsApp
          </WhatsAppLink>
          <Link href="/contacts" className="inline-flex items-center justify-center min-h-11 px-6 rounded font-medium border border-gray-200 text-gray-700 hover:border-gold-ink transition-colors">
            Контакты
          </Link>
        </div>
      </div>
    </div>
  )
}
