import type { LandingContent } from "@/lib/types";

export const content: LandingContent = {
  meta: {
    title: "Sierralog para Farma | Armazenagem com compliance ANVISA",
    description:
      "Armazenagem e distribuição farmacêutica com compliance ANVISA, controle de temperatura e rastreabilidade em Extrema/MG.",
  },
  hero: {
    eyebrow: "Para farmacêuticas e produtos para saúde",
    headline: "Armazenagem farma com compliance e controle.",
    sub: "Estrutura adequada às exigências ANVISA, controle de temperatura e rastreabilidade total a partir de Extrema/MG.",
    bullets: [
      "Compliance ANVISA",
      "Controle de temperatura e umidade",
      "Rastreabilidade ponta a ponta",
    ],
    ctaPrimary: "Solicitar proposta",
    ctaSecondary: "Como funciona",
    image: "/hero-farma.jpg",
  },
  benefits: {
    title: "Por que empresas de saúde escolhem a Sierralog",
    subtitle:
      "Operação preparada para as exigências regulatórias e técnicas do setor farma.",
    items: [
      {
        icon: "ShieldCheck",
        title: "Compliance ANVISA",
        desc: "Operação alinhada às exigências regulatórias do setor.",
      },
      {
        icon: "Thermometer",
        title: "Controle de temperatura",
        desc: "Áreas climatizadas e monitoramento contínuo.",
      },
      {
        icon: "FileSearch",
        title: "Rastreabilidade total",
        desc: "Registro completo de movimentação por lote e validade.",
      },
      {
        icon: "Warehouse",
        title: "Áreas segregadas",
        desc: "Espaços específicos para categorias e regimes.",
      },
      {
        icon: "Truck",
        title: "Distribuição segura",
        desc: "Transporte com cuidado integral à integridade do produto.",
      },
      {
        icon: "ClipboardCheck",
        title: "Boas Práticas",
        desc: "Processos alinhados às BPA aplicáveis.",
      },
    ],
  },
  proof: {
    kpis: [
      { value: "ANVISA", label: "compliance regulatório" },
      { value: "24/7", label: "monitoramento de temperatura" },
      { value: "1h", label: "da capital de SP" },
      { value: "24h", label: "para resposta de proposta" },
    ],
    locationCaption:
      "Extrema/MG — estrutura logística com compliance para o setor de saúde.",
  },
  howItWorks: {
    title: "Como começa sua operação",
    steps: [
      {
        title: "Diagnóstico",
        desc: "Avaliamos categoria, regime e exigências específicas.",
      },
      {
        title: "Proposta",
        desc: "Modelo comercial e técnico sob medida em até 24h.",
      },
      {
        title: "Onboarding",
        desc: "Adequação documental e setup da operação.",
      },
      {
        title: "Operação",
        desc: "Armazenagem, controle e distribuição contínuos.",
      },
    ],
  },
  form: {
    title: "Solicite uma proposta para sua operação farma",
    subtitle: "Preencha e nosso time comercial entra em contato.",
    extraFields: [
      {
        name: "categoria",
        label: "Categoria do produto",
        type: "select",
        options: ["Medicamentos", "Correlatos", "Cosméticos", "Suplementos", "Outros"],
      },
      {
        name: "cadeiaFria",
        label: "Necessita cadeia fria?",
        type: "radio",
        options: ["Sim", "Não"],
      },
      {
        name: "volume",
        label: "Volume mensal estimado",
        type: "select",
        options: ["Pequeno", "Médio", "Grande"],
      },
    ],
    submitLabel: "Quero falar com um especialista",
  },
  faq: {
    title: "Perguntas frequentes",
    items: [
      {
        q: "A operação tem compliance ANVISA?",
        a: "Sim, a operação é estruturada conforme as exigências aplicáveis. Detalhamos certificações e licenças na proposta.",
      },
      {
        q: "Trabalham com cadeia fria?",
        a: "Sim, com áreas climatizadas e monitoramento contínuo de temperatura.",
      },
      {
        q: "Atendem que categorias?",
        a: "Medicamentos, correlatos, cosméticos e suplementos, com avaliação por categoria.",
      },
      {
        q: "Como funciona a rastreabilidade?",
        a: "Registro completo por lote, validade e movimentação, com relatórios disponíveis.",
      },
      {
        q: "Em quanto tempo começa a operação?",
        a: "Onboarding típico em 4 a 8 semanas, considerando adequação regulatória.",
      },
    ],
  },
};
