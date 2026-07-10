import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTemplates } from '@/hooks/useTemplates'
import { Skeleton } from '@/components/ui/skeleton'

const categoryTabs = [
  'All categories',
  'Site Templates',
  'WordPress',
  'CMS Themes',
  'eCommerce',
  'Blogging',
  'Marketing',
  'Forums',
  'Muse Templates',
  'Joomla!',
  'Courses',
  'Template Kits',
  'UI Templates',
]

const TemplatesSection = () => {
  const [activeCategory, setActiveCategory] = useState('All categories')
  const { data: templates, isLoading } = useTemplates({
    category: activeCategory === 'All categories' ? undefined : activeCategory,
    limit: 8,
  })

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold text-gray-900 tracking-tight mb-4 leading-[1.25]">
            Check out our newest themes and templates
          </h2>
          <p className="text-base text-gray-500 leading-[1.7]">
            We carefully review new entries from our community one by one to make sure they meet high-quality design and functionality standards. From multipurpose themes to niche templates, you'll always find something that catches your eye.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === tab
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-400 hover:text-orange-500'
              }`}>
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
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
            : templates?.slice(0, 8).map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
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
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (template.demo_url) {
                              window.open(template.demo_url, '_blank', 'noopener,noreferrer')
                            } else {
                              window.open(`/template/${template.id}`, '_self')
                            }
                          }}
                          className="text-[11px] font-semibold text-gray-500 border border-gray-200 rounded px-2.5 py-1.5 hover:border-orange-400 hover:text-orange-500 transition-colors flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          Live Preview
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14">
          <Link to="/templates">
            <button className="px-10 py-3.5 bg-orange-500 text-white font-semibold text-sm rounded-md hover:bg-orange-600 transition-colors">
              View more new items
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default TemplatesSection
