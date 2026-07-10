import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useCategories } from '@/hooks/useTemplates'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

export interface ShopFilterState {
  category: string | null
  minPrice: string
  maxPrice: string
  onSale: boolean
  sales: string[]
  rating: number | null
}

export const defaultFilters: ShopFilterState = {
  category: null,
  minPrice: '',
  maxPrice: '',
  onSale: false,
  sales: [],
  rating: null,
}

const SALES_OPTIONS = [
  { value: 'none', label: 'No Sales' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'top', label: 'Top Sellers' },
]

interface ShopFiltersProps {
  filters: ShopFilterState
  onChange: (next: ShopFilterState) => void
  totalCounts: Record<string, number>
}

const ShopFilters = ({ filters, onChange, totalCounts }: ShopFiltersProps) => {
  const { data: liveCategories } = useCategories()
  const [priceMin, setPriceMin] = useState(filters.minPrice)
  const [priceMax, setPriceMax] = useState(filters.maxPrice)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    onSale: true,
    sales: true,
    rating: true,
  })

  const parentList = useMemo(() => {
    const live = liveCategories ?? []
    return live.length > 0 ? live : ['E-Commerce', 'SaaS', 'Admin Templates', 'Portfolio', 'Landing Pages', 'UI Kits', 'Code', 'Mobile Apps']
  }, [liveCategories])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const setCategory = (category: string | null) => {
    onChange({ ...filters, category })
  }

  const submitPrice = (e: React.FormEvent) => {
    e.preventDefault()
    onChange({ ...filters, minPrice: priceMin, maxPrice: priceMax })
  }

  const toggleSales = (value: string) => {
    const next = filters.sales.includes(value)
      ? filters.sales.filter((s) => s !== value)
      : [...filters.sales, value]
    onChange({ ...filters, sales: next })
  }

  return (
    <aside className="w-full">
      {/* Category */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-3">
          <h3 className="text-sm font-bold text-gray-900">Category</h3>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openSections.category ? '' : '-rotate-90'}`} />
        </button>
        {openSections.category && (
          <ul className="flex flex-col gap-0.5">
            <li>
              <button
                onClick={() => setCategory(null)}
                className={`w-full flex items-center justify-between px-2 py-1.5 text-sm transition-colors ${
                  !filters.category ? 'font-bold text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}>
                <span>All categories</span>
                <span className="text-xs text-gray-400">{totalCounts.__all ?? 0}</span>
              </button>
            </li>
            {parentList.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCategory(cat)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 text-sm transition-colors ${
                    filters.category === cat ? 'font-bold text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                  <span>{cat}</span>
                  <span className="text-xs text-gray-400">{totalCounts[cat] ?? 0}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-3">
          <h3 className="text-sm font-bold text-gray-900">Price</h3>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openSections.price ? '' : '-rotate-90'}`} />
        </button>
        {openSections.price && (
          <form onSubmit={submitPrice} className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="$ Min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="h-9 text-sm border-gray-300"
              />
            </div>
            <span className="text-gray-400 text-sm">-</span>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="$ Max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="h-9 text-sm border-gray-300"
              />
            </div>
            <button
              type="submit"
              className="w-9 h-9 shrink-0 rounded bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </form>
        )}
      </div>

      {/* On Sale */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('onSale')}
          className="flex items-center justify-between w-full mb-3">
          <h3 className="text-sm font-bold text-gray-900">On Sale</h3>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openSections.onSale ? '' : '-rotate-90'}`} />
        </button>
        {openSections.onSale && (
          <label className="flex items-center gap-2.5 cursor-pointer">
            <Checkbox
              checked={filters.onSale}
              onCheckedChange={(v) => onChange({ ...filters, onSale: v === true })}
            />
            <span className="text-sm text-gray-600">Yes</span>
          </label>
        )}
      </div>

      {/* Sales */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('sales')}
          className="flex items-center justify-between w-full mb-3">
          <h3 className="text-sm font-bold text-gray-900">Sales</h3>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openSections.sales ? '' : '-rotate-90'}`} />
        </button>
        {openSections.sales && (
          <ul className="flex flex-col gap-1">
            {SALES_OPTIONS.map((opt) => (
              <li key={opt.value}>
                <label className="flex items-center justify-between cursor-pointer py-1">
                  <span className="flex items-center gap-2.5">
                    <Checkbox
                      checked={filters.sales.includes(opt.value)}
                      onCheckedChange={() => toggleSales(opt.value)}
                    />
                    <span className="text-sm text-gray-600">{opt.label}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Rating */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-3">
          <h3 className="text-sm font-bold text-gray-900">Rating</h3>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openSections.rating ? '' : '-rotate-90'}`} />
        </button>
        {openSections.rating && (
          <ul className="flex flex-col gap-1">
            <li>
              <label className="flex items-center gap-2.5 cursor-pointer py-1">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === null}
                  onChange={() => onChange({ ...filters, rating: null })}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm text-gray-600">Show all</span>
              </label>
            </li>
            {[4, 3, 2, 1].map((r) => (
              <li key={r}>
                <label className="flex items-center gap-2.5 cursor-pointer py-1">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === r}
                    onChange={() => onChange({ ...filters, rating: r })}
                    className="w-4 h-4 accent-orange-500"
                  />
                  <span className="text-sm text-gray-600">{r} star{r > 1 ? 's' : ''} and higher</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  )
}

export default ShopFilters
