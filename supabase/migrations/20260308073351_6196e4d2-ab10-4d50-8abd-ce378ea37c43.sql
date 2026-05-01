
-- Fix 1: Guard has_role to prevent role enumeration
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE
    WHEN _user_id IS DISTINCT FROM auth.uid() THEN false
    ELSE EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = _user_id AND role = _role
    )
  END
$$;

-- Fix 2: Trigger to enforce server-computed total_amount on orders
CREATE OR REPLACE FUNCTION public.enforce_pending_order_total()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Force total_amount to 0 on client-side inserts; the edge function uses service role
  -- and bypasses RLS + triggers won't fire for service role unless explicitly set.
  -- This ensures any direct client INSERT gets a safe default.
  NEW.total_amount := 0;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_order_total ON public.orders;
CREATE TRIGGER enforce_order_total
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_pending_order_total();
