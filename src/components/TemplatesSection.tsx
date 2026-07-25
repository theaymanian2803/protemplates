import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTemplates, useCategories } from '@/hooks/useTemplates'
import ThemeCard, { ThemeCardSkeleton } from '@/components/ThemeCard'
import { ArrowUpRight } from 'lucide-react'

const TemplatesSection = () => {
  const { data: categories } = useCategories()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { data: templates, isLoading } = useTemplates({
    category: activeCategory || undefined,
    limit: 8,
  })

  const categoryTabs = ['All categories', ...(categories || [])]

  return (
    <section className="relative overflow-hidden py-20 text-[#f5f1ea]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #1a1614 0%, #221b16 100%)' }}
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
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1.5 mb-5 text-[11px] font-medium tracking-wide text-amber-200/90">
            Newest arrivals
          </span>
          <h2 className="font-slab font-bold text-3xl md:text-5xl text-[#f5f1ea] tracking-tight mb-4 leading-[1.1]">
            Fresh from the <span className="text-amber-400">darkroom</span>
          </h2>
          <p className="text-base text-[#a89c8c] leading-[1.7]">
            We carefully review new entries from our community one by one so they meet high-quality design and functionality standards. From multipurpose themes to niche templates — you'll always find something worth keeping.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categoryTabs.map((tab) => {
            const active = (tab === 'All categories' && activeCategory === null) || activeCategory === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab === 'All categories' ? null : tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 ${
                  active
                    ? 'bg-amber-500 text-[#1a1614]'
                    : 'bg-white/[0.04] text-[#d8cfc1] border border-white/10 hover:border-amber-400/40 hover:text-amber-200'
                }`}>
                {tab}
              </button>
            )
          })}
        </motion.div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <ThemeCardSkeleton key={i} />)
            : templates?.slice(0, 8).map((template, index) => (
                <ThemeCard key={template.id} template={template} index={index} />
              ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-amber-400/40 text-amber-300 font-semibold text-sm rounded-lg hover:bg-amber-400/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
            View more new items
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default TemplatesSection