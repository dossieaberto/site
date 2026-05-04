create schema if not exists private;

revoke all on schema private from public;
grant usage on schema private to authenticated;

create or replace function private.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

drop policy if exists "profiles authenticated read" on public.profiles;
drop policy if exists "profiles admin insert" on public.profiles;
drop policy if exists "profiles admin update" on public.profiles;
drop policy if exists "profiles admin delete" on public.profiles;

create policy "profiles authenticated read" on public.profiles
for select to authenticated
using (
  (select auth.uid()) = id
  or private.is_admin()
);

create policy "profiles admin insert" on public.profiles
for insert to authenticated
with check (private.is_admin());

create policy "profiles admin update" on public.profiles
for update to authenticated
using (private.is_admin())
with check (private.is_admin());

create policy "profiles admin delete" on public.profiles
for delete to authenticated
using (private.is_admin());

drop policy if exists "categories admin write" on public.categories;
create policy "categories admin write" on public.categories
for all to authenticated
using (private.is_admin())
with check (private.is_admin());

drop policy if exists "articles admin read all" on public.articles;
drop policy if exists "articles admin insert" on public.articles;
drop policy if exists "articles admin update" on public.articles;
drop policy if exists "articles admin delete" on public.articles;

create policy "articles admin read all" on public.articles
for select to authenticated
using (private.is_admin());

create policy "articles admin insert" on public.articles
for insert to authenticated
with check (private.is_admin());

create policy "articles admin update" on public.articles
for update to authenticated
using (private.is_admin())
with check (private.is_admin());

create policy "articles admin delete" on public.articles
for delete to authenticated
using (private.is_admin());

drop policy if exists "tags admin write" on public.tags;
create policy "tags admin write" on public.tags
for all to authenticated
using (private.is_admin())
with check (private.is_admin());

drop policy if exists "article_tags admin write" on public.article_tags;
create policy "article_tags admin write" on public.article_tags
for all to authenticated
using (private.is_admin())
with check (private.is_admin());

drop policy if exists "comments admin manage" on public.comments;
create policy "comments admin manage" on public.comments
for all to authenticated
using (private.is_admin())
with check (private.is_admin());

drop policy if exists "newsletter admin manage" on public.newsletter_subscribers;
create policy "newsletter admin manage" on public.newsletter_subscribers
for all to authenticated
using (private.is_admin())
with check (private.is_admin());

drop policy if exists "push admin manage" on public.push_subscriptions;
create policy "push admin manage" on public.push_subscriptions
for all to authenticated
using (private.is_admin())
with check (private.is_admin());

drop policy if exists "views admin read" on public.article_views;
create policy "views admin read" on public.article_views
for select to authenticated
using (private.is_admin());

drop policy if exists "settings admin write" on public.site_settings;
create policy "settings admin write" on public.site_settings
for all to authenticated
using (private.is_admin())
with check (private.is_admin());

drop policy if exists "article images admin write" on storage.objects;
create policy "article images admin write" on storage.objects
for all to authenticated
using (bucket_id = 'article-images' and private.is_admin())
with check (bucket_id = 'article-images' and private.is_admin());

drop function if exists public.is_admin();
