import { Metadata } from 'next'
import Link from 'next/link'
import {
  Store,
  Truck,
  Package,
  Wallet,
  CreditCard,
  ShieldCheck,
  RefreshCw,
  MessageCircle,
  MapPin,
  Clock,
} from 'lucide-react'
import { delivery, settings } from '@/lib/data'
import { breadcrumbsJsonLd, OG_IMAGE } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'

const TITLE = 'Доставка и оплата'
const DESCRIPTION =
  'Доставка золотых украшений по Казахстану и Алматы, самовывоз, оплата при получении, обмен и возврат в течение 14 дней.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/delivery' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/delivery', images: [OG_IMAGE] },
}

const ICONS: Record<string, typeof Store> = {
  store: Store,
  truck: Truck,
  package: Package,
  wallet: Wallet,
  card: CreditCard,
  refresh: RefreshCw,
  shield: ShieldCheck,
}

/** Если цена или срок в data/delivery.json не заполнены — обещать нечего, зовём в WhatsApp */
const ASK = 'Уточним при заказе'

function Icon({ name }: { name: string }) {
  const Glyph = ICONS[name] ?? Package
  return (
    <div
      className="mb-4 flex size-10 items-center justify-center rounded-full"
      style={{ backgroundColor: 'var(--gold-light)' }}
    >
      <Glyph size={20} style={{ color: 'var(--gold-dark)' }} />
    </div>
  )
}

export default function DeliveryPage() {
  const waLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    'Здравствуйте! Подскажите по доставке'
  )}`

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: 'Главная', path: '/' },
          { name: TITLE, path: '/delivery' },
        ])}
      />

      <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Доставка и оплата</h1>
      <p className="mb-12 max-w-2xl text-lg text-gray-600">
        Заказ оформляется в WhatsApp: вы пишете, какое украшение и какой размер, мы подтверждаем
        наличие и согласовываем доставку. Никакой регистрации и предоплаты «вслепую».
      </p>

      {/* Доставка */}
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Как получить заказ</h2>
      <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {delivery.options.map((option) => (
          <div key={option.id} className="flex flex-col rounded-lg border border-gray-200 p-6">
            <Icon name={option.icon} />
            <p className="mb-2 font-semibold text-gray-900">{option.title}</p>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">{option.description}</p>
            <dl className="space-y-1 border-t border-gray-100 pt-4 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">Стоимость</dt>
                <dd className="text-right font-medium text-gray-900">{option.price || ASK}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">Срок</dt>
                <dd className="text-right font-medium text-gray-900">{option.time || ASK}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      {/* Самовывоз: адрес */}
      <div className="mb-14 rounded-lg bg-gray-50 p-6 sm:p-8">
        <p className="mb-4 font-semibold text-gray-900">Адрес магазина</p>
        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <p className="flex items-start gap-2 text-gray-700">
            <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--gold-dark)' }} />
            {settings.address}
          </p>
          <p className="flex items-start gap-2 text-gray-700">
            <Clock size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--gold-dark)' }} />
            {settings.workingHours}
          </p>
        </div>
        <Link href="/contacts" className="mt-4 inline-flex min-h-11 items-center text-sm text-gold-ink hover:underline">
          Все контакты
        </Link>
      </div>

      {/* Оплата */}
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Как оплатить</h2>
      <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {delivery.payment.map((method) => (
          <div key={method.id} className="rounded-lg border border-gray-200 p-6">
            <Icon name={method.icon} />
            <p className="mb-2 font-semibold text-gray-900">{method.title}</p>
            <p className="text-sm leading-relaxed text-gray-600">{method.description}</p>
          </div>
        ))}
      </div>

      {/* Возврат и гарантия */}
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Обмен, возврат и гарантия</h2>
      <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-6">
          <Icon name="refresh" />
          <p className="mb-2 font-semibold text-gray-900">
            Обмен и возврат — {settings.returnDays} дней
          </p>
          <p className="text-sm leading-relaxed text-gray-600">
            Если размер не подошёл или украшение не понравилось, обменяем или вернём деньги в
            течение {settings.returnDays} дней. Условие одно — сохранён товарный вид, бирки и
            упаковка.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <Icon name="shield" />
          <p className="mb-2 font-semibold text-gray-900">Гарантия на украшение</p>
          <p className="text-sm leading-relaxed text-gray-600">
            Все изделия из золота 585 и 750 пробы с государственным клеймом. К заказу прикладываем
            чек и бирку производителя — по ним подтверждается проба и вес.
          </p>
        </div>
      </div>

      {/* Вопросы */}
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Частые вопросы</h2>
      <div className="mb-14 divide-y divide-gray-100 rounded-lg border border-gray-200">
        {delivery.faq.map((item) => (
          <div key={item.question} className="p-6">
            <p className="mb-2 font-semibold text-gray-900">{item.question}</p>
            <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-lg bg-gray-50 p-8 text-center">
        <h2 className="mb-3 text-xl font-bold text-gray-900">Остались вопросы по доставке?</h2>
        <p className="mb-6 text-sm text-gray-600">
          Напишите — посчитаем стоимость доставки в ваш город и назовём срок
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded px-6 font-medium text-gray-900 transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--gold)' }}
          >
            <MessageCircle size={18} />
            Спросить в WhatsApp
          </a>
          <Link
            href="/catalog"
            className="inline-flex min-h-11 items-center justify-center rounded border border-gray-200 px-6 font-medium text-gray-700 transition-colors hover:border-gold-ink"
          >
            Смотреть каталог
          </Link>
        </div>
      </div>
    </div>
  )
}
