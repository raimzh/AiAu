/**
 * Российский размер кольца численно равен внутреннему диаметру в миллиметрах,
 * поэтому длину окружности считаем, а не переписываем руками.
 * Американские размеры даны с округлением до ближайшего ходового — там, где
 * российский размер попадает ровно между двумя, указана вилка.
 */
export interface RingSize {
  /** Российский размер = внутренний диаметр, мм */
  ru: number
  /** Длина внутренней окружности, мм (она же европейский размер по ISO 8653) */
  circumference: number
  /** Примерное соответствие американскому размеру */
  us: string
}

const US_BY_RU: Record<string, string> = {
  '15': '4',
  '15.5': '4½–5',
  '16': '5½',
  '16.5': '6',
  '17': '6½–7',
  '17.5': '7½',
  '18': '8',
  '18.5': '8½',
  '19': '9',
  '19.5': '9½',
  '20': '10',
  '20.5': '10½–11',
  '21': '11½',
}

export const RING_SIZES: RingSize[] = Object.keys(US_BY_RU)
  .map(Number)
  .sort((a, b) => a - b)
  .map((ru) => ({
    ru,
    circumference: Math.round(ru * Math.PI * 10) / 10,
    us: US_BY_RU[String(ru)],
  }))

/** Ближайший размер по обхвату пальца или по внутреннему диаметру, мм */
export function nearestSize(mm: number, measure: 'circumference' | 'diameter'): RingSize | null {
  if (!Number.isFinite(mm) || mm <= 0) return null
  const diameter = measure === 'diameter' ? mm : mm / Math.PI
  return RING_SIZES.reduce<RingSize | null>((best, size) => {
    if (!best) return size
    return Math.abs(size.ru - diameter) < Math.abs(best.ru - diameter) ? size : best
  }, null)
}
