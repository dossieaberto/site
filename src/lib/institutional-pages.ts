import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";

export type InstitutionalSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type InstitutionalPageContent = {
  slug: string;
  navLabel: string;
  title: string;
  description: string;
  kicker: string;
  lead: string;
  updatedAt: string;
  sections: InstitutionalSection[];
  callout?: {
    title: string;
    body: string;
  };
};

export const INSTITUTIONAL_PAGES: InstitutionalPageContent[] = [
  {
    slug: "sobre",
    navLabel: "Sobre",
    title: "Sobre o Dossiê Aberto",
    description:
      "Conheça a proposta editorial do Dossiê Aberto, um projeto jornalístico independente em português do Brasil.",
    kicker: "Quem somos",
    lead: "O Dossiê Aberto é um projeto editorial independente em desenvolvimento, criado para acompanhar fatos públicos com contexto, sobriedade e responsabilidade.",
    updatedAt: "2026-05-04",
    sections: [
      {
        heading: "Nossa proposta",
        body: [
          "A proposta é abrir o dossiê dos acontecimentos sem teatralizar a notícia: separar fatos, bastidores relevantes e explicações que ajudem o leitor a entender o que está em jogo.",
          "Cobrimos política, tecnologia, economia, cultura, Brasil e mundo com linguagem acessível, atenção a fontes e separação clara entre informação, análise e opinião.",
        ],
      },
      {
        heading: "O que buscamos entregar",
        body: [
          "Mais do que repetir manchetes, buscamos organizar informações, mostrar conexões e explicar consequências. Uma boa notícia deve responder ao que aconteceu, por que importa e quais caminhos podem vir depois.",
        ],
        bullets: [
          "Fatos apresentados com clareza.",
          "Contexto para decisões públicas, tecnologia e economia.",
          "Leitura responsável sobre cultura, sociedade, Brasil e mundo.",
          "Separação visível entre notícia, análise e opinião.",
        ],
      },
      {
        heading: "Compromisso com o leitor",
        body: [
          "O Dossiê Aberto não promete onisciência nem falsa neutralidade. O compromisso é com apuração honesta, correção de erros, transparência sobre limites de informação e respeito ao leitor.",
        ],
      },
    ],
    callout: {
      title: "Slogan",
      body: "O contexto por trás dos fatos.",
    },
  },
  {
    slug: "contato",
    navLabel: "Contato",
    title: "Contato",
    description:
      "Entre em contato com o Dossiê Aberto para pautas, correções, sugestões editoriais, parcerias e assuntos institucionais.",
    kicker: "Fale com a redação",
    lead: "O contato com leitores, fontes e parceiros ajuda o Dossiê Aberto a corrigir, aprofundar e qualificar a cobertura jornalística.",
    updatedAt: "2026-05-04",
    sections: [
      {
        heading: "Pautas e sugestões",
        body: [
          "Envie sugestões de pauta com o máximo de contexto possível: tema, localização, pessoas ou instituições envolvidas, documentos públicos e formas de verificação.",
          "A redação avalia as sugestões de acordo com relevância pública, possibilidade de apuração e aderência à linha editorial.",
        ],
      },
      {
        heading: "Correções",
        body: [
          "Pedidos de correção devem indicar o texto publicado, o trecho questionado e a informação correta, preferencialmente acompanhada de fonte verificável.",
          "Quando um erro factual for identificado, a correção deve ser feita com transparência e sem apagar o histórico relevante da publicação.",
        ],
      },
      {
        heading: "Publicidade e parcerias",
        body: [
          "O site pode reservar espaços para anúncios e apoios comerciais, sempre separados do conteúdo editorial.",
          "Parcerias comerciais não devem interferir em títulos, apuração, edição ou publicação de notícias.",
        ],
      },
    ],
    callout: {
      title: "Canal público",
      body: "Enquanto o projeto amadurece, o canal oficial de contato deve ser definido nas configurações do site antes da divulgação pública ampla.",
    },
  },
  {
    slug: "politica-de-privacidade",
    navLabel: "Privacidade",
    title: "Política de Privacidade",
    description:
      "Entenda como o Dossiê Aberto trata dados de leitores, comentários, newsletter, preferências de tema e informações técnicas de navegação.",
    kicker: "Privacidade",
    lead: "Esta política explica, em linguagem direta, quais dados podem ser coletados e como eles devem ser usados para operar o site com segurança e respeito ao leitor.",
    updatedAt: "2026-05-04",
    sections: [
      {
        heading: "Dados fornecidos pelo leitor",
        body: [
          "Podemos receber dados informados voluntariamente pelo leitor, como nome, e-mail e comentário enviado em uma notícia.",
          "O e-mail usado em comentários não é exibido publicamente. Comentários podem passar por moderação antes de aparecerem no site.",
        ],
      },
      {
        heading: "Newsletter",
        body: [
          "Ao cadastrar um e-mail na newsletter, o leitor autoriza o uso desse endereço para comunicações editoriais do Dossiê Aberto.",
          "O cadastro deve evitar duplicidade e poderá ser removido a pedido do titular quando essa rotina estiver operacionalizada.",
        ],
      },
      {
        heading: "Cookies e preferências",
        body: [
          "O site pode armazenar preferências simples no navegador, como o modo claro ou escuro.",
          "Também podem existir registros técnicos necessários para segurança, desempenho, prevenção de abuso e funcionamento da hospedagem.",
        ],
      },
      {
        heading: "Serviços de infraestrutura",
        body: [
          "O projeto usa provedores como Vercel e Supabase para hospedagem, banco de dados, autenticação e armazenamento.",
          "Esses serviços podem processar dados técnicos necessários para entregar páginas, proteger o sistema e manter registros operacionais.",
        ],
      },
      {
        heading: "Compartilhamento de dados",
        body: [
          "Dados pessoais não devem ser vendidos. Compartilhamentos podem ocorrer quando forem necessários para operação técnica, cumprimento legal, segurança ou defesa de direitos.",
        ],
      },
    ],
    callout: {
      title: "Transparência",
      body: "Esta página deve ser revisada sempre que ferramentas de análise, publicidade, envio de e-mails ou notificações forem integradas ao site.",
    },
  },
  {
    slug: "termos-de-uso",
    navLabel: "Termos",
    title: "Termos de Uso",
    description:
      "Leia as regras gerais de uso do Dossiê Aberto, incluindo conteúdo jornalístico, comentários, links externos e responsabilidades.",
    kicker: "Regras de uso",
    lead: "Ao acessar o Dossiê Aberto, o leitor concorda com regras básicas de convivência, respeito ao conteúdo jornalístico e uso responsável das informações publicadas.",
    updatedAt: "2026-05-04",
    sections: [
      {
        heading: "Uso do conteúdo",
        body: [
          "O conteúdo publicado tem finalidade informativa e jornalística. Títulos, textos, imagens e demais materiais não devem ser reproduzidos integralmente sem autorização.",
          "Citações curtas com crédito e link para a página original são permitidas dentro dos limites legais e de boas práticas editoriais.",
        ],
      },
      {
        heading: "Comentários",
        body: [
          "Comentários enviados por leitores podem ser moderados antes da publicação.",
          "Não serão aceitos conteúdos com ataques pessoais, discriminação, ameaças, spam, desinformação deliberada ou exposição indevida de dados pessoais.",
        ],
      },
      {
        heading: "Links externos",
        body: [
          "O Dossiê Aberto pode apontar para sites de terceiros como fontes, referências ou contexto adicional.",
          "Não controlamos o conteúdo, políticas ou disponibilidade desses sites externos.",
        ],
      },
      {
        heading: "Atualizações dos termos",
        body: [
          "Estes termos podem ser atualizados para refletir novas funcionalidades, exigências legais ou mudanças operacionais do projeto.",
        ],
      },
    ],
  },
  {
    slug: "editorial",
    navLabel: "Editorial",
    title: "Linha Editorial",
    description:
      "Conheça os princípios editoriais do Dossiê Aberto: missão, cobertura, correções, independência e separação entre notícia e análise.",
    kicker: "Princípios editoriais",
    lead: "A linha editorial do Dossiê Aberto combina apuração factual, leitura contextual e compromisso com a transparência diante do leitor.",
    updatedAt: "2026-05-04",
    sections: [
      {
        heading: "Missão",
        body: [
          "Informar com clareza e contexto, ajudando o leitor a compreender fatos relevantes, bastidores institucionais e impactos concretos na vida pública.",
        ],
      },
      {
        heading: "Cobertura",
        body: [
          "As editorias centrais são política, tecnologia, economia, cultura, Brasil e mundo. Também damos atenção a bastidores, contexto e análise quando esses formatos ajudam a explicar melhor o acontecimento.",
        ],
        bullets: [
          "Política: decisões públicas, instituições, eleições e poder.",
          "Tecnologia: inovação, internet, inteligência artificial e mercado digital.",
          "Economia: trabalho, mercado, finanças públicas e consumo.",
          "Cultura: artes, comportamento, livros, música, cinema e ideias.",
          "Brasil: sociedade, cidades, educação, saúde e temas nacionais.",
          "Mundo: diplomacia, conflitos, tendências globais e relações internacionais.",
        ],
      },
      {
        heading: "Apuração e fontes",
        body: [
          "A cobertura deve priorizar documentos, dados públicos, fontes identificáveis e contextualização clara. Quando uma informação ainda estiver em desenvolvimento, essa limitação deve ser informada.",
          "Fontes protegidas podem ser usadas quando houver interesse público e necessidade jornalística legítima.",
        ],
      },
      {
        heading: "Correções",
        body: [
          "Erros factuais devem ser corrigidos com rapidez e transparência. A correção deve preservar a confiança do leitor e deixar claro o que foi ajustado quando a mudança for relevante.",
        ],
      },
      {
        heading: "Independência",
        body: [
          "Conteúdo editorial, publicidade e parcerias comerciais devem permanecer separados. A existência de espaços de anúncio não deve determinar pauta, edição ou conclusão de uma matéria.",
        ],
      },
    ],
    callout: {
      title: "Promessa ao leitor",
      body: "Fatos primeiro, bastidores com responsabilidade e contexto suficiente para entender o que está em jogo.",
    },
  },
];

export function getInstitutionalPage(slug: string) {
  const page = INSTITUTIONAL_PAGES.find((item) => item.slug === slug);
  if (!page) {
    throw new Error(`Institutional page not found: ${slug}`);
  }
  return page;
}

export function getInstitutionalMetadata(slug: string): Metadata {
  const page = getInstitutionalPage(slug);
  const url = absoluteUrl(`/${page.slug}`);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${page.title} | ${SITE_NAME}`,
      description: page.description,
      url,
      type: "website",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | ${SITE_NAME}`,
      description: page.description,
    },
  };
}
