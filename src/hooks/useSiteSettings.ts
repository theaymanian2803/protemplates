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
  badge_text: '🔥 Place de marché nº1 — Plus de 50 000 créateurs',
  headline_line1_prefix: "Achetez des ",
  headline_line1_highlight: 'Sites Magnifiques',
  headline_line2_prefix: 'Prêts à ',
  headline_line2_highlight: 'Lancer',
  subheadline:
    "Des templates premium, pixels parfaits, lancés en quelques minutes. Arrêtez de coder de zéro — commencez à vendre plus vite.",
  cta_primary_text: 'Voir le catalogue',
  cta_primary_link: '/templates',
  cta_secondary_text: 'Voir la démo',
  cta_secondary_link: '/contact',
  demo_video_id: 'dQw4w9WgXcQ',
  hero_image_url: '',
  stats: [
    { value: '12K+', label: 'Templates', icon: '📦' },
    { value: '50K+', label: 'Créateurs satisfaits', icon: '🎉' },
    { value: '4.9★', label: 'Note moyenne', icon: '⭐' },
    { value: '24h/24', label: 'Support expert', icon: '🛟' },
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
  hero_badge: 'À propos de TemplatePro',
  hero_headline: 'Nous construisons l\'avenir du',
  hero_highlight: 'Design Web',
  hero_subheadline:
    "Notre mission est de rendre le design web professionnel accessible à tous — des fondateurs solo aux équipes enterprise.",
  hero_cta_primary_text: 'Voir les templates',
  hero_cta_primary_link: '/templates',
  hero_cta_secondary_text: 'Nous contacter',
  hero_cta_secondary_link: '/contact',
  stats: [
    { value: '50K+', label: 'Templates vendus' },
    { value: '12K+', label: 'Clients satisfaits' },
    { value: '500+', label: 'Auteurs premium' },
    { value: '150+', label: 'Pays desservis' },
  ],
  mission_badge: 'Notre mission',
  mission_headline: 'Permettre aux créateurs de lancer plus vite et de mieux construire',
  mission_paragraphs: [
    'TemplatePro est né en 2018 d\'une simple frustration : pourquoi le design web de qualité devrait-il être réservé à ceux qui ont de gros budgets ou des compétences spécialisées ?',
    'Nous hébergeons plus de 500 auteurs talentueux dans le monde entier, offrant des templates dans les domaines de l\'e-commerce, des portfolios, des landing pages, des tableaux de bord et bien plus — chacun vérifié pour la qualité du design, le code propre et l\'expérience utilisateur exceptionnelle.',
  ],
  mission_image_url:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop',
  awards: [
    { title: 'Meilleure place de marché', subtitle: 'Web Awards 2023' },
    { title: '98% de satisfaction', subtitle: 'Avis clients' },
  ],
  values_badge: 'Nos valeurs',
  values_headline: 'Nos valeurs fondamentales',
  values_subheadline:
    'Ces principes guident tout ce que nous faisons — de la sélection des templates au soutien de notre communauté mondiale de créateurs.',
  values: [
    {
      title: 'Qualité avant tout',
      description:
        'Chaque template est soumis à une révision rigoureuse — design pixel-parfait, code propre et réactivité irréprochable.',
    },
    {
      title: 'Axé sur la communauté',
      description:
        'Nous permettons aux designers et développeurs du monde entier de montrer leur créativité et de bâtir des carrières prospères.',
    },
    {
      title: 'Innovation',
      description:
        'Rester en avance sur les tendances du design avec des templates de pointe qui aident les entreprises à se démarquer en ligne.',
    },
    {
      title: 'Réussite client',
      description:
        'Votre réussite est notre priorité. Support dédié et ressources pour vous aider à lancer plus vite.',
    },
    {
      title: 'Confiance et sécurité',
      description:
        'Transactions sécurisées, code sous licence et garantie de remboursement sur chaque achat.',
    },
    {
      title: 'Conviviale pour les développeurs',
      description:
        'Code propre et bien documenté, construit avec des frameworks modernes. Facile à personnaliser et à étendre.',
    },
  ],
  team_badge: 'L\'équipe',
  team_headline: 'Rencontrez notre équipe',
  team_subheadline:
    'Les passionnés derrière TemplatePro qui travaillent sans relâche pour vous offrir les meilleurs templates.',
  team: [
    {
      name: 'Sarah Chen',
      role: 'Fondatrice & PDG',
      bio: 'Ancienne responsable design chez Figma. Passionnée par la démocratisation du design web pour tous.',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'Marcus Johnson',
      role: 'Directeur du Design',
      bio: 'Designer primé avec plus de 10 ans d\'expérience dans la création d\'expériences numériques magnifiques.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Développeuse principale',
      bio: 'Développeuse full-stack obsédée par la performance, l\'accessibilité et l\'architecture propre.',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'David Kim',
      role: 'Responsable Réussite Client',
      bio: 'Veille à ce que chaque client vive une expérience exceptionnelle, de l\'achat au lancement.',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    },
  ],
  milestones_badge: 'Notre parcours',
  milestones_headline: 'Étapes clés',
  milestones: [
    {
      year: '2018',
      title: 'Le début',
      event: 'TemplatePro fondé avec la vision de démocratiser le design web.',
    },
    {
      year: '2019',
      title: 'Premier jalon',
      event: 'Atteint 1 000 templates et 5 000 clients dans le monde.',
    },
    {
      year: '2021',
      title: 'Économie des créateurs',
      event: 'Lancement du programme partenaire auteur avec plus de 200 créateurs inscrits.',
    },
    {
      year: '2023',
      title: 'Portée mondiale',
      event: 'Expansion pour servir des clients dans plus de 150 pays.',
    },
    {
      year: '2024',
      title: 'Innovation IA',
      event: 'Introduction de la personnalisation et des recommandations de templates par IA.',
    },
  ],
  cta_headline: 'Prêt à créer quelque chose d\'exceptionnel ?',
  cta_subheadline:
    'Parcourez notre collection de templates premium et trouvez le point de départ parfait pour votre prochain projet.',
  cta_primary_text: 'Voir les templates',
  cta_primary_link: '/templates',
  cta_secondary_text: 'Nous contacter',
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
  hero_badge: 'Contactez-nous',
  hero_headline: 'Nous serions ravis de',
  hero_highlight: 'vous entendre',
  hero_subheadline: 'Une question, un feedback ou besoin d\'aide ? Notre équipe est là pour vous.',
  contact_methods: [
    {
      title: 'Nous écrire',
      description: 'Envoyez-nous un email à tout moment',
      value: 'hello@templatepro.com',
      action: 'mailto:hello@templatepro.com',
    },
    {
      title: 'Nous appeler',
      description: 'Lun-Ven, 9h-18h (heure EST)',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
    },
    { title: 'Chat en direct', description: 'Discutez avec notre équipe', value: 'Disponible 24h/24', action: '#' },
    {
      title: 'Nous rendre visite',
      description: 'Notre siège social',
      value: '123 Design Street, NYC',
      action: '#',
    },
  ],
  form_title: 'Envoyez-nous un message',
  form_subtitle: 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.',
  business_hours: [
    { day: 'Lundi - Vendredi', hours: '9h00 - 18h00 (EST)' },
    { day: 'Samedi', hours: '10h00 - 16h00 (EST)' },
    { day: 'Dimanche', hours: 'Fermé' },
  ],
  live_chat_note: '💬 Chat en direct disponible 24h/24',
  response_times: [
    { label: 'Email', time: 'Sous 24 heures' },
    { label: 'Chat en direct', time: 'Instantané' },
    { label: 'Téléphone', time: 'Pendant les heures d\'ouverture' },
  ],
  location_title: 'Notre adresse',
  location_subtitle: 'Rendez-nous visite à notre siège social',
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
  badge: 'Tarifs',
  headline: 'Tarifs simples et transparents',
  subheadline: 'Achetez des templates individuellement ou obtenez tout avec un paiement unique.',
  individual_title: 'Templates individuels',
  individual_subtitle: 'Achetez seulement ce dont vous avez besoin',
  individual_price_label: 'Variable',
  individual_price_note: 'par template',
  individual_features: [
    'Achat à l\'unité',
    'Licences standard et étendue',
    '6 mois de support',
    'Mises à jour à vie',
    'Fichiers sources inclus',
  ],
  individual_cta_text: 'Parcourir',
  individual_cta_link: '/templates',
  allaccess_title: 'Pass Tout Accès',
  allaccess_subtitle: 'Un paiement, tous les templates',
  allaccess_price_note: 'paiement unique',
  allaccess_badge: 'Meilleur rapport qualité-prix',
  allaccess_price: 300,
  allaccess_features: [
    'Accès à TOUS les templates',
    'Tous les futurs templates inclus',
    'Licence standard pour tous',
    'Support prioritaire',
    'Mises à jour à vie',
    'Fichiers sources inclus',
  ],
  allaccess_cta_text: 'Obtenir le Pass',
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
  badge: 'Pourquoi nous choisir',
  headline: 'Conçu pour la réussite',
  subheadline: 'Chaque template est livré avec des fonctionnalités conçues pour vous aider à réussir en ligne',
  features: [
    {
      title: 'Rapide comme l\'éclair',
      description: 'Optimisé pour la performance avec chargement différé, code splitting et livraison CDN.',
    },
    {
      title: 'Sécurisé et fiable',
      description: 'Construit avec les meilleures pratiques de sécurité et des mises à jour régulières pour vous protéger.',
    },
    {
      title: 'Entièrement personnalisable',
      description: 'Options de personnalisation faciles à utiliser avec une documentation détaillée incluse.',
    },
    {
      title: 'Code propre',
      description: 'Code bien structuré et commenté suivant les meilleures pratiques de l\'industrie.',
    },
    {
      title: 'Support premium',
      description: 'Obtenez de l\'aide de notre équipe d\'experts avec un support prioritaire 24h/24.',
    },
    {
      title: 'Mises à jour régulières',
      description: 'Améliorations continues et nouvelles fonctionnalités ajoutées régulièrement.',
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
  badge: 'Catégories',
  headline: 'Trouvez le template parfait',
  subheadline:
    'Explorez notre collection de templates conçus pour chaque secteur d\'activité et chaque besoin',
  categories: [
    { title: 'E-Commerce', count: '2 450+', description: 'Boutiques en ligne complètes' },
    { title: 'Business', count: '1 820+', description: 'Sites professionnels et corporate' },
    { title: 'Landing Pages', count: '3 200+', description: 'Pages à fort taux de conversion' },
    { title: 'Portfolios', count: '1 560+', description: 'Présentez votre travail' },
    { title: 'Créatif', count: '2 100+', description: 'Designs artistiques uniques' },
    { title: 'Apps Mobile', count: '980+', description: 'Templates pour landing apps' },
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
  badge: 'Témoignages',
  headline: 'Aimé par plus de 50 000 créateurs',
  subheadline: 'Découvrez pourquoi les professionnels nous font confiance pour leurs projets les plus importants',
  testimonials: [
    {
      name: 'Sarah Chen',
      role: 'Fondatrice, PixelCraft Studio',
      avatar: 'SC',
      text: 'Ces templates nous ont fait gagner des mois de développement. La qualité du code est incroyable — propre, bien documenté et facile à personnaliser.',
      rating: 5,
    },
    {
      name: 'Marcus Williams',
      role: 'CTO, LaunchPad Inc',
      avatar: 'MW',
      text: 'Nous avons essayé des dizaines de fournisseurs de templates. Rien n\'égale la qualité de design et l\'optimisation des performances ici.',
      rating: 5,
    },
    {
      name: 'Aisha Patel',
      role: 'Designer Freelance',
      avatar: 'AP',
      text: 'Mes clients sont toujours impressionnés quand je livre. Ces templates me font passer pour un génie. Le meilleur investissement que j\'ai fait.',
      rating: 5,
    },
    {
      name: 'David Nguyen',
      role: 'Chef Produit, NovaTech',
      avatar: 'DN',
      text: 'Le Pass Tout Accès est une évidence. Chaque nouveau template est immédiatement disponible. Une valeur incroyable pour toute équipe.',
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
  pro_service: {
    enabled: true,
    price: 0,
    title: 'Engager un Pro',
    description: 'Vous ne voulez pas gérer l\'hébergement ? Laissez nos experts déployer votre template pour vous.',
    features: [
      'Configuration de déploiement professionnelle',
      'Configuration de domaine incluse',
      'Configuration du certificat SSL',
      'Délai de 24 heures',
    ],
    cta_text: 'Démarrer via WhatsApp',
    contact_link: '/contact',
  },
  platforms: [
    {
      id: 'lovable',
      name: 'Lovable',
      tagline: 'Le plus simple — aucune configuration nécessaire',
      enabled: true,
      color: 'bg-primary text-primary-foreground',
      steps: [
        {
          title: 'Extrayez votre template',
          description: 'Décompressez les fichiers du template téléchargé dans un dossier sur votre ordinateur.',
          details: [
            'Localisez le fichier .zip téléchargé',
            'Extrayez-le dans un dossier de votre choix',
            'Ouvrez le dossier pour vérifier que tous les fichiers sont présents',
          ],
        },
        {
          title: 'Créez un projet Lovable',
          description:
            'Allez sur Lovable et créez un nouveau projet, puis téléversez ou importez le code de votre template.',
          details: [
            'Visitez lovable.dev et connectez-vous',
            'Cliquez sur "Nouveau projet" depuis le tableau de bord',
            'Décrivez votre template ou collez le code pour commencer',
          ],
          link_url: 'https://lovable.dev',
          link_label: 'Ouvrir Lovable',
        },
        {
          title: 'Publiez votre site',
          description: 'Cliquez sur le bouton Publier dans le coin supérieur droit pour mettre votre site en ligne.',
          details: [
            'Cliquez sur le bouton "Publier" dans l\'éditeur',
            'Votre site sera en ligne sur un domaine .lovable.app',
            'Connectez éventuellement un domaine personnalisé dans Paramètres → Domaines',
          ],
        },
      ],
    },
    {
      id: 'vercel',
      name: 'Vercel',
      tagline: 'Idéal pour les projets React et Next.js',
      enabled: true,
      color: 'bg-foreground text-background',
      steps: [
        {
          title: 'Poussez sur GitHub',
          description: 'Téléversez le code de votre template dans un dépôt GitHub.',
          details: [
            'Créez un nouveau dépôt sur GitHub',
            'Initialisez git dans votre dossier de template',
            'Poussez le code vers votre dépôt',
          ],
          command: 'git init && git add . && git commit -m "Initial commit" && git push',
        },
        {
          title: 'Importez dans Vercel',
          description: 'Connectez votre dépôt GitHub à Vercel pour des déploiements automatiques.',
          details: [
            'Allez sur vercel.com et connectez-vous avec GitHub',
            'Cliquez sur "Ajouter un nouveau projet"',
            'Sélectionnez votre dépôt de template',
            'Vercel détectera automatiquement les paramètres du framework',
          ],
          link_url: 'https://vercel.com/new',
          link_label: 'Ouvrir Vercel',
        },
        {
          title: 'Déployez et lancez',
          description: 'Cliquez sur Déployer et votre site sera en ligne en quelques secondes.',
          details: [
            'Vérifiez les paramètres de build (généralement aucun changement requis)',
            'Cliquez sur "Déployer"',
            'Votre site sera en ligne sur un domaine .vercel.app',
            'Ajoutez un domaine personnalisé dans Paramètres du projet → Domaines',
          ],
        },
      ],
    },
    {
      id: 'netlify',
      name: 'Netlify',
      tagline: 'Déploiement simple par glisser-déposer',
      enabled: true,
      color: 'bg-[hsl(172,60%,40%)] text-white',
      steps: [
        {
          title: 'Construisez votre template',
          description: 'Exécutez la commande de build pour générer les fichiers prêts pour la production.',
          details: [
            'Ouvrez un terminal dans votre dossier de template',
            'Installez d\'abord les dépendances',
            'Exécutez la commande de build pour créer le dossier dist',
          ],
          command: 'npm install && npm run build',
        },
        {
          title: 'Déployez sur Netlify',
          description: 'Glissez-déposez votre dossier de build ou connectez via Git.',
          details: [
            'Allez sur app.netlify.com et connectez-vous',
            'Glissez le dossier "dist" sur la zone de déploiement',
            'Ou cliquez sur "Ajouter un nouveau site" → "Importer depuis Git"',
          ],
          link_url: 'https://app.netlify.com',
          link_label: 'Ouvrir Netlify',
        },
        {
          title: 'Configurez et lancez',
          description: 'Configurez votre domaine et vos paramètres de déploiement.',
          details: [
            'Votre site est en ligne sur un domaine .netlify.app',
            'Allez dans Paramètres du site → Gestion du domaine',
            'Ajoutez votre domaine personnalisé',
            'Le SSL est automatiquement configuré',
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
