export type planDetailsProps = {
  maxServices: number;
};

export type planProps = {
  BASIC: planDetailsProps;
  PROFESSIONAL: planDetailsProps;
};

export const PLANS = {
  BASIC: {
    maxServices: 5,
  },
  PROFESSIONAL: {
    maxServices: 50,
  },
};

export const subscriptionPlans = [
  {
    id: "BASIC",
    name: "Básico",
    description:
      "Ideal para clínicas em crescimento, oferecendo recursos essenciais e suporte confiável.",
    oldPrice: "R$ 69,90",
    price: "R$ 29,90",
    period: "/mês",
    features: [
      `Cadastro de até ${PLANS["BASIC"].maxServices} serviços`,
      "Suporte via e-mail",
      "Agendamento de consultas ilimitado",
      "Acesso a recursos básicos",
    ],
    tone: "basic",
  },
  {
    id: "PROFESSIONAL",
    name: "Profissional",
    description:
      "Perfeito para clínicas estabelecidas, com recursos avançados e suporte prioritário.",
    oldPrice: "R$ 89,90",
    price: "R$ 59,90",
    period: "/mês",
    features: [
      `Cadastro de até ${PLANS["PROFESSIONAL"].maxServices} serviços`,
      "Suporte prioritário via e-mail e chat",
      "Acesso a recursos avançados",
      "Histórico detalhado de agendamentos",
      "Análise de desempenho dos serviços",
    ],
    tone: "featured",
  },
];
