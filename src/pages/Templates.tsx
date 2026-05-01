import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import TemplateCard from '@/components/TemplateCard'
import TemplateFilters from '@/components/templates/TemplateFilters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { useTemplatesPaginated } from '@/hooks/useTemplates'
import { LayoutGrid, Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const ITEMS_PER_PAGE = 12

const Templates = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl)
  const [currentPage, setCurrentPage] = useState(pageFromUrl)
  const [searchQuery, setSearchQuery] = useState('')

  // State for toggling filters (defaults to true on desktop, false on mobile)
  const [isFiltersOpen, setIsFiltersOpen] = useState(true)

  // Automatically handle screen resizing for the filter toggle
  useEffect(() => {
    const handleResize = () => {
      setIsFiltersOpen(window.innerWidth >= 1024)
    }
    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { data: paginatedData, isLoading } = useTemplatesPaginated({
    category: selectedCategory || undefined,
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    setSelectedCategory(categoryFromUrl)
    if (categoryFromUrl !== selectedCategory) {
      setCurrentPage(1)
    }
  }, [categoryFromUrl])

  useEffect(() => {
    setCurrentPage(pageFromUrl)
  }, [pageFromUrl])

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    const params: Record<string, string> = {}
    if (category) params.category = category
    setSearchParams(params)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const params: Record<string, string> = {}
    if (selectedCategory) params.category = selectedCategory
    if (page > 1) params.page = page.toString()
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredTemplates = useMemo(() => {
    if (!paginatedData?.data) return []
    if (!searchQuery) return paginatedData.data

    return paginatedData.data.filter(
      (template) =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [paginatedData?.data, searchQuery])

  const totalPages = paginatedData?.totalPages || 1
  const totalCount = paginatedData?.count || 0

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      pages.push(totalPages)
    }

    return pages
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-24">
        <div className="container mx-auto px-4 max-w-[1600px]">
          {/* Fun & Cozy Header */}
          <div className="mb-10 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border border-border/50 px-6 py-16 md:py-20 text-center shadow-sm">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-sm text-foreground text-sm font-semibold mb-6 transition-transform hover:scale-105 cursor-default">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Crafted with love</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight flex items-center justify-center gap-3">
                Website Templates{' '}
                <span className="inline-block animate-bounce origin-bottom">🎨</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Grab a cup of coffee ☕ and explore our cozy collection of premium, fully
                customizable designs. Find the perfect home for your next big idea!
              </p>
            </div>
          </div>

          {/* Main Controls - Spans full width ABOVE the layout split */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 pb-6 border-b border-border/40">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {/* Responsive Filter Toggle Button */}
              <Button
                variant={isFiltersOpen ? 'secondary' : 'outline'}
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={`w-full sm:w-auto shrink-0 gap-2 rounded-full transition-all duration-300 ${
                  isFiltersOpen
                    ? 'bg-primary/10 text-primary hover:bg-primary/20 border-transparent'
                    : 'bg-card border-border/60 hover:bg-muted text-foreground'
                }`}>
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
                </span>
                <span className="sm:hidden">
                  {isFiltersOpen ? 'Close Filters' : 'Open Filters'}
                </span>
              </Button>

              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 bg-card border-border/60 focus-visible:ring-1 rounded-full shadow-sm w-full"
                />
              </div>
            </div>

            <div className="text-sm text-muted-foreground font-medium sm:px-2 text-center sm:text-right">
              {isLoading ? (
                <Skeleton className="h-5 w-32 inline-block" />
              ) : (
                <span>
                  {searchQuery ? filteredTemplates.length : totalCount} template
                  {(searchQuery ? filteredTemplates.length : totalCount) !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          {/* Core Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* Sidebar Filters */}
            {isFiltersOpen && (
              <div className="w-full lg:w-64 shrink-0 transition-all duration-300 animate-in fade-in slide-in-from-left-4">
                <TemplateFilters
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </div>
            )}

            {/* Templates Grid Container */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                  {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      {/* TALL Skeleton Wrapper */}
                      <div className="relative w-full pt-[125%] rounded-lg overflow-hidden">
                        <Skeleton className="absolute inset-0 w-full h-full" />
                      </div>
                      <div className="flex justify-between">
                        <div className="space-y-2 w-full">
                          <Skeleton className="h-5 w-2/3" />
                          <Skeleton className="h-4 w-1/3" />
                        </div>
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredTemplates.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        id={template.id}
                        title={template.title}
                        image={template.image_url}
                        price={template.price}
                        category={template.category}
                        rating={template.rating}
                        sales={template.sales}
                        youtubeId={template.youtube_id}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {!searchQuery && totalPages > 1 && (
                    <div className="mt-16 pt-8 border-t border-border/40">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                              className={
                                currentPage === 1
                                  ? 'pointer-events-none opacity-50'
                                  : 'cursor-pointer'
                              }
                            />
                          </PaginationItem>

                          {getPageNumbers().map((page, index) => (
                            <PaginationItem key={index}>
                              {page === 'ellipsis' ? (
                                <PaginationEllipsis />
                              ) : (
                                <PaginationLink
                                  onClick={() => handlePageChange(page)}
                                  isActive={currentPage === page}
                                  className="cursor-pointer">
                                  {page}
                                </PaginationLink>
                              )}
                            </PaginationItem>
                          ))}

                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                currentPage < totalPages && handlePageChange(currentPage + 1)
                              }
                              className={
                                currentPage === totalPages
                                  ? 'pointer-events-none opacity-50'
                                  : 'cursor-pointer'
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-24 border border-dashed border-border/60 rounded-[2rem] bg-muted/20">
                  <LayoutGrid className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No templates found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default Templates
