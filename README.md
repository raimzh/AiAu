# AiAu — Ювелирный интернет-магазин

Интернет-магазин золотых украшений для казахстанского рынка. Заказы принимаются через WhatsApp. Контент управляется через JSON-файлы — никакой CMS и базы данных.

## Стек

| Технология | Назначение |
|---|---|
| Next.js 16 (App Router) | Фреймворк, статическая генерация |
| TypeScript | Типизация |
| Tailwind CSS v4 | Стили |
| shadcn/ui | UI-компоненты (Badge, Card, Button) |
| Lucide React | Иконки |
| localStorage | Хранение избранного |

---

## Структура проекта

```
app/
  page.tsx                        — Главная страница
  layout.tsx                      — Корневой layout (Header, Footer, WishlistProvider)
  catalog/
    page.tsx                      — Каталог всех товаров
    CatalogClient.tsx             — Фильтры, сортировка (client component)
    [category]/
      page.tsx                    — Страница категории
      [slug]/
        page.tsx                  — Страница товара
        ProductPageClient.tsx     — Галерея, размеры, WhatsApp-кнопка
  about/page.tsx                  — О нас
  contacts/page.tsx               — Контакты
  wishlist/
    page.tsx                      — Избранное
    WishlistClient.tsx            — Client component для wishlist
  robots.ts                       — Генерация robots.txt
  sitemap.ts                      — Генерация sitemap.xml
  opengraph-image.tsx             — Картинка превью ссылки 1200×630 (генерируется)
  icon.tsx / apple-icon.tsx       — Фавикон и иконка для iOS (генерируются)
  _fonts/                         — Playfair Display для превью и иконок

components/
  Header.tsx                      — Шапка с навигацией и счётчиком избранного
  Footer.tsx                      — Подвал с контактами и ссылками
  ProductCard.tsx                 — Карточка товара
  WishlistProvider.tsx            — Context + localStorage + toast-уведомления

data/
  products.json                   — Каталог товаров
  categories.json                 — Категории
  settings.json                   — Контакты, название, WhatsApp

lib/
  data.ts                         — Хелперы для чтения данных
  site.ts                         — Домен сайта (NEXT_PUBLIC_SITE_URL) и абсолютные ссылки
  seo.ts                          — Разметка Schema.org: магазин, товар, крошки, список
  plural.ts                       — Склонение числительных («1 украшение», «5 украшений»)
  og-font.ts                      — Playfair Display для картинок превью

types/
  index.ts                        — TypeScript-типы (Product, Category, SiteSettings)

public/
  images/
    products/                     — Фото товаров (добавить вручную)
    placeholder.svg               — Заглушка при отсутствии фото
```

---

## Управление контентом

Весь контент хранится в JSON-файлах в папке `data/`. Редактировать можно вручную или через Claude Code.

### Добавить товар

Открыть `data/products.json` и добавить объект:

```json
{
  "id": "ring-005",
  "name": "Название украшения",
  "slug": "nazvanie-ukrasheniya",
  "category": "rings",
  "price": 75000,
  "oldPrice": null,
  "metal": "gold-585",
  "metalLabel": "Золото 585",
  "color": "yellow",
  "colorLabel": "Жёлтое",
  "images": ["/images/products/ring-005.jpg"],
  "sizes": ["16", "16.5", "17"],
  "description": "Описание товара.",
  "weight": "3.2 г",
  "inStock": true,
  "featured": false,
  "isNew": true,
  "isSale": false
}
```

Допустимые значения:
- `category`: `rings` | `earrings` | `bracelets` | `necklaces` | `charms`
- `metal`: `gold-585` | `gold-750`
- `color`: `yellow` | `white` | `rose`

### Изменить контакты

Открыть `data/settings.json`:

```json
{
  "siteName": "AiAu",
  "phone": "+7 (706) 665-54-44",
  "whatsapp": "77066655444",
  "email": "ai.suleimenova@gmail.com",
  "address": "г. Алматы, ул. Б.Момышулы, 40",
  "instagram": "https://instagram.com/aiau.kz",

  "city": "Алматы",
  "street": "ул. Б.Момышулы, 40",
  "country": "KZ",
  "openingHoursSchema": "Mo-Su 09:00-20:00",
  "returnDays": 14
}
```

