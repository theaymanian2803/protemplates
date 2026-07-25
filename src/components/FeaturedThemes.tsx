import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTemplates } from '@/hooks/useTemplates'
import ThemeCard, { ThemeCardSkeleton } from '@/components/ThemeCard'

const FeaturedThemes = () => {
  const { data: templates, isLoading } = useTemplates({ category: 'sass', limit: 4 })

  return (
    <section className="relative overflow-hidden py-20 text-[#f5f1ea]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #221b16 0%, #1a1614 100%)' }}
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
        <div className="flex flex-col lg:flex-row items-start gap-14 max-w-7xl mx-auto">
          {/* Left: Text */}
          <div className="lg:w-1/3 lg:sticky lg:top-24">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1.5 mb-6 text-[11px] font-medium tracking-wide text-amber-200/90">
              Featured
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-slab font-bold text-3xl md:text-5xl text-[#f5f1ea] leading-[1.05] tracking-tight mb-4">
              SaaS <span className="text-amber-400">Themes</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-base text-[#a89c8c] mb-8 leading-[1.7]">
              Hand-picked SaaS templates built for modern web applications — clean React + TypeScript you can extend.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}>
              <Link to="/templates?category=sass">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-500 text-[#1a1614] font-semibold text-sm rounded-lg hover:bg-amber-400 transition-colors shadow-[0_0_30px_-8px_rgba(245,158,11,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50">
                  View all SaaS themes
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right: 2x2 Grid of theme cards */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => <ThemeCardSkeleton key={i} />)
                : templates?.slice(0, 4).map((template, index) => (
                    <ThemeCard key={template.id} template={template} index={index} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedThemes