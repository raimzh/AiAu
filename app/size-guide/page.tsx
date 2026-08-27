import { Metadata } from 'next'
import Link from 'next/link'
import { Ruler, Scissors, MessageCircle, Info } from 'lucide-react'
import { settings } from '@/lib/data'
import { RING_SIZES } from '@/lib/ring-sizes'
import { breadcrumbsJsonLd, OG_IMAGE } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import SizeCalculator from './SizeCalculator'

const TITLE = 'Размер кольца'
const DESCRIPTION =
  'Как узнать размер кольца: таблица российских размеров с диаметром и обхватом, соответствие американским размерам и два способа измерить палец дома.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/size-guide' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/size-guide', images: [OG_IMAGE] },
}

const TIPS = [
  'Меряйте палец вечером: за день руки немного отекают, и утренняя мерка окажется мала.',
  'Не меряйте с холода и сразу после спорта — размер «уплывёт» в обе стороны.',
  'Проверьте, проходит ли кольцо через костяшку: она шире основания пальца обычно на полразмера.',
  'Широкая шинка (от 6 мм) сидит плотнее — берите на полразмера больше.',
  'Правая и левая рука отличаются: меряйте тот палец, на котором будете носить.',
]

export default function SizeGuidePage() {
  const waLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    'Здравствуйте! Помогите определить размер кольца'
  )}`

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: 'Главная', path: '/' },
          { name: TITLE, path: '/size-guide' },
        ])}
      />

      <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Как узнать размер кольца</h1>
      <p className="mb-12 max-w-2xl text-lg text-gray-600">
        В Казахстане и России размер кольца — это внутренний диаметр в миллиметрах. Кольцо с
        диаметром 17 мм имеет размер 17. Измерить можно за минуту, ничего кроме линейки и полоски
        бумаги не нужно.
      </p>

      {/* Два способа */}
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-6">
          <div
            className="mb-4 flex size-10 items-center justify-center rounded-full"
            style={{ backgroundColor: 'var(--gold-light)' }}
          >
            <Ruler size={20} style={{ color: 'var(--gold-dark)' }} />
          </div>
          <p className="mb-2 font-semibold text-gray-900">Способ 1. По кольцу, которое носите</p>
          <p className="text-sm leading-relaxed text-gray-600">
            Приложите линейку к кольцу изнутри и измерьте расстояние от края до края в самом широком
            месте. Получилось 17 мм — ваш размер 17. Мерьте кольцо с того пальца, для которого
            выбираете новое.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 p-6">
          <div
            className="mb-4 flex size-10 items-center justify-center rounded-full"
            style={{ backgroundColor: 'var(--gold-light)' }}
          >
            <Scissors size={20} style={{ color: 'var(--gold-dark)' }} />
          </div>
          <p className="mb-2 font-semibold text-gray-900">Способ 2. По пальцу</p>
          <p className="text-sm leading-relaxed text-gray-600">
            Отрежьте полоску бумаги шириной около 10 мм, оберните вокруг основания пальца без
            натяжения, отметьте место стыка и измерьте длину до отметки. Это обхват — переведите его
            в размер калькулятором ниже или по таблице.
          </p>
        </div>
      </div>

      {/* Калькулятор */}
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Калькулятор размера</h2>
      <div className="mb-12">
        <SizeCalculator />
      </div>

      {/* Таблица */}
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Таблица размеров</h2>
      <div className="mb-4 overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
                Размер (Россия, Казахстан)
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
                Внутренний диаметр, мм
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
                Обхват пальца, мм
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
                США (примерно)
              </th>
            </tr>
          </thead>
          <tbody>
            {RING_SIZES.map((size) => (
              <tr key={size.ru} className="border-t border-gray-100">
                <th scope="row" className="px-4 py-3 text-left font-semibold text-gray-900">
                  {size.ru}
                </th>
                <td className="px-4 py-3 text-gray-600">{size.ru}</td>
                <td className="px-4 py-3 text-gray-600">{size.circumference.toFixed(1)}</td>
                <td className="px-4 py-3 text-gray-600">{size.us}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-12 flex items-start gap-2 text-sm text-gray-500">
        <Info size={16} className="mt-0.5 shrink-0" />
        Обхват равен диаметру, умноженному на 3,14 — он же европейский размер по ISO. Американские
        размеры идут с другим шагом, поэтому в некоторых строках указана вилка.
      </p>

      {/* Советы */}
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Что учесть при измерении</h2>
      <ul className="mb-12 space-y-3">
        {TIPS.map((tip) => (
          <li key={tip} className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
            <span
              className="mt-1.5 size-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: 'var(--gold)' }}
            />
            {tip}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="rounded-lg bg-gray-50 p-8 text-center">
        <h2 className="mb-3 text-xl font-bold text-gray-900">Сомневаетесь между двумя размерами?</h2>
        <p className="mb-6 text-sm text-gray-600">
          Напишите нам — подскажем, какой выбрать под конкретную модель, и поможем с обменом, если
          не подойдёт
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
            href="/catalog/rings"
            className="inline-flex min-h-11 items-center justify-center rounded border border-gray-200 px-6 font-medium text-gray-700 transition-colors hover:border-gold-ink"
          >
            Смотреть кольца
          </Link>
        </div>
      </div>
    </div>
  )
}
