-- Allow users to delete their own order items (remove from downloads)
DROP POLICY IF EXISTS "Users can delete their own order items" ON public.order_items;

CREATE POLICY "Users can delete their own order items"
ON public.order_items
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);
