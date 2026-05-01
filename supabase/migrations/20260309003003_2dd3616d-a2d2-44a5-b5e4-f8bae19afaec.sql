-- Fix review moderation bypass vulnerability
-- 1. Drop the existing INSERT policy and recreate with status restriction
DROP POLICY IF EXISTS "Only buyers can insert reviews" ON public.reviews;

CREATE POLICY "Only buyers can insert reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (
  (auth.uid() = user_id) 
  AND (status = 'pending')
  AND (
    (EXISTS (
      SELECT 1 FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      WHERE oi.template_id = reviews.template_id 
      AND o.user_id = auth.uid() 
      AND o.status = 'completed'
    )) 
    OR (EXISTS (
      SELECT 1 FROM all_access_passes
      WHERE all_access_passes.user_id = auth.uid()
    ))
  )
);

-- 2. Drop existing user UPDATE policy and recreate to prevent status manipulation
DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;

CREATE POLICY "Users can update their own reviews" 
ON public.reviews 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- 3. Fix notification policies to use authenticated role only
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;

CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);