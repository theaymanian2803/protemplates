import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { ExternalLink, Heart, ShoppingCart, Star } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { Template } from '@/hooks/useTemplates'

const authorPool = ['Nimbus Studio', 'Pixel Forge', 'Lumen Labs', 'Cobalt Co.', 'Atlas Dev', 'North Peak']

const resolveAuthor = (id: string) => {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  return authorPool[hash % authorPool.length]
}

const formatSales = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return `${n}`
}

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return '—'
  }
}

interface ShopProductCardProps {
  template: Template
  query?: string
}

const HighlightText = ({ text, query }: { text: string; query?: string }) => {
  if (!query || !query.trim()) return <>{text}</>
  const terms = query.trim().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return <>{text}</>

  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const re = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(re)

  return (
    <>
      {parts.map((part, i) =>
        re.test(part) ? (
          <mark key={i} className="bg-yellow-200 px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

const ShopProductCard = ({ template, query }: ShopProductCardProps) => {
  const { addToCart, isInCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const author = resolveAuthor(template.id)
  const inCart = isInCart(template.id)
  const isFav = isFavorite(template.id)

  const features = (template.features && template.features.length > 0
    ? template.features
    : template.tech_stack && template.tech_stack.length > 0
      ? template.tech_stack
      : ['Production-ready', 'Clean code & docs', 'Lifetime updates']
  ).slice(0, 3)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCart) {
      toast.info('Already in your cart', { description: template.title })
      return
    }
    addToCart({
      id: template.id,
      title: template.title,
      image: template.image_url,
      price: Number(template.price),
      license: 'regular',
    })
    toast.success('Added to cart', { description: template.title })
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(template.id)
  }

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (template.demo_url) {
      window.open(template.demo_url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <article className="group flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <Link to={`/template/${template.id}`} className="relative md:w-[280px] shrink-0 block overflow-hidden bg-gray-100">
        <div className="relative w-full aspect-[16/10] md:aspect-auto md:h-full">
          <img
            src={template.image_url || '/placeholder.svg'}
            alt={template.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 p-5 flex flex-col">
        <h3 className="text-base font-bold text-gray-900 leading-snug mb-1">
          <Link to={`/template/${template.id}`} className="hover:text-orange-500 transition-colors">
            <HighlightText text={template.title} query={query} />
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          by <span className="text-gray-700">{author}</span> in <span className="text-gray-700">{template.category || 'All'}</span>
        </p>

        <ul className="flex flex-col gap-1.5 mt-auto">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-gray-400 mt-0.5">•</span>
              <span><HighlightText text={f} query={query} /></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions & Price */}
      <div className="md:w-[200px] shrink-0 p-5 flex flex-col border-t md:border-t-0 md:border-l border-gray-200 bg-gray-50">
        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            onClick={handleFavorite}
            className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
              isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}>
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="text-right mb-3">
          <div className="text-2xl font-bold text-gray-900">${Number(template.price).toFixed(0)}</div>
          <div className="text-xs text-gray-500 mt-1">{formatSales(template.sales ?? 0)} Sales</div>
          {template.rating > 0 && (
            <div className="flex items-center justify-end gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  className={`w-3 h-3 ${s < Math.round(template.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({template.sales})</span>
            </div>
          )}
          <div className="text-xs text-gray-400 mt-2">Last updated: {formatDate(template.updated_at)}</div>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={handleAddToCart}
            className={`w-10 h-10 shrink-0 rounded border flex items-center justify-center transition-colors ${
              inCart
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500 hover:text-orange-500'
            }`}>
            <ShoppingCart className="w-4 h-4" />
          </button>
          <button
            onClick={handlePreview}
            className="flex-1 h-10 rounded border-2 border-orange-500 text-orange-500 font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-orange-500 hover:text-white transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
            Live Preview
          </button>
        </div>
      </div>
    </article>
  )
}

export default ShopProductCard
