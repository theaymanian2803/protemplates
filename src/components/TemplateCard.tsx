import { useCart } from '@/contexts/CartContext'
import { ShoppingCart, Star, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

interface TemplateCardProps {
  id: string
  image: string
  title: string
  category: string
  price: number
  rating?: number
  sales?: number
  featured?: boolean
  demoUrl?: string | null
  youtubeId?: string | null
  authorName?: string
  authorAvatar?: string
}

const formatSales = (n?: number) => {
  if (!n && n !== 0) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return `${n}`
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const authorPool = ['Nimbus Studio', 'Pixel Forge', 'Lumen Labs', 'Cobalt Co.', 'Atlas Dev', 'North Peak']

const resolveAuthor = (id: string, fallbackTitle: string) => {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  const name = authorPool[hash % authorPool.length]
  return { name, avatarInitials: initials(name) || initials(fallbackTitle) || 'US' }
}

const TemplateCard = ({
  id,
  image,
  title,
  category,
  price,
  rating = 0,
  sales = 0,
  demoUrl,
  authorName,
  authorAvatar,
}: TemplateCardProps) => {
  const { addToCart, isInCart } = useCart()
  const author = authorName
    ? { name: authorName, avatarInitials: initials(authorName) || 'US' }
    : resolveAuthor(id, title)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInCart(id)) {
      toast.info('Already in your cart', { description: title })
      return
    }
    addToCart({ id, title, image, price, license: 'regular' })
    toast.success('Added to cart', { description: title })
  }

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (demoUrl) {
      window.open(demoUrl, '_blank', 'noopener,noreferrer')
    } else {
      window.open(`/template/${id}`, '_self')
    }
  }

  return (
    <Link to={`/template/${id}`} className="group block h-full">
      <div className="flex flex-col h-full rounded-xl bg-card border border-border/70 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/30 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted/40">
          <img
            src={image || '/placeholder.svg'}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Category tag */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-background/90 backdrop-blur-sm text-xs font-semibold text-foreground border border-border/50 shadow-sm">
              {category || 'Template'}
            </span>
            {sales > 100 && (
              <span className="px-2 py-1 rounded-md bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wide shadow-sm">
                Hot
              </span>
            )}
          </div>

          {/* Hover overlay: Live Preview + cart icon */}
          <div className="absolute inset-0 bg-foreground/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
            <button
              onClick={handlePreview}
              className="inline-flex items-center gap-2 px-4 h-10 rounded-lg bg-background text-foreground text-sm font-semibold shadow-md hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all">
              <ExternalLink className="w-4 h-4" />
              Live Preview
            </button>
            <button
              onClick={handleAddToCart}
              aria-label={isInCart(id) ? 'In cart' : 'Add to cart'}
              className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 active:scale-95 transition-all">
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col p-4 flex-1">
          <h3 className="font-bold text-foreground text-base leading-snug line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Author */}
          <div className="flex items-center gap-2 mt-2">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={author.name}
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">
                {author.avatarInitials}
              </span>
            )}
            <span className="text-xs font-medium text-muted-foreground">{author.name}</span>
          </div>

          {/* Rating + sales + price */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {rating ? rating.toFixed(1) : 'New'}
              </span>
              <span className="text-border">·</span>
              <span>{formatSales(sales)} sales</span>
            </div>
            <div className="font-extrabold text-foreground text-lg tracking-tight">
              ${Number(price).toFixed(0)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TemplateCard