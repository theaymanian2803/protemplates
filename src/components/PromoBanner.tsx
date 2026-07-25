import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const inclusions = [
  'Web & UI templates',
  'Stock video & motion',
  'Design assets & icons',
  'Source code you keep',
]

const PromoBanner = () => {
  return (
    <section className="relative overflow-hidden bg-[#211a15] text-[#f5f1ea] py-20">
      {/* amber atmospheric light from the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 100% 50%, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0) 55%), radial-gradient(60% 50% at 0% 100%, rgba(245,158,11,0.10) 0%, rgba(33,26,21,0) 60%)',
        }}
      />
      {/* hairline drafting grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,241,234,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,234,1) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />

      <div className="relative container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-14 max-w-7xl mx-auto">
          {/* Left: pitch */}
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1.5 mb-6 text-[11px] font-medium tracking-wide text-amber-200/90">
              All-Access Pass
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-slab font-bold text-3xl md:text-5xl text-[#f5f1ea] leading-[1.05] tracking-tight mb-5">
              One pass.
              <br />
              <span className="text-amber-400">Unlimited downloads.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-[#a89c8c] text-base mb-7 leading-[1.7] max-w-md">
              The broadest catalog of templates, video, and creative assets — yours to download and keep, forever.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-9 max-w-md">
              {inclusions.map((inc) => (
                <li key={inc} className="flex items-center gap-2 text-sm text-[#d8cfc1]">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  {inc}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
              className="flex items-center gap-5">
              <Link to="/auth">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-500 text-[#1a1614] font-semibold text-sm rounded-lg hover:bg-amber-400 transition-colors shadow-[0_0_30px_-8px_rgba(245,158,11,0.5)]">
                  Start now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <div className="flex items-baseline gap-1.5">
                <span className="font-slab text-3xl font-bold text-[#f5f1ea]">$300</span>
                <span className="text-xs text-[#a89c8c]">one-time</span>
              </div>
            </motion.div>
          </div>

          {/* Right: a single lit price-card artifact */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative w-full max-w-sm mx-auto lg:mr-0">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-[2rem] blur-2xl opacity-50"
              style={{
                background:
                  'radial-gradient(55% 55% at 70% 30%, rgba(249,115,22,0.5) 0%, rgba(249,115,22,0) 70%)',
              }}
            />
            <div className="relative rounded-2xl border border-white/10 bg-[#1a1614]/80 backdrop-blur-sm p-7 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(245,158,11,0.08)]">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300/80">All-Access</span>
                <span className="text-[11px] text-[#a89c8c] font-mono">lifetime</span>
              </div>
              <p className="font-slab text-4xl font-bold text-[#f5f1ea] mb-1">$300</p>
              <p className="text-sm text-[#a89c8c] mb-6">Own the entire catalog. Forever.</p>
              <div className="h-px bg-white/10 mb-5" />
              <ul className="flex flex-col gap-3 mb-7">
                {inclusions.map((inc) => (
                  <li key={inc} className="flex items-center gap-3 text-sm text-[#d8cfc1]">
                    <span className="w-5 h-5 rounded-full bg-amber-400/15 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-amber-300" />
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>
              <Link to="/auth" className="block">
                <button className="w-full py-3 bg-amber-500 text-[#1a1614] font-semibold text-sm rounded-lg hover:bg-amber-400 transition-colors">
                  Get All-Access
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PromoBanner