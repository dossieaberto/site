drop policy if exists "views public insert" on public.article_views;
create policy "views public insert published article" on public.article_views
for insert to anon, authenticated
with check (
  exists (
    select 1
    from public.articles
    where articles.id = article_views.article_id
      and articles.status = 'published'
  )
);

drop policy if exists "newsletter public update self status" on public.newsletter_subscribers;

drop policy if exists "push public insert" on public.push_subscriptions;
create policy "push public insert valid endpoint" on public.push_subscriptions
for insert to anon, authenticated
with check (
  endpoint like 'https://%'
  and jsonb_typeof(keys) = 'object'
);

drop policy if exists "push public update" on public.push_subscriptions;
create policy "push public update valid endpoint" on public.push_subscriptions
for update to anon, authenticated
using (endpoint like 'https://%')
with check (
  endpoint like 'https://%'
  and jsonb_typeof(keys) = 'object'
);

drop policy if exists "article images public read" on storage.objects;

revoke execute on function public.is_admin() from anon, authenticated;
revoke execute on function public.handle_new_user() from anon, authenticated;
revoke execute on function public.rls_auto_enable() from anon, authenticated;
