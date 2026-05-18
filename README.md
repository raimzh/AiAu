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
  "address": "г. Алматы, ...",
  "instagram": "https://instagram.com/aiau.kz"
}
```

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
4. После деплоя поменять `metadataBase` и `BASE` в `app/sitemap.ts` на реальный домен
5. Отправить sitemap в Google Search Console: `https://ваш-домен/sitemap.xml`

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

---

## CHANGELOG

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
