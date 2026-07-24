-- Add a review_count column to templates so cards/listings can show
-- (placeholder reviews + real approved reviews) without N+1 queries.
alter table public.templates
  add column if not exists review_count integer not null default 0;

-- Back-fill from existing approved reviews
update public.templates t
set review_count = sub.cnt
from (
  select template_id, count(*)::integer as cnt
  from public.reviews
  where status = 'approved'
  group by template_id
) sub
where t.id = sub.template_id;

-- Trigger function: recalc the approved review count whenever a review
-- is inserted, updated (e.g. status pending -> approved), or deleted.
create or replace function public.update_template_review_count()
returns trigger
language plpgsql
as $$
declare
  target_template uuid;
begin
  target_template := coalesce(new.template_id, old.template_id);
  if target_template is null then
    return null;
  end if;

  update public.templates
  set review_count = (
    select count(*)::integer from public.reviews
    where template_id = target_template
      and status = 'approved'
  )
  where id = target_template;

  return null;
end;
$$;

drop trigger if exists trg_review_count on public.reviews;
create trigger trg_review_count
after insert or update or delete on public.reviews
for each row execute function public.update_template_review_count();

-- Grant service role usage (edge functions use service role key)
grant execute on function public.update_template_review_count() to service_role;