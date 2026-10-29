// Mexico and Colombia sender landings (Meta lead-gen destination). Spanish first, English via the page language switch.
// Copy follows the October 2026 ad rules: great exchange rate, in minutes, any bank, cost shown before sending.
// Fee line (Nikita, 29.10): "our exchange rate already includes every fee and is among the best on the market".
// Never "no extra fee", "free" or "the best"; no incentives or referral offers on these pages.
export type LatamCountry = "Mexico" | "Colombia";
export type Text = { es: string; en: string };

type LatamCopy = {
  title: Text;
  description: Text;
  headline: Text;
  intro: Text;
  heroAlt: string;
  personaAlts: string[];
  familyAlt: string;
  pesosTitle: Text;
  pesosCopy: Text;
  rows: { ours: Text; others: Text }[];
  bankTitle: Text;
  bankCopy: Text;
  clabe?: boolean;
  clearTitle: Text;
  clearCopy: Text;
  familyTitle: Text;
  familyCopy: Text;
  faq: { question: Text; answer: Text }[];
};

const rows = (currency: string) => [
  { ours: { es: "Más pesos por dólar", en: "More pesos per dollar" }, others: { es: "Menos pesos", en: "Fewer pesos" } },
  { ours: { es: "Llega en minutos", en: "Arrives in minutes" }, others: { es: "Días de espera", en: "Days of waiting" } },
  { ours: { es: `Ves cuántos ${currency} llegan antes de enviar`, en: `See how many ${currency} arrive before you send` }, others: { es: "Sorpresas al final", en: "Surprises at the end" } },
];

const faq = (country: { es: string; en: string }, bank: Text, extra?: { question: Text; answer: Text }) => [
  {
    question: { es: `¿Cuánto cuesta enviar dinero a ${country.es}?`, en: `How much does it cost to send money to ${country.en}?` },
    answer: {
      es: "Nuestro tipo de cambio ya incluye todas las comisiones. Antes de confirmar, la app te muestra el tipo de cambio y el monto estimado que recibe tu familia.",
      en: "Our exchange rate already includes every fee. Before you confirm, the app shows the exchange rate and the estimated amount your family receives.",
    },
  },
  {
    question: { es: "¿Cuánto tarda en llegar?", en: "How long does it take?" },
    answer: {
      es: `Los envíos a bancos en ${country.es} suelen llegar en minutos. Agregar dinero a tu cuenta desde tu banco en EE. UU. por ACH puede tardar de 1 a 3 días hábiles.`,
      en: `Transfers to banks in ${country.en} usually arrive in minutes. Adding money to your account from your US bank by ACH can take 1 to 3 business days.`,
    },
  },
  { question: { es: `¿A qué bancos de ${country.es} puedo enviar?`, en: `Which banks in ${country.en} can I send to?` }, answer: bank },
  {
    question: { es: "¿Qué necesito para empezar?", en: "What do I need to start?" },
    answer: {
      es: "Descarga Jazari One, crea tu perfil y completa la verificación de identidad que pide la app. Para agregar dinero necesitas una cuenta bancaria en EE. UU. Los requisitos dependen de tu perfil.",
      en: "Download Jazari One, create your profile and complete the identity checks the app asks for. To add money you need a US bank account. Requirements depend on your profile.",
    },
  },
  {
    question: { es: "¿Mi familia necesita Jazari One?", en: "Does my family need Jazari One?" },
    answer: {
      es: "No. El dinero llega a su cuenta bancaria. Si quieren, también pueden abrir su cuenta en Jazari One para recibir en dólares.",
      en: "No. The money goes to their bank account. If they like, they can also open a Jazari One account to receive in dollars.",
    },
  },
  {
    question: { es: "¿Es seguro?", en: "Is it safe?" },
    answer: {
      es: "Verificamos tu identidad antes de abrir tu cuenta, y las cuentas en dólares se ofrecen a través de un banco aliado con licencia en EE. UU., sujeto a verificación. Antes de cada envío ves a quién le envías y cuánto cuesta.",
      en: "We verify your identity before opening your account, and dollar accounts are provided through a licensed US bank partner, subject to verification. Before every transfer you see who you are sending to and what it costs.",
    },
  },
  ...(extra ? [extra] : []),
];

