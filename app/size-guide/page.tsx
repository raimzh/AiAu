import { Metadata } from 'next'
import Link from 'next/link'
import { Ruler, Scissors, MessageCircle, Info } from 'lucide-react'
import { RING_SIZES } from '@/lib/ring-sizes'
import { breadcrumbsJsonLd, OG_IMAGE } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import WhatsAppLink from '@/components/WhatsAppLink'
import SizeCalculator from './SizeCalculator'

const TITLE = 'Размеры украшений'
const DESCRIPTION =
  'Как узнать размер кольца, длину браслета и цепочки: таблицы размеров, калькулятор и два способа измерить дома.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/size-guide' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/size-guide', images: [OG_IMAGE] },
}

const SECTIONS = [
  { id: 'rings', label: 'Кольца' },
  { id: 'bracelets', label: 'Браслеты' },
  { id: 'chains', label: 'Цепочки и колье' },
]

const RING_TIPS = [
  'Меряйте палец вечером: за день руки немного отекают, и утренняя мерка окажется мала.',
  'Не меряйте с холода и сразу после спорта — размер «уплывёт» в обе стороны.',
  'Проверьте, проходит ли кольцо через костяшку: она шире основания пальца обычно на полразмера.',
  'Широкая шинка (от 6 мм) сидит плотнее — берите на полразмера больше.',
  'Правая и левая рука отличаются: меряйте тот палец, на котором будете носить.',
]

/** Браслет носится свободно: к обхвату запястья добавляют 1,5–2 см */
const BRACELET_SIZES = [
  { wrist: '14–15 см', length: '16 см', note: 'Тонкое запястье, подростковый размер' },
  { wrist: '15–16 см', length: '17 см', note: 'Самый ходовой женский размер' },
  { wrist: '16–17 см', length: '18 см', note: 'Женский средний, мужской тонкий' },
  { wrist: '17–18 см', length: '19 см', note: 'Мужской средний' },
  { wrist: '18–19 см', length: '20 см', note: 'Мужской крупный' },
  { wrist: '19–20 см', length: '21 см', note: 'Крупное запястье' },
]

