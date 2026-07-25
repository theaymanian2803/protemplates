import { useState } from 'react'
import { ExternalLink, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'

export type Template = {
  id: string
  title: string
  price: number | string
  image_url?: string | null
  demo_url?: string | null
}

function seededRandom(seed: string) {
  let s = 0
  for (let i = 0; i < seed.length; i++) {
    s = ((s << 5) - s + seed.charCodeAt(i)) | 0
  }
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

const getPlaceholderRating = (templateId: string): number => {
  const rand = seededRandom(templateId)
  return rand() > 0.45 ? 5 : 4.5
}

const getPlaceholderReviewCount = (templateId: string): number => {
  const rand = seededRandom(templateId + '_rc')
  return Math.floor(rand() * 7) + 7
}

const ThemeCard = ({ template, index = 0 }: { template: Template; index?: number }) => {
  const [imgOk, setImgOk] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative rounded-xl overflow-hidden bg-[#211a15] border border-white/10 hover:border-amber-400/40 transition-colors">
      {/* amber hover halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(70% 60% at 100% 0%, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0) 60%)',
        }}
      />
      <Link to={`/template/${template.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1614]">
          {template.image_url && imgOk ? (
            <img
              src={template.image_url}
              alt={template.title}
              loading="lazy"
              onError={() => setImgOk(false)}
              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            <div
              aria-hidden
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(135deg, rgba(249,115,22,0.18) 0%, rgba(26,22,20,1) 70%)',
              }}
            />
          )}
        </div>
        <div className="relative p-5">
          <h3 className="font-slab font-bold text-[#f5f1ea] text-sm leading-snug line-clamp-2 mb-1.5 group-hover:text-amber-300 transition-colors">
            {template.title}
          </h3>
          <p className="text-xs text-[#a89c8c]/70 mb-4">by Unccodestore</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#f5f1ea]">
                ${Number(template.price).toFixed(0)}
              </span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => {
                  const r = getPlaceholderRating(template.id)
                  return (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${
                        s < Math.floor(r)
                          ? 'fill-amber-400 text-amber-400'
                          : r % 1 !== 0 && s === Math.floor(r)
                          ? 'fill-amber-400/50 text-amber-400'
                          : 'text-white/15'
                      }`}
                    />
                  )
                })}
              </div>
              <span className="text-[10px] text-[#a89c8c]/70">
                ({getPlaceholderReviewCount(template.id)})
              </span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (template.demo_url) {
                  window.open(template.demo_url, '_blank', 'noopener,noreferrer')
                } else {
                  window.open(`/template/${template.id}`, '_self')
                }
              }}
              className="text-[11px] font-semibold text-[#d8cfc1] border border-white/15 rounded px-2.5 py-1.5 hover:border-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
              <ExternalLink className="w-3 h-3" />
              Live Preview
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export const ThemeCardSkeleton = () => (
  <div className="rounded-xl overflow-hidden bg-[#211a15] border border-white/10">
    <Skeleton className="aspect-[16/10] w-full bg-white/5" />
    <div className="p-5 space-y-2">
      <Skeleton className="h-4 w-3/4 bg-white/5" />
      <Skeleton className="h-3 w-1/2 bg-white/5" />
      <div className="flex justify-between pt-2">
        <Skeleton className="h-4 w-16 bg-white/5" />
        <Skeleton className="h-6 w-20 bg-white/5" />
      </div>
    </div>
  </div>
)

// keep motion import live for the card animation even if tree-shaken in some setups
import { motion } from 'framer-motion'

export default ThemeCard