import { motion } from 'framer-motion'
import { Search, ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/*
  THESIS: the developer's bright studio — one template developed from raw source,
  presented on a warm-white ground with cold orange directional light.
  OWN-WORLD: warm off-white ground lit from the top-right by a cold orange signal;
  a single floating template artifact with soft directional shadow and warm halo;
  slab-serif display (Zilla Slab) for permanence / ownership.
  STORY: visitor sees one crafted template being developed and understands
  instantly this is a curated place where you own real code. "Buy once, own
  forever" lands because the artifact feels crafted, not stock. Search is
  the focused instrument on the bright ground.
  FIRST VIEWPORT: full-bleed warm white gradient, headline top-left at full
  display scale, the search instrument directly beneath as the primary action,
  one floating artifact developing to the right with subtle directional glow.
  FORM: Persuade, committed color, slab display — pinned by the brief,
  roll skipped.
*/

const popularTags = [
  'WordPress',
  'React',
  'Admin Dashboard',
  'Landing Page',
  'eCommerce',
  'Portfolio',
]

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    navigate(`/templates?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-[#FBFBFA] text-[#111111]">
      {/* Atmosphere — subtle cold-orange radial on the warm white ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 85% 0%, rgba(239,122,82,0.07) 0%, rgba(239,122,82,0.02) 32%, rgba(251,251,250,0) 60%), radial-gradient(80% 60% at 100% 10%, rgba(232,90,45,0.05) 0%, rgba(251,251,250,0) 50%), linear-gradient(180deg, #FBFBFA 0%, #F8F7F5 100%)',
        }}
      />

      <div className="relative container mx-auto px-4 pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-14 lg:gap-20 max-w-7xl mx-auto">
          {/* Left: Headline + lit search instrument */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#ef7a52]/20 bg-[#ef7a52]/5 px-3 py-1.5 mb-7 text-[11px] font-medium tracking-wide text-[#e85a2d]">
              <Sparkles className="w-3.5 h-3.5" />
              Curated modern-stack templates
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-slab font-bold text-4xl md:text-6xl lg:text-[4.4rem] leading-[1.02] tracking-tight text-[#111111] mb-6">
              Buy once.
              <br />
              <span className="text-[#ef7a52]">Own forever.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-lg text-[#787774] mb-9 leading-[1.6] max-w-lg">
              Production-ready React, TypeScript &amp; Tailwind templates with
              clean, maintainable source code you actually keep — not rent.
            </motion.p>

            {/* The search instrument */}
            <motion.form
              onSubmit={onSearch}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex items-center bg-white border border-[#EAEAEA] rounded-xl shadow-[0_0_0_1px_rgba(239,122,82,0.04),0_24px_60px_-20px_rgba(0,0,0,0.06)] overflow-hidden mb-7 transition-all focus-within:border-[#ef7a52]/40 focus-within:shadow-[0_0_0_1px_rgba(239,122,82,0.12),0_28px_70px_-18px_rgba(239,122,82,0.12)]">
              <Search className="w-5 h-5 text-[#787774] ml-5 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates, themes, source code…"
                aria-label="Search templates"
                className="flex-1 h-16 px-4 bg-transparent text-base text-[#111111] placeholder:text-[#787774]/70 focus:outline-none"
              />
              <button
                type="submit"
                className="h-16 px-7 bg-[#e85a2d] text-white font-semibold text-sm flex items-center gap-2 hover:bg-[#ef7a52] transition-colors">
                Search
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs text-[#787774]/70 mr-1">Popular:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => navigate(`/templates?q=${encodeURIComponent(tag)}`)}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#EAEAEA] text-xs font-medium text-[#111111] hover:border-[#ef7a52]/30 hover:text-[#e85a2d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7a52]/30 focus-visible:border-[#ef7a52]/30 transition-colors">
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right: one lit artifact — a template developed like a photograph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative hidden lg:block w-full">
            <div className="relative max-w-md ml-auto">
              {/* subtle cold-orange halo */}
              <div
                aria-hidden
                className="absolute -inset-10 rounded-[2rem] blur-2xl opacity-40"
                style={{
                  background:
                    'radial-gradient(60% 60% at 70% 20%, rgba(239,122,82,0.12) 0%, rgba(239,122,82,0) 70%)',
                }}
              />
              {/* the artifact — a browser-window template card */}
              <div className="relative rounded-2xl overflow-hidden border border-[#EAEAEA] bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.08),0_0_0_1px_rgba(239,122,82,0.04)]">
                {/* browser bar */}
                <div className="flex items-center gap-2 px-4 h-10 border-b border-[#EAEAEA] bg-[#FBFBFA]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAEAEA]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAEAEA]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef7a52]/60" />
                  <span className="ml-3 text-[11px] text-[#787774] font-mono truncate">
                    unccodestore.com/template/bolt-saas
                  </span>
                </div>
                {/* faux template screenshot */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#F4F3F1] to-[#FBFBFA] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-2.5 w-20 rounded-full bg-[#ef7a52]/60" />
                    <div className="flex gap-1.5">
                      <span className="h-6 w-12 rounded-md bg-white border border-[#EAEAEA]" />
                      <span className="h-6 w-12 rounded-md bg-[#ef7a52]/80" />
                    </div>
                  </div>
                  <div className="h-5 w-2/3 rounded-full bg-[#111111]/10 mb-2" />
                  <div className="h-3 w-1/2 rounded-full bg-[#111111]/5 mb-6" />
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-[#ef7a52]/10 to-[#ef7a52]/5 border border-[#ef7a52]/10" />
                    <div className="aspect-square rounded-lg bg-white border border-[#EAEAEA]" />
                    <div className="aspect-square rounded-lg bg-white border border-[#EAEAEA]" />
                  </div>
                </div>
                {/* ownership strip */}
                <div className="flex items-center justify-between px-4 h-12 border-t border-[#EAEAEA] bg-[#FBFBFA]">
                  <span className="text-[11px] text-[#787774] font-mono">
                    Bolt · SaaS Starter
                  </span>
                  <span className="text-[11px] font-semibold text-[#e85a2d]">
                    Own the source
                  </span>
                </div>
              </div>
              {/* floating code hairlines as atmosphere */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -left-24 top-10 hidden xl:block text-[10px] font-mono leading-relaxed text-[#787774]/25 select-none">
                <div>const Own = () =&gt; {`{`}</div>
                <div className="pl-3">return &lt;Source code /&gt;</div>
                <div>{`}`}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* trust line beneath the fold of the viewport */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative max-w-7xl mx-auto mt-16 lg:mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-xs text-[#787774]/80">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef7a52]" />
            Downloadable source — yours to keep
          </span>
          <span className="hidden sm:inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef7a52]/50" />
            One-time purchase, no subscription lock-in
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef7a52]/30" />
            Or $300 All-Access, unlimited
          </span>
          <Link
            to="/templates"
            className="sm:ml-auto inline-flex items-center gap-1.5 text-[#e85a2d] hover:text-[#ef7a52] font-medium transition-colors">
            Browse the catalog
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
