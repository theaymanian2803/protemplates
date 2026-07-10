import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTemplates } from '@/hooks/useTemplates'
import { Skeleton } from '@/components/ui/skeleton'

const FeaturedThemes = () => {
  const { data: templates, isLoading } = useTemplates({ featured: true, limit: 4 })

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-16 max-w-7xl mx-auto">
          {/* Left: Text */}
          <div className="lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-[2.2rem] font-extrabold text-gray-900 leading-[1.25] mb-4">
              Featured themes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base text-gray-500 mb-8 leading-[1.7]">
              Every week, our staff personally hand-pick some of the best new website themes from our collection.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}>
              <Link to="/templates?featured=true">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-500 text-white font-semibold text-sm rounded-md hover:bg-orange-600 transition-colors">
                  View all featured themes
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right: 2x2 Grid of theme cards */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-lg overflow-hidden bg-white border border-gray-200">
                      <Skeleton className="aspect-[16/10] w-full" />
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
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 }}
                      className="group rounded-lg overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                      <Link to={`/template/${template.id}`} className="block">
                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                          <img
                            src={template.image_url || '/placeholder.svg'}
                            alt={template.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-1.5 group-hover:text-orange-500 transition-colors">
                            {template.title}
                          </h3>
                          <p className="text-xs text-gray-400 mb-4">by Unccodestore</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-gray-900">${Number(template.price).toFixed(0)}</span>
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, s) => (
                                  <Star
                                    key={s}
                                    className={`w-3 h-3 ${s < Math.round(template.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-[10px] text-gray-400">({template.sales})</span>
                            </div>
                            <button className="text-[11px] font-semibold text-gray-500 border border-gray-200 rounded px-2.5 py-1.5 hover:border-orange-400 hover:text-orange-500 transition-colors">
                              Live Preview
                            </button>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedThemes
