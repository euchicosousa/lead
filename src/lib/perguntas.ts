export const formQuestions = [
  // =========================================================
  // 01. ENTRADA
  // =========================================================

  {
    id: "name",
    type: "text",
    question: "Como podemos chamar você?",
    required: true,
    next: "whatsapp",
  },

  {
    id: "whatsapp",
    type: "phone",
    question: "Qual é o seu WhatsApp?",
    required: true,
    saveLeadOnBlur: true,
    next: "main_need",
  },

  {
    id: "main_need",
    type: "single",
    question: "O que você está procurando para sua empresa neste momento?",
    required: true,

    options: [
      {
        value: "social",
        label: "Redes sociais",
        description: "Quero estruturar, produzir ou gerenciar minhas redes.",
        next: "social_need",
      },

      {
        value: "brand",
        label: "Marca",
        description: "Quero criar, atualizar ou desenvolver minha marca.",
        next: "brand_need",
      },

      {
        value: "ads",
        label: "Anúncios",
        description: "Quero divulgar minha empresa através de tráfego pago.",
        next: "ads_context",
      },

      {
        value: "production",
        label: "Produção",
        description: "Preciso de uma peça, foto, vídeo ou material específico.",
        next: "production_need",
      },

      {
        value: "unknown",
        label: "Não sei ainda",
        description: "Quero entender o que minha empresa realmente precisa.",
        next: "unknown_context",
      },
    ],
  },

  // =========================================================
  // 02. REDES SOCIAIS
  // =========================================================

  {
    id: "social_need",
    type: "single",
    question: "O que você precisa para suas redes sociais hoje?",
    required: true,

    options: [
      {
        value: "strategy_management",
        label: "Estratégia e gestão",
        description: "Planejar, organizar e conduzir suas redes.",
        next: "social_current_management",
      },

      {
        value: "content",
        label: "Conteúdo",
        description: "Criar posts, vídeos e materiais para publicação.",
        next: "social_content_formats",
      },

      {
        value: "capture",
        label: "Captação",
        description: "Produzir fotos e vídeos para suas redes.",
        next: "social_capture_type",
      },

      {
        value: "complete",
        label: "Tudo isso",
        description: "Quero uma solução completa para minhas redes.",
        next: "social_complete_management",
      },

      {
        value: "unknown",
        label: "Ainda não sei",
        description: "Quero entender o que faz sentido para minha empresa.",
        next: "social_unknown_problem",
      },
    ],
  },

  // ---------- SOCIAL / ESTRATÉGIA + GESTÃO ----------

  {
    id: "social_current_management",
    type: "single",
    question: "Como suas redes são cuidadas atualmente?",
    required: true,

    options: [
      {
        value: "myself",
        label: "Eu mesmo(a) cuido",
        next: "social_current_presence",
      },

      {
        value: "internal",
        label: "Alguém da equipe cuida",
        next: "social_current_presence",
      },

      {
        value: "external",
        label: "Tenho alguém de fora",
        next: "social_current_presence",
      },

      {
        value: "fragmented",
        label: "Cada parte é feita por alguém diferente",
        next: "social_current_presence",
      },

      {
        value: "none",
        label: "Hoje praticamente não existe uma gestão",
        next: "social_current_presence",
      },
    ],
  },

  {
    id: "social_current_presence",
    type: "single",
    question: "Como você avalia hoje a presença da sua empresa nas redes?",
    required: true,

    options: [
      {
        value: "good",
        label: "Está boa, mas pode evoluir",
        next: "social_objective",
      },

      {
        value: "inconsistent",
        label: "É inconsistente",
        next: "social_objective",
      },

      {
        value: "outdated",
        label: "Não representa mais a empresa",
        next: "social_objective",
      },

      {
        value: "weak",
        label: "Ainda é muito pouco estruturada",
        next: "social_objective",
      },

      {
        value: "unknown",
        label: "Não sei avaliar",
        next: "social_objective",
      },
    ],
  },

  {
    id: "social_objective",
    type: "single",
    question: "O que você mais gostaria de alcançar com suas redes?",
    required: true,

    options: [
      {
        value: "brand",
        label: "Fortalecer a marca",
        next: "social_segment",
      },

      {
        value: "customers",
        label: "Atrair novos clientes",
        next: "social_segment",
      },

      {
        value: "sales",
        label: "Gerar oportunidades de venda",
        next: "social_segment",
      },

      {
        value: "perception",
        label: "Aumentar a percepção de valor",
        next: "social_segment",
      },

      {
        value: "authority",
        label: "Me tornar referência no segmento",
        next: "social_segment",
      },
    ],
  },

  // ---------- SOCIAL / CONTEÚDO ----------

  {
    id: "social_content_formats",
    type: "multi",
    question: "Que tipo de conteúdo você precisa produzir?",
    required: true,

    options: [
      {
        value: "static",
        label: "Posts e artes",
      },

      {
        value: "video",
        label: "Vídeos",
      },

      {
        value: "reels",
        label: "Reels",
      },

      {
        value: "stories",
        label: "Stories",
      },

      {
        value: "mixed",
        label: "Uma combinação desses formatos",
      },
    ],

    next: "social_content_source",
  },

  {
    id: "social_content_source",
    type: "single",
    question: "De onde vêm hoje as informações para produzir seu conteúdo?",
    required: true,

    options: [
      {
        value: "company",
        label: "Nós fornecemos as informações",
        next: "social_content_frequency",
      },

      {
        value: "agency",
        label: "Esperamos que a agência desenvolva tudo",
        next: "social_content_frequency",
      },

      {
        value: "mixed",
        label: "Temos materiais, mas precisamos organizar",
        next: "social_content_frequency",
      },

      {
        value: "unknown",
        label: "Ainda não temos uma estrutura",
        next: "social_content_frequency",
      },
    ],
  },

  {
    id: "social_content_frequency",
    type: "single",
    question: "Com que frequência você imagina precisar de conteúdo?",
    required: true,

    options: [
      {
        value: "low",
        label: "1–2 vezes por semana",
        next: "social_content_objective",
      },

      {
        value: "medium",
        label: "3–4 vezes por semana",
        next: "social_content_objective",
      },

      {
        value: "high",
        label: "5 ou mais vezes por semana",
        next: "social_content_objective",
      },

      {
        value: "unknown",
        label: "Ainda não sei",
        next: "social_content_objective",
      },
    ],
  },

  {
    id: "social_content_objective",
    type: "single",
    question: "O que você espera que esse conteúdo faça pela sua empresa?",
    required: true,

    options: [
      {
        value: "brand",
        label: "Fortalecer a marca",
        next: "social_segment",
      },

      {
        value: "customers",
        label: "Atrair clientes",
        next: "social_segment",
      },

      {
        value: "authority",
        label: "Gerar autoridade",
        next: "social_segment",
      },

      {
        value: "relationship",
        label: "Manter relacionamento com o público",
        next: "social_segment",
      },
    ],
  },

  // ---------- SOCIAL / CAPTAÇÃO ----------

  {
    id: "social_capture_type",
    type: "multi",
    question: "O que você precisa produzir?",
    required: true,

    options: [
      {
        value: "photos",
        label: "Fotos",
      },

      {
        value: "videos",
        label: "Vídeos",
      },

      {
        value: "both",
        label: "Fotos e vídeos",
      },
    ],

    next: "social_capture_frequency",
  },

  {
    id: "social_capture_frequency",
    type: "single",
    question: "Essa produção seria pontual ou recorrente?",
    required: true,

    options: [
      {
        value: "one_time",
        label: "Uma produção específica",
        next: "social_capture_context",
      },

      {
        value: "recurring",
        label: "Quero produzir com frequência",
        next: "social_capture_context",
      },

      {
        value: "as_needed",
        label: "Conforme a necessidade",
        next: "social_capture_context",
      },
    ],
  },

  {
    id: "social_capture_context",
    type: "single",
    question: "Onde essa produção normalmente aconteceria?",
    required: true,

    options: [
      {
        value: "company",
        label: "Na empresa",
        next: "social_segment",
      },

      {
        value: "external",
        label: "Em diferentes locais",
        next: "social_segment",
      },

      {
        value: "studio",
        label: "Em estúdio",
        next: "social_segment",
      },

      {
        value: "unknown",
        label: "Ainda não sei",
        next: "social_segment",
      },
    ],
  },

  // ---------- SOCIAL / COMPLETO ----------

  {
    id: "social_complete_management",
    type: "single",
    question: "Como você gostaria que a CNVT participasse das suas redes?",
    required: true,

    options: [
      {
        value: "full",
        label: "Assumindo praticamente todo o processo",
        next: "social_complete_current",
      },

      {
        value: "partnership",
        label: "Trabalhando junto com minha equipe",
        next: "social_complete_current",
      },

      {
        value: "strategy_execution",
        label: "Definindo a estratégia e executando a partir dela",
        next: "social_complete_current",
      },

      {
        value: "unknown",
        label: "Ainda não sei",
        next: "social_complete_current",
      },
    ],
  },

  {
    id: "social_complete_current",
    type: "single",
    question: "Como suas redes funcionam hoje?",
    required: true,

    options: [
      {
        value: "active",
        label: "Já temos presença ativa",
        next: "social_complete_objective",
      },

      {
        value: "inconsistent",
        label: "Publicamos, mas sem consistência",
        next: "social_complete_objective",
      },

      {
        value: "weak",
        label: "Temos pouca presença",
        next: "social_complete_objective",
      },

      {
        value: "none",
        label: "Ainda não trabalhamos de forma estruturada",
        next: "social_complete_objective",
      },
    ],
  },

  {
    id: "social_complete_objective",
    type: "single",
    question: "Qual é a principal mudança que você espera alcançar?",
    required: true,

    options: [
      {
        value: "brand",
        label: "Fortalecer a marca",
        next: "social_segment",
      },

      {
        value: "customers",
        label: "Atrair mais clientes",
        next: "social_segment",
      },

      {
        value: "authority",
        label: "Construir autoridade",
        next: "social_segment",
      },

      {
        value: "sales",
        label: "Gerar mais oportunidades de negócio",
        next: "social_segment",
      },
    ],
  },

  // ---------- SOCIAL / NÃO SEI ----------

  {
    id: "social_unknown_problem",
    type: "single",
    question: "O que fez você procurar ajuda para suas redes agora?",
    required: true,

    options: [
      {
        value: "growth",
        label: "Minha empresa cresceu",
        next: "social_unknown_expectation",
      },

      {
        value: "results",
        label: "Não estou conseguindo gerar resultados",
        next: "social_unknown_expectation",
      },

      {
        value: "communication",
        label: "Minha comunicação não representa mais a empresa",
        next: "social_unknown_expectation",
      },

      {
        value: "consistency",
        label: "Não consigo manter consistência",
        next: "social_unknown_expectation",
      },

      {
        value: "start",
        label: "Quero começar a trabalhar profissionalmente",
        next: "social_unknown_expectation",
      },

      {
        value: "unknown",
        label: "Não sei exatamente o que está errado",
        next: "social_unknown_expectation",
      },
    ],
  },

  {
    id: "social_unknown_expectation",
    type: "single",
    question: "O que você gostaria que mudasse depois desse trabalho?",
    required: true,

    options: [
      {
        value: "clarity",
        label: "Ter mais clareza sobre o que comunicar",
        next: "social_segment",
      },

      {
        value: "presence",
        label: "Ter uma presença mais profissional",
        next: "social_segment",
      },

      {
        value: "customers",
        label: "Atrair mais clientes",
        next: "social_segment",
      },

      {
        value: "brand",
        label: "Fortalecer a marca",
        next: "social_segment",
      },

      {
        value: "unknown",
        label: "Ainda não sei",
        next: "social_segment",
      },
    ],
  },

  {
    id: "social_segment",
    type: "single",
    question: "Em qual segmento sua empresa atua?",
    required: true,

    options: [
      {
        value: "health",
        label: "Saúde",
        next: "social_company_stage",
      },

      {
        value: "law",
        label: "Direito",
        next: "social_company_stage",
      },

      {
        value: "retail",
        label: "Varejo",
        next: "social_company_stage",
      },

      {
        value: "food",
        label: "Alimentação",
        next: "social_company_stage",
      },

      {
        value: "industry",
        label: "Indústria",
        next: "social_company_stage",
      },

      {
        value: "education",
        label: "Educação",
        next: "social_company_stage",
      },

      {
        value: "technology",
        label: "Tecnologia",
        next: "social_company_stage",
      },

      {
        value: "construction_real_estate",
        label: "Construção ou imobiliário",
        next: "social_company_stage",
      },

      {
        value: "services",
        label: "Serviços",
        next: "social_company_stage",
      },

      {
        value: "other",
        label: "Outro",
        next: "social_company_stage",
      },
    ],
  },

  {
    id: "social_company_stage",
    type: "single",
    question: "Em que momento sua empresa está hoje?",
    required: true,

    options: [
      {
        value: "starting",
        label: "Estamos começando",
        next: "social_timing",
      },

      {
        value: "growing",
        label: "Estamos crescendo",
        next: "social_timing",
      },

      {
        value: "established",
        label: "Já temos uma operação consolidada",
        next: "social_timing",
      },

      {
        value: "repositioning",
        label: "Estamos entrando em uma nova fase",
        next: "social_timing",
      },
    ],
  },

  {
    id: "social_timing",
    type: "single",
    question:
      "Existe algum prazo ou acontecimento que esteja motivando esse projeto?",
    required: true,

    options: [
      {
        value: "no_deadline",
        label: "Não, quero começar a estruturar agora",
        next: "qualification_role",
      },

      {
        value: "weeks",
        label: "Quero começar nas próximas semanas",
        next: "qualification_role",
      },

      {
        value: "months",
        label: "Estou planejando para os próximos meses",
        next: "qualification_role",
      },

      {
        value: "specific_project",
        label: "Tenho um projeto ou data específica",
        next: "qualification_deadline",
      },
    ],
  },

  {
    id: "qualification_deadline",
    type: "text",
    question: "Qual é esse projeto ou data?",
    required: false,
    next: "qualification_role",
  },

  // =========================================================
  // 03. MARCA
  // =========================================================

  {
    id: "brand_need",
    type: "single",
    question: "O que você precisa fazer com a sua marca?",
    required: true,

    options: [
      {
        value: "new_brand",
        label: "Criar uma marca",
        description: "Estratégia, identidade e criação do logotipo.",
        next: "brand_new_context",
      },

      {
        value: "rebrand",
        label: "Atualizar uma marca",
        description: "Evoluir uma marca que sua empresa já possui.",
        next: "brand_rebrand_context",
      },

      {
        value: "visual_identity",
        label: "Criar ou ampliar a identidade visual",
        description: "Desenvolver aplicações e materiais para a marca.",
        next: "brand_identity_context",
      },

      {
        value: "brand_strategy",
        label: "Estratégia de marca",
        description: "Definir direção, posicionamento e fundamentos da marca.",
        next: "brand_strategy_context",
      },

      {
        value: "unknown",
        label: "Ainda não sei",
        description: "Quero entender o que minha marca precisa.",
        next: "brand_unknown_context",
      },
    ],
  },

  {
    id: "brand_new_context",
    type: "single",
    question: "Em que situação sua empresa está hoje?",
    required: true,

    options: [
      {
        value: "new_business",
        label: "Vou abrir uma empresa",
        next: "brand_objective",
      },

      {
        value: "existing_no_brand",
        label: "A empresa já existe, mas nunca estruturamos a marca",
        next: "brand_objective",
      },

      {
        value: "growth",
        label: "A empresa cresceu e precisa de uma marca à altura",
        next: "brand_objective",
      },

      {
        value: "new_project",
        label: "Estamos criando um novo negócio ou projeto",
        next: "brand_objective",
      },
    ],
  },

  {
    id: "brand_rebrand_context",
    type: "single",
    question: "Por que você sente que sua marca precisa mudar?",
    required: true,

    options: [
      {
        value: "outdated",
        label: "Ela não representa mais a empresa",
        next: "brand_rebrand_objective",
      },

      {
        value: "growth",
        label: "A empresa cresceu",
        next: "brand_rebrand_objective",
      },

      {
        value: "positioning",
        label: "Queremos nos posicionar de outra forma",
        next: "brand_rebrand_objective",
      },

      {
        value: "visual",
        label: "A identidade visual ficou ultrapassada",
        next: "brand_rebrand_objective",
      },

      {
        value: "inconsistent",
        label: "A marca não é aplicada de forma consistente",
        next: "brand_rebrand_objective",
      },
    ],
  },

  {
    id: "brand_identity_context",
    type: "single",
    question: "O que você precisa criar ou organizar?",
    required: true,

    options: [
      {
        value: "logo",
        label: "Logotipo",
        next: "brand_identity_objective",
      },

      {
        value: "visual_system",
        label: "Identidade visual completa",
        next: "brand_identity_objective",
      },

      {
        value: "materials",
        label: "Materiais e aplicações da marca",
        next: "brand_identity_objective",
      },

      {
        value: "specific",
        label: "Uma aplicação específica",
        next: "brand_identity_objective",
      },
    ],
  },

  {
    id: "brand_strategy_context",
    type: "single",
    question: "O que você sente que precisa definir melhor?",
    required: true,

    options: [
      {
        value: "positioning",
        label: "Posicionamento",
        next: "brand_strategy_objective",
      },

      {
        value: "audience",
        label: "Público e percepção",
        next: "brand_strategy_objective",
      },

      {
        value: "differentiation",
        label: "Diferenciação",
        next: "brand_strategy_objective",
      },

      {
        value: "identity",
        label: "Identidade e essência da marca",
        next: "brand_strategy_objective",
      },

      {
        value: "all",
        label: "Quero estruturar tudo isso",
        next: "brand_strategy_objective",
      },
    ],
  },

  {
    id: "brand_unknown_context",
    type: "single",
    question: "O que fez você procurar ajuda para sua marca agora?",
    required: true,

    options: [
      {
        value: "new_phase",
        label: "A empresa está entrando em uma nova fase",
        next: "brand_unknown_objective",
      },

      {
        value: "growth",
        label: "A empresa cresceu",
        next: "brand_unknown_objective",
      },

      {
        value: "weak_identity",
        label: "Sinto que a marca não é forte o suficiente",
        next: "brand_unknown_objective",
      },

      {
        value: "confusion",
        label: "Não temos clareza sobre o que a marca representa",
        next: "brand_unknown_objective",
      },

      {
        value: "unknown",
        label: "Não sei exatamente o que precisa ser feito",
        next: "brand_unknown_objective",
      },
    ],
  },

  {
    id: "brand_objective",
    type: "single",
    question: "O que você gostaria que essa nova marca representasse?",
    required: true,

    options: [
      {
        value: "professional",
        label: "Mais profissionalismo",
        next: "brand_company_stage",
      },

      {
        value: "value",
        label: "Mais valor percebido",
        next: "brand_company_stage",
      },

      {
        value: "differentiation",
        label: "Mais diferenciação",
        next: "brand_company_stage",
      },

      {
        value: "maturity",
        label: "O novo momento da empresa",
        next: "brand_company_stage",
      },

      {
        value: "unknown",
        label: "Ainda não sei",
        next: "brand_company_stage",
      },
    ],
  },

  {
    id: "brand_rebrand_objective",
    type: "single",
    question: "O que você espera que a nova marca resolva?",
    required: true,

    options: [
      {
        value: "perception",
        label: "Melhorar a percepção da empresa",
        next: "brand_company_stage",
      },

      {
        value: "positioning",
        label: "Reposicionar a empresa",
        next: "brand_company_stage",
      },

      {
        value: "consistency",
        label: "Organizar a comunicação visual",
        next: "brand_company_stage",
      },

      {
        value: "maturity",
        label: "Acompanhar o crescimento da empresa",
        next: "brand_company_stage",
      },
    ],
  },

  {
    id: "brand_identity_objective",
    type: "single",
    question: "Onde essa identidade será mais utilizada?",
    required: true,

    options: [
      {
        value: "digital",
        label: "Redes sociais e ambiente digital",
        next: "brand_company_stage",
      },

      {
        value: "physical",
        label: "Materiais físicos e espaço da empresa",
        next: "brand_company_stage",
      },

      {
        value: "commercial",
        label: "Materiais comerciais e vendas",
        next: "brand_company_stage",
      },

      {
        value: "all",
        label: "Em todos os pontos de contato",
        next: "brand_company_stage",
      },
    ],
  },

  {
    id: "brand_strategy_objective",
    type: "single",
    question: "O que você espera conseguir depois desse trabalho?",
    required: true,

    options: [
      {
        value: "clarity",
        label: "Mais clareza para tomar decisões",
        next: "brand_company_stage",
      },

      {
        value: "positioning",
        label: "Um posicionamento mais claro",
        next: "brand_company_stage",
      },

      {
        value: "differentiation",
        label: "Uma marca mais diferenciada",
        next: "brand_company_stage",
      },

      {
        value: "foundation",
        label: "Uma base para orientar a comunicação",
        next: "brand_company_stage",
      },
    ],
  },

  {
    id: "brand_unknown_objective",
    type: "single",
    question:
      "O que você gostaria que estivesse diferente depois desse trabalho?",
    required: true,

    options: [
      {
        value: "clarity",
        label: "Ter mais clareza sobre a marca",
        next: "brand_company_stage",
      },

      {
        value: "perception",
        label: "Ser percebido de outra forma",
        next: "brand_company_stage",
      },

      {
        value: "professionalism",
        label: "Ter uma marca mais profissional",
        next: "brand_company_stage",
      },

      {
        value: "direction",
        label: "Ter uma direção mais clara",
        next: "brand_company_stage",
      },
    ],
  },

  {
    id: "brand_company_stage",
    type: "single",
    question: "Em que momento sua empresa está hoje?",
    required: true,

    options: [
      {
        value: "starting",
        label: "Estamos começando",
        next: "brand_timing",
      },

      {
        value: "growing",
        label: "Estamos crescendo",
        next: "brand_timing",
      },

      {
        value: "established",
        label: "Já temos uma operação consolidada",
        next: "brand_timing",
      },

      {
        value: "new_phase",
        label: "Estamos entrando em uma nova fase",
        next: "brand_timing",
      },
    ],
  },

  {
    id: "brand_timing",
    type: "single",
    question:
      "Existe algum prazo ou acontecimento que esteja motivando esse projeto?",
    required: true,

    options: [
      {
        value: "no_deadline",
        label: "Não",
        next: "qualification_role",
      },

      {
        value: "weeks",
        label: "Nas próximas semanas",
        next: "qualification_role",
      },

      {
        value: "months",
        label: "Nos próximos meses",
        next: "qualification_role",
      },

      {
        value: "specific",
        label: "Tenho um projeto ou data específica",
        next: "qualification_deadline",
      },
    ],
  },

  // =========================================================
  // 04. ANÚNCIOS / TRÁFEGO PAGO
  // =========================================================

  {
    id: "ads_context",
    type: "single",
    question: "O que você pretende alcançar com os anúncios?",
    required: true,

    options: [
      {
        value: "leads",
        label: "Gerar novos contatos",
        next: "ads_current",
      },

      {
        value: "sales",
        label: "Gerar vendas",
        next: "ads_current",
      },

      {
        value: "traffic",
        label: "Atrair pessoas para um canal ou página",
        next: "ads_current",
      },

      {
        value: "awareness",
        label: "Aumentar o alcance e reconhecimento",
        next: "ads_current",
      },

      {
        value: "unknown",
        label: "Ainda não sei",
        next: "ads_current",
      },
    ],
  },

  {
    id: "ads_current",
    type: "single",
    question: "Sua empresa já anuncia atualmente?",
    required: true,

    options: [
      {
        value: "never",
        label: "Nunca anunciamos",
        next: "ads_experience",
      },

      {
        value: "currently",
        label: "Sim, anunciamos atualmente",
        next: "ads_experience",
      },

      {
        value: "past",
        label: "Já anunciamos, mas paramos",
        next: "ads_experience",
      },

      {
        value: "someone_else",
        label: "Outra pessoa ou empresa cuida disso",
        next: "ads_experience",
      },
    ],
  },

  {
    id: "ads_experience",
    type: "single",
    question: "Como você avalia os resultados dos anúncios hoje?",
    required: true,

    options: [
      {
        value: "good",
        label: "Funcionam, mas queremos melhorar",
        next: "ads_objective",
      },

      {
        value: "weak",
        label: "Os resultados estão abaixo do esperado",
        next: "ads_objective",
      },

      {
        value: "unknown",
        label: "Não sabemos medir direito",
        next: "ads_objective",
      },

      {
        value: "none",
        label: "Ainda não temos resultados para avaliar",
        next: "ads_objective",
      },
    ],
  },

  {
    id: "ads_objective",
    type: "single",
    question: "O que seria um bom resultado para esse projeto?",
    required: true,

    options: [
      {
        value: "qualified_leads",
        label: "Receber contatos mais qualificados",
        next: "ads_segment",
      },

      {
        value: "sales",
        label: "Aumentar as vendas",
        next: "ads_segment",
      },

      {
        value: "scale",
        label: "Aumentar o volume de oportunidades",
        next: "ads_segment",
      },

      {
        value: "efficiency",
        label: "Melhorar o retorno do investimento",
        next: "ads_segment",
      },

      {
        value: "clarity",
        label: "Entender melhor o que funciona",
        next: "ads_segment",
      },
    ],
  },

  {
    id: "ads_segment",
    type: "single",
    question: "Em qual segmento sua empresa atua?",
    required: true,

    options: [
      {
        value: "health",
        label: "Saúde",
        next: "ads_company_stage",
      },

      {
        value: "law",
        label: "Direito",
        next: "ads_company_stage",
      },

      {
        value: "retail",
        label: "Varejo",
        next: "ads_company_stage",
      },

      {
        value: "food",
        label: "Alimentação",
        next: "ads_company_stage",
      },

      {
        value: "industry",
        label: "Indústria",
        next: "ads_company_stage",
      },

      {
        value: "education",
        label: "Educação",
        next: "ads_company_stage",
      },

      {
        value: "technology",
        label: "Tecnologia",
        next: "ads_company_stage",
      },

      {
        value: "services",
        label: "Serviços",
        next: "ads_company_stage",
      },

      {
        value: "other",
        label: "Outro",
        next: "ads_company_stage",
      },
    ],
  },

  {
    id: "ads_company_stage",
    type: "single",
    question: "Em que momento sua empresa está hoje?",
    required: true,

    options: [
      {
        value: "starting",
        label: "Estamos começando",
        next: "ads_timing",
      },

      {
        value: "growing",
        label: "Estamos crescendo",
        next: "ads_timing",
      },

      {
        value: "established",
        label: "Já temos uma operação consolidada",
        next: "ads_timing",
      },

      {
        value: "new_phase",
        label: "Estamos entrando em uma nova fase",
        next: "ads_timing",
      },
    ],
  },

  {
    id: "ads_timing",
    type: "single",
    question:
      "Existe algum prazo ou acontecimento que esteja motivando esse projeto?",
    required: true,

    options: [
      {
        value: "no_deadline",
        label: "Não",
        next: "qualification_role",
      },

      {
        value: "weeks",
        label: "Nas próximas semanas",
        next: "qualification_role",
      },

      {
        value: "months",
        label: "Nos próximos meses",
        next: "qualification_role",
      },

      {
        value: "specific",
        label: "Tenho um projeto ou data específica",
        next: "qualification_deadline",
      },
    ],
  },

  // =========================================================
  // 05. PRODUÇÃO / AVULSOS
  // =========================================================

  {
    id: "production_need",
    type: "single",
    question: "O que você precisa produzir?",
    required: true,

    options: [
      {
        value: "design",
        label: "Design gráfico",
        description: "Uma peça ou material visual específico.",
        next: "production_design_type",
      },

      {
        value: "video",
        label: "Vídeo",
        description: "Um vídeo específico ou uma edição.",
        next: "production_video_type",
      },

      {
        value: "photo",
        label: "Fotografia",
        description: "Uma produção fotográfica para sua empresa.",
        next: "production_photo_type",
      },

      {
        value: "presentation",
        label: "Apresentação ou material comercial",
        description: "Um material para apresentar ou vender sua empresa.",
        next: "production_material_type",
      },

      {
        value: "other",
        label: "Outro",
        description: "Tenho uma necessidade específica.",
        next: "production_other_context",
      },
    ],
  },

  {
    id: "production_design_type",
    type: "single",
    question: "Que tipo de material você precisa?",
    required: true,

    options: [
      {
        value: "social",
        label: "Peça para redes sociais",
        next: "production_context",
      },

      {
        value: "commercial",
        label: "Material comercial",
        next: "production_context",
      },

      {
        value: "print",
        label: "Material para impressão",
        next: "production_context",
      },

      {
        value: "other",
        label: "Outro material",
        next: "production_context",
      },
    ],
  },

  {
    id: "production_video_type",
    type: "single",
    question: "O que você precisa fazer com o vídeo?",
    required: true,

    options: [
      {
        value: "capture",
        label: "Gravar e produzir",
        next: "production_context",
      },

      {
        value: "editing",
        label: "Editar um material que já tenho",
        next: "production_context",
      },

      {
        value: "both",
        label: "Gravar e editar",
        next: "production_context",
      },
    ],
  },

  {
    id: "production_photo_type",
    type: "single",
    question: "Que tipo de fotografia você precisa?",
    required: true,

    options: [
      {
        value: "people",
        label: "Pessoas / equipe",
        next: "production_context",
      },

      {
        value: "products",
        label: "Produtos",
        next: "production_context",
      },

      {
        value: "space",
        label: "Espaço / empresa",
        next: "production_context",
      },

      {
        value: "campaign",
        label: "Produção para uma campanha",
        next: "production_context",
      },

      {
        value: "other",
        label: "Outro",
        next: "production_context",
      },
    ],
  },

  {
    id: "production_material_type",
    type: "single",
    question: "Qual material você precisa?",
    required: true,

    options: [
      {
        value: "presentation",
        label: "Apresentação institucional",
        next: "production_context",
      },

      {
        value: "sales",
        label: "Material para vendas",
        next: "production_context",
      },

      {
        value: "proposal",
        label: "Proposta ou documento comercial",
        next: "production_context",
      },

      {
        value: "other",
        label: "Outro",
        next: "production_context",
      },
    ],
  },

  {
    id: "production_other_context",
    type: "text",
    question: "Conte brevemente o que você precisa produzir.",
    required: true,
    next: "production_context",
  },

  {
    id: "production_context",
    type: "single",
    question: "Esse trabalho é:",
    required: true,

    options: [
      {
        value: "one_time",
        label: "Uma necessidade pontual",
        next: "production_timing",
      },

      {
        value: "recurring",
        label: "Algo que precisarei com frequência",
        next: "production_timing",
      },

      {
        value: "project",
        label: "Parte de um projeto maior",
        next: "production_timing",
      },
    ],
  },

  {
    id: "production_timing",
    type: "single",
    question: "Existe algum prazo específico para essa produção?",
    required: true,

    options: [
      {
        value: "no",
        label: "Não",
        next: "qualification_role",
      },

      {
        value: "weeks",
        label: "Nas próximas semanas",
        next: "qualification_role",
      },

      {
        value: "specific",
        label: "Tenho uma data específica",
        next: "qualification_deadline",
      },
    ],
  },

  // =========================================================
  // 06. NÃO SEI AINDA
  // =========================================================

  {
    id: "unknown_context",
    type: "single",
    question: "O que fez você procurar ajuda para sua empresa agora?",
    required: true,

    options: [
      {
        value: "growth",
        label: "Minha empresa cresceu",
        next: "unknown_problem",
      },

      {
        value: "communication",
        label: "Minha comunicação não acompanha a empresa",
        next: "unknown_problem",
      },

      {
        value: "customers",
        label: "Quero atrair mais clientes",
        next: "unknown_problem",
      },

      {
        value: "brand",
        label: "Quero fortalecer minha marca",
        next: "unknown_problem",
      },

      {
        value: "new_phase",
        label: "Estamos entrando em uma nova fase",
        next: "unknown_problem",
      },

      {
        value: "unknown",
        label: "Não sei exatamente",
        next: "unknown_problem",
      },
    ],
  },

  {
    id: "unknown_problem",
    type: "single",
    question: "O que hoje mais dificulta esse próximo passo?",
    required: true,

    options: [
      {
        value: "direction",
        label: "Não temos uma direção clara",
        next: "unknown_company_stage",
      },

      {
        value: "execution",
        label: "Sabemos o que queremos, mas não conseguimos executar",
        next: "unknown_company_stage",
      },

      {
        value: "communication",
        label: "Nossa comunicação não traduz o que fazemos",
        next: "unknown_company_stage",
      },

      {
        value: "consistency",
        label: "Falta consistência",
        next: "unknown_company_stage",
      },

      {
        value: "team",
        label: "Não temos estrutura para cuidar disso",
        next: "unknown_company_stage",
      },

      {
        value: "unknown",
        label: "Ainda não sei identificar",
        next: "unknown_company_stage",
      },
    ],
  },

  {
    id: "unknown_company_stage",
    type: "single",
    question: "Em que momento sua empresa está hoje?",
    required: true,

    options: [
      {
        value: "starting",
        label: "Estamos começando",
        next: "unknown_timing",
      },

      {
        value: "growing",
        label: "Estamos crescendo",
        next: "unknown_timing",
      },

      {
        value: "established",
        label: "Já temos uma operação consolidada",
        next: "unknown_timing",
      },

      {
        value: "new_phase",
        label: "Estamos entrando em uma nova fase",
        next: "unknown_timing",
      },
    ],
  },

  {
    id: "unknown_timing",
    type: "single",
    question:
      "Existe algum prazo ou acontecimento que esteja motivando esse projeto?",
    required: true,

    options: [
      {
        value: "no_deadline",
        label: "Não",
        next: "qualification_role",
      },

      {
        value: "weeks",
        label: "Nas próximas semanas",
        next: "qualification_role",
      },

      {
        value: "months",
        label: "Nos próximos meses",
        next: "qualification_role",
      },

      {
        value: "specific",
        label: "Tenho um projeto ou data específica",
        next: "qualification_deadline",
      },
    ],
  },

  // =========================================================
  // 07. QUALIFICAÇÃO FINAL
  // =========================================================

  {
    id: "qualification_role",
    type: "single",
    question: "Qual é o seu papel na empresa?",
    required: true,

    options: [
      {
        value: "owner",
        label: "Sócio(a) / fundador(a)",
        next: "qualification_marketing",
      },

      {
        value: "director",
        label: "Diretor(a) / gestor(a)",
        next: "qualification_marketing",
      },

      {
        value: "marketing",
        label: "Responsável pelo marketing",
        next: "qualification_marketing",
      },

      {
        value: "team",
        label: "Faço parte da equipe",
        next: "qualification_marketing",
      },

      {
        value: "other",
        label: "Outro",
        next: "qualification_marketing",
      },
    ],
  },

  {
    id: "qualification_marketing",
    type: "single",
    question: "Como o marketing é conduzido atualmente?",
    required: true,

    options: [
      {
        value: "myself",
        label: "Eu mesmo(a) conduzo",
        next: "finish",
      },

      {
        value: "internal",
        label: "Temos alguém na equipe",
        next: "finish",
      },

      {
        value: "agency",
        label: "Temos uma agência",
        next: "finish",
      },

      {
        value: "multiple",
        label: "Temos diferentes profissionais",
        next: "finish",
      },

      {
        value: "none",
        label: "Não temos uma estrutura de marketing",
        next: "finish",
      },
    ],
  },

  // =========================================================
  // 08. DATA ESPECÍFICA
  // =========================================================

  {
    id: "qualification_deadline",
    type: "text",
    question: "Qual é o projeto ou data que está motivando esse trabalho?",
    required: true,
    next: "qualification_role",
  },

  // =========================================================
  // 09. FINAL
  // =========================================================

  {
    id: "finish",
    type: "finish",
    title: "Recebemos suas informações.",
    message:
      "Vamos entender o contexto da sua empresa e falar com você pelo WhatsApp.",
  },
];
