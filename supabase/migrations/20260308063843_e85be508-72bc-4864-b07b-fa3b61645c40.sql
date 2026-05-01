-- Fix #2: Drop the INSERT policy that lets users self-grant all-access passes
DROP POLICY IF EXISTS "Users can create their own all-access pass" ON public.all_access_passes;

-- Fix #3: Remove source_file_url from public templates SELECT
-- Create a new table to hold source file URLs accessible only to purchasers
CREATE TABLE IF NOT EXISTS public.template_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NOT NULL REFERENCES public.templates(id) ON DELETE CASCADE,
  source_file_url TEXT NOT NULL,
  UNIQUE(template_id)
);

-- Enable RLS
ALTER TABLE public.template_downloads ENABLE ROW LEVEL SECURITY;

-- Only allow select for users who purchased the template or have an all-access pass
CREATE POLICY "Purchasers can view download URLs"
ON public.template_downloads
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.order_items oi
    JOIN public.orders o ON o.id = oi.order_id
    WHERE oi.template_id = template_downloads.template_id
    AND o.user_id = auth.uid()
    AND o.status = 'completed'
  )
  OR
  EXISTS (
    SELECT 1 FROM public.all_access_passes
    WHERE user_id = auth.uid()
  )
);

-- Admin-only insert/update/delete
CREATE POLICY "Admins can manage download URLs"
ON public.template_downloads
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Migrate existing source_file_url data into template_downloads
INSERT INTO public.template_downloads (template_id, source_file_url)
SELECT id, source_file_url FROM public.templates WHERE source_file_url IS NOT NULL
ON CONFLICT (template_id) DO NOTHING;

-- Clear source_file_url from templates table (set to null)
UPDATE public.templates SET source_file_url = NULL WHERE source_file_url IS NOT NULL;