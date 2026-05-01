import { supabase } from '@/integrations/supabase/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export interface HeroBannerSettings {
  badge_text: string
  headline_line1_prefix: string
  headline_line1_highlight: string
  headline_line2_prefix: string
  headline_line2_highlight: string
  subheadline: string
  cta_primary_text: string
  cta_primary_link: string
  cta_secondary_text: string
  cta_secondary_link: string
  hero_image_url: string
  demo_video_id: string
  stats: { value: string; label: string; icon: string }[]
}

const DEFAULT_HERO: HeroBannerSettings = {
  badge_text: '🔥 #1 Template Marketplace — 50K+ Creators',
  headline_line1_prefix: 'Build ',
  headline_line1_highlight: 'Stunning',
  headline_line2_prefix: 'Websites ',
  headline_line2_highlight: 'Instantly',
  subheadline:
    'Premium, pixel-perfect templates that launch in minutes. Stop coding from scratch — start shipping faster.',
  cta_primary_text: 'Explore Templates',
  cta_primary_link: '/templates',
  cta_secondary_text: 'Watch Demo',
  cta_secondary_link: '/contact',
  demo_video_id: 'dQw4w9WgXcQ',
  hero_image_url: '',
  stats: [
    { value: '12K+', label: 'Templates', icon: '📦' },
    { value: '50K+', label: 'Happy Creators', icon: '🎉' },
    { value: '4.9★', label: 'Average Rating', icon: '⭐' },
    { value: '24/7', label: 'Expert Support', icon: '🛟' },
  ],
}

export const useHeroBanner = () => {
  return useQuery({
    queryKey: ['site_settings', 'hero_banner'],
    queryFn: async (): Promise<HeroBannerSettings> => {
      const { data, error } = await supabase
        .from('site_settings' as any)
        .select('value')
        .eq('key', 'hero_banner')
        .maybeSingle() // FIX: Changed from .single()

      if (error) throw error
      if (!data) return DEFAULT_HERO
      return { ...DEFAULT_HERO, ...(data as any).value } as HeroBannerSettings
    },
    staleTime: 1000 * 60 * 5,
  })
}

export const useUpdateHeroBanner = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (settings: HeroBannerSettings) => {
      const { error } = await supabase.from('site_settings' as any).upsert({
        key: 'hero_banner',
        value: settings as any,
        updated_at: new Date().toISOString(),
      } as any) // FIX: Changed to upsert

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings', 'hero_banner'] })
    },
  })
}

// ──────────────────────────────────────
// About Us Settings
// ──────────────────────────────────────

export interface AboutUsSettings {
  hero_badge: string
  hero_headline: string
  hero_highlight: string
  hero_subheadline: string
  hero_cta_primary_text: string
  hero_cta_primary_link: string
  hero_cta_secondary_text: string
  hero_cta_secondary_link: string
  stats: { value: string; label: string }[]
  mission_badge: string
  mission_headline: string
  mission_paragraphs: string[]
  mission_image_url: string
  awards: { title: string; subtitle: string }[]
  values_badge: string
  values_headline: string
  values_subheadline: string
  values: { title: string; description: string }[]
  team_badge: string
  team_headline: string
  team_subheadline: string
  team: { name: string; role: string; bio: string; image: string }[]
  milestones_badge: string
  milestones_headline: string
  milestones: { year: string; title: string; event: string }[]
  cta_headline: string
  cta_subheadline: string
  cta_primary_text: string
  cta_primary_link: string
  cta_secondary_text: string
  cta_secondary_link: string
}

