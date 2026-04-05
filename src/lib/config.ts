export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5581991644050'

export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Olá! Vim pelo site da MSD Assessoria e gostaria de conversar sobre minha situação no Farmácia Popular.'
)

export const whatsappUrl = (custom?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${custom ?? WHATSAPP_MESSAGE}`

export const STATS = [
  { value: '20', label: 'Anos de atuação' },
  { value: '1.000+', label: 'Farmácias atendidas' },
  { value: '20', label: 'Estados' },
  { value: '500', label: 'Cidades' },
] as const

export const PROFILES = [
  {
    icon: '🔒',
    title: 'Farmácia já bloqueada',
    desc: 'O bloqueio chegou, o faturamento parou. Você sabe que não pode esperar — e precisa de quem já viu isso antes.',
    full: false,
  },
  {
    icon: '⚠️',
    title: 'Irregularidades identificadas',
    desc: 'O farmacêutico ou balconista percebeu algo errado na operação. Melhor agir antes de virar auditoria.',
    full: false,
  },
  {
    icon: '📊',
    title: 'Contador ou assessor preocupado',
    desc: 'Divergências entre compras e vendas, faturamento alto sem controle rigoroso. É hora de um diagnóstico especializado.',
    full: false,
  },
  {
    icon: '⚖️',
    title: 'Advogado precisando de suporte técnico',
    desc: 'Processos na CGU, TCU ou esfera criminal exigem mais do que conhecimento jurídico. Somos o suporte técnico especializado.',
    full: false,
  },
  {
    icon: '📈',
    title: 'Empresário que quer crescer com segurança',
    desc: 'Redes com múltiplos CNPJs sabem que escala significa maior exposição. Monitoramento preventivo para todas as unidades.',
    full: true,
  },
] as const

export const COSTS = [
  {
    title: 'Faturamento paralisado',
    desc: 'O programa pode representar 30–60% da receita mensal. Cada dia bloqueado é receita que não volta.',
  },
  {
    title: 'Multas e dívidas acumulando',
    desc: 'Sem regularização, penalidades administrativas e tributárias continuam crescendo.',
  },
  {
    title: 'Risco de descredenciamento definitivo',
    desc: 'Bloqueios não resolvidos podem evoluir para processos que inviabilizam a participação futura no programa.',
  },
  {
    title: 'Exposição jurídica',
    desc: 'Em casos mais graves, a omissão pode ser interpretada como agravante em processos administrativos e criminais.',
  },
] as const

export const STEPS = [
  {
    num: 1,
    title: 'Diagnóstico',
    desc: 'Analisamos o histórico da farmácia, o tipo de bloqueio e o risco real envolvido.',
  },
  {
    num: 2,
    title: 'Estratégia',
    desc: 'Definimos o melhor caminho: desbloqueio, defesa administrativa, negociação ou monitoramento.',
  },
  {
    num: 3,
    title: 'Execução',
    desc: 'Acompanhamos o processo do início ao fim — com comunicação clara e relatórios periódicos.',
  },
] as const

export const OBJECTIONS = [
  {
    q: 'Será que tem solução para o meu caso?',
    a: 'Em quase 20 anos, a grande maioria chegou até nós achando que o caso era sem solução. Sempre existe um caminho técnico e jurídico a ser explorado. O diagnóstico revela muito mais do que o cliente imagina.',
  },
  {
    q: 'Fiz coisas que sei que estão erradas. Posso pedir ajuda?',
    a: 'Sim. Existe uma diferença técnica e jurídica significativa entre irregularidade operacional e fraude. Nossa função não é julgar — é entender, analisar e construir a melhor defesa dentro da realidade do seu caso.',
  },
  {
    q: 'Já tentei resolver sozinho — não funcionou.',
    a: 'O Farmácia Popular tem fluxos administrativos e linguagem técnica muito particulares. Uma defesa genérica raramente funciona. O que diferencia nossa atuação é o conhecimento profundo e exclusivo desse universo, acumulado em quase duas décadas.',
  },
  {
    q: 'Quanto vai custar? Não sei se consigo pagar agora.',
    a: 'Começamos com um diagnóstico que permite entender o problema antes de qualquer comprometimento financeiro maior. Sabemos que farmácia bloqueada é farmácia sem receita — e trabalhamos dentro dessa realidade.',
  },
  {
    q: 'Contratar assessoria não vai chamar mais atenção para o meu caso?',
    a: 'Na prática, ocorre o inverso. Uma farmácia que identifica e corrige inconsistências antes de ser auditada está em posição muito mais favorável do que aquela pega de surpresa. Proatividade, bem conduzida, é argumento técnico.',
  },
] as const
