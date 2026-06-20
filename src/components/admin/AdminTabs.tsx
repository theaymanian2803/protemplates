import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DollarSign,
  Grid3X3,
  ImageIcon,
  Info,
  LayoutTemplate,
  MessageCircle,
  Phone,
  Quote,
  RotateCcw,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
} from 'lucide-react'

interface AdminTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  children: React.ReactNode
}
//! FIX THIS THIS SHIT
export const AdminTabs = ({ activeTab, onTabChange, children }: AdminTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-6 flex-wrap">
        <TabsTrigger value="templates" className="gap-2">
          <LayoutTemplate className="w-4 h-4" />
          Modèles
        </TabsTrigger>
        <TabsTrigger value="orders" className="gap-2">
          <ShoppingCart className="w-4 h-4" />
          Commandes
        </TabsTrigger>
        <TabsTrigger value="coupons" className="gap-2">
          <Tag className="w-4 h-4" />
          Codes promo
        </TabsTrigger>
        <TabsTrigger value="reviews" className="gap-2">
          <Star className="w-4 h-4" />
          Avis
        </TabsTrigger>
        <TabsTrigger value="contacts" className="gap-2">
          <MessageCircle className="w-4 h-4" />
          Messages
        </TabsTrigger>
        <TabsTrigger value="hero" className="gap-2">
          <ImageIcon className="w-4 h-4" />
          Bannière Héro
        </TabsTrigger>
        <TabsTrigger value="pricing" className="gap-2">
          <DollarSign className="w-4 h-4" />
          Tarifs
        </TabsTrigger>
        <TabsTrigger value="about" className="gap-2">
          <Info className="w-4 h-4" />
          À propos
        </TabsTrigger>
        <TabsTrigger value="features" className="gap-2">
          <Sparkles className="w-4 h-4" />
          Fonctionnalités
        </TabsTrigger>
        <TabsTrigger value="contact-page" className="gap-2">
          <Phone className="w-4 h-4" />
          Contact
        </TabsTrigger>
        <TabsTrigger value="testimonials" className="gap-2">
          <Quote className="w-4 h-4" />
          Témoignages
        </TabsTrigger>
        <TabsTrigger value="categories" className="gap-2">
          <Grid3X3 className="w-4 h-4" />
          Catégories
        </TabsTrigger>
        <TabsTrigger value="refunds" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Remboursements
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}

export { TabsContent }