const DEFAULT_ABOUT: AboutUsSettings = {
  // ... (Keeping your original defaults)
  hero_badge: 'About TemplatePro',
  hero_headline: 'We Build the Future of',
  hero_highlight: 'Web Design',
  hero_subheadline:
    "We're on a mission to make professional web design accessible to everyone — from solo founders to enterprise teams.",
  hero_cta_primary_text: 'Browse Templates',
  hero_cta_primary_link: '/templates',
  hero_cta_secondary_text: 'Get in Touch',
  hero_cta_secondary_link: '/contact',
  stats: [
    { value: '50K+', label: 'Templates Sold' },
    { value: '12K+', label: 'Happy Customers' },
    { value: '500+', label: 'Premium Authors' },
    { value: '150+', label: 'Countries Served' },
  ],
  mission_badge: 'Our Mission',
  mission_headline: 'Empowering creators to launch faster & build better',
  mission_paragraphs: [
    'TemplatePro was born in 2018 from a simple frustration: why should great web design be reserved for those with big budgets or specialized skills?',
    'We host 500+ talented authors worldwide, offering templates across e-commerce, portfolios, landing pages, dashboards, and more — each vetted for design quality, clean code, and exceptional UX.',
  ],
  mission_image_url:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop',
  awards: [
    { title: 'Best Marketplace', subtitle: 'Web Awards 2023' },
    { title: '98% Satisfaction', subtitle: 'Customer Rating' },
  ],
  values_badge: 'What We Stand For',
  values_headline: 'Our Core Values',
  values_subheadline:
    'These principles guide everything we do — from curating templates to supporting our global community of creators.',
  values: [
    {
      title: 'Quality First',
      description:
        'Every template undergoes rigorous review — pixel-perfect design, clean code, and flawless responsiveness.',
    },
    {
      title: 'Community Driven',
      description:
        'We empower designers and developers worldwide to showcase their creativity and build thriving careers.',
    },
    {
      title: 'Innovation',
      description:
        'Staying ahead of design trends with cutting-edge templates that help businesses stand out online.',
    },
    {
      title: 'Customer Success',
      description:
        'Your success is our priority. Dedicated support and resources to help you launch faster.',
    },
    {
      title: 'Trust & Security',
      description:
        'Secure transactions, licensed code, and a money-back guarantee on every purchase.',
    },
    {
      title: 'Developer Friendly',
      description:
        'Clean, well-documented code built with modern frameworks. Easy to customize and extend.',
    },
  ],
  team_badge: 'The People',
  team_headline: 'Meet Our Team',
  team_subheadline:
    'The passionate people behind TemplatePro who work tirelessly to bring you the best templates.',
  team: [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former design lead at Figma. Passionate about democratizing web design for everyone.',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Design',
      bio: 'Award-winning designer with 10+ years crafting beautiful digital experiences.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Lead Developer',
      bio: 'Full-stack engineer obsessed with performance, accessibility, and clean architecture.',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'David Kim',
      role: 'Head of Customer Success',
      bio: 'Ensures every customer has an exceptional experience from purchase to launch.',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    },
  ],
  milestones_badge: 'Our Journey',
  milestones_headline: 'Key Milestones',
  milestones: [
    {
      year: '2018',
      title: 'The Beginning',
      event: 'TemplatePro founded with a vision to democratize web design.',
    },
    {
      year: '2019',
      title: 'First Milestone',
      event: 'Reached 1,000 templates and 5,000 customers worldwide.',
    },
    {
      year: '2021',
      title: 'Creator Economy',
      event: 'Launched Author Partner Program with 200+ creators onboarded.',
    },
    {
      year: '2023',
      title: 'Global Reach',
      event: 'Expanded to serve customers across 150+ countries.',
    },
    {
      year: '2024',
      title: 'AI Innovation',
      event: 'Introduced AI-powered template customization and recommendations.',
    },
  ],
  cta_headline: 'Ready to Build Something Amazing?',
  cta_subheadline:
    'Browse our collection of premium templates and find the perfect starting point for your next project.',
  cta_primary_text: 'Browse Templates',
  cta_primary_link: '/templates',
  cta_secondary_text: 'Contact Us',
  cta_secondary_link: '/contact',
}

export const useAboutUs = () => {
  return useQuery({
    queryKey: ['site_settings', 'about_us'],
    queryFn: async (): Promise<AboutUsSettings> => {
      const { data, error } = await supabase
        .from('site_settings' as any)
        .select('value')
        .eq('key', 'about_us')
        .maybeSingle() // FIX: Changed from .single()

      if (error) throw error
      if (!data) return DEFAULT_ABOUT
      return { ...DEFAULT_ABOUT, ...(data as any).value } as AboutUsSettings
    },
    staleTime: 1000 * 60 * 5,
  })
}

export const useUpdateAboutUs = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (settings: AboutUsSettings) => {
      const { error } = await supabase.from('site_settings' as any).upsert({
        key: 'about_us',
        value: settings as any,
        updated_at: new Date().toISOString(),
      } as any)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings', 'about_us'] })
    },
  })
}

// ──────────────────────────────────────
// Contact Us Settings
// ──────────────────────────────────────

