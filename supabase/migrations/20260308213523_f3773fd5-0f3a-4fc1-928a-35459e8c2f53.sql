-- Add status column to reviews
ALTER TABLE public.reviews ADD COLUMN status text NOT NULL DEFAULT 'pending';

-- Update existing reviews to approved
UPDATE public.reviews SET status = 'approved';

-- Drop the old public SELECT policy
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;

-- New: public can only see approved reviews, users can see their own, admins see all
CREATE POLICY "Anyone can view approved reviews"
ON public.reviews FOR SELECT
USING (status = 'approved' OR auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- Drop old update policy and recreate with moderation awareness
DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;

CREATE POLICY "Users can update their own reviews"
ON public.reviews FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can update any review"
ON public.reviews FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));