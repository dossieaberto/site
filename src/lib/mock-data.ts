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
    title: "Como decisões em Brasília redesenham a disputa pelo orçamento",
    slug: "como-decisoes-em-brasilia-redesenham-a-disputa-pelo-orcamento",
    excerpt:
      "A negociação em torno de prioridades fiscais expõe a força do Congresso e os limites de articulação do governo.",
    content: `## O que está em jogo

As negociações sobre o orçamento costumam revelar mais do que a disputa por números. Elas mostram quem consegue impor prioridades, quais áreas ganham proteção política e onde o governo aceita recuar para preservar governabilidade.

Nos bastidores, lideranças partidárias pressionam por previsibilidade na execução de recursos, enquanto integrantes do Executivo tentam manter margem para organizar a agenda econômica.

> O orçamento é também uma leitura de poder: indica quem negocia, quem cede e quem paga o custo político das escolhas.

A decisão final tende a influenciar a relação com estados, municípios, setores econômicos e bancadas temáticas. É nesse entorno, mais do que no placar isolado, que a semana política deve ser observada.`,
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
    seoTitle: "Como decisões em Brasília redesenham a disputa pelo orçamento",
    seoDescription:
      "Entenda os bastidores da disputa orçamentária e seus efeitos políticos e econômicos.",
    views: 320,
  },
  {
    id: "2",
    title: "A inteligência artificial entra no centro do debate regulatório",
    slug: "a-inteligencia-artificial-entra-no-centro-do-debate-regulatorio",
    excerpt:
      "A expansão de ferramentas automatizadas pressiona empresas, governos e sociedade a discutir limites, riscos e responsabilidade.",
    content: `A inteligência artificial deixou de ser tema restrito a laboratórios e passou a ocupar reuniões de empresas, gabinetes públicos e órgãos reguladores.

O debate envolve produtividade, proteção de dados, transparência de decisões automatizadas e efeitos sobre o trabalho. A tecnologia avança rápido, mas a governança ainda tenta encontrar linguagem comum.

Para empresas, a questão não é apenas adotar ferramentas. É explicar como elas são usadas, quem responde por erros e quais dados sustentam os sistemas.`,
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
    title: "O que novos indicadores dizem sobre consumo e renda",
    slug: "o-que-novos-indicadores-dizem-sobre-consumo-e-renda",
    excerpt:
      "A leitura dos dados econômicos exige separar melhora pontual, pressão de preços e sinais persistentes no orçamento das famílias.",
    content: `Indicadores de consumo e renda costumam ser lidos como fotografias rápidas da economia, mas ganham sentido quando vistos em sequência.

O comportamento do crédito, a composição das despesas e a dinâmica dos serviços ajudam a explicar se a recuperação chega ao cotidiano ou fica concentrada em setores específicos.

Para o leitor, a pergunta central é simples: quanto do cenário aparece no salário, no supermercado, no financiamento e nas decisões de consumo.`,
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
    title: "A cultura digital muda a forma como o público acompanha política",
    slug: "a-cultura-digital-muda-a-forma-como-o-publico-acompanha-politica",
    excerpt:
      "Memes, vídeos curtos e transmissões ao vivo transformam disputas públicas em linguagem cotidiana, veloz e fragmentada.",
    content: `A política deixou de depender apenas do discurso oficial, da entrevista e da nota pública. Parte importante da disputa por atenção acontece em formatos culturais nativos da internet.

Vídeos curtos, cortes de debates, memes e transmissões ao vivo aproximam temas institucionais de públicos que nem sempre acompanham a cobertura tradicional.

Essa transformação amplia o acesso, mas também comprime contexto. O desafio editorial é acompanhar a linguagem sem abandonar apuração e memória.`,
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
    title: "Estados ampliam pressão por respostas em segurança pública",
    slug: "estados-ampliam-pressao-por-respostas-em-seguranca-publica",
    excerpt:
      "Governadores buscam mais coordenação, recursos e instrumentos de gestão para lidar com um tema que atravessa fronteiras locais.",
    content: `A segurança pública voltou ao centro da agenda dos estados com cobranças por integração de dados, financiamento estável e coordenação entre esferas de governo.

O tema combina polícia, inteligência, sistema prisional, prevenção social e disputa política. Por isso, respostas simples raramente sustentam resultados duradouros.

Nos bastidores, a pressão é por medidas visíveis no curto prazo sem abandonar reformas de gestão que costumam avançar lentamente.`,
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
    title: "Eleições no exterior reacendem disputa por influência global",
    slug: "eleicoes-no-exterior-reacendem-disputa-por-influencia-global",
    excerpt:
      "Mudanças políticas fora do Brasil reposicionam alianças, comércio, tecnologia e agendas diplomáticas acompanhadas por governos e empresas.",
    content: `Eleições em outros países raramente ficam restritas às suas fronteiras. Mudanças de governo podem alterar negociações comerciais, estratégias de defesa, regulação tecnológica e alianças diplomáticas.

Para países emergentes, a atenção recai sobre financiamento, cadeias produtivas, energia e acordos multilaterais. Cada resultado abre ou fecha espaço para novos alinhamentos.

O acompanhamento internacional exige separar gesto eleitoral, promessa de campanha e capacidade real de mudança institucional.`,
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