export interface ContactUsSettings {
  hero_badge: string
  hero_headline: string
  hero_highlight: string
  hero_subheadline: string
  contact_methods: { title: string; description: string; value: string; action: string }[]
  form_title: string
  form_subtitle: string
  business_hours: { day: string; hours: string }[]
  live_chat_note: string
  response_times: { label: string; time: string }[]
  location_title: string
  location_subtitle: string
  location_address_line1: string
  location_address_line2: string
  location_lat: number
  location_lng: number
  location_zoom: number
}

const DEFAULT_CONTACT: ContactUsSettings = {
  // ... (Keeping your original defaults)
  hero_badge: 'Get in Touch',
  hero_headline: "We'd Love to",
  hero_highlight: 'Hear From You',
  hero_subheadline: 'Have a question, feedback, or need help? Our team is ready to assist you.',
  contact_methods: [
    {
      title: 'Email Us',
      description: 'Send us an email anytime',
      value: 'hello@templatepro.com',
      action: 'mailto:hello@templatepro.com',
    },
    {
      title: 'Call Us',
      description: 'Mon-Fri, 9am-6pm EST',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
    },
    { title: 'Live Chat', description: 'Chat with our team', value: 'Available 24/7', action: '#' },
    {
      title: 'Visit Us',
      description: 'Our headquarters',
      value: '123 Design Street, NYC',
      action: '#',
    },
  ],
  form_title: 'Send us a Message',
  form_subtitle: "Fill out the form below and we'll get back to you as soon as possible.",
  business_hours: [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  live_chat_note: '💬 Live chat available 24/7',
  response_times: [
    { label: 'Email', time: 'Within 24 hours' },
    { label: 'Live Chat', time: 'Instant' },
    { label: 'Phone', time: 'During business hours' },
  ],
  location_title: 'Our Location',
  location_subtitle: 'Visit us at our headquarters',
  location_address_line1: '123 Design Street',
  location_address_line2: 'New York, NY 10001',
  location_lat: 40.7128,
  location_lng: -74.006,
  location_zoom: 15,
}

export const useContactUs = () => {
  return useQuery({
    queryKey: ['site_settings', 'contact_us'],
    queryFn: async (): Promise<ContactUsSettings> => {
      const { data, error } = await supabase
        .from('site_settings' as any)
        .select('value')
        .eq('key', 'contact_us')
        .maybeSingle() // FIX: Changed from .single()

      if (error) throw error
      if (!data) return DEFAULT_CONTACT
      return { ...DEFAULT_CONTACT, ...(data as any).value } as ContactUsSettings
    },
    staleTime: 1000 * 60 * 5,
  })
}

export const useUpdateContactUs = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (settings: ContactUsSettings) => {
      const { error } = await supabase.from('site_settings' as any).upsert({
        key: 'contact_us',
        value: settings as any,
        updated_at: new Date().toISOString(),
      } as any)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings', 'contact_us'] })
    },
  })
}

// ──────────────────────────────────────
// Pricing Section Settings
// ──────────────────────────────────────

export interface PricingSectionSettings {
  badge: string
  headline: string
  subheadline: string
  individual_title: string
  individual_subtitle: string
  individual_price_label: string
  individual_price_note: string
  individual_features: string[]
  individual_cta_text: string
  individual_cta_link: string
  allaccess_title: string
  allaccess_subtitle: string
  allaccess_price_note: string
  allaccess_badge: string
  allaccess_price: number
  allaccess_features: string[]
  allaccess_cta_text: string
}

const DEFAULT_PRICING: PricingSectionSettings = {
  // ... (Keeping your original defaults)
  badge: 'Pricing',
  headline: 'Simple, Transparent Pricing',
  subheadline: 'Buy templates individually or get access to everything with a one-time payment.',
  individual_title: 'Individual Templates',
  individual_subtitle: 'Buy only what you need',
  individual_price_label: 'Varies',
  individual_price_note: 'per template',
  individual_features: [
    'Per-template pricing',
    'Regular & Extended licenses',
    '6 Months Support',
    'Lifetime Updates',
    'Source files included',
  ],
  individual_cta_text: 'Browse Templates',
  individual_cta_link: '/templates',
  allaccess_title: 'All Access Pass',
  allaccess_subtitle: 'One payment, every template',
  allaccess_price_note: 'one-time payment',
  allaccess_badge: 'Best Value',
  allaccess_price: 300,
  allaccess_features: [
    'Access to ALL templates',
    'All future templates included',
    'Regular license for all',
    'Priority Support',
    'Lifetime Updates',
    'Source files included',
  ],
  allaccess_cta_text: 'Get All Access',
}

