
-- Fix: Only zero out total_amount for non-service-role inserts
-- Service role sets current_setting('role') = 'service_role'
CREATE OR REPLACE FUNCTION public.enforce_pending_order_total()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only enforce for non-service-role callers (i.e. direct client inserts)
  IF current_setting('role', true) IS DISTINCT FROM 'service_role' THEN
    NEW.total_amount := 0;
  END IF;
  RETURN NEW;
END;
$$;
