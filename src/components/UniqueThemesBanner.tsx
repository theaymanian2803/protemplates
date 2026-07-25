import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTemplates } from '@/hooks/useTemplates'

const UniqueThemesBanner = () => {
  const { data: templates, isLoading } = useTemplates({ limit: 6 })

  return (
    <section className="relative overflow-hidden py-20 text-[#f5f1ea]">
      {/* warm lit ground, light from the left this time */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #1a1614 0%, #221b16 100%), radial-gradient(80% 60% at 0% 50%, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0) 55%)',
        }}
      />
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
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
          {/* Left: Thumbnail grid — lit artifact wall */}
          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4">
              {templates?.slice(0, 6).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-[#211a15] border border-white/10 hover:border-amber-400/40 transition-colors">
                  <img
                    src={t.image_url || '/placeholder.svg'}
                    alt={t.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        'radial-gradient(70% 60% at 50% 0%, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0) 60%)',
                    }}
                  />
                </motion.div>
              ))}
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[4/3] rounded-lg bg-[#211a15] border border-white/10 animate-pulse" />
                ))}
            </motion.div>
          </div>

          {/* Right: Text + CTA */}
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1.5 mb-6 text-[11px] font-medium tracking-wide text-amber-200/90">
              Crafted variety
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-slab font-bold text-3xl md:text-5xl text-[#f5f1ea] leading-[1.05] tracking-tight mb-6">
              Unique themes for every <span className="text-amber-400">budget</span> and every project.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-[#a89c8c] text-base mb-9 leading-[1.7] max-w-md">
              Each entry is reviewed by hand before it lands here — so what you download is what was promised.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}>
              <Link to="/templates">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-500 text-[#1a1614] font-semibold text-sm rounded-lg hover:bg-amber-400 transition-colors shadow-[0_0_30px_-8px_rgba(245,158,11,0.5)]">
                  View all themes
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UniqueThemesBanner