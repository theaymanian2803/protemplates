import { ArrowRight } from 'lucide-react'
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
  youtubeId?: string | null
}

const TemplateCard = ({ id, image, title, category, price }: TemplateCardProps) => {
  return (
    <Link to={`/template/${id}`} className="group block h-full">
      <div className="flex flex-col gap-4 h-full">
        {/* TALL Aspect Ratio Wrapper (125% padding-top = 4:5 tall portrait ratio) */}
        <div className="relative w-full pt-[125%] rounded-lg overflow-hidden bg-muted/30 border border-border/40 transition-all duration-300 group-hover:shadow-md">
          <img
            src={image || '/placeholder.svg'}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* "View details" Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <div className="flex items-center gap-2 text-white font-medium text-sm tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
              View details <ArrowRight className="w-4 h-4" />
              Voir les détails <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Details Container */}
        <div className="flex items-start justify-between px-1 mt-auto">
          <div className="flex flex-col pr-4">
            <h3 className="font-semibold text-foreground text-base leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
              {title}
            </h3>
            <span className="text-sm text-muted-foreground capitalize">
              {category || 'Template site web'}
            </span>
          </div>
          <div className="font-semibold text-foreground shrink-0">${price}</div>
        </div>
      </div>
    </Link>
  )
}

export default TemplateCard
