import CategoriesSection from '@/components/CategoriesSection'
import CTASection from '@/components/CTASection'
import FeaturesSection from '@/components/FeaturesSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import LogoCloud from '@/components/LogoCloud'
import Navbar from '@/components/Navbar'
import ParallaxBanner from '@/components/ParallaxBanner'
import PricingSection from '@/components/PricingSection'
import ShowcaseBanner from '@/components/ShowcaseBanner'
import TemplatesSection from '@/components/TemplatesSection'
import TestimonialsSection from '@/components/TestimonialsSection'

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LogoCloud />
      <ShowcaseBanner />
      <CategoriesSection />
      <TemplatesSection />
      <ParallaxBanner />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  )
}

export default Index
