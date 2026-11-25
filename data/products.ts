/*
 * ============================================================================
 *  CATÁLOGO — nomes, preços e fotos das 5 peças abaixo são REAIS (informados
 *  pela Little Lulli). Continuam PROVISÓRIOS: peso, medidas da embalagem,
 *  material e descrições. Prazo: 5 a 8 dias úteis, com datas combinadas pelo
 *  WhatsApp. Preços em CENTAVOS (7200 = R$ 72,00).
 *  Coleções ainda não estão configuradas: por enquanto a loja é organizada
 *  por categorias (`collection` é opcional).
 * ============================================================================
 */
import { categories, collections, type CategorySlug, type CollectionSlug } from "@/lib/site";

export type ColorOption = { id: string; name: string; hex: string };
export type SetId = "par" | "unidade" | "kit";
export type SetOption = { id: SetId; label: string; price: number };

export type Product = {
  slug: string;
  name: string;
  /** Opcional: coleções serão configuradas depois. */
  collection?: CollectionSlug;
  category: CategorySlug;
  /** PROVISÓRIO — preço base (menor preço entre as variações), em centavos. */
  price: number;
  short: string;
  description: string;
  /** PROVISÓRIO */
  material: string;
  details: string[];
  /** Fotos em /public. PROVISÓRIO: ainda não há foto por produto. */
  images: string[];
  colors: ColorOption[];
  /** Par/unidade, cada um com seu preço. Vazio = peça única. */
  sets: SetOption[];
  /** PROVISÓRIO — prazo de produção em dias úteis (antes do envio). */
  productionDays: { min: number; max: number };
  /** PROVISÓRIO — peso em gramas, já com a embalagem. */
  weightGrams: number;
  /** PROVISÓRIO — medidas da embalagem em cm. */
  package: { length: number; width: number; height: number };
  /** Aviso extra mostrado na página do produto (ex.: escolha combinada pelo WhatsApp). */
  note?: string;
  /** Aceita bordado personalizado ("Personalizar esta peça"). */
  customizable: boolean;
  /** Sem compra direta: só pelo WhatsApp. */
  whatsappOnly: boolean;
};

const LEAD = { min: 5, max: 8 };
const TIC_TAC_PACKAGE = { length: 14, width: 10, height: 2 };
const TIC_TAC_MATERIAL = "Tecido de linho, linha de bordado e base metálica forrada (provisório).";
const ORDER_NOTE =
  "Detalhes do pedido e datas de entrega são combinados com a gente pelo WhatsApp depois da compra.";

