import YouTubeModal from '@/components/preview/YouTubeModal'
import { Button } from '@/components/ui/button'
import { useHeroBanner } from '@/hooks/useSiteSettings'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  const { data: hero } = useHeroBanner()
  const [showVideo, setShowVideo] = useState(false)

  // Dynamic content from Supabase with French defaults for a Moroccan Website Selling Platform
  const badge = hero?.badge_text || '🇲🇦 Plateforme #1 de Vente de Sites au Maroc'
  const h1p = hero?.headline_line1_prefix || 'Achetez des '
  const h1h = hero?.headline_line1_highlight || 'Sites Clés en Main'
  const h2p = hero?.headline_line2_prefix || ' et Lancez Votre '
  const h2h = hero?.headline_line2_highlight || 'Business'
  const sub =
    hero?.subheadline ||
    "Découvrez notre catalogue de sites premium, optimisés pour le marché marocain. Ne perdez plus de temps avec le développement : achetez votre site professionnel et commencez à vendre dès aujourd'hui."
  const ctaPText = hero?.cta_primary_text || 'Voir le catalogue'
  const ctaPLink = hero?.cta_primary_link || '/templates'
  const ctaSText = hero?.cta_secondary_text || 'Comment ça marche'
  const demoVideoId = hero?.demo_video_id || 'dQw4w9WgXcQ'
  const heroImage = hero?.hero_image_url || ''

  // French stats defaults focused on sales and Moroccan support
  const stats = hero?.stats || [
    { value: '500+', label: 'Sites Vendus', icon: '🛒' },
    { value: '100%', label: 'Clés en Main', icon: '🚀' },
    { value: '4.9★', label: 'Avis Clients', icon: '⭐' },
    { value: '7j/7', label: 'Support Local', icon: '🤝' },
  ]

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Dynamic Image Layer with Better Contrast and Cool Slow Zoom */}
      {heroImage && (
        <div className="absolute inset-0 z-0 overflow-hidden bg-background">
          <motion.img
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src={heroImage}
            alt="Hero background"
            className="w-full h-full object-cover object-center"
          />

          {/* Elegant overlay to fix the "too bright" issue and make text pop */}
          <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/0 to-transparent" />

          {/* Subtle soft blur orbs for depth */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px] animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>
      )}

      {/* Main Content Layer (Text & Actions) */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/90 border border-border/50 shadow-sm mb-8 backdrop-blur-md cursor-default hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-foreground tracking-tight">{badge}</span>
          </motion.div>

          {/* Balanced, Elegant Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-[1.1] tracking-tight">
            {h1p}
            <span className="text-red-400 dark:text-blue-500">{h1h}</span>
            <br className="hidden sm:block" />
            {h2p}
            <span className="text-purple-600 dark:text-purple-500">{h2h}</span>
            <span className="inline-block animate-bounce origin-bottom ml-3">🚀</span>
          </motion.h1>

          {/* Cozy Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed px-4">
            {sub}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link to={ctaPLink}>
              <Button
                size="lg"
                className="group h-12 text-base px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none shadow-md transition-all hover:shadow-lg">
                {ctaPText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="group h-12 text-base px-8 rounded-xl bg-background/50 backdrop-blur-sm border-border/60 hover:bg-background shadow-sm transition-all"
              onClick={() => setShowVideo(true)}>
              <Play className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-foreground transition-colors" />
              {ctaSText}
            </Button>
          </motion.div>

          {/* Floating Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="text-center py-5 px-3 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="text-2xl md:text-3xl mb-2 transition-transform hover:scale-110">
                  {stat.icon}
                </div>
                <div className="font-bold text-foreground text-base md:text-lg tracking-tight leading-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Demo Video Modal */}
      {demoVideoId && (
        <YouTubeModal youtubeId={demoVideoId} open={showVideo} onOpenChange={setShowVideo} />
      )}
    </section>
  )
}

export default HeroSection
