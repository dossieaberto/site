# AGENTS.md

Instruções permanentes para agentes de código trabalhando neste repositório.

## Contexto

Este repositório contém o site jornalístico/blog de notícias **Dossiê Aberto**.

- Nome oficial: **Dossiê Aberto**
- Slogan: **O contexto por trás dos fatos.**
- Idioma público e administrativo: português do Brasil
- Cobertura: política, tecnologia, economia, cultura, Brasil e mundo

O produto tem duas áreas principais:

- Site público para leitores, com foco em SEO, performance, acessibilidade e URLs amigáveis.
- Painel administrativo protegido para criar, editar, publicar, despublicar e gerenciar conteúdo.

## Stack Principal

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Supabase Database
- Supabase Auth para login administrativo
- Supabase Storage para imagens das notícias
- Markdown com preview para edição de matérias

## Regras Obrigatórias

1. O layout deve ser mobile-first, adaptando depois para tablets e desktop.
2. O site público deve priorizar SEO, performance, acessibilidade, HTML semântico e boa experiência mobile.
3. O painel admin deve ser protegido por autenticação e verificação de `role = 'admin'`.
4. Nenhuma chave secreta deve ser exposta no frontend. Use `NEXT_PUBLIC_*` apenas para valores públicos.
5. Toda alteração relevante deve preservar sitemap, RSS, Open Graph, metadata dinâmica e URLs amigáveis.
6. Não quebrar funcionalidades existentes de notícias, comentários, newsletter, busca, modo escuro e admin.
7. Sempre atualizar o `README.md` quando houver mudança de configuração, variáveis, setup, deploy ou operação.
8. Antes de concluir uma tarefa, rodar `npm run lint`, `npm run typecheck` e `npm run build` quando possível.
9. Não inventar credenciais nem inserir chaves reais no código.
10. Manter o projeto simples o suficiente para uma pessoa iniciante continuar pelo Codex, GitHub, Supabase e Vercel pelo navegador.

## Estrutura De Pastas Esperada

```text
.
|-- src/
|   |-- app/
|   |   |-- (site)/
|   |   |   |-- page.tsx
|   |   |   |-- noticias/[slug]/page.tsx
|   |   |   |-- tag/[slug]/page.tsx
|   |   |   |-- buscar/page.tsx
|   |   |   |-- autor/[slug]/page.tsx
|   |   |   `-- [category]/page.tsx
|   |   |-- admin/
|   |   |   |-- login/page.tsx
|   |   |   `-- (protected)/
|   |   |-- actions/
|   |   |-- api/
|   |   |-- rss.xml/route.ts
|   |   |-- sitemap.ts
|   |   |-- robots.ts
|   |   |-- icon.svg
|   |   |-- layout.tsx
|   |   `-- not-found.tsx
|   |-- components/
|   |   |-- admin/
|   |   `-- public/
|   |-- lib/
|   |   |-- data/
|   |   |-- supabase/
|   |   |-- constants.ts
|   |   |-- mock-data.ts
|   |   `-- utils.ts
|   `-- types/
|-- supabase/
|   |-- migrations/
|   `-- create-first-admin.sql
|-- .env.example
|-- AGENTS.md
|-- README.md
`-- package.json
```

## Comandos Para Rodar

```bash
npm install
npm run dev
```

Servidor local padrão:

```text
http://localhost:3000
```

No Codex web/app, peça ao agente para instalar dependências, rodar o servidor e abrir a prévia. O usuário não precisa usar terminal local.

## Comandos Para Testar E Verificar

```bash
npm run lint
npm run typecheck
npm run build
```

Use todos antes de finalizar alterações de código quando o ambiente permitir. Para mudanças só de texto, informe no resumo se as verificações não foram executadas.

## Convenções De Nomes

- Componentes React: `PascalCase`, exemplo `ArticleCard`.
- Arquivos de componentes: `kebab-case.tsx`, exemplo `article-card.tsx`.
- Funções de consulta: prefixo `get`, exemplo `getPublishedArticles`.
- Server Actions: sufixo `Action`, exemplo `savePostAction`.
- Slugs e rotas públicas: `kebab-case`, sem acentos.
- Variáveis de ambiente públicas: prefixo `NEXT_PUBLIC_`.
- Variáveis secretas: sem `NEXT_PUBLIC_`, usadas apenas no servidor.
- Tabelas do Supabase: `snake_case`, exemplo `newsletter_subscribers`.
- SQL de migrations: arquivos numerados em `supabase/migrations/`.

## Áreas Que Exigem Cuidado

- `src/app/(site)/noticias/[slug]/page.tsx`: SEO dinâmico, Open Graph, Schema.org e comentários.
- `src/app/sitemap.ts`: deve incluir home, categorias, notícias, tags e autores.
- `src/app/rss.xml/route.ts`: deve listar notícias publicadas.
- `src/app/admin/(protected)/`: rotas administrativas protegidas por admin.
- `src/app/actions/`: Server Actions que validam dados e revalidam páginas.
- `src/lib/supabase/`: clientes Supabase; não expor service role no frontend.
- `supabase/migrations/`: schema, RLS e seeds iniciais.

## Critérios De Done

Uma tarefa só deve ser considerada concluída quando:

- A funcionalidade pedida foi implementada sem remover comportamento existente.
- Site público e admin continuam acessíveis conforme suas regras de autenticação.
- Notícias, comentários, newsletter, busca, categorias, tags, RSS, sitemap, Open Graph e modo escuro continuam funcionando.
- Variáveis novas foram adicionadas ao `.env.example`.
- Migrations foram atualizadas quando houver mudança de banco.
- O `README.md` foi atualizado quando houver mudança de configuração ou operação.
- `npm run lint`, `npm run typecheck` e `npm run build` passaram quando o ambiente permitiu.
- Qualquer configuração manual pendente foi documentada com clareza.
