import CategoriesSection from '@/components/CategoriesSection'
import CTASection from '@/components/CTASection'
import FeaturedThemes from '@/components/FeaturedThemes'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import MarketplaceStats from '@/components/MarketplaceStats'
import Navbar from '@/components/Navbar'
import PromoBanner from '@/components/PromoBanner'
import TemplatesSection from '@/components/TemplatesSection'
import UniqueThemesBanner from '@/components/UniqueThemesBanner'

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <PromoBanner />
      <CategoriesSection />
      <UniqueThemesBanner />
      <FeaturedThemes />
      <MarketplaceStats />
      <TemplatesSection />
      <CTASection />
      <Footer />
    </main>
  )
}

export default Index
