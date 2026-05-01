
-- Allow users to download files from template-files bucket if they have a completed order containing that template
CREATE POLICY "Buyers can download purchased template files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'template-files'
  AND EXISTS (
    SELECT 1
    FROM public.order_items oi
    JOIN public.orders o ON o.id = oi.order_id
    JOIN public.templates t ON t.id = oi.template_id
    WHERE o.user_id = auth.uid()
      AND o.status = 'completed'
      AND t.source_file_url = name
  )
);
