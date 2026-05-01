-- Create templates table with all template data
CREATE TABLE public.templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  extended_price DECIMAL(10,2),
  image_url TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 0,
  sales INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  tech_stack TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  demo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Public read access for templates
CREATE POLICY "Anyone can view templates"
ON public.templates
FOR SELECT
USING (true);

-- Only admins can manage templates
CREATE POLICY "Admins can insert templates"
ON public.templates
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update templates"
ON public.templates
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete templates"
ON public.templates
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_templates_updated_at
BEFORE UPDATE ON public.templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample templates
INSERT INTO public.templates (title, description, category, price, extended_price, image_url, rating, sales, featured, tech_stack, features) VALUES
('Starter - SaaS Dashboard Template', 'A complete SaaS dashboard solution with analytics, user management, and billing integration.', 'SaaS', 49, 149, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 4.9, 2340, true, ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Supabase'], ARRAY['Responsive Dashboard', 'User Analytics', 'Dark Mode Support', 'API Integration']),
('Storefront - E-Commerce Pro Kit', 'Professional e-commerce template with cart, checkout, and inventory management.', 'E-Commerce', 79, 249, 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', 4.8, 1856, true, ARRAY['React', 'TypeScript', 'Stripe', 'Tailwind CSS'], ARRAY['Shopping Cart', 'Payment Integration', 'Product Gallery', 'Inventory System']),
('Portfolio Pro - Creative Showcase', 'Stunning portfolio template for designers and creatives.', 'Portfolio', 39, 119, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', 4.9, 3210, true, ARRAY['React', 'Framer Motion', 'Tailwind CSS'], ARRAY['Animated Sections', 'Project Gallery', 'Contact Form', 'Blog Integration']),
('Corporate - Business Landing Page', 'Professional business landing page with team and services sections.', 'Business', 59, 179, 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', 4.7, 1542, false, ARRAY['React', 'TypeScript', 'Tailwind CSS'], ARRAY['Team Section', 'Services Grid', 'Testimonials', 'Newsletter Signup']),
('Minimal - Blog & Magazine Theme', 'Clean and minimal blog template with rich text support.', 'Blog', 45, 139, 'https://images.unsplash.com/photo-1522542550221-31fd8575f4ca?w=800&q=80', 4.8, 2890, false, ARRAY['React', 'MDX', 'Tailwind CSS'], ARRAY['Rich Text Editor', 'Categories', 'Search', 'RSS Feed']),
('Agency Plus - Creative Studio Kit', 'Complete agency website template with portfolio and case studies.', 'Agency', 69, 219, 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80', 4.9, 1987, true, ARRAY['React', 'TypeScript', 'GSAP', 'Tailwind CSS'], ARRAY['Case Studies', 'Team Profiles', 'Service Pages', 'Client Portal']);