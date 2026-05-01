
-- Create a key-value site_settings table for admin-managed content
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings (needed for hero display)
CREATE POLICY "Anyone can read site settings" ON public.site_settings
  FOR SELECT USING (true);

-- Only admins can modify
CREATE POLICY "Admins can manage site settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed default hero banner settings
INSERT INTO public.site_settings (key, value) VALUES (
  'hero_banner',
  '{
    "badge_text": "🔥 #1 Template Marketplace — 50K+ Creators",
    "headline_line1_prefix": "Build ",
    "headline_line1_highlight": "Stunning",
    "headline_line2_prefix": "Websites ",
    "headline_line2_highlight": "Instantly",
    "subheadline": "Premium, pixel-perfect templates that launch in minutes. Stop coding from scratch — start shipping faster.",
    "cta_primary_text": "Explore Templates",
    "cta_primary_link": "/templates",
    "cta_secondary_text": "Watch Demo",
    "cta_secondary_link": "/contact",
    "stats": [
      {"value": "12K+", "label": "Templates", "icon": "📦"},
      {"value": "50K+", "label": "Happy Creators", "icon": "🎉"},
      {"value": "4.9★", "label": "Average Rating", "icon": "⭐"},
      {"value": "24/7", "label": "Expert Support", "icon": "🛟"}
    ]
  }'::jsonb
);
