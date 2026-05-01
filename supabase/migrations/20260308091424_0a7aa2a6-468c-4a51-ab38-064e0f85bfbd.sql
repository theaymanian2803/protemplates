
-- Create refund_requests table
CREATE TABLE public.refund_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.refund_requests ENABLE ROW LEVEL SECURITY;

-- Users can view their own refund requests
CREATE POLICY "Users can view their own refund requests"
ON public.refund_requests FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can create refund requests for their own orders
CREATE POLICY "Users can create refund requests"
ON public.refund_requests FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = refund_requests.order_id
    AND orders.user_id = auth.uid()
    AND orders.status = 'completed'
  )
);

-- Admins can view all refund requests
CREATE POLICY "Admins can view all refund requests"
ON public.refund_requests FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update refund requests
CREATE POLICY "Admins can update refund requests"
ON public.refund_requests FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete refund requests
CREATE POLICY "Admins can delete refund requests"
ON public.refund_requests FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add updated_at trigger
CREATE TRIGGER update_refund_requests_updated_at
  BEFORE UPDATE ON public.refund_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
