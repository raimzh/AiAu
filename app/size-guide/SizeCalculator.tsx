'use client'

import { useState } from 'react'
import Link from 'next/link'
import { nearestSize } from '@/lib/ring-sizes'

type Measure = 'circumference' | 'diameter'

const LABELS: Record<Measure, { label: string; hint: string; placeholder: string }> = {
  circumference: {
    label: 'Обхват пальца',
    hint: 'Оберните полоску бумаги вокруг основания пальца и измерьте её длину линейкой',
    placeholder: 'например 53',
  },
  diameter: {
    label: 'Диаметр кольца',
    hint: 'Приложите линейку к кольцу изнутри — от края до края в самом широком месте',
    placeholder: 'например 17',
  },
}

export default function SizeCalculator() {
  const [measure, setMeasure] = useState<Measure>('circumference')
  const [value, setValue] = useState('')

  const mm = parseFloat(value.replace(',', '.'))
  const match = value.trim() ? nearestSize(mm, measure) : null
  const invalid = value.trim() !== '' && !match

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(LABELS) as Measure[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setMeasure(key)}
            aria-pressed={measure === key}
            className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-colors ${
              measure === key
                ? 'border-gold-ink bg-[#FAF6EC] font-medium text-gold-ink'
                : 'border-gray-200 text-gray-600 hover:border-gold-ink hover:text-gold-ink'
            }`}
          >
            {LABELS[key].label}
          </button>
        ))}
      </div>

      <label htmlFor="size-input" className="mt-5 block text-sm font-medium text-gray-700">
        {LABELS[measure].label}, мм
      </label>
      <p className="mt-1 text-sm text-gray-500">{LABELS[measure].hint}</p>

      <input
        id="size-input"
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={LABELS[measure].placeholder}
        aria-describedby="size-result"
        className="mt-3 w-full max-w-40 rounded border border-gray-200 px-3 text-base min-h-11 focus:border-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-ink"
      />

      <div id="size-result" aria-live="polite" className="mt-4 text-sm">
        {match && (
          <p className="text-gray-700">
            Ваш размер —{' '}
            <span className="text-xl font-semibold text-gray-900">{match.ru}</span>{' '}
            <span className="text-gray-500">
              (диаметр {match.ru} мм, обхват {match.circumference.toFixed(1)} мм, US {match.us})
            </span>
            .{' '}
            <Link href="/catalog/rings" className="text-gold-ink hover:underline">
              Посмотреть кольца
            </Link>
          </p>
        )}
        {invalid && <p className="text-gray-600">Введите число в миллиметрах — например 53 или 17,5</p>}
        {!match && !invalid && <p className="text-gray-500">Введите мерку — покажем ближайший размер</p>}
      </div>
    </div>
  )
}
