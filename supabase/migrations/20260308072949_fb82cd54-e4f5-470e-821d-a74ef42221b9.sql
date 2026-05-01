
-- ============================================================
-- Convert ALL RLS policies from RESTRICTIVE to PERMISSIVE
-- ============================================================

-- ── FAVORITES ──
DROP POLICY IF EXISTS "Users can view their own favorites" ON public.favorites;
CREATE POLICY "Users can view their own favorites" ON public.favorites
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can add their own favorites" ON public.favorites;
CREATE POLICY "Users can add their own favorites" ON public.favorites
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can remove their own favorites" ON public.favorites;
CREATE POLICY "Users can remove their own favorites" ON public.favorites
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ── CONTACTS ──
DROP POLICY IF EXISTS "Admins can view contacts" ON public.contacts;
CREATE POLICY "Admins can view contacts" ON public.contacts
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update contacts" ON public.contacts;
CREATE POLICY "Admins can update contacts" ON public.contacts
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete contacts" ON public.contacts;
CREATE POLICY "Admins can delete contacts" ON public.contacts
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contacts;
CREATE POLICY "Anyone can submit contact form" ON public.contacts
  FOR INSERT WITH CHECK (
    name IS NOT NULL AND name != ''
    AND email IS NOT NULL AND email != ''
    AND message IS NOT NULL AND message != ''
    AND subject IS NOT NULL AND subject != ''
  );

-- ── TEMPLATES ──
DROP POLICY IF EXISTS "Anyone can view templates" ON public.templates;
CREATE POLICY "Anyone can view templates" ON public.templates
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert templates" ON public.templates;
CREATE POLICY "Admins can insert templates" ON public.templates
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update templates" ON public.templates;
CREATE POLICY "Admins can update templates" ON public.templates
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete templates" ON public.templates;
CREATE POLICY "Admins can delete templates" ON public.templates
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ── ALL_ACCESS_PASSES ──
DROP POLICY IF EXISTS "Users can view their own all-access pass" ON public.all_access_passes;
CREATE POLICY "Users can view their own all-access pass" ON public.all_access_passes
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all passes" ON public.all_access_passes;
CREATE POLICY "Admins can view all passes" ON public.all_access_passes
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ── ORDER_ITEMS ──
DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;
CREATE POLICY "Users can view their own order items" ON public.order_items
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;
CREATE POLICY "Admins can view all order items" ON public.order_items
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ── REVIEWS ──
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only buyers can insert reviews" ON public.reviews;
CREATE POLICY "Only buyers can insert reviews" ON public.reviews
  FOR INSERT TO authenticated WITH CHECK (
    auth.uid() = user_id
    AND (
      EXISTS (
        SELECT 1 FROM public.order_items oi
        JOIN public.orders o ON o.id = oi.order_id
        WHERE oi.template_id = reviews.template_id
          AND o.user_id = auth.uid()
          AND o.status = 'completed'
      )
      OR EXISTS (
        SELECT 1 FROM public.all_access_passes
        WHERE user_id = auth.uid()
      )
    )
  );

DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;
CREATE POLICY "Users can update their own reviews" ON public.reviews
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own reviews" ON public.reviews;
CREATE POLICY "Users can delete their own reviews" ON public.reviews
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can delete any review" ON public.reviews;
CREATE POLICY "Admins can delete any review" ON public.reviews
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ── COUPONS ──
DROP POLICY IF EXISTS "Authenticated users can view active coupons" ON public.coupons;

DROP POLICY IF EXISTS "Admins can manage coupons" ON public.coupons;
CREATE POLICY "Admins can manage coupons" ON public.coupons
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ── ORDERS ──
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders" ON public.orders
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete orders" ON public.orders;
CREATE POLICY "Admins can delete orders" ON public.orders
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- ── USER_ROLES ──
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ── TEMPLATE_DOWNLOADS ──
DROP POLICY IF EXISTS "Purchasers can view download URLs" ON public.template_downloads;
CREATE POLICY "Purchasers can view download URLs" ON public.template_downloads
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.order_items oi
      JOIN public.orders o ON o.id = oi.order_id
      WHERE oi.template_id = template_downloads.template_id
        AND o.user_id = auth.uid()
        AND o.status = 'completed'
    )
    OR EXISTS (
      SELECT 1 FROM public.all_access_passes
      WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can manage download URLs" ON public.template_downloads;
CREATE POLICY "Admins can manage download URLs" ON public.template_downloads
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ── PROFILES ──
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;
CREATE POLICY "Authenticated users can view profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
