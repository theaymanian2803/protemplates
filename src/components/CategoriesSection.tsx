import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTemplates } from '@/hooks/useTemplates'

const categoriesData = [
  { title: 'WordPress Themes', desc: 'Thousands of WordPress themes', newest: 'Newest', bestsellers: 'Bestsellers', color: 'bg-blue-500', icon: '' },
  { title: 'eCommerce Templates', desc: 'Beautiful website templates', newest: 'Newest', bestsellers: 'Bestsellers', color: 'bg-orange-500', icon: '🛒' },
  { title: 'Site Templates', desc: 'HTML and website templates', newest: 'Newest', bestsellers: 'Bestsellers', color: 'bg-purple-500', icon: '📄' },
  { title: 'Marketing Templates', desc: 'Email, newsletter and landing page templates', newest: 'Newest', bestsellers: 'Bestsellers', color: 'bg-yellow-500', icon: '📈' },
  { title: 'CMS Templates', desc: 'Over 1,700 CMS website templates', newest: 'Newest', bestsellers: 'Bestsellers', color: 'bg-teal-500', icon: '⚙️' },
  { title: 'Blogging', desc: 'Blogger templates and themes', newest: 'Newest', bestsellers: 'Bestsellers', color: 'bg-pink-500', icon: '✍️' },
]

const CategoryCard = ({ category, index }: { category: typeof categoriesData[0]; index: number }) => {
  const { data: templates } = useTemplates({ category: category.title, limit: 3 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="p-5 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{category.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{category.desc}</p>
        <div className="flex items-center justify-center gap-3 text-xs">
          <Link to={`/templates?category=${encodeURIComponent(category.title)}&sort=newest`} className="text-green-600 hover:underline font-medium">
            {category.newest}
          </Link>
          <span className="text-gray-300">|</span>
          <Link to={`/templates?category=${encodeURIComponent(category.title)}&sort=bestsellers`} className="text-green-600 hover:underline font-medium">
            {category.bestsellers}
          </Link>
        </div>
      </div>

      {/* Preview images */}
      <div className="px-3 pb-3">
        <div className="grid grid-cols-3 gap-1.5">
          {templates?.slice(0, 3).map((t) => (
            <Link key={t.id} to={`/template/${t.id}`} className="block aspect-[4/3] rounded overflow-hidden bg-gray-100">
              <img src={t.image_url || '/placeholder.svg'} alt={t.title} className="w-full h-full object-cover hover:scale-105 transition-transform" loading="lazy" />
            </Link>
          ))}
          {!templates && Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded bg-gray-100 animate-pulse" />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categoriesData.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10">
          <Link to="/templates">
            <button className="px-8 py-3 bg-green-600 text-white font-semibold text-sm rounded-md hover:bg-green-700 transition-colors">
              View all categories
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CategoriesSection
