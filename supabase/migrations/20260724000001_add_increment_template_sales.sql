-- Add atomic sales increment function so edge functions can bump
-- templates.sales without read-then-update race conditions.
create or replace function public.increment_template_sales(
  template_uuid uuid,
  step integer default 1
)
returns void
language sql
as $$
  update public.templates
  set sales = coalesce(sales, 0) + step
  where id = template_uuid;
$$;