Последние пять полей — для поисковиков (Schema.org): из них собирается карточка организации с адресом, часами работы и сроком возврата. `openingHoursSchema` пишется в формате Schema.org (`Mo-Su 09:00-20:00`), человекочитаемые часы для шапки берутся из `workingHours`.

---

## Запуск локально

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000)

```bash
npm run build   # production-сборка
npm run start   # запуск production-сервера
```

---

## Деплой на Vercel

1. Зайти на [vercel.com](https://vercel.com) → Import Git Repository
2. Выбрать репозиторий `AiAu`
3. Настройки по умолчанию — нажать Deploy
4. Задать переменную окружения `NEXT_PUBLIC_SITE_URL` — реальный домен без слэша на конце (например `https://aiau.kz`). Из неё берутся canonical, sitemap, robots, Schema.org и ссылка на товар в сообщении WhatsApp. Без переменной используется `https://aiau.kz` (значение по умолчанию в `lib/site.ts`)
5. Отправить sitemap в Google Search Console: `https://ваш-домен/sitemap.xml`
6. Проверить разметку товара в Rich Results Test: `https://search.google.com/test/rich-results`

---

## Страницы

| URL | Описание |
|---|---|
| `/` | Главная: hero, категории, хиты продаж, преимущества |
| `/catalog` | Все товары с фильтрами |
| `/catalog/rings` | Кольца (аналогично для других категорий) |
| `/catalog/rings/slug` | Страница товара |
| `/wishlist` | Избранное (localStorage) |
| `/about` | О магазине |
| `/contacts` | Контакты и WhatsApp |
| `/robots.txt` | Правила для поисковиков |
| `/sitemap.xml` | Карта сайта |
| `/opengraph-image` | Картинка превью ссылки для WhatsApp, Instagram, поиска |
| `/icon`, `/apple-icon` | Фавикон и иконка для домашнего экрана iOS |

Фильтры каталога живут в query-строке: `/catalog/rings?metal=gold-750&stock=1` — такую ссылку можно отправить клиенту, она откроется с той же выборкой.

---

## CHANGELOG

### [2026-08-27] — SEO и превью ссылок

#### Добавлено
- Разметка Schema.org (`lib/seo.ts`): `JewelryStore` с адресом, часами и контактами на всех страницах; `Product` с ценой, наличием, артикулом, материалом и сроком возврата на карточке товара; `BreadcrumbList` на товарах и категориях; `ItemList` в каталоге. Теперь Google может показывать цену и наличие прямо в выдаче
- Картинка превью ссылки `app/opengraph-image.tsx` — 1200×630, генерируется при сборке из настроек магазина. Ссылка, отправленная в WhatsApp или Instagram, больше не выглядит голой
- Свой фавикон `app/icon.tsx` и иконка для iOS `app/apple-icon.tsx` («Au» шрифтом Playfair) вместо дефолтного значка Next.js
- `canonical` на всех страницах, `og:title`/`og:description`/`og:image` для каждой, `twitter:card`
- Страница избранного закрыта от индексации (`robots: noindex` + `Disallow` в robots.txt) — личная выборка в выдаче не нужна
- Домен вынесен в `lib/site.ts` и переменную `NEXT_PUBLIC_SITE_URL`: sitemap, robots, canonical, Schema.org и ссылка в сообщении WhatsApp больше не хранят `https://aiau.kz` в четырёх местах
- Фильтры каталога перенесены в query-строку (`?metal=gold-750&sort=price-asc&stock=1`) — выборку можно переслать ссылкой, кнопка «назад» её возвращает. Читаются через `useSyncExternalStore`, поэтому каталог остался статически сгенерированным (с `useSearchParams` товары исчезли бы из HTML для поисковиков)
- В `data/settings.json` добавлены `city`, `street`, `country`, `openingHoursSchema`, `returnDays` — из них строится карточка организации


### [2026-08-27] — Доступность и типографика

#### Исправлено
- Заголовки рендерились системной Georgia: инлайновый `fontFamily` перебивал `--font-heading`. Убран из 13 мест, добавлен класс `font-heading` — теперь работает загруженный Playfair Display
- Контраст по WCAG AA: добавлен токен `--gold-ink: #846822` (5.3:1) для золотого ТЕКСТА на светлом фоне; `--gold` (#C9A84C) остался декоративным — фоны, бордюры, текст на тёмном. Текст на золотых кнопках стал `gray-900` вместо белого (было 2.29:1, стало 7.76:1). `--gold-dark` затемнён до `#6E5619` для иконок на `--gold-light`. Информативный `gray-400` на светлом заменён на `gray-500`
- Тач-таргеты 44×44: сердечко на карточке (было 36), кнопки размеров, пилюли категорий, иконки и пункты мобильного меню в шапке. Селекты фильтров — 44px и `font-size: 16px`, чтобы iOS не зумил страницу при тапе
- Instagram на странице контактов был захардкожен как `@zoloto.kz` — теперь выводится из `settings.instagram`
- Склонение числительных: «1 украшение», «2 украшения», «5 украшений» (`lib/plural.ts`)
- `WishlistProvider` переписан на `useSyncExternalStore`: убран `setState` в эффекте (ошибка `react-hooks/set-state-in-effect`) и побочные эффекты внутри апдейтера `setState`. Добавлена синхронизация между вкладками и `aria-live` для тоста
- Удалён мёртвый маршрут `app/catalog/[category]/[slug]/` — он перекрывался редиректом на `/p/[slug]`, но собирал 12 недостижимых страниц (39 → 27 страниц в билде). `ProductPageClient` переехал в `components/`
- `focus:outline-none` на селектах заменён на видимое кольцо фокуса; у кнопок избранного и размеров появился `aria-pressed`


### [2026-05-18] — Initial release

#### Добавлено
- Главная страница: hero-баннер, блок категорий, хиты продаж, блок преимуществ, CTA
- Каталог с фильтрами по категории, металлу, сортировкой и чекбоксом «в наличии»
- Страницы всех 5 категорий (`rings`, `earrings`, `bracelets`, `necklaces`, `charms`)
- 12 страниц товаров со статической генерацией (`generateStaticParams`)
- Выбор размера с валидацией — нельзя заказать без выбора размера
- Кнопка «Заказать через WhatsApp» с предзаполненным сообщением (название, артикул, размер)
- Избранное через `localStorage` с автоочисткой удалённых товаров
- Toast-уведомление при добавлении/удалении из избранного
- Страницы `/about`, `/contacts`, `/wishlist`
- Header с мобильным меню и счётчиком избранного
- Footer с навигацией, контактами и WhatsApp-кнопкой
- Хлебные крошки на страницах каталога и товара
- `robots.txt` и `sitemap.xml` (автогенерация через Next.js)
- SVG-placeholder для отсутствующих фото товаров

#### Безопасность
- HTTP security headers: `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`
- Валидация URL Instagram (`startsWith('https://')`) против XSS
- `rel="noopener noreferrer"` на всех внешних ссылках
- `JSON.parse` из `localStorage` обёрнут в `try/catch`

#### Дизайн
- Цветовая схема: белый + золотой `#C9A84C` + тёмно-серый
- Шрифты: Playfair Display (заголовки) + Inter (текст)
- Адаптив: мобильный, планшет, десктоп
- Luxury-стиль как у Pandora.kz / Sokolov.kz

#### Исправленные баги
- Кнопка заказа была активна для товаров «нет в наличии»
- Бейджи «Новинка» и «Скидка» накладывались друг на друга
- Счётчик избранного переполнялся при 10+ товарах
- «Сбросить фильтры» не сбрасывал сортировку
- `count` категорий был захардкожен вместо вычисляемого значения
- Отсутствовал файл `placeholder.jpg` — браузер показывал сломанную картинку
- Зона клика на кнопке избранного была `28px` вместо `44px`
- Бейдж «Нет в наличии» сливался с фоном (серый на сером)
