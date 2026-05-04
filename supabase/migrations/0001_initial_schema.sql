create extension if not exists "pgcrypto";

create type public.profile_role as enum ('admin', 'editor');
create type public.article_status as enum ('draft', 'published', 'archived');
create type public.comment_status as enum ('pending', 'approved', 'rejected');
create type public.newsletter_status as enum ('active', 'unsubscribed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text not null,
  role public.profile_role not null default 'editor',
  created_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image_url text,
  category_id uuid references public.categories(id) on delete set null,
  author_id uuid references public.profiles(id) on delete set null,
  status public.article_status not null default 'draft',
  is_featured boolean not null default false,
  reading_time_minutes integer not null default 1,
  seo_title text,
  seo_description text,
  og_image_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.article_tags (
  article_id uuid not null references public.articles(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (article_id, tag_id)
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  name text not null,
  email text not null,
  body text not null,
  status public.comment_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status public.newsletter_status not null default 'active',
  created_at timestamptz not null default now()
);

create table public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null unique,
  keys jsonb not null,
  created_at timestamptz not null default now()
);

create table public.article_views (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null,
  updated_at timestamptz not null default now()
);

create index articles_status_published_at_idx on public.articles(status, published_at desc);
create index articles_slug_idx on public.articles(slug);
create index comments_article_status_idx on public.comments(article_id, status);
create index article_views_article_idx on public.article_views(article_id);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'editor'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.articles enable row level security;
alter table public.tags enable row level security;
alter table public.article_tags enable row level security;
alter table public.comments enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.push_subscriptions enable row level security;
alter table public.article_views enable row level security;
alter table public.site_settings enable row level security;

create policy "profiles admin read" on public.profiles for select to authenticated using (public.is_admin());
create policy "profiles self read" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles admin write" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "categories public read" on public.categories for select to anon, authenticated using (true);
create policy "categories admin write" on public.categories for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "articles public published read" on public.articles
for select to anon, authenticated using (status = 'published');
create policy "articles admin read all" on public.articles for select to authenticated using (public.is_admin());
create policy "articles admin insert" on public.articles for insert to authenticated with check (public.is_admin());
create policy "articles admin update" on public.articles for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "articles admin delete" on public.articles for delete to authenticated using (public.is_admin());

create policy "tags public read" on public.tags for select to anon, authenticated using (true);
create policy "tags admin write" on public.tags for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "article_tags public read" on public.article_tags for select to anon, authenticated using (true);
create policy "article_tags admin write" on public.article_tags for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "comments approved public read" on public.comments
for select to anon, authenticated using (status = 'approved');
create policy "comments public insert pending" on public.comments
for insert to anon, authenticated with check (status = 'pending');
create policy "comments admin manage" on public.comments for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "newsletter public insert" on public.newsletter_subscribers
for insert to anon, authenticated with check (status = 'active');
create policy "newsletter public update self status" on public.newsletter_subscribers
for update to anon, authenticated using (true) with check (status in ('active', 'unsubscribed'));
create policy "newsletter admin manage" on public.newsletter_subscribers for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "push public insert" on public.push_subscriptions
for insert to anon, authenticated with check (true);
create policy "push public update" on public.push_subscriptions
for update to anon, authenticated using (true) with check (true);
create policy "push admin manage" on public.push_subscriptions for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "views public insert" on public.article_views for insert to anon, authenticated with check (true);
create policy "views admin read" on public.article_views for select to authenticated using (public.is_admin());

create policy "settings public read" on public.site_settings for select to anon, authenticated using (true);
create policy "settings admin write" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into public.categories (name, slug, description) values
  ('Política', 'politica', 'Decisões públicas, bastidores de poder e debates institucionais.'),
  ('Tecnologia', 'tecnologia', 'Inovação, internet, inteligência artificial e mercado digital.'),
  ('Economia', 'economia', 'Mercado, trabalho, finanças públicas e vida econômica.'),
  ('Cultura', 'cultura', 'Livros, música, cinema, artes e comportamento.'),
  ('Brasil', 'brasil', 'Notícias nacionais, cidades, educação, saúde e sociedade.'),
  ('Mundo', 'mundo', 'Cenário internacional, diplomacia, conflitos e tendências globais.')
on conflict (slug) do nothing;

insert into public.site_settings (key, value) values
  ('site_name', 'Dossiê Aberto'),
  ('site_description', 'O contexto por trás dos fatos.'),
  ('main_author_name', 'Redação Dossiê Aberto'),
  ('contact_email', ''),
  ('footer_text', 'Jornalismo claro, sério e contextual.'),
  ('instagram_url', ''),
  ('x_url', '')
on conflict (key) do update set value = excluded.value;

insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

create policy "article images public read" on storage.objects
for select to anon, authenticated using (bucket_id = 'article-images');

create policy "article images admin write" on storage.objects
for all to authenticated
using (bucket_id = 'article-images' and public.is_admin())
with check (bucket_id = 'article-images' and public.is_admin());
