drop policy if exists "profiles admin read" on public.profiles;
drop policy if exists "profiles self read" on public.profiles;
drop policy if exists "profiles admin write" on public.profiles;

create policy "profiles authenticated read" on public.profiles
for select to authenticated
using (
  (select auth.uid()) = id
  or public.is_admin()
);

create policy "profiles admin insert" on public.profiles
for insert to authenticated
with check (public.is_admin());

create policy "profiles admin update" on public.profiles
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "profiles admin delete" on public.profiles
for delete to authenticated
using (public.is_admin());
