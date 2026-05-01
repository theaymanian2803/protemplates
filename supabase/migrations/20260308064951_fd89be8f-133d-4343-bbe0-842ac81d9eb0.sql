-- Fix: Restrict orders INSERT to only allow 'pending' status
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;

CREATE POLICY "Users can create their own orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND status = 'pending'::order_status);

-- Fix: Restrict order_items INSERT - only service role should insert (via edge function)
DROP POLICY IF EXISTS "Users can create order items for their orders" ON public.order_items;

-- Fix: Remove broad coupon SELECT policy, create a server-side validation function instead
DROP POLICY IF EXISTS "Authenticated users can view active coupons" ON public.coupons;
DROP POLICY IF EXISTS "Users can look up coupons by code" ON public.coupons;

-- Create a security definer function for coupon validation
CREATE OR REPLACE FUNCTION public.validate_coupon(coupon_code text, order_total numeric)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_coupon record;
  v_discount numeric;
BEGIN
  SELECT * INTO v_coupon FROM public.coupons
  WHERE code = coupon_code AND is_active = true;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Coupon not found or inactive');
  END IF;

  IF v_coupon.expires_at IS NOT NULL AND v_coupon.expires_at < now() THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Coupon has expired');
  END IF;

  IF v_coupon.max_uses IS NOT NULL AND v_coupon.used_count >= v_coupon.max_uses THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Coupon usage limit reached');
  END IF;

  IF v_coupon.min_order_amount IS NOT NULL AND order_total < v_coupon.min_order_amount THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Order does not meet minimum amount');
  END IF;

  IF v_coupon.discount_type = 'percentage' THEN
    v_discount := (order_total * v_coupon.discount_value) / 100;
  ELSE
    v_discount := v_coupon.discount_value;
  END IF;

  RETURN jsonb_build_object(
    'valid', true,
    'discount', v_discount,
    'code', v_coupon.code,
    'discount_type', v_coupon.discount_type,
    'discount_value', v_coupon.discount_value
  );
END;
$$;