'use client'

import { settings } from '@/lib/data'
import { trackEvent } from '@/lib/analytics'

interface Props {
  /** Текст сообщения; по умолчанию — из настроек магазина */
  message?: string
  /** Откуда кликнули: product, footer, home-hero, contacts… — попадёт в параметры цели */
  source: string
  /** Цель в аналитике: заказ товара считаем отдельно от общего вопроса */
  goal?: 'whatsapp_order' | 'whatsapp_contact'
  className?: string
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  children: React.ReactNode
}

/** Ссылка в WhatsApp с отправкой цели в аналитику — единственный способ заказа на сайте */
export default function WhatsAppLink({
  message,
  source,
  goal = 'whatsapp_contact',
  className,
  style,
  onClick,
  children,
}: Props) {
  const text = encodeURIComponent(message ?? settings.whatsappMessage)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    // если переход отменили (например, не выбран размер) — это не конверсия
    if (e.defaultPrevented) return
    trackEvent(goal, { source })
  }

  return (
    <a
      href={`https://wa.me/${settings.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  )
}
