export type PluralForms = [one: string, few: string, many: string]

// Русские формы: 1 украшение, 2–4 украшения, 5+ украшений (11–14 — «украшений»)
export function plural(count: number, forms: PluralForms): string {
  const mod10 = Math.abs(count) % 10
  const mod100 = Math.abs(count) % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1]
  return forms[2]
}

export const JEWELLERY: PluralForms = ['украшение', 'украшения', 'украшений']
