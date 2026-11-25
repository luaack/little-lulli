export const WHATSAPP_NUMBER = "5561991557493";
export const INSTAGRAM_URL = "https://www.instagram.com/uselittlelulli";
export const INSTAGRAM_HANDLE = "@uselittlelulli";
// URL pública do ambiente (definida na Vercel). NÃO aponta para o site oficial.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, Little Lulli! Vim pelo site e gostaria de encomendar um laço 🎀";

export const navItems = [
  { label: "Loja", href: "/loja", id: "loja" },
  { label: "Personalizar", href: "/personalizar", id: "personalizar" },
  { label: "Ateliê", href: "/atelie", id: "atelie" },
  { label: "Depoimentos", href: "/depoimentos", id: "depoimentos" },
  { label: "Contato", href: "/contato", id: "contato" },
] as const;

export type CategorySlug = "tic-tacs" | "lacos" | "tiaras" | "faixas";
export type CollectionSlug = "jardim-encantado" | "lacos-de-flor" | "amigos-da-floresta";

export const categories: { slug: CategorySlug; title: string; description: string }[] = [
  { slug: "tic-tacs", title: "Tic tacs", description: "Presilhas tic tac bordadas, vendidas em par ou unidade." },
  { slug: "lacos", title: "Laços", description: "Laços bordados à mão para toda a infância." },
  { slug: "tiaras", title: "Tiaras", description: "Tiaras macias, leves e bordadas à mão." },
  { slug: "faixas", title: "Faixas", description: "Faixinhas de laço para os pequenos fios." },
];

export const TEST_ENV_LABEL = "Ambiente de testes · preços fictícios · pagamento e frete simulados";

export type Collection = {
  slug: CollectionSlug;
  title: string;
  description: string;
  image: string;
  tags: string[];
  accent: string;
};

export const collections: Collection[] = [
  {
    slug: "jardim-encantado",
    title: "Jardim Encantado",
    description:
      "Laços bordados à mão com delicadeza e cores que celebram a natureza.",
    image: "/colecao-1.jpeg",
    tags: ["Laços", "Presilhas", "Bordado floral"],
    accent: "var(--color-rose)",
  },
  {
    slug: "lacos-de-flor",
    title: "Laços de Flor",
    description:
      "Prendedores delicados com detalhes florais para iluminar qualquer penteado.",
    image: "/colecao-2.jpeg",
    tags: ["Presilhas", "Margaridas", "Par"],
    accent: "var(--color-mint)",
  },
  {
    slug: "amigos-da-floresta",
    title: "Amigos da Floresta",
    description:
      "Bordados lúdicos de bichinhos que trazem diversão e estilo para as pequenas.",
    image: "/colecao-3.jpeg",
    tags: ["Veludo", "Raposinha", "Lúdico"],
    accent: "var(--color-gold)",
  },
];

export type Testimonial = {
  quote: string;
  highlight: string;
  name: string;
  detail: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Eu amei demais. Esses laços são como jóias, vão caminhar toda a infância dela com ela.",
    highlight: "são como jóias",
    name: "Mariane",
    detail: "Mãe da Sara, 2 anos",
  },
  {
    quote:
      "Sem palavras. Vi ontem à noite, estou apaixonada. E o mimo? Que coisa linda e delicada... Tudo muito perfeito. Estou doida pra usar e já quero pedir mais.",
    highlight: "E o mimo?",
    name: "Jéssica",
    detail: "Mãe da Joana, 8 meses",
  },
  {
    quote:
      "Que bordados perfeitos, eu estou encantada. Tanto com os laços, bordados e o acabamento perfeito. Ficou a coisa mais linda na minha princesa, usamos ontem, super leves e delicados.",
    highlight: "estou encantada",
    name: "Ana Paula",
    detail: "Mãe da Lívia, 1 ano",
  },
];