export const latamCountries: Record<LatamCountry, LatamCopy> = {
  Mexico: {
    title: { es: "Envía dinero a México | Jazari One", en: "Send money to Mexico | Jazari One" },
    description: {
      es: "Excelente tipo de cambio y llega en minutos, directo a su CLABE en cualquier banco de México.",
      en: "A great exchange rate, and it arrives in minutes, straight to their CLABE at any bank in Mexico.",
    },
    headline: { es: "Envía dinero a México con Jazari One", en: "Send money to Mexico with Jazari One" },
    intro: {
      es: "Excelente tipo de cambio y llega en minutos, directo a su CLABE en cualquier banco de México.",
      en: "A great exchange rate, and it arrives in minutes, straight to their CLABE at any bank in Mexico.",
    },
    heroAlt: "Ilustración: hombre mexicano en su cocina en Texas mira su teléfono después de enviar dinero a casa",
    personaAlts: [
      "Ilustración: una mujer y su mamá en la cocina en Texas miran el teléfono",
      "Ilustración: mujer en su descanso frente a la panadería donde trabaja en Los Ángeles mira su teléfono",
      "Ilustración: una abuela y su nieta en el sofá miran el teléfono y se ríen",
    ],
    familyAlt: "Ilustración: madre en Guadalajara sonríe al ver su teléfono",
    pesosTitle: { es: "Más pesos para tu familia", en: "More pesos for your family" },
    pesosCopy: {
      es: "Cada centavo cuenta cuando lo mandas a México. Con un excelente tipo de cambio, tu familia recibe más pesos por cada dólar.",
      en: "Every cent counts when you send it to Mexico. With a great exchange rate, your family gets more pesos for every dollar.",
    },
    rows: rows("pesos"),
    bankTitle: { es: "Directo a su CLABE", en: "Straight to their CLABE" },
    bankCopy: {
      es: "Solo necesitas la CLABE de tu familiar: los 18 dígitos que ya usa para recibir transferencias. Escríbela una vez en la app y envía a cualquier banco de México por SPEI.",
      en: "All you need is your relative’s CLABE: the 18 digits they already use to receive transfers. Add it once in the app and send to any bank in Mexico through SPEI.",
    },
    clabe: true,
    clearTitle: { es: "Sabes cuánto llega antes de enviar", en: "Know what arrives before you send" },
    clearCopy: {
      es: "Nuestro tipo de cambio ya incluye todas las comisiones y está entre los mejores del mercado. Lo que ves es lo que recibe tu familia.",
      en: "Our exchange rate already includes every fee, and it’s among the best on the market. What you see is what your family gets.",
    },
    familyTitle: { es: "Para tu familia en México", en: "For your family in Mexico" },
    familyCopy: {
      es: "Tu familia no necesita nada nuevo: el dinero llega a su banco. Si quieren, también pueden abrir su cuenta en Jazari One para recibir en dólares y pasarlos a pesos con un excelente tipo de cambio.",
      en: "Your family doesn’t need anything new: the money lands in their bank. If they like, they can also open a Jazari One account to receive in dollars and switch to pesos at a great exchange rate.",
    },
    faq: faq({ es: "México", en: "Mexico" }, {
      es: "A cualquier banco en México que reciba transferencias SPEI, con la CLABE de 18 dígitos de tu familiar.",
      en: "Any bank in Mexico that receives SPEI transfers, using your relative’s 18-digit CLABE.",
    }, {
      question: { es: "¿Qué es la CLABE y dónde la encuentro?", en: "What is a CLABE and where do I find it?" },
      answer: {
        es: "La CLABE es el número de 18 dígitos de la cuenta bancaria de tu familiar en México. Lo encuentra en la app de su banco, en su estado de cuenta o en su sucursal. Revisa los 18 dígitos antes de enviar.",
        en: "A CLABE is the 18-digit number of your relative’s bank account in Mexico. They can find it in their bank’s app, on their statement or at their branch. Check all 18 digits before you send.",
      },
    }),
  },
  Colombia: {
    title: { es: "Envía dinero a Colombia | Jazari One", en: "Send money to Colombia | Jazari One" },
    description: {
      es: "Excelente tipo de cambio y tu giro llega en minutos a cualquier banco en Colombia.",
      en: "A great exchange rate, and your transfer reaches any bank in Colombia in minutes.",
    },
    headline: { es: "Envía dinero a Colombia con Jazari One", en: "Send money to Colombia with Jazari One" },
    intro: {
      es: "Excelente tipo de cambio y tu giro llega en minutos a cualquier banco en Colombia.",
      en: "A great exchange rate, and your transfer reaches any bank in Colombia in minutes.",
    },
    heroAlt: "Ilustración: mujer colombiana en su sala en Miami mira su teléfono después de enviar dinero a su familia",
    personaAlts: [
      "Ilustración: dos hermanas colombianas en la cocina en Miami miran el teléfono y se ríen",
      "Ilustración: enfermera colombiana después de su turno en un café en Houston mira su teléfono",
      "Ilustración: una mamá colombiana y su hijo en el sofá miran el teléfono",
    ],
    familyAlt: "Ilustración: padre en Medellín sonríe al ver su teléfono",
    pesosTitle: { es: "Más pesos para tu familia", en: "More pesos for your family" },
    pesosCopy: {
      es: "Cada centavo cuenta cuando lo mandas a Colombia. Con un excelente tipo de cambio, tu familia recibe más pesos por cada dólar.",
      en: "Every cent counts when you send it to Colombia. With a great exchange rate, your family gets more pesos for every dollar.",
    },
    rows: rows("pesos"),
    bankTitle: { es: "A cualquier banco en Colombia", en: "To any bank in Colombia" },
    bankCopy: {
      es: "Envía directo a la cuenta de tu familiar, en cualquier banco de Colombia. Desde la app, cuando lo necesiten.",
      en: "Send straight to your relative’s account at any bank in Colombia. From the app, whenever they need it.",
    },
    clearTitle: { es: "Sabes cuánto llega antes de enviar", en: "Know what arrives before you send" },
    clearCopy: {
      es: "Nuestro tipo de cambio ya incluye todas las comisiones y está entre los mejores del mercado. Lo que ves es lo que recibe tu familia.",
      en: "Our exchange rate already includes every fee, and it’s among the best on the market. What you see is what your family gets.",
    },
    familyTitle: { es: "Para tu familia en Colombia", en: "For your family in Colombia" },
    familyCopy: {
      es: "Tu familia no necesita nada nuevo: el giro llega a su banco. Si quieren, también pueden abrir su cuenta en Jazari One para recibir en dólares y pasarlos a pesos con un excelente tipo de cambio.",
      en: "Your family doesn’t need anything new: the transfer lands in their bank. If they like, they can also open a Jazari One account to receive in dollars and switch to pesos at a great exchange rate.",
    },
    faq: faq({ es: "Colombia", en: "Colombia" }, {
      es: "A cuentas bancarias en Colombia. La app te pide los datos de la cuenta de tu familiar y te muestra el monto en pesos colombianos antes de confirmar.",
      en: "Bank accounts in Colombia. The app asks for your relative’s account details and shows the amount in Colombian pesos before you confirm.",
    }),
  },
};
