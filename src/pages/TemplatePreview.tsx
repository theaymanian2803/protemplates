import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import RelatedTemplates from '@/components/preview/RelatedTemplates'
import ReviewSection from '@/components/preview/ReviewSection'
import TemplateFeatures from '@/components/preview/TemplateFeatures'
import TemplateGallery from '@/components/preview/TemplateGallery'
import TemplateSidebar from '@/components/preview/TemplateSidebar'
import TemplateTechStack from '@/components/preview/TemplateTechStack'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/hooks/use-toast'
import { useTemplate } from '@/hooks/useTemplates'
import { ArrowLeft, ExternalLink, Home, ShoppingBag } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const TemplatePreview = () => {
  const { id } = useParams<{ id: string }>()
  const { data: template, isLoading, error } = useTemplate(id || '')
  const { addToCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleBuyClick = () => {
    addToCart({
      id: id || '',
      title: template?.title || 'Modèle',
      image: template?.image_url || '',
      price: template ? Number(template.price) : 59,
      license: 'regular',
    })
    toast({
      title: 'Ajouté au panier',
      description: `${template?.title || 'Modèle'} a été ajouté à votre panier.`,
    })
    if (!user) {
      navigate('/auth?redirect=/cart')
    } else {
      navigate('/cart')
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-10 w-96 mb-6" />
            <Skeleton className="h-[70vh] w-full rounded-xl mb-12" />
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <Skeleton className="h-[400px] w-full rounded-xl" />
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-[500px] w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !template) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <Link
              to="/"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mb-8 justify-center">
              <ArrowLeft className="w-4 h-4" />
              Retour aux templates
            </Link>
            <h1 className="text-3xl font-display font-bold text-foreground mb-4">
              Template introuvable
            </h1>
            <p className="text-muted-foreground">
              Le template que vous recherchez n'existe pas ou a été supprimé.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const liveUrl = template.demo_url

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-[1200px] overflow-hidden">
          {/* Header Section mimicking Webflow Details Page */}
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-6">
            <div>
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Link to="/" className="hover:text-foreground flex items-center gap-1">
                  <Home className="w-3 h-3" />
                </Link>
                <span>›</span>
                <Link to="/templates" className="hover:text-foreground">
                  Templates
                </Link>
                <span>›</span>
                <span className="text-foreground font-medium truncate max-w-[200px]">
                  {template.title}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                {template.title} - Template site web
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {template.title.charAt(0)}
                </div>
                <span>Template Pro Studio</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 min-w-0">
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button variant="outline" className="gap-2 w-full sm:w-auto text-xs sm:text-sm">
                    Aperçu en navigateur <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              )}
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white border-none gap-2 w-full sm:w-auto text-xs sm:text-sm"
                onClick={handleBuyClick}>
                <ShoppingBag className="w-4 h-4" />
                {Number(template.price) > 0 ? `Acheter $${template.price}` : 'Obtenir gratuitement'}
              </Button>
            </div>
          </div>

          {/* Embedded Iframe Preview Hero OR Image Fallback */}
          {liveUrl ? (
            <div className="w-full h-[70vh] min-h-[600px] border border-border shadow-lg rounded-lg overflow-hidden bg-muted mb-12 relative flex flex-col">
              {/* Fake browser bar for aesthetics */}
              <div className="h-8 bg-card border-b border-border flex items-center px-4 gap-2 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-4 text-xs text-muted-foreground bg-muted px-4 py-1 rounded-full font-mono truncate max-w-sm">
                  {liveUrl.replace(/^https?:\/\//, '')}
                </div>
              </div>
              <iframe
                src={liveUrl}
                className="w-full flex-1 border-none bg-background"
                title={`${template.title} Live Preview`}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          ) : (
            <div className="w-full h-[70vh] min-h-[600px] border border-border shadow-lg rounded-lg overflow-hidden bg-muted mb-12 relative flex items-center justify-center">
              <img
                src={template.image_url || '/placeholder.svg'}
                alt={`${template.title} Preview`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content Layout */}
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content (Left Side) */}
            <div className="lg:col-span-8 space-y-12">
              <div className="prose prose-sm md:prose-base max-w-none">
                <h2 className="text-2xl font-bold mb-4">{template.title} – Template web</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {template.description ||
                    'Un template élégant et moderne conçu pour les professionnels qui valorisent la précision, l\'esthétique et la narration visuelle. Avec sa structure minimaliste, il vous aide à présenter vos projets avec clarté et à construire une identité numérique forte.'}
                </p>
                <h3 className="text-lg font-bold mb-3">Fonctionnalités clés</h3>
                <ul className="space-y-2 mb-8 list-disc pl-5">
                  <li>Design entièrement responsive optimisé pour tous les appareils.</li>
                  <li>Personnalisation facile grâce à un code propre et organisé.</li>
                  <li>Animations fluides qui améliorent la présentation sans surcharger le contenu.</li>
                </ul>
              </div>

              <TemplateGallery template={template} />
              <TemplateFeatures features={template.features || []} />
              <TemplateTechStack techStack={template.tech_stack || []} />
              <ReviewSection templateId={id || ''} />
            </div>

            {/* Sidebar (Right Side) */}
            <div className="lg:col-span-4">
              <TemplateSidebar />
            </div>
          </div>

          <RelatedTemplates />
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default TemplatePreview
