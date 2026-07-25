import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTemplates } from '@/hooks/useTemplates'

const categoriesData = [
  { title: 'WordPress Themes', desc: 'Thousands of WordPress themes' },
  { title: 'eCommerce Templates', desc: 'Beautiful website templates' },
  { title: 'Site Templates', desc: 'HTML and website templates' },
  { title: 'Marketing Templates', desc: 'Email, newsletter & landing pages' },
  { title: 'CMS Templates', desc: 'Over 1,700 CMS website templates' },
  { title: 'Blogging', desc: 'Blogger templates and themes' },
]

const CategoryCard = ({ category, index }: { category: typeof categoriesData[0]; index: number }) => {
  const { data: templates, isLoading } = useTemplates({ category: category.title, limit: 3 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative bg-[#211a15] border border-white/10 rounded-xl overflow-hidden hover:border-amber-400/40 transition-colors">
      {/* amber corner glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(70% 60% at 100% 0%, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0) 60%)',
        }}
      />
      {/* Header */}
      <div className="relative px-6 pt-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-slab text-lg font-bold text-[#f5f1ea] leading-snug">{category.title}</h3>
          <ArrowUpRight className="w-4 h-4 text-[#a89c8c]/50 group-hover:text-amber-400 transition-colors shrink-0" />
        </div>
        <p className="text-sm text-[#a89c8c] leading-relaxed mb-4">{category.desc}</p>
        <div className="flex items-center gap-3 text-xs">
          <Link
            to={`/templates?category=${encodeURIComponent(category.title)}&sort=newest`}
            className="text-amber-300/90 hover:text-amber-200 font-medium transition-colors">
            Newest
          </Link>
          <span className="h-3 w-px bg-white/15" />
          <Link
            to={`/templates?category=${encodeURIComponent(category.title)}&sort=bestsellers`}
            className="text-amber-300/90 hover:text-amber-200 font-medium transition-colors">
            Bestsellers
          </Link>
        </div>
      </div>

      {/* Preview images */}
      <div className="relative px-4 pb-4">
        <div className="grid grid-cols-3 gap-2">
          {templates?.slice(0, 3).map((t) => (
            <Link
              key={t.id}
              to={`/template/${t.id}`}
              className="block aspect-[4/3] rounded-lg overflow-hidden bg-[#1a1614] border border-white/5">
              <img
                src={t.image_url || '/placeholder.svg'}
                alt={t.title}
                loading="lazy"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 hover:opacity-100 hover:scale-105 transition-all duration-500" />
            </Link>
          ))}
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-lg bg-[#1a1614] border border-white/5 animate-pulse" />
            ))}
        </div>
      </div>
    </motion.div>
  )
}

const CategoriesSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#1a1614] py-20 text-[#f5f1ea]">
      {/* faint hairline grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,241,234,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,234,1) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />

      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1.5 mb-5 text-[11px] font-medium tracking-wide text-amber-200/90">
            Browse by craft
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-slab font-bold text-3xl md:text-5xl text-[#f5f1ea] leading-[1.05] tracking-tight">
            Categories, <span className="text-amber-400">developed</span> with care.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categoriesData.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-amber-400/40 text-amber-300 font-semibold text-sm rounded-lg hover:bg-amber-400/10 transition-colors">
            View all categories
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CategoriesSection