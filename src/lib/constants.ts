import type { Category } from "@/types/content";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Dossiê Aberto";

export const SITE_TAGLINE =
  process.env.NEXT_PUBLIC_SITE_TAGLINE || "O contexto por trás dos fatos.";

export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  "Dossiê Aberto reúne notícias, análises e bastidores para explicar o contexto por trás dos fatos em política, tecnologia, economia, cultura, Brasil e mundo.";

export const BRAND_PALETTE = {
  ink: "#0d1d24",
  paper: "#f7f5ee",
  surface: "#fffefa",
  ochre: "#a87424",
  graphite: "#172126",
};

export const CATEGORIES: Category[] = [
  {
    id: "politica",
    name: "Política",
    slug: "politica",
    description: "Decisões públicas, bastidores de poder e debates institucionais.",
  },
  {
    id: "tecnologia",
    name: "Tecnologia",
    slug: "tecnologia",
    description: "Inovação, internet, inteligência artificial e mercado digital.",
  },
  {
    id: "economia",
    name: "Economia",
    slug: "economia",
    description: "Mercado, trabalho, finanças públicas e vida econômica.",
  },
  {
    id: "cultura",
    name: "Cultura",
    slug: "cultura",
    description: "Livros, música, cinema, artes e comportamento.",
  },
  {
    id: "brasil",
    name: "Brasil",
    slug: "brasil",
    description: "Notícias nacionais, cidades, educação, saúde e sociedade.",
  },
  {
    id: "mundo",
    name: "Mundo",
    slug: "mundo",
    description: "Cenário internacional, diplomacia, conflitos e tendências globais.",
  },
];

export const EDITORIAL_PILLARS = ["Bastidores", "Contexto", "Análise"];

export const DEFAULT_AUTHOR = {
  id: "redacao",
  fullName: "Redação Dossiê Aberto",
  slug: "redacao-dossie-aberto",
  email: null,
  bio: "Equipe editorial do Dossiê Aberto.",
};

export const PUBLIC_NAVIGATION = [
  ...CATEGORIES,
  {
    id: "tag-contexto",
    name: "Contexto",
    slug: "tag/contexto",
    description: "Reportagens explicativas.",
  },
  {
    id: "tag-analise",
    name: "Análise",
    slug: "tag/analise",
    description: "Leituras editoriais.",
  },
];
