create index if not exists article_tags_tag_id_idx on public.article_tags(tag_id);
create index if not exists articles_author_id_idx on public.articles(author_id);
create index if not exists articles_category_id_idx on public.articles(category_id);

drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles
for select to authenticated
using ((select auth.uid()) = id);

drop policy if exists "categories public read" on public.categories;
create policy "categories public read" on public.categories
for select to anon
using (true);

drop policy if exists "articles public published read" on public.articles;
create policy "articles public published read" on public.articles
for select to anon
using (status = 'published');

drop policy if exists "tags public read" on public.tags;
create policy "tags public read" on public.tags
for select to anon
using (true);

drop policy if exists "article_tags public read" on public.article_tags;
create policy "article_tags public read" on public.article_tags
for select to anon
using (true);

drop policy if exists "comments approved public read" on public.comments;
create policy "comments approved public read" on public.comments
for select to anon
using (status = 'approved');

drop policy if exists "comments public insert pending" on public.comments;
create policy "comments public insert pending" on public.comments
for insert to anon
with check (status = 'pending');

drop policy if exists "newsletter public insert" on public.newsletter_subscribers;
create policy "newsletter public insert" on public.newsletter_subscribers
for insert to anon
with check (status = 'active');

drop policy if exists "push public insert valid endpoint" on public.push_subscriptions;
create policy "push public insert valid endpoint" on public.push_subscriptions
for insert to anon
with check (
  endpoint like 'https://%'
  and jsonb_typeof(keys) = 'object'
);

drop policy if exists "push public update valid endpoint" on public.push_subscriptions;
create policy "push public update valid endpoint" on public.push_subscriptions
for update to anon
using (endpoint like 'https://%')
with check (
  endpoint like 'https://%'
  and jsonb_typeof(keys) = 'object'
);

drop policy if exists "views public insert published article" on public.article_views;
create policy "views public insert published article" on public.article_views
for insert to anon
with check (
  exists (
    select 1
    from public.articles
    where articles.id = article_views.article_id
      and articles.status = 'published'
  )
);

drop policy if exists "settings public read" on public.site_settings;
create policy "settings public read" on public.site_settings
for select to anon
using (true);
