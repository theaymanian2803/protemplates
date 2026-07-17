import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const popularTags = [
  'WordPress',
  'React',
  'Admin Dashboard',
  'Landing Page',
  'eCommerce',
  'Portfolio',
]

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    navigate(`/templates?${params.toString()}`)
  }

  const collageItems = [
    {
      color: 'bg-orange-500',
      label: '#1 Best Selling',
      sub: 'WooCommerce Theme',
      w: 'w-48',
      h: 'h-32',
      rotate: '-rotate-3',
      top: 'top-0',
      left: 'left-0',
    },
    {
      color: 'bg-slate-800',
      label: 'uncode',
      sub: 'Creative Theme',
      w: 'w-44',
      h: 'h-28',
      rotate: 'rotate-3',
      top: 'top-6',
      left: 'left-52',
    },
    {
      color: 'bg-amber-500',
      label: 'The Best',
      sub: 'Creative Theme',
      w: 'w-40',
      h: 'h-24',
      rotate: '-rotate-2',
      top: 'top-36',
      left: 'left-4',
    },
    {
      color: 'bg-indigo-600',
      label: 'Portfolio',
      sub: 'Agency Theme',
      w: 'w-44',
      h: 'h-28',
      rotate: 'rotate-2',
      top: 'top-28',
      left: 'left-48',
    },
    {
      color: 'bg-rose-500',
      label: 'Magazine',
      sub: 'Blog Theme',
      w: 'w-36',
      h: 'h-24',
      rotate: '-rotate-3',
      top: 'top-64',
      left: 'left-16',
    },
    {
      color: 'bg-cyan-600',
      label: 'Startup',
      sub: 'SaaS Theme',
      w: 'w-40',
      h: 'h-24',
      rotate: 'rotate-1',
      top: 'top-56',
      left: 'left-60',
    },
  ]

  return (
    <section className="relative overflow-hidden pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
          {/* Left: Text + Search */}
          <div className="flex-1 max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-gray-900 leading-[1.2] tracking-tight mb-6">
              Professional Coding Themes & Website Templates for any project
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-500 mb-10 leading-[1.7]">
              Discover thousands of easy to customize themes, templates & CMS products, made by
              world-class developers.
            </motion.p>

            <motion.form
              onSubmit={onSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-8">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. responsive WordPress"
                className="flex-1 h-14 px-5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="h-14 px-6 bg-orange-500 text-white font-semibold text-sm flex items-center gap-2 hover:bg-orange-600 transition-colors">
                <Search className="w-4 h-4" />
                Search
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2.5">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => navigate(`/templates?q=${encodeURIComponent(tag)}`)}
                  className="px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors">
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right: Image Collage */}
          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full h-96">
              {collageItems.map((item, i) => (
                <div
                  key={i}
                  className={`absolute ${item.w} ${item.h} ${item.color} rounded-lg shadow-lg ${item.rotate} ${item.top} ${item.left} flex flex-col items-center justify-center text-white overflow-hidden`}>
                  <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold opacity-90">{item.sub}</span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
