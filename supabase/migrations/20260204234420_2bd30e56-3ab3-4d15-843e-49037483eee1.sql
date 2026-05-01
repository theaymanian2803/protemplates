-- Add source_file_url column to templates table
ALTER TABLE public.templates 
ADD COLUMN source_file_url text;

-- Create storage bucket for template files
INSERT INTO storage.buckets (id, name, public)
VALUES ('template-files', 'template-files', false)
ON CONFLICT (id) DO NOTHING;

-- Allow admins to upload files
CREATE POLICY "Admins can upload template files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'template-files' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to update files
CREATE POLICY "Admins can update template files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'template-files' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to delete files
CREATE POLICY "Admins can delete template files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'template-files' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow authenticated users who purchased to download (we'll refine this later)
-- For now, allow admins to read
CREATE POLICY "Admins can read template files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'template-files' 
  AND has_role(auth.uid(), 'admin'::app_role)
);