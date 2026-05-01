
-- Create a table to track all-access pass purchases
CREATE TABLE public.all_access_passes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  order_id UUID REFERENCES public.orders(id),
  price NUMERIC NOT NULL DEFAULT 300,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.all_access_passes ENABLE ROW LEVEL SECURITY;

-- Users can view their own pass
CREATE POLICY "Users can view their own all-access pass"
ON public.all_access_passes
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own pass (via edge function with service role)
CREATE POLICY "Users can create their own all-access pass"
ON public.all_access_passes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can view all passes
CREATE POLICY "Admins can view all passes"
ON public.all_access_passes
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));
