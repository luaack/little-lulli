export const WHATSAPP_NUMBER = "5561991557493";
export const INSTAGRAM_URL = "https://www.instagram.com/uselittlelulli";
export const INSTAGRAM_HANDLE = "@uselittlelulli";
export const SITE_URL = "https://littlelulli.com.br";

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
  alt: string;
  /** CSS object-position for the card crop, so the product stays in frame. */
  position: string;
  tags: string[];
};

export const collections: Collection[] = [
  {
    slug: "ursinho-marfim",
    title: "Ursinho Marfim",
    description:
      "Laços e presilhas em tons de marfim, com florzinhas e um ursinho bordados à mão.",
    image: "/catalogo/marfim.webp",
    alt: "Cartela Little Lulli com dois laços marfim e duas presilhas bordadas, uma com flores e outra com um ursinho",
    position: "50% 42%",
    tags: ["Laços", "Presilhas", "Ursinho"],
  },
  {
    slug: "vinho-e-renda",
    title: "Vinho & Renda",
    description:
      "Presilhas bordadas com florzinhas e acabamento em renda, combinando com laços vinho.",
    image: "/catalogo/vinho.webp",
    alt: "Cartela Little Lulli com duas presilhas vinho bordadas com flores brancas e dois laços vinho",
    position: "55% 72%",
    tags: ["Laços", "Presilhas", "Renda"],
  },
  {
    slug: "azul-e-chocolate",
    title: "Azul & Chocolate",
    description:
      "Tiara, presilhas e laço em azul-bebê, com corações e florzinhas bordados.",
    image: "/catalogo/azul-chocolate.webp",
    alt: "Tiara azul-bebê com corações marrons bordados, três presilhas bordadas e um laço azul sobre tecido marrom",
    position: "50% 40%",
    tags: ["Tiara", "Presilhas", "Laço"],
  },
  {
    slug: "pequena-bailarina",
    title: "Pequena Bailarina",
    description:
      "Presilhas delicadas com uma bailarina e corações bordados à mão.",
    image: "/catalogo/bailarina.webp",
    alt: "Cartela Little Lulli com duas presilhas ovais, uma com uma bailarina rosa bordada e outra com corações rosa",
    position: "55% 52%",
    tags: ["Presilhas", "Bailarina", "Par"],
  },
  {
    slug: "veludo-de-outono",
    title: "Veludo de Outono",
    description:
      "Laços de veludo e presilhas bordadas com raposinha, ursinho e flores, em tons quentes.",
    image: "/catalogo/veludo.webp",
    alt: "Três cartelas Little Lulli com laços de veludo e presilhas bordadas com ursinho, raposinha e flores",
    position: "50% 48%",
    tags: ["Veludo", "Raposinha", "Ursinho"],
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
