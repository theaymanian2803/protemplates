-- Fix: Don't force total_amount to 0 for service_role inserts (edge functions)
CREATE OR REPLACE FUNCTION public.enforce_pending_order_total()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Allow service_role (edge functions) to set the real total
  IF current_setting('request.jwt.claim.role', true) = 'service_role' THEN
    RETURN NEW;
  END IF;
  -- Force total_amount to 0 on client-side inserts for safety
  NEW.total_amount := 0;
  RETURN NEW;
END;
$$;

-- Add paypal_order_id column for idempotency tracking
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS paypal_order_id TEXT UNIQUE;
