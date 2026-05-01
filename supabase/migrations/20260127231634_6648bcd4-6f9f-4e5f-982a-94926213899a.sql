-- Alter favorites table to use text for template_id to match templates.id (UUID)
ALTER TABLE public.favorites 
ALTER COLUMN template_id TYPE text USING template_id::text;