export const usePricingSection = () => {
  return useQuery({
    queryKey: ['site_settings', 'pricing_section'],
    queryFn: async (): Promise<PricingSectionSettings> => {
      const { data, error } = await supabase
        .from('site_settings' as any)
        .select('value')
        .eq('key', 'pricing_section')
        .maybeSingle() // FIX: Changed from .single()

      if (error) throw error
      if (!data) return DEFAULT_PRICING
      return { ...DEFAULT_PRICING, ...(data as any).value } as PricingSectionSettings
    },
    staleTime: 1000 * 60 * 5,
  })
}

export const useUpdatePricingSection = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (settings: PricingSectionSettings) => {
      const { error } = await supabase.from('site_settings' as any).upsert({
        key: 'pricing_section',
        value: settings as any,
        updated_at: new Date().toISOString(),
      } as any) // FIX: Changed to upsert

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings', 'pricing_section'] })
    },
  })
}

// ──────────────────────────────────────
// Features Section Settings
// ──────────────────────────────────────

export interface FeaturesSectionSettings {
  badge: string
  headline: string
  subheadline: string
  features: { title: string; description: string }[]
}

const DEFAULT_FEATURES: FeaturesSectionSettings = {
  // ... (Keeping your original defaults)
  badge: 'Why Choose Us',
  headline: 'Built for Success',
  subheadline: 'Every template comes packed with features designed to help you succeed online',
  features: [
    {
      title: 'Lightning Fast',
      description: 'Optimized for performance with lazy loading, code splitting, and CDN delivery.',
    },
    {
      title: 'Secure & Reliable',
      description: 'Built with security best practices and regular updates to keep you protected.',
    },
    {
      title: 'Fully Customizable',
      description: 'Easy-to-use customization options with detailed documentation included.',
    },
    {
      title: 'Clean Code',
      description: 'Well-structured, commented code following industry best practices.',
    },
    {
      title: 'Premium Support',
      description: 'Get help from our expert team with 24/7 priority support.',
    },
    {
      title: 'Regular Updates',
      description: 'Continuous improvements and new features added regularly.',
    },
  ],
}

export const useFeaturesSection = () => {
  return useQuery({
    queryKey: ['site_settings', 'features_section'],
    queryFn: async (): Promise<FeaturesSectionSettings> => {
      const { data, error } = await supabase
        .from('site_settings' as any)
        .select('value')
        .eq('key', 'features_section')
        .maybeSingle() // FIX: Changed from .single()

      if (error) throw error
      if (!data) return DEFAULT_FEATURES
      return { ...DEFAULT_FEATURES, ...(data as any).value } as FeaturesSectionSettings
    },
    staleTime: 1000 * 60 * 5,
  })
}

export const useUpdateFeaturesSection = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (settings: FeaturesSectionSettings) => {
      const { error } = await supabase.from('site_settings' as any).upsert({
        key: 'features_section',
        value: settings as any,
        updated_at: new Date().toISOString(),
      } as any)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings', 'features_section'] })
    },
  })
}

// ──────────────────────────────────────
// Categories Section Settings
// ──────────────────────────────────────

export interface CategoryItem {
  title: string
  count: string
  description: string
}

export interface CategoriesSectionSettings {
  badge: string
  headline: string
  subheadline: string
  categories: CategoryItem[]
}

const DEFAULT_CATEGORIES: CategoriesSectionSettings = {
  // ... (Keeping your original defaults)
  badge: 'Categories',
  headline: 'Find Your Perfect Template',
  subheadline:
    'Explore our curated collection of templates designed for every industry and purpose',
  categories: [
    { title: 'E-Commerce', count: '2,450+', description: 'Full-featured online stores' },
    { title: 'Business', count: '1,820+', description: 'Corporate & professional sites' },
    { title: 'Landing Pages', count: '3,200+', description: 'High-converting pages' },
    { title: 'Portfolios', count: '1,560+', description: 'Showcase your work' },
    { title: 'Creative', count: '2,100+', description: 'Unique artistic designs' },
    { title: 'Mobile Apps', count: '980+', description: 'App landing templates' },
  ],
}

