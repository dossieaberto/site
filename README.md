# Dossiê Aberto

Site jornalístico/blog de notícias em português do Brasil.

- **Nome:** Dossiê Aberto
- **Slogan:** O contexto por trás dos fatos.
- **Cobertura:** política, tecnologia, economia, cultura, Brasil e mundo

O projeto foi organizado para continuar pelo Codex web/app, GitHub, Supabase e Vercel, sem exigir terminal local do usuário.

## O Que Está Incluído

- Site público de notícias com layout mobile-first.
- Home com manchete, últimas notícias, editorias, mais lidas, busca visual, newsletter, push prompt e espaços de anúncio.
- Página de notícia por slug em `/noticias/[slug]`.
- Categorias em `/politica`, `/tecnologia`, `/economia`, `/cultura`, `/brasil` e `/mundo`.
- Tags em `/tag/[slug]`.
- Busca em `/buscar?q=termo`.
- Autor em `/autor/[slug]`.
- Comentários com envio público e moderação.
- Newsletter com prevenção de duplicidade via Supabase.
- Painel admin em `/admin`.
- Login admin via Supabase Auth em `/admin/login`.
- CRUD de notícias com Markdown, preview, upload de imagem e campos SEO.
- Moderação de comentários em `/admin/comments`.
- Newsletter admin com exportação CSV.
- Configurações básicas do site.
- Modo claro/escuro com preferência no navegador.
- RSS em `/rss.xml`.
- Sitemap automático em `/sitemap.xml`.
- Robots em `/robots.txt`.
- Open Graph, Twitter Card, canonical e Schema.org NewsArticle.
- Migrations SQL do Supabase com RLS.
- Placeholder de favicon e logo textual.
- Espaços reservados para anúncios sem integração real com AdSense.

Sem Supabase configurado, o site público compila com dados mockados. As funções de login, gravação, admin, comentários e newsletter passam a funcionar quando as variáveis do Supabase forem configuradas.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Database, Auth e Storage
- Markdown com `react-markdown`
- Validação com `zod`
- Ícones com `lucide-react`

## Como Continuar Pelo Codex Web/App

Você pode pedir ao Codex:

1. “Instale as dependências e rode o build.”
2. “Abra um PR com as alterações.”
3. “Implemente a próxima melhoria no painel admin.”
4. “Corrija os erros do build.”
5. “Atualize a documentação.”

O Codex pode rodar os comandos no ambiente remoto, criar commits e abrir pull requests no GitHub. Você não precisa executar terminal local.

## Como Rodar No Ambiente Do Codex

Peça ao Codex para executar:

```bash
npm install
npm run dev
```

URL padrão:

```text
http://localhost:3000
```

Verificações:

```bash
npm run lint
npm run typecheck
npm run build
```

## Variáveis De Ambiente

Crie as variáveis abaixo na Vercel e, se for rodar localmente, em `.env.local`.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://dossieaberto.com.br
NEXT_PUBLIC_SITE_NAME="Dossiê Aberto"
NEXT_PUBLIC_SITE_TAGLINE="O contexto por trás dos fatos."
NEXT_PUBLIC_SITE_DESCRIPTION="Dossiê Aberto reúne notícias, análises e bastidores para explicar o contexto por trás dos fatos em política, tecnologia, economia, cultura, Brasil e mundo."
WEB_PUSH_PUBLIC_KEY=
WEB_PUSH_PRIVATE_KEY=
WEB_PUSH_EMAIL=
```

Não coloque `SUPABASE_SERVICE_ROLE_KEY` no frontend. Ela é usada apenas em código de servidor.

## Configurar Supabase Pelo Navegador

1. Acesse [supabase.com](https://supabase.com) e crie um projeto.
2. No painel do projeto, abra **SQL Editor**.
3. Copie e execute o conteúdo de `supabase/migrations/0001_initial_schema.sql`.
4. Abra **Authentication > Users** e crie seu usuário administrador.
5. Volte ao **SQL Editor**.
6. Copie `supabase/create-first-admin.sql`.
7. Troque `seu-email@exemplo.com` pelo e-mail criado.
8. Execute o SQL para mudar o perfil para `role = 'admin'`.
9. Em **Project Settings > API**, copie:
   - Project URL para `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key para `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key para `SUPABASE_SERVICE_ROLE_KEY`

## Publicar Pela Vercel Pelo Navegador

1. Acesse [vercel.com](https://vercel.com).
2. Clique em **Add New Project**.
3. Importe o repositório `dossieaberto/site`.
4. Framework: Next.js.
5. Configure as variáveis de ambiente listadas acima.
6. Defina `NEXT_PUBLIC_SITE_URL` com o domínio final, por exemplo `https://dossieaberto.com.br`.
7. Clique em **Deploy**.
8. Depois do deploy, configure o domínio em **Settings > Domains**.

## Estrutura Principal

```text
src/
|-- app/
|   |-- (site)/
|   |-- admin/
|   |-- actions/
|   |-- api/
|   |-- rss.xml/
|   |-- sitemap.ts
|   `-- robots.ts
|-- components/
|   |-- admin/
|   `-- public/
|-- lib/
|   |-- data/
|   |-- supabase/
|   |-- constants.ts
|   |-- mock-data.ts
|   `-- utils.ts
`-- types/
supabase/
|-- migrations/
`-- create-first-admin.sql
```

## Onde Personalizar A Marca

- Nome, slogan, descrição e paleta: `src/lib/constants.ts`
- Cores globais: `src/app/globals.css`
- Logo textual: `src/components/public/brand-logo.tsx`
- Favicon placeholder: `src/app/icon.svg`
- Textos da home: `src/app/(site)/page.tsx`
- Configurações editáveis pelo admin: `/admin/settings`

## Segurança

- RLS habilitado em todas as tabelas públicas.
- Visitantes leem apenas notícias publicadas e comentários aprovados.
- Visitantes podem inserir comentários como `pending`.
- Visitantes podem cadastrar newsletter.
- Apenas admin gerencia notícias, comentários, newsletter e configurações.
- Login admin exige Supabase Auth e `profiles.role = 'admin'`.
- Chave service role não deve ser exposta no frontend.

## Notificações Push

A base pública de permissão e endpoint de inscrição já existe. O envio real ainda depende de:

- Configurar `WEB_PUSH_PUBLIC_KEY`
- Configurar `WEB_PUSH_PRIVATE_KEY`
- Configurar `WEB_PUSH_EMAIL`
- Adicionar uma rotina de envio no momento da publicação

## Próximos Passos

- Testar o fluxo real no Supabase após configurar as variáveis.
- Criar uma matéria real pelo painel admin.
- Refinar upload de imagens com tratamento visual de erro.
- Adicionar paginação em listas longas.
- Implementar envio real de push notification.
- Conectar domínio oficial na Vercel.
