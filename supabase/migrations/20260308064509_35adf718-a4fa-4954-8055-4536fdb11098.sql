-- Drop the storage policy that depends on templates.source_file_url
DROP POLICY IF EXISTS "Buyers can download purchased template files" ON storage.objects;

-- Now drop the column
ALTER TABLE public.templates DROP COLUMN IF EXISTS source_file_url;