export const useCategoriesSection = () => {
  return useQuery({
    queryKey: ['site_settings', 'categories_section'],
    queryFn: async (): Promise<CategoriesSectionSettings> => {
      const { data, error } = await supabase
        .from('site_settings' as any)
        .select('value')
        .eq('key', 'categories_section')
        .maybeSingle() // FIX: Changed from .single()

      if (error) throw error
      if (!data) return DEFAULT_CATEGORIES
      return { ...DEFAULT_CATEGORIES, ...(data as any).value } as CategoriesSectionSettings
    },
    staleTime: 1000 * 60 * 5,
  })
}

export const useUpdateCategoriesSection = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (settings: CategoriesSectionSettings) => {
      const { error } = await supabase.from('site_settings' as any).upsert({
        key: 'categories_section',
        value: settings as any,
        updated_at: new Date().toISOString(),
      } as any)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings', 'categories_section'] })
    },
  })
}

// ============= TESTIMONIALS SECTION =============

export interface Testimonial {
  name: string
  role: string
  avatar: string
  text: string
  rating: number
}

export interface TestimonialsSectionSettings {
  badge: string
  headline: string
  subheadline: string
  testimonials: Testimonial[]
}

export const DEFAULT_TESTIMONIALS: TestimonialsSectionSettings = {
  // ... (Keeping your original defaults)
  badge: 'Testimonials',
  headline: 'Loved by 50,000+ Creators',
  subheadline: 'See why professionals trust us for their most important projects',
  testimonials: [
    {
      name: 'Sarah Chen',
      role: 'Founder, PixelCraft Studio',
      avatar: 'SC',
      text: 'These templates saved us months of development. The code quality is incredible — clean, well-documented, and easy to customize.',
      rating: 5,
    },
    {
      name: 'Marcus Williams',
      role: 'CTO, LaunchPad Inc',
      avatar: 'MW',
      text: "We've tried dozens of template providers. Nothing comes close to the design quality and performance optimization here.",
      rating: 5,
    },
    {
      name: 'Aisha Patel',
      role: 'Freelance Designer',
      avatar: 'AP',
      text: "My clients are always blown away when I deliver. These templates make me look like a genius. Best investment I've made.",
      rating: 5,
    },
    {
      name: 'David Nguyen',
      role: 'Product Lead, NovaTech',
      avatar: 'DN',
      text: 'The All Access Pass is a no-brainer. Every new template they release is instantly available. Incredible value for any team.',
      rating: 5,
    },
  ],
}

export const useTestimonialsSection = () => {
  return useQuery({
    queryKey: ['site_settings', 'testimonials_section'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'testimonials_section')
        .maybeSingle() // Was already correct here!

      if (error) throw error
      return data
        ? ({ ...DEFAULT_TESTIMONIALS, ...(data.value as any) } as TestimonialsSectionSettings)
        : DEFAULT_TESTIMONIALS
    },
  })
}

export const useUpdateTestimonialsSection = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (settings: TestimonialsSectionSettings) => {
      const { error } = await supabase.from('site_settings').upsert({
        key: 'testimonials_section',
        value: settings as any,
        updated_at: new Date().toISOString(),
      } as any)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings', 'testimonials_section'] })
    },
  })
}

// ──────────────────────────────────────
// Hosting Platforms Settings
// ──────────────────────────────────────

export interface HostingStep {
  title: string
  description: string
  details: string[]
  command?: string
  link_url?: string
  link_label?: string
}

export interface HostingPlatform {
  id: string
  name: string
  tagline: string
  enabled: boolean
  color: string
  steps: HostingStep[]
}

export interface ProHostingService {
  enabled: boolean
  price: number
  title: string
  description: string
  features: string[]
  cta_text: string
  contact_link: string
}

export interface HostingSettings {
  platforms: HostingPlatform[]
  pro_service: ProHostingService
}

