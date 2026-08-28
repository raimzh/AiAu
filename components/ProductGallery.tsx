'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface Props {
  images: string[]
  alt: string
  /** Бейджи «Новинка» / «Скидка» поверх фото */
  badges?: React.ReactNode
}

const FALLBACK = '/images/placeholder.svg'

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget
  if (!img.src.endsWith(FALLBACK)) img.src = FALLBACK
}

/**
 * Галерея товара: свайп на телефоне (scroll-snap, без JS-жестов), стрелки и миниатюры
 * на десктопе, клик по фото — полноэкранный просмотр. Для одного фото лишние элементы
 * не рисуются, но увеличение работает.
 */
export default function ProductGallery({ images, alt, badges }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState<number | null>(null)
  const many = images.length > 1

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: index * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' })
  }, [])

  const onScroll = useCallback(() => {
    const track = trackRef.current
    if (!track || !track.clientWidth) return
    setActive(Math.round(track.scrollLeft / track.clientWidth))
  }, [])

  const step = useCallback(
    (delta: number) => {
      const next = (active + delta + images.length) % images.length
      setActive(next)
      scrollTo(next)
    },
    [active, images.length, scrollTo]
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex aspect-square snap-x snap-mandatory overflow-x-auto rounded-lg bg-gray-50 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setZoomed(i)}
              aria-label={`Открыть фото ${i + 1} из ${images.length} во весь экран`}
              className="relative aspect-square w-full flex-none cursor-zoom-in snap-center"
            >
              <Image
                src={src}
                alt={many ? `${alt} — фото ${i + 1}` : alt}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                priority={i === 0}
                className="object-contain p-4"
                onError={handleImageError}
              />
            </button>
          ))}
        </div>

        {badges && <div className="pointer-events-none absolute top-4 left-4 flex flex-col gap-1">{badges}</div>}

        <span className="pointer-events-none absolute right-4 bottom-4 flex size-11 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm">
          <ZoomIn size={18} />
        </span>

        {many && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Предыдущее фото"
              className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition-shadow hover:shadow-md"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Следующее фото"
              className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition-shadow hover:shadow-md"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {many && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                setActive(i)
                scrollTo(i)
              }}
              aria-label={`Фото ${i + 1}`}
              aria-current={i === active}
              className={`relative size-20 flex-none overflow-hidden rounded border bg-gray-50 transition-colors ${
                i === active ? 'border-gold-ink' : 'border-gray-200 hover:border-gold-ink'
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-contain p-1"
                onError={handleImageError}
              />
            </button>
          ))}
        </div>
      )}

      {zoomed !== null && (
        <Lightbox
          images={images}
          alt={alt}
          index={zoomed}
          onIndexChange={(i) => {
            setZoomed(i)
            setActive(i)
            scrollTo(i)
          }}
          onClose={() => setZoomed(null)}
        />
      )}
    </div>
  )
}

interface LightboxProps {
  images: string[]
  alt: string
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

function Lightbox({ images, alt, index, onIndexChange, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const many = images.length > 1

  // Открытие/закрытие: фон не скроллится, фокус уходит на «закрыть» и возвращается назад.
  // Отдельным эффектом от клавиатуры — иначе листание стрелками дёргало бы фокус на страницу.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = overflow
      opener?.focus()
    }
  }, [])

  // Esc закрывает, стрелки листают
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && many) onIndexChange((index - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight' && many) onIndexChange((index + 1) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, images.length, many, onClose, onIndexChange])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} — просмотр фото`}
      onClick={onClose}
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 p-4"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Закрыть просмотр"
        className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={22} />
      </button>

      {many && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onIndexChange((index - 1 + images.length) % images.length)
            }}
            aria-label="Предыдущее фото"
            className="absolute left-2 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onIndexChange((index + 1) % images.length)
            }}
            aria-label="Следующее фото"
            className="absolute right-2 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div className="relative h-full w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <Image
          src={images[index]}
          alt={many ? `${alt} — фото ${index + 1}` : alt}
          fill
          sizes="100vw"
          className="object-contain"
          onError={handleImageError}
        />
      </div>

      {many && (
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/80">
          {index + 1} / {images.length}
        </p>
      )}
    </div>
  )
}
