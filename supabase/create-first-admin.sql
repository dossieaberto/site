-- Rode este bloco no SQL Editor do Supabase depois de criar o usuário em Authentication.
-- Troque o e-mail abaixo pelo e-mail do primeiro administrador.

update public.profiles
set role = 'admin',
    full_name = coalesce(nullif(full_name, ''), 'Administrador Dossiê Aberto')
where email = 'seu-email@exemplo.com';

select id, email, full_name, role
from public.profiles
where email = 'seu-email@exemplo.com';
