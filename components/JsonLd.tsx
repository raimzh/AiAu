// Разметка Schema.org для поисковиков: цена, наличие и контакты попадают в сниппет выдачи.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // данные наши собственные (из data/*.json), не пользовательский ввод
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }}
    />
  )
}
