import { settings, categories } from '@/lib/data'
import { absoluteUrl, SITE_URL } from '@/lib/site'
import type { Product } from '@/types'

/** Картинка превью по умолчанию — генерируется в app/opengraph-image.tsx */
export const OG_IMAGE = '/opengraph-image'

/** Магазин: имя, адрес, часы, контакты — для сниппета и карточки организации */
export function storeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    '@id': `${SITE_URL}/#store`,
    name: settings.siteName,
    description: settings.description,
    url: SITE_URL,
    image: absoluteUrl('/opengraph-image'),
    telephone: settings.phone,
    email: settings.email,
    priceRange: '₸₸',
    currenciesAccepted: 'KZT',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.street,
      addressLocality: settings.city,
      addressCountry: settings.country,
    },
    openingHours: settings.openingHoursSchema,
    sameAs: settings.instagram.startsWith('https://') ? [settings.instagram] : [],
  }
}

/** Товар: название, фото, цена, наличие — Google показывает их прямо в выдаче */
export function productJsonLd(product: Product) {
  const category = categories.find((c) => c.slug === product.category)
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map(absoluteUrl),
    sku: product.id,
    category: category?.name,
    material: product.metalLabel,
    color: product.colorLabel,
    ...(product.weight ? { weight: { '@type': 'QuantitativeValue', name: product.weight } } : {}),
    brand: { '@type': 'Brand', name: settings.siteName },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/p/${product.slug}`),
      priceCurrency: 'KZT',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@id': `${SITE_URL}/#store` },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: settings.country,
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: settings.returnDays,
      },
    },
  }
}

/** Хлебные крошки: в выдаче вместо голого URL показывается путь «Каталог › Кольца» */
export function breadcrumbsJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** Список товаров категории — помогает Google понять структуру каталога */
export function itemListJsonLd(products: Product[], name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/p/${p.slug}`),
      name: p.name,
    })),
  }
}
