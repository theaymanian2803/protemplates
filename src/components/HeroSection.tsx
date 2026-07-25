import { motion } from 'framer-motion'
import { Search, ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/*
  THESIS: the developer's darkroom — one template developed from raw source,
  lit like a photograph. Refuses the bright marketplace collage of scattered
  colorful tiles the category ships.
  OWN-WORLD: warm charcoal ground lit from one corner by an amber signal;
  a single floating template artifact with directional shadow and halo;
  slab-serif display (Zilla Slab) for permanence / ownership; hairline
  drafting grid as atmospheric notation.
  STORY: visitor sees one crafted template being developed and understands
  instantly this is a curated place where you own real code. "Buy once, own
  forever" lands because the artifact feels crafted, not stock. Search is
  the lit focal instrument.
  FIRST VIEWPORT: full-bleed warm dark gradient, headline top-left at full
  display scale, the search instrument directly beneath as the lit action,
  one floating artifact developing to the right with directional amber glow.
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
    <section className="relative overflow-hidden bg-[#1a1614] text-[#f5f1ea]">
      {/* Atmosphere — lit from the top-right corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 85% 0%, rgba(249,115,22,0.22) 0%, rgba(249,115,22,0.08) 32%, rgba(26,22,20,0) 60%), radial-gradient(80% 60% at 100% 10%, rgba(245,158,11,0.18) 0%, rgba(26,22,20,0) 50%), linear-gradient(180deg, #221b16 0%, #1a1614 100%)',
        }}
      />
      {/* Hairline drafting grid — atmospheric notation */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,241,234,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,234,1) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
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
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1.5 mb-7 text-[11px] font-medium tracking-wide text-amber-200/90">
              <Sparkles className="w-3.5 h-3.5" />
              Curated modern-stack templates
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-slab font-bold text-4xl md:text-6xl lg:text-[4.4rem] leading-[1.02] tracking-tight text-[#f5f1ea] mb-6">
              Buy once.
              <br />
              <span className="text-amber-400">Own forever.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-lg text-[#a89c8c] mb-9 leading-[1.6] max-w-lg">
              Production-ready React, TypeScript &amp; Tailwind templates with
              clean, maintainable source code you actually keep — not rent.
            </motion.p>

            {/* The lit instrument */}
            <motion.form
              onSubmit={onSearch}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex items-center bg-white/[0.04] backdrop-blur-sm border border-amber-300/20 rounded-xl shadow-[0_0_0_1px_rgba(245,158,11,0.05),0_24px_60px_-20px_rgba(249,115,22,0.45)] overflow-hidden mb-7 transition-all focus-within:border-amber-400/50 focus-within:shadow-[0_0_0_1px_rgba(245,158,11,0.25),0_28px_70px_-18px_rgba(249,115,22,0.6)]">
              <Search className="w-5 h-5 text-amber-300/70 ml-5 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates, themes, source code…"
                aria-label="Search templates"
                className="flex-1 h-16 px-4 bg-transparent text-base text-[#f5f1ea] placeholder:text-[#a89c8c]/70 focus:outline-none"
              />
              <button
                type="submit"
                className="h-16 px-7 bg-amber-500 text-[#1a1614] font-semibold text-sm flex items-center gap-2 hover:bg-amber-400 transition-colors">
                Search
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs text-[#a89c8c]/70 mr-1">Popular:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => navigate(`/templates?q=${encodeURIComponent(tag)}`)}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-[#d8cfc1] hover:border-amber-400/40 hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 focus-visible:border-amber-400/40 transition-colors">
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
              {/* directional amber halo */}
              <div
                aria-hidden
                className="absolute -inset-10 rounded-[2rem] blur-2xl opacity-60"
                style={{
                  background:
                    'radial-gradient(60% 60% at 70% 20%, rgba(249,115,22,0.45) 0%, rgba(249,115,22,0) 70%)',
                }}
              />
              {/* the artifact — a browser-window template card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#211a15] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(245,158,11,0.08)]">
                {/* browser bar */}
                <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10 bg-white/[0.02]">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                  <span className="ml-3 text-[11px] text-[#a89c8c]/70 font-mono truncate">
                    unccodestore.com/template/bolt-saas
                  </span>
                </div>
                {/* faux template screenshot */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#2a2018] to-[#1a1614] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-2.5 w-20 rounded-full bg-amber-400/70" />
                    <div className="flex gap-1.5">
                      <span className="h-6 w-12 rounded-md bg-white/[0.05] border border-white/5" />
                      <span className="h-6 w-12 rounded-md bg-amber-500/90" />
                    </div>
                  </div>
                  <div className="h-5 w-2/3 rounded-full bg-white/20 mb-2" />
                  <div className="h-3 w-1/2 rounded-full bg-white/10 mb-6" />
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-600/10 border border-amber-400/10" />
                    <div className="aspect-square rounded-lg bg-white/[0.04] border border-white/5" />
                    <div className="aspect-square rounded-lg bg-white/[0.04] border border-white/5" />
                  </div>
                  {/* faint developing hairlines */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(245,241,234,1) 1px, transparent 1px)',
                      backgroundSize: '100% 22px',
                    }}
                  />
                </div>
                {/* ownership strip */}
                <div className="flex items-center justify-between px-4 h-12 border-t border-white/10 bg-white/[0.02]">
                  <span className="text-[11px] text-[#a89c8c] font-mono">
                    Bolt · SaaS Starter
                  </span>
                  <span className="text-[11px] font-semibold text-amber-300">
                    Own the source
                  </span>
                </div>
              </div>
              {/* floating code hairlines as atmosphere */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -left-24 top-10 hidden xl:block text-[10px] font-mono leading-relaxed text-amber-200/30 select-none">
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
          className="relative max-w-7xl mx-auto mt-16 lg:mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-xs text-[#a89c8c]/80">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Downloadable source — yours to keep
          </span>
          <span className="hidden sm:inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
            One-time purchase, no subscription lock-in
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/40" />
            Or $300 All-Access, unlimited
          </span>
          <Link
            to="/templates"
            className="sm:ml-auto inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-medium transition-colors">
            Browse the catalog
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection