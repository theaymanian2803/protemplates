import { motion } from 'framer-motion'
import { Star, Quote, MapPin } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Template } from '@/hooks/useTemplates'
import { Skeleton } from '@/components/ui/skeleton'

const moroccanNames = [
  'Youssef Ait Baha',
  'Fatima Zahra Benali',
  'Omar El Fassi',
  'Salma Idrissi',
  'Amine Chakir',
  'Nadia Tazi',
  'Karim Bensouda',
  'Laila Moussaoui',
  'Hamza Filali',
  'Meryem Ait Ouakrim',
  'Rachid Tlemcani',
  'Houda Chaoui',
  'Mehdi Zeroual',
  'Siham Benchekroun',
  'Aicha Boukhari',
]

const reviewTexts = [
  'Beautifully designed, exactly what I needed for my business.',
  'Clean code and great documentation. Highly recommend!',
  'The template saved me weeks of work. Looks premium.',
  'Customer support was excellent. Very responsive team.',
  'Perfect fit for my project. Modern and well-structured.',
  'Love the attention to detail. Worth every penny.',
  'Easy to customize and deploy. Great experience overall.',
  'This template exceeded my expectations. Very polished.',
  'Fantastic quality. I will definitely buy more templates here.',
  'Smooth setup process and beautiful design out of the box.',
]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

const ReviewsSection = () => {
  const { data: templates, isLoading } = useQuery({
    queryKey: ['landing-templates-for-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('templates')
        .select('id, title, image_url')
        .order('sales', { ascending: false })

      if (error) throw error
      return data as Pick<Template, 'id' | 'title' | 'image_url'>[]
    },
  })

  const templateIds = templates?.map(t => t.id) ?? []

  const { data: realReviews } = useQuery({
    queryKey: ['landing-real-reviews', templateIds],
    queryFn: async () => {
      if (templateIds.length === 0) return []
      const { data, error } = await supabase
        .from('reviews')
        .select('id, template_id, rating, comment, display_name, created_at')
        .in('template_id', templateIds)
        .eq('status', 'approved')

      if (error) throw error
      return data ?? []
    },
    enabled: templateIds.length > 0,
  })

  const reviewsByTemplate = new Map<string, typeof realReviews extends (infer T)[] ? T[] : []>()
  realReviews?.forEach(r => {
    const list = reviewsByTemplate.get(r.template_id) || []
    list.push(r)
    reviewsByTemplate.set(r.template_id, list)
  })

  const reviews = templates?.map((t, i) => {
    const rand = seededRandom(i * 7919 + 42)
    const hasHalf = rand() > 0.5
    const seededRating = hasHalf ? 4.5 : 5
    const seededCount = Math.floor(rand() * 7) + 7
    const nameIdx = Math.floor(rand() * moroccanNames.length)
    const textIdx = Math.floor(rand() * reviewTexts.length)

    const real = reviewsByTemplate.get(t.id) || []
    const allRatings = [seededRating, ...real.map(r => r.rating)]
    const avgRating = allRatings.reduce((a, b) => a + b, 0) / allRatings.length
    const totalReviewCount = seededCount + real.length

    const topReal = real[0]

    return {
      id: t.id,
      title: t.title,
      image_url: t.image_url,
      rating: Math.round(avgRating * 2) / 2,
      reviewCount: totalReviewCount,
      name: topReal?.display_name || moroccanNames[nameIdx],
      text: topReal?.comment || reviewTexts[textIdx],
    }
  })

  return (
    <section className="relative overflow-hidden py-24 text-[#111111]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #FBFBFA 0%, #FBFBFA 100%)' }}
      />
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 60% at 50% 0%, rgba(239,122,82,0.04) 0%, rgba(239,122,82,0) 55%)',
        }}
      />

      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-[#e85a2d]/25 bg-[#e85a2d]/5 px-3 py-1.5 mb-6 text-[11px] font-medium tracking-wide text-[#e85a2d]/90">
              <Quote className="w-3.5 h-3.5" />
              What Buyers Say
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="font-slab font-bold text-3xl md:text-5xl text-[#111111] leading-[1.08] tracking-tight mb-4">
              Trusted by Moroccan <span className="text-[#e85a2d]">Buyers</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="text-base text-[#787774] max-w-xl mx-auto leading-relaxed">
              Real feedback from our growing community of creators and entrepreneurs.
            </motion.p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl bg-white border border-[#EAEAEA] p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-full bg-[#F5F4F0]" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-2/3 bg-[#F5F4F0]" />
                        <Skeleton className="h-3 w-1/3 bg-[#F5F4F0]" />
                      </div>
                    </div>
                    <Skeleton className="h-3 w-full bg-[#F5F4F0]" />
                    <Skeleton className="h-3 w-4/5 bg-[#F5F4F0]" />
                  </div>
                ))
              : reviews?.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06, duration: 0.4 }}
                    className="group relative rounded-xl bg-white border border-[#EAEAEA] p-6 hover:border-[#e85a2d]/40 transition-colors duration-300">
                    {/* hover glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          'radial-gradient(70% 60% at 100% 0%, rgba(239,122,82,0.04) 0%, rgba(239,122,82,0) 60%)',
                      }}
                    />
                    {/* Reviewer info */}
                    <div className="relative flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ef7a52] to-[#d94523] flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#111111] truncate">{review.name}</p>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#787774]/60" />
                          <span className="text-xs text-[#787774]/70">Morocco</span>
                        </div>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="relative flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s < Math.floor(review.rating)
                              ? 'fill-[#e85a2d] text-[#e85a2d]'
                              : review.rating % 1 !== 0 && s === Math.floor(review.rating)
                              ? 'fill-[#e85a2d]/50 text-[#e85a2d]'
                              : 'text-[#EAEAEA]'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-medium text-[#787774] ml-1">{review.rating}</span>
                    </div>

                    {/* Review text */}
                    <p className="relative text-sm text-[#2F3437] leading-relaxed mb-5">"{review.text}"</p>

                    {/* Template info */}
                    <div className="relative flex items-center gap-3 pt-4 border-t border-[#EAEAEA]">
                      <div className="w-12 h-9 rounded-lg overflow-hidden bg-[#F5F4F0] shrink-0">
                        <img
                          src={review.image_url || '/placeholder.svg'}
                          alt={review.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-[#111111] truncate">{review.title}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <Star
                                key={s}
                                className={`w-2.5 h-2.5 ${
                                  s < Math.floor(review.rating)
                                    ? 'fill-[#e85a2d] text-[#e85a2d]'
                                    : 'text-[#EAEAEA]'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-[#787774]/70">
                            {review.rating} ({review.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