export const DEFAULT_HOSTING: HostingSettings = {
  // ... (Keeping your original defaults)
  pro_service: {
    enabled: true,
    price: 20,
    title: 'Hire a Pro',
    description: "Don't want to deal with hosting? Let our experts deploy your template for you.",
    features: [
      'Professional deployment setup',
      'Domain configuration included',
      'SSL certificate setup',
      '24-hour turnaround',
    ],
    cta_text: 'Get Pro Hosting',
    contact_link: '/contact',
  },
  platforms: [
    {
      id: 'lovable',
      name: 'Lovable',
      tagline: 'Easiest — no code setup needed',
      enabled: true,
      color: 'bg-primary text-primary-foreground',
      steps: [
        {
          title: 'Extract Your Template',
          description: 'Unzip the downloaded template files to a folder on your computer.',
          details: [
            'Locate the downloaded .zip file',
            'Extract it to a folder of your choice',
            'Open the folder to verify all files are present',
          ],
        },
        {
          title: 'Create a Lovable Project',
          description:
            'Go to Lovable and create a new project, then upload or import your template code.',
          details: [
            'Visit lovable.dev and sign in',
            "Click 'New Project' from the dashboard",
            'Describe your template or paste the code to get started',
          ],
          link_url: 'https://lovable.dev',
          link_label: 'Open Lovable',
        },
        {
          title: 'Publish Your Site',
          description: 'Click the Publish button in the top-right corner to make your site live.',
          details: [
            "Click the 'Publish' button in the editor",
            'Your site will be live on a .lovable.app domain',
            'Optionally connect a custom domain in Settings → Domains',
          ],
        },
      ],
    },
    {
      id: 'vercel',
      name: 'Vercel',
      tagline: 'Great for React & Next.js projects',
      enabled: true,
      color: 'bg-foreground text-background',
      steps: [
        {
          title: 'Push to GitHub',
          description: 'Upload your template code to a GitHub repository.',
          details: [
            'Create a new repository on GitHub',
            'Initialize git in your template folder',
            'Push the code to your repository',
          ],
          command: 'git init && git add . && git commit -m "Initial commit" && git push',
        },
        {
          title: 'Import in Vercel',
          description: 'Connect your GitHub repo to Vercel for automatic deployments.',
          details: [
            'Go to vercel.com and sign in with GitHub',
            "Click 'Add New Project'",
            'Select your template repository',
            'Vercel will auto-detect the framework settings',
          ],
          link_url: 'https://vercel.com/new',
          link_label: 'Open Vercel',
        },
        {
          title: 'Deploy & Go Live',
          description: 'Click Deploy and your site will be live in seconds.',
          details: [
            'Review the build settings (usually no changes needed)',
            "Click 'Deploy'",
            'Your site will be live on a .vercel.app domain',
            'Add a custom domain in Project Settings → Domains',
          ],
        },
      ],
    },
    {
      id: 'netlify',
      name: 'Netlify',
      tagline: 'Simple drag-and-drop deployment',
      enabled: true,
      color: 'bg-[hsl(172,60%,40%)] text-white',
      steps: [
        {
          title: 'Build Your Template',
          description: 'Run the build command to generate production-ready files.',
          details: [
            'Open a terminal in your template folder',
            'Install dependencies first',
            'Run the build command to create the dist folder',
          ],
          command: 'npm install && npm run build',
        },
        {
          title: 'Deploy to Netlify',
          description: 'Drag and drop your build folder or connect via Git.',
          details: [
            'Go to app.netlify.com and sign in',
            "Drag the 'dist' folder onto the deploy area",
            "Or click 'Add new site' → 'Import from Git'",
          ],
          link_url: 'https://app.netlify.com',
          link_label: 'Open Netlify',
        },
        {
          title: 'Configure & Go Live',
          description: 'Set up your domain and deploy settings.',
          details: [
            'Your site is live on a .netlify.app domain',
            'Go to Site settings → Domain management',
            'Add your custom domain',
            'SSL is automatically configured',
          ],
        },
      ],
    },
  ],
}

export const useHostingSettings = () => {
  return useQuery({
    queryKey: ['site_settings', 'hosting_platforms'],
    queryFn: async (): Promise<HostingSettings> => {
      const { data, error } = await supabase
        .from('site_settings' as any)
        .select('value')
        .eq('key', 'hosting_platforms')
        .maybeSingle() // FIX: Changed from .single()

      if (error) throw error
      if (!data) return DEFAULT_HOSTING
      return { ...DEFAULT_HOSTING, ...(data as any).value } as HostingSettings
    },
    staleTime: 1000 * 60 * 5,
  })
}

export const useUpdateHostingSettings = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (settings: HostingSettings) => {
      const { error } = await supabase.from('site_settings' as any).upsert({
        key: 'hosting_platforms',
        value: settings as any,
        updated_at: new Date().toISOString(),
      } as any)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings', 'hosting_platforms'] })
    },
  })
}
