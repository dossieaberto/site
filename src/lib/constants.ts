import type { Category } from "@/types/content";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Dossiê Aberto";

export const SITE_TAGLINE =
  process.env.NEXT_PUBLIC_SITE_TAGLINE || "O contexto por trás dos fatos.";

export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  "Notícias, bastidores e análise para entender os fatos públicos além da superfície, com atenção a política, tecnologia, economia, cultura, Brasil e mundo.";

export const BRAND_PALETTE = {
  ink: "#171615",
  paper: "#f7f5ef",
  dossierRed: "#7a2635",
  deepTeal: "#1f4a46",
  warmGray: "#ece7dd",
};

export const CATEGORIES: Category[] = [
  {
    id: "politica",
    name: "Política",
    slug: "politica",
    description: "Poder, instituições, eleições, bastidores e decisões públicas que reorganizam a vida nacional.",
  },
  {
    id: "tecnologia",
    name: "Tecnologia",
    slug: "tecnologia",
    description: "Plataformas, inteligência artificial, regulação, inovação e seus efeitos sociais e econômicos.",
  },
  {
    id: "economia",
    name: "Economia",
    slug: "economia",
    description: "Mercado, trabalho, empresas, consumo e decisões que chegam ao bolso do leitor.",
  },
  {
    id: "cultura",
    name: "Cultura",
    slug: "cultura",
    description: "Ideias, comportamento, artes, entretenimento e as disputas simbólicas do cotidiano.",
  },
  {
    id: "brasil",
    name: "Brasil",
    slug: "brasil",
    description: "Acontecimentos nacionais, sociedade, estados e temas públicos fora do eixo mais óbvio.",
  },
  {
    id: "mundo",
    name: "Mundo",
    slug: "mundo",
    description: "Geopolítica, conflitos, eleições, economia global e disputas por influência internacional.",
  },
];

export const EDITORIAL_PILLARS = ["Bastidores", "Contexto", "Análise"];

export const EDITORIAL_PILLAR_COPY: Record<(typeof EDITORIAL_PILLARS)[number], string> = {
  Bastidores: "O que circula antes das decisões públicas chegarem ao plenário, ao mercado ou à rua.",
  Contexto: "As conexões que explicam por que uma notícia importa e quais interesses se movem ao redor dela.",
  Análise: "Leitura responsável dos fatos, com separação clara entre informação apurada e interpretação.",
};

export const DEFAULT_AUTHOR = {
  id: "redacao",
  fullName: "Redação Dossiê Aberto",
  slug: "redacao-dossie-aberto",
  email: null,
  bio: "Projeto editorial independente dedicado a fatos públicos, bastidores e contexto.",
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
