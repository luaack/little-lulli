export const WHATSAPP_NUMBER = "5561991557493";
export const INSTAGRAM_URL = "https://www.instagram.com/uselittlelulli";
export const INSTAGRAM_HANDLE = "@uselittlelulli";
export const SITE_URL = "https://little-lulli.vercel.app";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, Little Lulli! Vim pelo site e gostaria de encomendar um laço 🎀";

export const navItems = [
  { label: "Coleções", href: "#colecoes", id: "colecoes" },
  { label: "Ateliê", href: "#atelie", id: "atelie" },
  { label: "Depoimentos", href: "#depoimentos", id: "depoimentos" },
  { label: "Contato", href: "#contato", id: "contato" },
] as const;

export type Collection = {
  slug: string;
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
