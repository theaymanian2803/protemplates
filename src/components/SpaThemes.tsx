import { motion } from 'framer-motion'
import { ArrowRight, Star, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Template } from '@/hooks/useTemplates'
import { Skeleton } from '@/components/ui/skeleton'

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

  function getPlaceholderReviewCount(templateId: string): number {
    const rand = seededRandom(templateId + '_rc')
    return Math.floor(rand() * 7) + 7
  }

  function getPlaceholderRating(templateId: string): number {
    const rand = seededRandom(templateId)
    return rand() > 0.45 ? 5 : 4.5
  }

  if (!isLoading && (!templates || templates.length === 0)) return null

  return (
    <section className="py-24 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Relax & Build</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.15] mb-4">
              Spa Themes
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
              Calm, elegant templates designed for wellness, beauty, and spa businesses.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden bg-white border border-gray-200">
                    <Skeleton className="aspect-[4/3] w-full" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <div className="flex justify-between pt-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                  </div>
                ))
              : templates?.slice(0, 4).map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="group rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-xl hover:shadow-emerald-50 transition-all duration-300">
                    <Link to={`/template/${template.id}`} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        <img
                          src={template.image_url || '/placeholder.svg'}
                          alt={template.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-1.5 group-hover:text-emerald-600 transition-colors">
                          {template.title}
                        </h3>
                        <p className="text-xs text-gray-400 mb-4">by Unccodestore</p>
                        <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-gray-900">${Number(template.price).toFixed(0)}</span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, s) => (
                                <Star
                                  key={s}
                                  className={`w-3 h-3 ${s < Math.floor(getPlaceholderRating(template.id)) ? 'fill-amber-400 text-amber-400' : getPlaceholderRating(template.id) % 1 !== 0 && s === Math.floor(getPlaceholderRating(template.id)) ? 'fill-amber-400/50 text-amber-400' : 'text-gray-200'}`}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-gray-400">({getPlaceholderReviewCount(template.id)})</span>
                          </div>
                          <button className="text-[11px] font-semibold text-gray-500 border border-gray-200 rounded px-2.5 py-1.5 group-hover:border-emerald-400 group-hover:text-emerald-600 transition-colors">
                            Live Preview
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12">
            <Link to="/templates?category=E-commerce&q=spa">
              <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white font-semibold text-sm rounded-md hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100">
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
