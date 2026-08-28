import HeroCardFan from '@/components/HeroCardFan'
import { motion } from 'framer-motion'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/*
  THESIS: the catalog dealt like a hand of playing cards — a dark #111111 stage
  with a faint dot grid carries a fanned arc of product-type cards (see
  HeroCardFan), while the left column keeps the headline and search instrument.
  The right column renders from a static manifest so the hero paints instantly
  with zero network request.
*/

const popularTags = [
  'WordPress',
  'React',
  'Admin Dashboard',
  'Landing Page',
  'eCommerce',
  'Portfolio',
]

const chips = [
  { label: 'React', top: '11%', left: '5%', rot: -8, dur: 7.5, pal: 'a', fade: 0.55 },
  { label: 'TypeScript', top: '20%', left: '74%', rot: 6, dur: 8.5, pal: 'b', fade: 0.5 },
  { label: 'Tailwind', top: '64%', left: '9%', rot: 7, dur: 9, pal: 'a', fade: 0.5 },
  { label: 'Next.js', top: '83%', left: '70%', rot: -9, dur: 7, pal: 'c', fade: 0.6 },
  { label: 'shadcn/ui', top: '38%', left: '88%', rot: 10, dur: 8.2, pal: 'b', fade: 0.45 },
  { label: 'Framer Motion', top: '89%', left: '34%', rot: -5, dur: 9.5, pal: 'a', fade: 0.4 },
  { label: 'Supabase', top: '13%', left: '42%', rot: 10, dur: 7.8, pal: 'c', fade: 0.5 },
] as const

const chipPalette: Record<string, string> = {
  a: 'text-[#8B7FB8]/80 border-[#8B7FB8]/40 bg-[#8B7FB8]/5',
  b: 'text-[#6D62A0]/85 border-[#6D62A0]/35 bg-[#6D62A0]/5',
  c: 'text-[#ef7a52]/85 border-[#ef7a52]/35 bg-[#ef7a52]/5',
}

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    navigate(`/templates?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-[#FBFBFA] text-[#111111]">
      {/* Atmosphere — cold-orange radial from the left on the warm white ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 15% 0%, rgba(239,122,82,0.07) 0%, rgba(239,122,82,0.02) 32%, rgba(251,251,250,0) 60%), radial-gradient(80% 60% at 0% 10%, rgba(232,90,45,0.05) 0%, rgba(251,251,250,0) 50%), linear-gradient(180deg, #FBFBFA 0%, #F8F7F5 100%)',
        }}
      />

      {/* Faded floating tech chips — ambient "full" layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {chips.map((c, i) => (
          <motion.div
            key={c.label}
            className="absolute"
            style={{ top: c.top, left: c.left }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: c.fade, scale: 1, rotate: c.rot, y: [0, -12, 0] }}
            transition={{
              opacity: { delay: 0.4 + i * 0.08, duration: 0.7 },
              scale: { delay: 0.4 + i * 0.08, duration: 0.7 },
              rotate: { delay: 0.4 + i * 0.08, duration: 0.7 },
              y: { repeat: Infinity, duration: c.dur, ease: 'easeInOut', delay: 0.4 * i },
            }}>
            <span
              className={`block whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] ${chipPalette[c.pal]}`}>
              {c.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="relative container mx-auto pt-20 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-32 z-10">
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-12 md:gap-16 lg:gap-20 max-w-7xl mx-auto">
          {/* Left: Headline + lit search instrument (z-20 — cards fan underneath) */}
          <div className="relative z-20 flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#ef7a52]/20 bg-[#ef7a52]/5 px-3 py-1.5 mb-5 md:mb-7 text-[11px] font-medium tracking-wide text-[#e85a2d]">
              <Sparkles className="w-3.5 h-3.5" />
              {t('hero.badge')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-slab font-bold text-[clamp(2rem,8vw,3rem)] md:text-6xl lg:text-[4.4rem] leading-[1.05] tracking-tight text-[#e85a2d] mb-4 md:mb-6">
              {t('hero.title1')}
              <br />
              <span className="text-[#111111]">{t('hero.title2')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-base sm:text-lg font-semibold text-[#111111] mb-6 md:mb-9 leading-[1.6] max-w-lg [text-shadow:1px_0_0_#fff,-1px_0_0_#fff,0_1px_0_#fff,0_-1px_0_#fff,0_0_18px_rgba(232,90,45,0.45)]">
              {t('hero.subtitle')}
            </motion.p>

            {/* The search instrument */}
            <motion.form
              onSubmit={onSearch}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex items-center bg-white border border-[#EAEAEA] rounded-xl shadow-[0_0_0_1px_rgba(239,122,82,0.04),0_24px_60px_-20px_rgba(0,0,0,0.06)] overflow-hidden mb-4 md:mb-7 transition-all focus-within:border-[#ef7a52]/40 focus-within:shadow-[0_0_0_1px_rgba(239,122,82,0.12),0_28px_70px_-18px_rgba(239,122,82,0.12)]">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#787774] ml-3 sm:ml-5 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('common.searchPlaceholder')}
                aria-label={t('common.search')}
                className="flex-1 min-w-0 h-11 sm:h-14 md:h-16 px-2 sm:px-4 bg-transparent text-sm sm:text-base text-[#111111] placeholder:text-[#787774]/70 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 flex items-center justify-center rounded-lg bg-[#e85a2d] text-white hover:bg-[#ef7a52] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7a52]/50 m-1.5 sm:m-0 h-8 w-8 sm:h-14 sm:w-auto md:h-16 sm:px-7 sm:gap-2">
                <Search className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:inline text-sm font-semibold">{t('common.search')}</span>
                <ArrowRight className="w-4 h-4 hidden sm:block" />
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <span className="text-xs text-[#787774]/70 mr-1">{t('hero.popular')}</span>
              {popularTags.map((tag, i) => (
                <button
                  key={tag}
                  onClick={() => navigate(`/templates?q=${encodeURIComponent(tag)}`)}
                  className={`px-3.5 py-1.5 rounded-full bg-white border border-[#EAEAEA] text-xs font-medium text-[#111111] hover:border-[#ef7a52]/30 hover:text-[#e85a2d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7a52]/30 focus-visible:border-[#ef7a52]/30 transition-colors ${i >= 3 ? 'hidden sm:inline-flex' : 'inline-flex'}`}>
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Fanned catalog deck — absolute overlay, zero fetch, hidden on mobile */}
          <HeroCardFan />
        </div>

        {/* trust line beneath the fold of the viewport */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative max-w-7xl mx-auto mt-10 sm:mt-12 md:mt-16 lg:mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-xs text-[#787774]/80">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef7a52]" />
            {t('hero.trust1')}
          </span>
          <span className="hidden sm:inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef7a52]/50" />
            {t('hero.trust2')}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef7a52]/30" />
            {t('hero.trust3')}
          </span>
          <Link
            to="/templates"
            className="sm:ml-auto rtl:sm:mr-auto rtl:sm:ml-0 inline-flex items-center gap-1.5 text-[#e85a2d] hover:text-[#ef7a52] font-medium transition-colors">
            {t('hero.browseCatalog')}
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
