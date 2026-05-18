import Link from 'next/link'
import { ArrowRight, Shield, Truck, Award, Phone } from 'lucide-react'
import { categories, getFeaturedProducts, settings } from '@/lib/data'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36 text-center">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#C9A84C' }}>
            Ювелирные украшения
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Золото,
            <br />
            созданное для вас
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
            Кольца, серьги, браслеты и колье из золота 585 и 750 пробы.
            Доставка по Казахстану. Заказ через WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3 rounded font-medium text-gray-900 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#C9A84C' }}
            >
              Смотреть каталог <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded font-medium border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              <Phone size={16} /> Написать нам
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>
          Категории
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalog/${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-4 border border-gray-100 rounded-lg hover:border-[#C9A84C] hover:shadow-sm transition-all text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-2xl">
                {cat.slug === 'rings' && '💍'}
                {cat.slug === 'earrings' && '✨'}
                {cat.slug === 'bracelets' && '📿'}
                {cat.slug === 'necklaces' && '⛓️'}
                {cat.slug === 'charms' && '🌟'}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 group-hover:text-[#C9A84C] transition-colors">{cat.name}</p>
                <p className="text-xs text-gray-400">{cat.count} украшений</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
            Хиты продаж
          </h2>
          <Link href="/catalog" className="text-sm hover:underline flex items-center gap-1" style={{ color: '#C9A84C' }}>
            Все украшения <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8D5A3' }}>
                <Award size={22} style={{ color: '#9A7A2E' }} />
              </div>
              <p className="font-semibold text-gray-900">Гарантия качества</p>
              <p className="text-sm text-gray-500">Только сертифицированные украшения с подтверждёнными пробами</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8D5A3' }}>
                <Truck size={22} style={{ color: '#9A7A2E' }} />
              </div>
              <p className="font-semibold text-gray-900">Доставка по Казахстану</p>
              <p className="text-sm text-gray-500">Отправляем курьером в любой город. Упаковка — подарочная коробка</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8D5A3' }}>
                <Shield size={22} style={{ color: '#9A7A2E' }} />
              </div>
              <p className="font-semibold text-gray-900">Безопасная покупка</p>
              <p className="text-sm text-gray-500">Оплата при получении. Возврат в течение 14 дней при сохранении вида</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Не нашли нужное украшение?
        </h2>
        <p className="text-gray-500 mb-6 text-sm">Напишите нам — подберём вариант под ваш запрос и бюджет</p>
        <a
          href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#C9A84C' }}
        >
          Написать в WhatsApp
        </a>
      </section>
    </>
  )
}