/** Где заканчивается цепочка при среднем телосложении */
const CHAIN_LENGTHS = [
  { length: '35–38 см', fit: 'Плотно вокруг основания шеи, как чокер' },
  { length: '40 см', fit: 'На уровне ключиц, подчёркивает шею' },
  { length: '45 см', fit: 'Чуть ниже ключиц — самая универсальная длина' },
  { length: '50 см', fit: 'На уровне выреза, хорошо смотрится с кулоном' },
  { length: '55 см', fit: 'Ниже выреза, заметна поверх свитера и блузы' },
  { length: '60 см и длиннее', fit: 'На уровне груди, можно носить в два оборота' },
]

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: 'Главная', path: '/' },
          { name: TITLE, path: '/size-guide' },
        ])}
      />

      <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Как узнать свой размер</h1>
      <p className="mb-6 max-w-2xl text-lg text-gray-600">
        Всё, что нужно для мерки, — линейка и полоска бумаги. Ниже размеры колец, длины браслетов и
        цепочек: как измерить и что из этого выбрать.
      </p>

      <nav aria-label="Разделы страницы" className="mb-12 flex flex-wrap gap-2">
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="inline-flex min-h-11 items-center rounded-full border border-gray-200 px-4 text-sm text-gray-600 transition-colors hover:border-gold-ink hover:text-gold-ink"
          >
            {section.label}
          </a>
        ))}
      </nav>

      {/* ── Кольца ─────────────────────────────────────────── */}
      <section id="rings" className="scroll-mt-24">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Кольца</h2>
        <p className="mb-8 max-w-2xl text-gray-600">
          В Казахстане и России размер кольца — это внутренний диаметр в миллиметрах. Кольцо с
          диаметром 17 мм имеет размер 17.
        </p>

        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-6">
            <div
              className="mb-4 flex size-10 items-center justify-center rounded-full"
              style={{ backgroundColor: 'var(--gold-light)' }}
            >
              <Ruler size={20} style={{ color: 'var(--gold-dark)' }} />
            </div>
            <p className="mb-2 font-semibold text-gray-900">Способ 1. По кольцу, которое носите</p>
            <p className="text-sm leading-relaxed text-gray-600">
              Приложите линейку к кольцу изнутри и измерьте расстояние от края до края в самом
              широком месте. Получилось 17 мм — ваш размер 17. Мерьте кольцо с того пальца, для
              которого выбираете новое.
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
              натяжения, отметьте место стыка и измерьте длину до отметки. Это обхват — переведите
              его в размер калькулятором ниже или по таблице.
            </p>
          </div>
        </div>

        <h3 className="mb-4 text-lg font-semibold text-gray-900">Калькулятор размера</h3>
        <div className="mb-10">
          <SizeCalculator />
        </div>

        <h3 className="mb-4 text-lg font-semibold text-gray-900">Таблица размеров колец</h3>
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
        <p className="mb-10 flex items-start gap-2 text-sm text-gray-500">
          <Info size={16} className="mt-0.5 shrink-0" />
          Обхват равен диаметру, умноженному на 3,14 — он же европейский размер по ISO. Американские
          размеры идут с другим шагом, поэтому в некоторых строках указана вилка.
        </p>

        <h3 className="mb-4 text-lg font-semibold text-gray-900">Что учесть при измерении</h3>
        <ul className="mb-14 space-y-3">
          {RING_TIPS.map((tip) => (
            <li key={tip} className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
              <span
                className="mt-1.5 size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: 'var(--gold)' }}
              />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Браслеты ───────────────────────────────────────── */}
      <section id="bracelets" className="scroll-mt-24">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Браслеты</h2>
        <p className="mb-8 max-w-2xl text-gray-600">
          Оберните полоску бумаги или сантиметровую ленту вокруг запястья там, где обычно носите
          браслет, — без натяжения. Это обхват. Длина браслета должна быть на 1,5–2 см больше:
          тогда он ложится свободно и не давит.
        </p>

        <div className="mb-4 overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
                  Обхват запястья
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
                  Длина браслета
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
                  Кому обычно подходит
                </th>
              </tr>
            </thead>
            <tbody>
              {BRACELET_SIZES.map((row) => (
                <tr key={row.length} className="border-t border-gray-100">
                  <th scope="row" className="px-4 py-3 text-left font-semibold text-gray-900">
                    {row.wrist}
                  </th>
                  <td className="px-4 py-3 text-gray-600">{row.length}</td>
                  <td className="px-4 py-3 text-gray-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-14 flex items-start gap-2 text-sm text-gray-500">
          <Info size={16} className="mt-0.5 shrink-0" />
          Если между двумя длинами сомневаетесь — берите бо́льшую: плотный браслет натирает и быстрее
          изнашивает замок. Массивные плетения вроде «Бисмарка» сидят плотнее, к ним стоит добавить
          ещё полсантиметра.
        </p>
      </section>

      {/* ── Цепочки ────────────────────────────────────────── */}
      <section id="chains" className="scroll-mt-24">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Цепочки и колье</h2>
        <p className="mb-8 max-w-2xl text-gray-600">
          Здесь размер — это длина самой цепочки, а не обхват шеи. Проще всего примерить нитку
          нужной длины перед зеркалом и посмотреть, где она ложится. В таблице — где заканчивается
          цепочка при среднем телосложении.
        </p>

        <div className="mb-4 overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
                  Длина
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
                  Как сидит
                </th>
              </tr>
            </thead>
            <tbody>
              {CHAIN_LENGTHS.map((row) => (
                <tr key={row.length} className="border-t border-gray-100">
                  <th scope="row" className="px-4 py-3 text-left font-semibold text-gray-900">
                    {row.length}
                  </th>
                  <td className="px-4 py-3 text-gray-600">{row.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mb-14 space-y-3">
          {[
            'Мужские цепочки чаще берут 50–60 см, женские — 40–50 см.',
            'Под кулон добавьте 5 см к привычной длине: подвеска тянет цепочку вниз.',
            'Если носите поверх водолазки или свитера, берите от 55 см.',
            'Полным телосложением цепочка «съедает» 2–3 см — стоит взять на размер длиннее.',
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
              <span
                className="mt-1.5 size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: 'var(--gold)' }}
              />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="rounded-lg bg-gray-50 p-8 text-center">
        <h2 className="mb-3 text-xl font-bold text-gray-900">Сомневаетесь между двумя размерами?</h2>
        <p className="mb-6 text-sm text-gray-600">
          Напишите нам — подскажем, какой выбрать под конкретную модель, и поможем с обменом, если
          не подойдёт
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <WhatsAppLink
            source="size-guide"
            message="Здравствуйте! Помогите определить размер украшения"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded px-6 font-medium text-gray-900 transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--gold)' }}
          >
            <MessageCircle size={18} />
            Спросить в WhatsApp
          </WhatsAppLink>
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
