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
          Templates
        </TabsTrigger>
        <TabsTrigger value="orders" className="gap-2">
          <ShoppingCart className="w-4 h-4" />
          Orders
        </TabsTrigger>
        <TabsTrigger value="coupons" className="gap-2">
          <Tag className="w-4 h-4" />
          Coupons
        </TabsTrigger>
        <TabsTrigger value="reviews" className="gap-2">
          <Star className="w-4 h-4" />
          Reviews
        </TabsTrigger>
        <TabsTrigger value="contacts" className="gap-2">
          <MessageCircle className="w-4 h-4" />
          Contacts
        </TabsTrigger>
        <TabsTrigger value="hero" className="gap-2">
          <ImageIcon className="w-4 h-4" />
          Hero Banner
        </TabsTrigger>
        <TabsTrigger value="pricing" className="gap-2">
          <DollarSign className="w-4 h-4" />
          Pricing
        </TabsTrigger>
        <TabsTrigger value="about" className="gap-2">
          <Info className="w-4 h-4" />
          About Us
        </TabsTrigger>
        <TabsTrigger value="features" className="gap-2">
          <Sparkles className="w-4 h-4" />
          Features
        </TabsTrigger>
        <TabsTrigger value="contact-page" className="gap-2">
          <Phone className="w-4 h-4" />
          Contact Page
        </TabsTrigger>
        <TabsTrigger value="testimonials" className="gap-2">
          <Quote className="w-4 h-4" />
          Testimonials
        </TabsTrigger>
        <TabsTrigger value="categories" className="gap-2">
          <Grid3X3 className="w-4 h-4" />
          Categories
        </TabsTrigger>
        <TabsTrigger value="refunds" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Refunds
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}

export { TabsContent }
