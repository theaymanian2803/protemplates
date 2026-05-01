
CREATE TABLE public.contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  template_id uuid REFERENCES public.templates(id) ON DELETE SET NULL,
  template_title text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a contact form (no auth required)
CREATE POLICY "Anyone can submit contact form"
  ON public.contacts FOR INSERT
  WITH CHECK (true);

-- Only admins can view contacts
CREATE POLICY "Admins can view contacts"
  ON public.contacts FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update contacts (mark as read)
CREATE POLICY "Admins can update contacts"
  ON public.contacts FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete contacts
CREATE POLICY "Admins can delete contacts"
  ON public.contacts FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));
