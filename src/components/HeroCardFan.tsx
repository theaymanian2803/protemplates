import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Boxes, Briefcase, Building2, LayoutTemplate, PenLine, ShoppingBag, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTemplates } from '@/hooks/useTemplates'
import { topTemplates } from '@/data/topTemplates'

/*
  FANNED CATALOG DECK — brief-pinned hero direction.

  THESIS: the catalog dealt like a hand of playing cards — a fan of real
  product cards over the warm white ground, tucked under the headline column.
  Refuses the flat bento product wall.

  OWN-WORLD: warm off-white #FBFBFA stage, cold-orange glow shining from the
  left, cards at 14px radius whose size hugs each image's own aspect ratio
  (full screenshot visible, never cropped), white bold sans labels + white
  vector icons pinned top-left, rotating in sync with each card's axis.

  STORY: the visitor sees the store's best products at a glance — four
  templates fanned over a pivot below the viewport — and reaches for a card.

  FIRST VIEWPORT: left column (z-20) carries headline, search, and popular
  tags at its natural size; the fan (absolute, z-0, card hover z-10) overlays
  the right side without pushing layout, tucks under the text column where it
  touches, rotated ±18° from the vertical center, rightmost card on top.

  FORM: user's own specification (fanned arc, rotation axis, hover lift along
  the rotated Y-axis, cubic-bezier snap-back), pinned in conversation.

  FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review and the verdict.
*/

const categoryIcons: Record<string, LucideIcon> = {
  'E-commerce': ShoppingBag,
  'E-Commerce': ShoppingBag,
  SaaS: Boxes,
  Portfolio: Briefcase,
  Business: Building2,
  Blog: PenLine,
  Agency: Sparkles,
}

const categoryIcon = (cat: string) => categoryIcons[cat] ?? LayoutTemplate

const FAN_STEP = 180
const FAN_ROT = 12
const ARC_DROP = 48
const CARD_MAX_W = 420
const CARD_MAX_H = 380
const CARD_FALLBACK_A = 0.75

const HeroCardFan = () => {
  const [hovered, setHovered] = useState<number | null>(null)
  const [aspects, setAspects] = useState<Record<string, number>>({})
  const [failedImgs, setFailedImgs] = useState<Record<string, boolean>>({})
  const { t, i18n } = useTranslation()
  const { data: templates } = useTemplates({ limit: 4 })
  const isRtl = i18n.language === 'ar'

  const cards = [...(templates ?? []), ...topTemplates].slice(0, 4)
  if (cards.length < 4) return null

  const handleImgLoad = (id: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const a = e.currentTarget.naturalWidth / e.currentTarget.naturalHeight
    if (Number.isFinite(a) && a > 0) {
      setAspects((prev) => (prev[id] === a ? prev : { ...prev, [id]: a }))
    }
  }

  const handleImgError = (id: string) => {
    setFailedImgs((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
  }

  const cardSize = (id: string) => {
    const a = aspects[id] ?? CARD_FALLBACK_A
    const w = Math.min(CARD_MAX_W, CARD_MAX_H * a)
    return { width: w, height: w / a }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ translateY: '-50%' }}
      className="pointer-events-none absolute end-0 top-1/2 z-0 hidden md:block h-[28rem] w-[52rem]"
      aria-label={t('card.deckAria')}
      role="group"
    >
      {/* cold-orange glow behind the fan — shines toward the text column */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: isRtl
            ? 'radial-gradient(52% 42% at 78% 45%, rgba(239,122,82,0.12) 0%, rgba(239,122,82,0) 70%)'
            : 'radial-gradient(52% 42% at 22% 45%, rgba(239,122,82,0.12) 0%, rgba(239,122,82,0) 70%)',
        }}
      />

      {cards.map((card, i) => {
        const x = (i - 1.5) * FAN_STEP
        const rot = (1.5 - i) * FAN_ROT
        const arc = Math.pow((i - 1.5) / 1.5, 2) * ARC_DROP
        const Icon = categoryIcon(card.category)
        const size = cardSize(card.id)

        return (
          <div
            key={card.id}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="pointer-events-auto absolute left-1/2 top-1/2"
            style={{ zIndex: hovered === i ? 10 : i + 1, transform: `translate(-50%, -50%) translateX(${x}px) translateY(${arc}px) rotate(${rot}deg)` }}
          >
            <Link
              to={`/template/${card.id}`}
              aria-label={t('card.view', { title: card.title })}
              className="relative block overflow-hidden rounded-[14px] bg-[#F5F4F0] shadow-[0_24px_50px_-18px_rgba(0,0,0,0.25)] transition-[transform,box-shadow] duration-300 hover:translate-y-[-14px] hover:shadow-[0_48px_90px_-24px_rgba(0,0,0,0.35),0_0_0_1px_rgba(232,90,45,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e85a2d]/60"
              style={{ width: size.width, height: size.height, transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}
            >
              <img
                src={failedImgs[card.id] ? topTemplates[i % topTemplates.length]?.image_url : card.image_url}
                alt=""
                loading={i === 1 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                onLoad={(e) => handleImgLoad(card.id, e)}
                onError={() => handleImgError(card.id)}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* readability veil */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-black/25"
              />

              {/* icon + label, pinned top-left, rotated in sync with the card */}
              <div className="pointer-events-none absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/25 backdrop-blur-md">
                  <Icon className="h-5 w-5 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]" />
                </span>
                <span className="line-clamp-1 text-sm font-bold tracking-tight text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                  {card.title}
                </span>
              </div>

              {/* darkening where the next card overlaps */}
              {i < cards.length - 1 && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 w-[38%] bg-gradient-to-l from-black/55 to-transparent"
                />
              )}
            </Link>
          </div>
        )
      })}
    </motion.div>
  )
}

export default HeroCardFan