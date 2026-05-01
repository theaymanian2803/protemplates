-- Fix 1: Reviews INSERT - only buyers can review
DROP POLICY IF EXISTS "Authenticated users can insert reviews" ON public.reviews;

CREATE POLICY "Only buyers can insert reviews"
ON public.reviews FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND (
    EXISTS (
      SELECT 1 FROM public.order_items oi
      JOIN public.orders o ON o.id = oi.order_id
      WHERE oi.template_id = reviews.template_id
        AND o.user_id = auth.uid()
        AND o.status = 'completed'
    )
    OR
    EXISTS (
      SELECT 1 FROM public.all_access_passes
      WHERE user_id = auth.uid()
    )
  )
);

-- Fix 4: RLS always true - restrict contacts INSERT and profiles SELECT
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contacts;
CREATE POLICY "Anyone can submit contact form"
ON public.contacts FOR INSERT
WITH CHECK (
  name IS NOT NULL AND name != ''
  AND email IS NOT NULL AND email != ''
  AND message IS NOT NULL AND message != ''
  AND subject IS NOT NULL AND subject != ''
);

DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles FOR SELECT TO authenticated
USING (true);