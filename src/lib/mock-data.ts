import { CATEGORIES, DEFAULT_AUTHOR } from "@/lib/constants";
import type { Article, Category, Comment, NewsletterSubscriber, Tag } from "@/types/content";

function category(slug: string): Category {
  const found = CATEGORIES.find((item) => item.slug === slug);
  if (!found) throw new Error(`Categoria mock não encontrada: ${slug}`);
  return found;
}

export const MOCK_TAGS: Tag[] = [
  { id: "contexto", name: "Contexto", slug: "contexto" },
  { id: "bastidores", name: "Bastidores", slug: "bastidores" },
  { id: "analise", name: "Análise", slug: "analise" },
  { id: "brasilia", name: "Brasília", slug: "brasilia" },
  { id: "ia", name: "Inteligência artificial", slug: "inteligencia-artificial" },
  { id: "mercado", name: "Mercado", slug: "mercado" },
];

function tags(...slugs: string[]) {
  return MOCK_TAGS.filter((tag) => slugs.includes(tag.slug));
}

export const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Congresso abre semana com votação decisiva sobre o orçamento",
    slug: "congresso-abre-semana-com-votacao-decisiva-sobre-o-orcamento",
    excerpt:
      "Articulação entre governo e lideranças do Legislativo deve definir o calendário econômico dos próximos meses.",
    content: `## O que está em jogo

A semana política começa sob expectativa de votações que podem redefinir prioridades do orçamento federal. Lideranças partidárias negociam ajustes no texto e buscam acordo para evitar novos adiamentos.

Integrantes do governo defendem que a proposta dá previsibilidade para investimentos essenciais. Parlamentares, por outro lado, cobram maior detalhamento sobre a execução das despesas.

> O ponto central é entender como a decisão muda o espaço fiscal e a agenda de estados e municípios.

A votação deve movimentar comissões e plenários nos próximos dias. O resultado também será observado pelo mercado, por governadores e por prefeitos que aguardam a liberação de recursos.`,
    coverImage:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1400&q=80",
    category: category("politica"),
    tags: tags("contexto", "bastidores", "brasilia"),
    author: DEFAULT_AUTHOR,
    status: "published",
    publishedAt: "2026-05-03T09:00:00-03:00",
    createdAt: "2026-05-03T08:10:00-03:00",
    updatedAt: "2026-05-03T09:00:00-03:00",
    readingTimeMinutes: 3,
    isFeatured: true,
    seoTitle: "Congresso abre semana com votação decisiva sobre o orçamento",
    seoDescription:
      "Entenda os bastidores da votação do orçamento e os efeitos possíveis para a agenda econômica.",
    views: 320,
  },
  {
    id: "2",
    title: "Empresas brasileiras aceleram adoção de inteligência artificial",
    slug: "empresas-brasileiras-aceleram-adocao-de-inteligencia-artificial",
    excerpt:
      "Relatórios de mercado apontam aumento de investimentos em automação, atendimento digital e análise de dados.",
    content: `Empresas de diferentes setores ampliaram projetos com inteligência artificial para reduzir custos, personalizar atendimento e melhorar a leitura de dados internos.

A maior parte das iniciativas ainda está em fase de teste, mas consultorias apontam que a tecnologia já virou pauta recorrente em reuniões de diretoria.

Especialistas alertam que governança, segurança e capacitação das equipes devem acompanhar a velocidade de adoção.`,
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    category: category("tecnologia"),
    tags: tags("contexto", "inteligencia-artificial", "analise"),
    author: DEFAULT_AUTHOR,
    status: "published",
    publishedAt: "2026-05-02T14:30:00-03:00",
    createdAt: "2026-05-02T13:45:00-03:00",
    updatedAt: "2026-05-02T14:30:00-03:00",
    readingTimeMinutes: 4,
    isFeatured: true,
    views: 280,
  },
  {
    id: "3",
    title: "Mercado financeiro revisa projeções para inflação e juros",
    slug: "mercado-financeiro-revisa-projecoes-para-inflacao-e-juros",
    excerpt:
      "Analistas acompanham sinais do consumo, crédito e contas públicas antes das próximas decisões de política monetária.",
    content: `Instituições financeiras ajustaram estimativas para inflação e juros diante de novos indicadores de atividade econômica.

O consumo das famílias segue no centro das análises, assim como a evolução do crédito e o comportamento dos preços de alimentos e serviços.

A autoridade monetária deve avaliar esse conjunto de dados antes da próxima decisão sobre a taxa básica de juros.`,
    coverImage:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
    category: category("economia"),
    tags: tags("mercado", "analise", "contexto"),
    author: DEFAULT_AUTHOR,
    status: "published",
    publishedAt: "2026-05-01T11:20:00-03:00",
    createdAt: "2026-05-01T10:30:00-03:00",
    updatedAt: "2026-05-01T11:20:00-03:00",
    readingTimeMinutes: 3,
    isFeatured: false,
    views: 244,
  },
  {
    id: "4",
    title: "Mostra nacional leva filmes independentes a capitais brasileiras",
    slug: "mostra-nacional-leva-filmes-independentes-a-capitais-brasileiras",
    excerpt:
      "Circuito cultural valoriza produções regionais e amplia debates sobre financiamento audiovisual no país.",
    content: `Uma mostra itinerante de cinema independente vai circular por capitais brasileiras com sessões comentadas, debates e oficinas.

A programação destaca produções regionais e obras que tiveram trajetória relevante em festivais nacionais.

Organizadores defendem que a circulação de filmes fora do eixo comercial amplia o acesso do público a novas narrativas.`,
    coverImage:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1400&q=80",
    category: category("cultura"),
    tags: tags("contexto", "analise"),
    author: DEFAULT_AUTHOR,
    status: "published",
    publishedAt: "2026-04-30T18:45:00-03:00",
    createdAt: "2026-04-30T18:00:00-03:00",
    updatedAt: "2026-04-30T18:45:00-03:00",
    readingTimeMinutes: 3,
    isFeatured: false,
    views: 198,
  },
  {
    id: "5",
    title: "Estados ampliam programas de recomposição da aprendizagem",
    slug: "estados-ampliam-programas-de-recomposicao-da-aprendizagem",
    excerpt:
      "Secretarias de educação apostam em reforço escolar, avaliações diagnósticas e formação de professores.",
    content: `Redes estaduais de ensino passaram a reforçar programas de recomposição da aprendizagem para reduzir defasagens acumuladas nos últimos anos.

As ações incluem avaliações diagnósticas, aulas de reforço, material complementar e formação continuada para professores.

Gestores afirmam que o desafio é manter acompanhamento individual sem sobrecarregar escolas e equipes pedagógicas.`,
    coverImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80",
    category: category("brasil"),
    tags: tags("contexto", "analise"),
    author: DEFAULT_AUTHOR,
    status: "published",
    publishedAt: "2026-04-29T10:10:00-03:00",
    createdAt: "2026-04-29T09:30:00-03:00",
    updatedAt: "2026-04-29T10:10:00-03:00",
    readingTimeMinutes: 3,
    isFeatured: false,
    views: 176,
  },
  {
    id: "6",
    title: "Líderes globais discutem nova rodada de acordos climáticos",
    slug: "lideres-globais-discutem-nova-rodada-de-acordos-climaticos",
    excerpt:
      "Negociações internacionais buscam alinhar financiamento, metas de redução de emissões e segurança energética.",
    content: `Representantes de diferentes países iniciaram uma nova rodada de conversas sobre financiamento climático e transição energética.

O debate envolve metas de redução de emissões, proteção de florestas, infraestrutura resiliente e apoio a economias vulneráveis.

Apesar do tom diplomático, negociadores reconhecem divergências sobre prazos, responsabilidades e fontes de financiamento.`,
    coverImage:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1400&q=80",
    category: category("mundo"),
    tags: tags("contexto", "analise"),
    author: DEFAULT_AUTHOR,
    status: "published",
    publishedAt: "2026-04-28T16:00:00-03:00",
    createdAt: "2026-04-28T15:20:00-03:00",
    updatedAt: "2026-04-28T16:00:00-03:00",
    readingTimeMinutes: 4,
    isFeatured: false,
    views: 142,
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "comment-1",
    articleId: "1",
    name: "Leitora",
    body: "Ótima explicação sobre o contexto da votação.",
    status: "approved",
    createdAt: "2026-05-03T10:20:00-03:00",
  },
];

export const MOCK_NEWSLETTER: NewsletterSubscriber[] = [
  {
    id: "subscriber-1",
    email: "leitor@example.com",
    status: "active",
    createdAt: "2026-05-03T12:00:00-03:00",
  },
];
