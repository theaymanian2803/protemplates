import { ArrowRight } from 'lucide-react'

const ShopPromoBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-green-500 text-white">
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-5 p-6 md:px-8">
        <div className="max-w-xl">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
            Get unlimited downloads on millions of assets. One subscription.
          </h3>
          <p className="text-sm md:text-base text-white/90 mt-2 leading-relaxed">
            Stock video, audio, music, fonts, design templates, 3D and more. All included, no per-item cost.
          </p>
        </div>
        <button className="shrink-0 inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors group whitespace-nowrap">
          Get unlimited downloads
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}

export default ShopPromoBanner