export const products: Product[] = [
  {
    slug: "tic-tac-ariel",
    name: "Parzinho tic tac Ariel",
    category: "tic-tacs",
    price: 7200,
    short: "Par de tic tacs bordados à mão com a Ariel, o Linguado e o fundo do mar.",
    description:
      "Duas presilhas tic tac em linho cru, bordadas à mão: uma com a sereia Ariel e outra com o Linguado, a concha e o caranguejo, com micro pérolas. Vem no cartão Little Lulli.",
    material: TIC_TAC_MATERIAL,
    details: ["Bordado 100% à mão", "Com micro pérolas", "Vendido em par"],
    images: ["/produtos/tic-tac-ariel.webp"],
    colors: [],
    sets: [{ id: "par", label: "Par", price: 7200 }],
    productionDays: LEAD,
    weightGrams: 40,
    package: TIC_TAC_PACKAGE,
    note: ORDER_NOTE,
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tic-tac-princesas",
    name: "Parzinho princesas",
    category: "tic-tacs",
    price: 6900,
    short: "Par de tic tacs com a sua princesa favorita bordada à mão.",
    description:
      "Par de tic tacs bordados à mão com uma princesa e seus detalhes encantados. Você escolhe a sua princesa favorita.",
    material: TIC_TAC_MATERIAL,
    details: ["Bordado 100% à mão", "Escolha a sua princesa favorita", "Vendido em par"],
    images: ["/produtos/tic-tac-princesas.webp"],
    colors: [],
    sets: [{ id: "par", label: "Par", price: 6900 }],
    productionDays: LEAD,
    weightGrams: 40,
    package: TIC_TAC_PACKAGE,
    note: "A princesa é escolhida pelo WhatsApp depois da compra (lista de princesas a consultar). " + ORDER_NOTE,
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tic-tac-fadinhas",
    name: "Parzinho fadinhas",
    category: "tic-tacs",
    price: 3400,
    short: "Fadinhas bordadas à mão em linho verde com fios dourados.",
    description:
      "Tic tacs em linho verde-oliva com fadinhas de tutu branco e asinhas douradas bordadas à mão. Vendido em par ou unidade.",
    material: TIC_TAC_MATERIAL,
    details: ["Bordado 100% à mão", "Detalhes em fio dourado", "Par ou unidade"],
    images: ["/produtos/tic-tac-fadinhas.webp"],
    colors: [],
    sets: [
      { id: "par", label: "Par", price: 6500 },
      { id: "unidade", label: "Unidade", price: 3400 },
    ],
    productionDays: LEAD,
    weightGrams: 40,
    package: TIC_TAC_PACKAGE,
    note: ORDER_NOTE,
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tic-tac-planetas",
    name: "Par tic tac planetas",
    category: "tic-tacs",
    price: 3600,
    short: "Planetas, estrelas e fio dourado bordados à mão.",
    description:
      "Tic tacs em linho claro com borda azul, bordados à mão com planetas coloridos, estrelinhas e fio dourado. Vendido em par ou unidade.",
    material: TIC_TAC_MATERIAL,
    details: ["Bordado 100% à mão", "Detalhes em fio dourado", "Par ou unidade"],
    images: ["/produtos/tic-tac-planetas.webp"],
    colors: [],
    sets: [
      { id: "par", label: "Par", price: 6900 },
      { id: "unidade", label: "Unidade", price: 3600 },
    ],
    productionDays: LEAD,
    weightGrams: 40,
    package: TIC_TAC_PACKAGE,
    note: ORDER_NOTE,
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tic-tac-ursinho",
    name: "Dupla de tic tac ursinho",
    category: "tic-tacs",
    price: 6200,
    short: "Ursinho de festa e florzinhas bordados à mão, na cor da sua escolha.",
    description:
      "Dupla de tic tacs: um com um ursinho de chapéu de festa e laço, outro com flores e folhinhas, tudo bordado à mão. A cor é da sua escolha.",
    material: TIC_TAC_MATERIAL,
    details: ["Bordado 100% à mão", "Cor à sua escolha", "Vendido em dupla"],
    images: ["/produtos/tic-tac-ursinho.webp"],
    colors: [],
    sets: [{ id: "par", label: "Dupla", price: 6200 }],
    productionDays: LEAD,
    weightGrams: 40,
    package: TIC_TAC_PACKAGE,
    note: "A cor é escolhida pelo WhatsApp depois da compra (cores disponíveis a consultar). " + ORDER_NOTE,
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tic-tac-bailarina",
    name: "Par tic tac Bailarina",
    category: "tic-tacs",
    price: 6500,
    short: "Bailarina e sapatilhas de ponta bordadas à mão, na cor da sua escolha.",
    description:
      "Par de tic tacs bordados à mão: uma bailarina de tutu e fios dourados e uma sapatilha de ponta com fitas. A cor do tecido é da sua escolha.",
    material: TIC_TAC_MATERIAL,
    details: ["Bordado 100% à mão", "Detalhes em fio dourado", "Cor à sua escolha", "Vendido em par"],
    images: [
      "/produtos/tic-tac-bailarina-pink.webp",
      "/produtos/tic-tac-bailarina-azul.webp",
      "/produtos/tic-tac-bailarina-rosa.webp",
    ],
    colors: [],
    sets: [{ id: "par", label: "Par", price: 6500 }],
    productionDays: LEAD,
    weightGrams: 40,
    package: TIC_TAC_PACKAGE,
    note: "A cor é escolhida pelo WhatsApp depois da compra (cores disponíveis a consultar). " + ORDER_NOTE,
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tic-tac-pet-love",
    name: "Tic tac Pet Love",
    category: "tic-tacs",
    price: 5500,
    short: "O rostinho do seu pet bordado à mão. Valor por unidade.",
    description:
      "Tic tac bordado à mão com o rostinho do seu pet e corações. Você envia a foto e a gente borda. O valor é por unidade.",
    material: TIC_TAC_MATERIAL,
    details: ["Bordado 100% à mão", "Feito a partir da foto do seu pet", "Valor referente a unidade"],
    images: ["/produtos/tic-tac-pet-love.webp"],
    colors: [],
    sets: [{ id: "unidade", label: "Unidade", price: 5500 }],
    productionDays: LEAD,
    weightGrams: 25,
    package: TIC_TAC_PACKAGE,
    note: "A foto do seu pet e as cores são combinadas pelo WhatsApp depois da compra. " + ORDER_NOTE,
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tic-tac-escolar",
    name: "Par tic tac escolar",
    category: "tic-tacs",
    price: 5900,
    short: "ABC, maçã e lápis bordados à mão para a volta às aulas.",
    description:
      "Par de tic tacs retangulares em tecido cinza-grafite, bordados à mão com letras, maçã, lápis e rabiscos coloridos. Ótimo para a volta às aulas.",
    material: TIC_TAC_MATERIAL,
    details: ["Bordado 100% à mão", "Tema escolar", "Vendido em par"],
    images: ["/produtos/tic-tac-escolar.webp"],
    colors: [],
    sets: [{ id: "par", label: "Par", price: 5900 }],
    productionDays: LEAD,
    weightGrams: 40,
    package: TIC_TAC_PACKAGE,
    note: ORDER_NOTE,
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "kit-laco-tic-tac-morango",
    name: "Laço + tic tac morango",
    category: "kits",
    price: 9900,
    short: "Laço e tic tac de linho com morangos, flores e barrinha de crochê.",
    description:
      "Kit com um laço e um tic tac em linho cru, bordados à mão com morangos, florzinhas e folhagens, com acabamento em barrinha de crochê.",
    material: "Linho, linha de bordado, barrinha de crochê e bases metálicas forradas (provisório).",
    details: ["Bordado 100% à mão", "Kit: 1 laço + 1 tic tac", "Acompanha cartão Little Lulli"],
    images: ["/produtos/kit-laco-tic-tac-morango.webp"],
    colors: [],
    sets: [{ id: "kit", label: "Kit", price: 9900 }],
    productionDays: LEAD,
    weightGrams: 60,
    package: { length: 16, width: 12, height: 4 },
    note: ORDER_NOTE,
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "kit-quarteto-fadinhas",
    name: "Quarteto fadinhas (laços + tic tacs)",
    category: "kits",
    price: 9990,
    short: "2 laços e 2 tic tacs com fadinhas, em verde-oliva.",
    description:
      "Quarteto em linho verde-oliva: dois laços lisos e dois tic tacs com fadinhas bordadas à mão, com detalhes em fio dourado.",
    material: "Linho, linha de bordado e bases metálicas forradas (provisório).",
    details: ["Bordado 100% à mão", "Kit: 2 laços + 2 tic tacs", "Acompanha cartão Little Lulli"],
    images: ["/produtos/kit-quarteto-fadinhas.webp"],
    colors: [],
    sets: [{ id: "kit", label: "Quarteto", price: 9990 }],
    productionDays: LEAD,
    weightGrams: 90,
    package: { length: 20, width: 12, height: 4 },
    note: ORDER_NOTE,
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tic-tac-sansao-nome",
    name: "Parzinho Sansão + nome",
    category: "tic-tacs",
    price: 7200,
    short: "Coelhinho Sansão de um lado e o nome da criança do outro.",
    description:
      "Par de tic tacs bordados à mão: um com o coelhinho Sansão e o outro com o nome da criança em letra cursiva.",
    material: TIC_TAC_MATERIAL,
    details: ["Bordado 100% à mão", "Nome da criança bordado", "Vendido em par"],
    images: ["/produtos/tic-tac-sansao-nome.webp"],
    colors: [],
    sets: [{ id: "par", label: "Par", price: 7200 }],
    productionDays: LEAD,
    weightGrams: 40,
    package: TIC_TAC_PACKAGE,
    note: "O nome e a cor do tecido são combinados pelo WhatsApp depois da compra. " + ORDER_NOTE,
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tic-tac-joaninha",
    name: "Parzinho joaninha",
    category: "tic-tacs",
    price: 6200,
    short: "Joaninha, florzinhas e cogumelo bordados em verde-musgo.",
    description:
      "Par de tic tacs retangulares em tecido verde-musgo, bordados à mão com uma joaninha, flores, folhas e um cogumelo.",
    material: TIC_TAC_MATERIAL,
    details: ["Bordado 100% à mão", "Vendido em par"],
    images: ["/produtos/tic-tac-joaninha.webp"],
    colors: [],
    sets: [{ id: "par", label: "Par", price: 6200 }],
    productionDays: LEAD,
    weightGrams: 40,
    package: TIC_TAC_PACKAGE,
    note: ORDER_NOTE,
    customizable: true,
    whatsappOnly: false,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/** Categorias/coleções que já têm peças (as vazias não aparecem no menu nem nos filtros). */
export const activeCategories = categories.filter((c) => products.some((p) => p.category === c.slug));
export const activeCollections = collections.filter((c) => products.some((p) => p.collection === c.slug));
