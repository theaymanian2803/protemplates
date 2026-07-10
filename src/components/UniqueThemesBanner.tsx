import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTemplates } from '@/hooks/useTemplates'

const UniqueThemesBanner = () => {
  const { data: templates } = useTemplates({ limit: 6 })

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
          {/* Left: Thumbnail grid */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-3">
              {templates?.slice(0, 6).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                  <img src={t.image_url || '/placeholder.svg'} alt={t.title} className="w-full h-full object-cover hover:scale-105 transition-transform" loading="lazy" />
                </motion.div>
              ))}
              {!templates && Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-lg bg-gray-100 animate-pulse" />
              ))}
            </motion.div>
          </div>

          {/* Right: Text + CTA */}
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Unique themes and templates for every budget and every project.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}>
              <Link to="/templates">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold text-sm rounded-md hover:bg-green-700 transition-colors">
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
