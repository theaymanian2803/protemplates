import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Template } from '@/hooks/useTemplates'
import ThemeCard, { ThemeCardSkeleton } from '@/components/ThemeCard'

const SpaThemes = () => {
  const { data: templates, isLoading } = useQuery({
    queryKey: ['spa-themes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .or('title.ilike.*spa*,features.cs.{spa},tech_stack.cs.{spa}')
        .order('sales', { ascending: false })
        .limit(4)

      if (error) throw error
      return data as Template[]
    },
  })

  if (!isLoading && (!templates || templates.length === 0)) return null

  return (
    <section className="relative overflow-hidden py-24 text-[#f5f1ea]">
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 50% at 50% 100%, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0) 55%)',
        }}
      />

      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1.5 mb-6 text-[11px] font-medium tracking-wide text-amber-200/90">
              <Sparkles className="w-3.5 h-3.5" />
              Wellness category
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="font-slab font-bold text-3xl md:text-5xl text-[#f5f1ea] leading-[1.08] tracking-tight mb-4">
              Spa &amp; <span className="text-amber-400">Wellness</span> Themes
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="text-base text-[#a89c8c] max-w-xl mx-auto leading-relaxed">
              Calm, elegant templates designed for wellness, beauty, and spa businesses — with clean code you can own.
            </motion.p>
          </div>

          {/* Cards Grid — reuse ThemeCard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <ThemeCardSkeleton key={i} />)
              : templates?.slice(0, 4).map((template, index) => (
                  <ThemeCard key={template.id} template={template} index={index} />
                ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center mt-12">
            <Link to="/templates?category=E-commerce&q=spa">
              <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-500 text-[#1a1614] font-semibold text-sm rounded-lg hover:bg-amber-400 transition-colors shadow-[0_0_30px_-8px_rgba(245,158,11,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50">
                View all spa themes
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SpaThemes