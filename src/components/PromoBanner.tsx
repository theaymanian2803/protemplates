import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const PromoBanner = () => {
  const productItems = [
    { color: 'from-orange-500 to-red-600', label: 'Video', w: 'w-28', h: 'h-36', rotate: '-rotate-6' },
    { color: 'from-purple-500 to-indigo-600', label: 'Music', w: 'w-28', h: 'h-36', rotate: '-rotate-2' },
    { color: 'from-green-500 to-emerald-600', label: 'Photos', w: 'w-28', h: 'h-36', rotate: 'rotate-2' },
    { color: 'from-blue-500 to-cyan-600', label: 'Templates', w: 'w-28', h: 'h-36', rotate: 'rotate-6' },
    { color: 'from-pink-500 to-rose-600', label: '3D', w: 'w-24', h: 'h-32', rotate: 'rotate-10' },
  ]

  return (
    <section className="bg-gray-900 py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 max-w-7xl mx-auto">
          {/* Left: Text */}
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
              Get unlimited downloads across{' '}
              <span className="text-green-400">Web Templates</span>,{' '}
              <span className="text-green-400">Stock Video</span>,{' '}
              <span className="text-green-400">Creative Assets</span> and more.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-sm mb-6">
              The world's broadest stock catalog with purpose-built AI.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}>
              <Link to="/auth">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold text-sm rounded-lg hover:bg-green-700 transition-colors">
                  Start now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Product collage */}
          <div className="flex-1 relative hidden lg:block h-44">
            <div className="flex items-center justify-end gap-3">
              {productItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`${item.w} ${item.h} bg-gradient-to-b ${item.color} rounded-lg shadow-xl ${item.rotate} flex flex-col items-center justify-center text-white`}>
                  <span className="text-xs font-bold">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoBanner
