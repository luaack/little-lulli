/*
 * ============================================================================
 *  CATÁLOGO PROVISÓRIO — TODOS OS DADOS DESTE ARQUIVO SÃO FICTÍCIOS.
 *  Nomes, preços, pesos, medidas de embalagem e prazos são apenas exemplos
 *  para testar a loja. As fotos são as fotos reais do site (uma mesma foto
 *  aparece em mais de uma peça). Troque tudo pelos dados reais depois.
 *  Preços em CENTAVOS (3990 = R$ 39,90).
 * ============================================================================
 */
import type { CategorySlug, CollectionSlug } from "@/lib/site";

export type ColorOption = { id: string; name: string; hex: string };
export type SetOption = { id: "par" | "unidade"; label: string; price: number };

export type Product = {
  slug: string;
  name: string;
  collection: CollectionSlug;
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
  /** Aceita bordado personalizado ("Personalizar esta peça"). */
  customizable: boolean;
  /** Sem compra direta: só pelo WhatsApp. */
  whatsappOnly: boolean;
};

const PAR_UNIDADE = (par: number, unidade: number): SetOption[] => [
  { id: "par", label: "Par", price: par },
  { id: "unidade", label: "Unidade", price: unidade },
];

const rose = { id: "rose", name: "Rosé", hex: "#d49a9c" };
const mint = { id: "menta", name: "Menta", hex: "#8ecfc1" };
const cream = { id: "creme", name: "Creme", hex: "#f3e8d8" };
const mostarda = { id: "mostarda", name: "Mostarda", hex: "#c8902e" };
const terracota = { id: "terracota", name: "Terracota", hex: "#c57457" };

export const products: Product[] = [
  // ------------------------------ Jardim Encantado ------------------------------
  {
    slug: "tic-tac-floral-rose",
    name: "Tic tac Floral Rosé",
    collection: "jardim-encantado",
    category: "tic-tacs",
    price: 2490,
    short: "Linho rosé com florzinhas bordadas em ponto nó.",
    description:
      "Presilha tic tac forrada em linho rosé e bordada à mão com florzinhas em rosa, menta e creme. Leve, macia e sem pontas, não machuca os fios.",
    material: "Linho, linha de algodão e base metálica forrada (provisório).",
    details: ["Bordado 100% à mão", "Sem pontas, indicada para fios finos", "Acompanha embalagem presente"],
    images: ["/colecao-1.jpeg", "/hero-bows.png"],
    colors: [rose, cream],
    sets: PAR_UNIDADE(4490, 2490),
    productionDays: { min: 5, max: 8 },
    weightGrams: 40,
    package: { length: 14, width: 10, height: 2 },
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tic-tac-botao-de-rosa",
    name: "Tic tac Botão de Rosa",
    collection: "jardim-encantado",
    category: "tic-tacs",
    price: 2790,
    short: "Botões de rosa e folhinhas menta, bordados à mão.",
    description:
      "Tic tac com botões de rosa em tons de pêssego e folhinhas em menta. Combina com o laço da coleção Jardim Encantado.",
    material: "Linho, linha de algodão e base metálica forrada (provisório).",
    details: ["Bordado 100% à mão", "Combina com a faixa Jardim", "Acompanha embalagem presente"],
    images: ["/colecao-1.jpeg"],
    colors: [rose, mint],
    sets: PAR_UNIDADE(4790, 2790),
    productionDays: { min: 5, max: 8 },
    weightGrams: 40,
    package: { length: 14, width: 10, height: 2 },
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tiara-jardim-encantado",
    name: "Tiara Jardim Encantado",
    collection: "jardim-encantado",
    category: "tiaras",
    price: 5990,
    short: "Tiara estofada com bordado floral nas laterais.",
    description:
      "Tiara macia, estofada e forrada em linho rosé, com ramos de flores bordados nas laterais. Conforto para o dia todo.",
    material: "Linho, enchimento de poliéster e base plástica flexível (provisório).",
    details: ["Bordado 100% à mão", "Base flexível e confortável", "Tamanho único infantil"],
    images: ["/colecao-1.jpeg", "/hero-bows.png"],
    colors: [rose, cream],
    sets: [],
    productionDays: { min: 7, max: 10 },
    weightGrams: 70,
    package: { length: 18, width: 14, height: 5 },
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "faixa-laco-rose",
    name: "Faixa Laço Rosé",
    collection: "jardim-encantado",
    category: "faixas",
    price: 4990,
    short: "Faixinha de laço em linho com bordado floral.",
    description:
      "Faixa de malha elástica e macia com laço em linho rosé bordado à mão. Ideal para bebês e primeiros cabelinhos.",
    material: "Malha elástica, linho e linha de algodão (provisório).",
    details: ["Elástico macio, não marca", "Bordado 100% à mão", "Tamanhos RN, P e M (a definir)"],
    images: ["/colecao-1.jpeg", "/hero-bows.png"],
    colors: [rose, cream, mint],
    sets: [],
    productionDays: { min: 5, max: 8 },
    weightGrams: 35,
    package: { length: 14, width: 10, height: 2 },
    customizable: true,
    whatsappOnly: false,
  },

  // -------------------------------- Laços de Flor --------------------------------
  {
    slug: "tic-tac-margarida",
    name: "Tic tac Margarida",
    collection: "lacos-de-flor",
    category: "tic-tacs",
    price: 2790,
    short: "Margarida grande ao centro, florzinhas em volta.",
    description:
      "O par mais pedido: duas presilhas tic tac em terracota com uma margarida bordada que “se encontra” quando as duas ficam juntas.",
    material: "Linho, linha de algodão e base metálica forrada (provisório).",
    details: ["Bordado 100% à mão", "Margarida se completa no par", "Vem no cartão com coração"],
    images: ["/colecao-2.jpeg"],
    colors: [terracota, rose],
    sets: PAR_UNIDADE(4790, 2790),
    productionDays: { min: 5, max: 8 },
    weightGrams: 40,
    package: { length: 14, width: 10, height: 2 },
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tic-tac-mini-flores",
    name: "Tic tac Mini Flores",
    collection: "lacos-de-flor",
    category: "tic-tacs",
    price: 2290,
    short: "Versão mini, para cabelinhos de bebê.",
    description:
      "Tic tac menor, perfeito para os primeiros fios, com minifloreszinhas bordadas em menta e pêssego.",
    material: "Linho, linha de algodão e base metálica forrada (provisório).",
    details: ["Tamanho mini", "Bordado 100% à mão", "Acompanha embalagem presente"],
    images: ["/colecao-2.jpeg", "/colecao-1.jpeg"],
    colors: [mint, rose, cream],
    sets: PAR_UNIDADE(3990, 2290),
    productionDays: { min: 5, max: 8 },
    weightGrams: 30,
    package: { length: 14, width: 10, height: 2 },
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tiara-margarida",
    name: "Tiara Margarida",
    collection: "lacos-de-flor",
    category: "tiaras",
    price: 6490,
    short: "Tiara com margaridas bordadas e acabamento macio.",
    description:
      "Tiara estofada com margaridas bordadas à mão em fio creme e miolo dourado. Leve e delicada.",
    material: "Linho, enchimento de poliéster e base plástica flexível (provisório).",
    details: ["Bordado 100% à mão", "Base flexível", "Tamanho único infantil"],
    images: ["/colecao-2.jpeg", "/hero-bows.png"],
    colors: [terracota, cream],
    sets: [],
    productionDays: { min: 7, max: 10 },
    weightGrams: 70,
    package: { length: 18, width: 14, height: 5 },
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "faixa-laco-de-flor",
    name: "Faixa Laço de Flor",
    collection: "lacos-de-flor",
    category: "faixas",
    price: 5290,
    short: "Faixa elástica com laço e flor bordada.",
    description:
      "Faixa macia com laço em linho e uma flor bordada à mão no centro. Fica no lugar sem apertar.",
    material: "Malha elástica, linho e linha de algodão (provisório).",
    details: ["Elástico macio", "Bordado 100% à mão", "Tamanhos RN, P e M (a definir)"],
    images: ["/hero-bows.png", "/colecao-2.jpeg"],
    colors: [cream, rose, mint],
    sets: [],
    productionDays: { min: 5, max: 8 },
    weightGrams: 35,
    package: { length: 14, width: 10, height: 2 },
    customizable: true,
    whatsappOnly: false,
  },

  // ----------------------------- Amigos da Floresta -----------------------------
  {
    slug: "tic-tac-raposinha",
    name: "Tic tac Raposinha",
    collection: "amigos-da-floresta",
    category: "tic-tacs",
    price: 3490,
    short: "Raposinha dormindo bordada em veludo off-white.",
    description:
      "Tic tac em veludo off-white com uma raposinha dormindo bordada à mão, cercada de folhinhas e florzinhas.",
    material: "Veludo, linha de algodão e base metálica forrada (provisório).",
    details: ["Bordado 100% à mão", "Veludo macio", "Acompanha embalagem presente"],
    images: ["/colecao-3.jpeg", "/colecao-4.jpeg"],
    colors: [cream],
    sets: PAR_UNIDADE(5990, 3490),
    productionDays: { min: 8, max: 12 },
    weightGrams: 45,
    package: { length: 14, width: 10, height: 2 },
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tic-tac-veludo-mostarda",
    name: "Tic tac Veludo Mostarda",
    collection: "amigos-da-floresta",
    category: "tic-tacs",
    price: 3290,
    short: "Veludo mostarda com flores e ramos bordados.",
    description:
      "Tic tac em veludo mostarda com flores brancas e ramos bordados à mão. Tom outonal que combina com tudo.",
    material: "Veludo, linha de algodão e base metálica forrada (provisório).",
    details: ["Bordado 100% à mão", "Veludo macio", "Acompanha embalagem presente"],
    images: ["/colecao-3.jpeg", "/colecao-4.jpeg"],
    colors: [mostarda],
    sets: PAR_UNIDADE(5690, 3290),
    productionDays: { min: 8, max: 12 },
    weightGrams: 45,
    package: { length: 14, width: 10, height: 2 },
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "tiara-bosque",
    name: "Tiara Bosque",
    collection: "amigos-da-floresta",
    category: "tiaras",
    price: 6990,
    short: "Tiara de veludo com folhagens bordadas.",
    description:
      "Tiara estofada em veludo com folhagens e florzinhas bordadas. Para dias de passeio no bosque (ou no parquinho).",
    material: "Veludo, enchimento de poliéster e base plástica flexível (provisório).",
    details: ["Bordado 100% à mão", "Base flexível", "Tamanho único infantil"],
    images: ["/colecao-3.jpeg", "/colecao-4.jpeg"],
    colors: [mostarda, cream],
    sets: [],
    productionDays: { min: 8, max: 12 },
    weightGrams: 75,
    package: { length: 18, width: 14, height: 5 },
    customizable: true,
    whatsappOnly: false,
  },
  {
    slug: "faixa-veludo-floresta",
    name: "Faixa Veludo Floresta",
    collection: "amigos-da-floresta",
    category: "faixas",
    price: 5490,
    short: "Faixa de veludo com laço e florzinhas.",
    description:
      "Faixa elástica com laço de veludo e florzinhas bordadas à mão. Quentinha e delicada.",
    material: "Malha elástica, veludo e linha de algodão (provisório).",
    details: ["Elástico macio", "Veludo macio", "Tamanhos RN, P e M (a definir)"],
    images: ["/hero-bows.png", "/colecao-3.jpeg"],
    colors: [mostarda, terracota],
    sets: [],
    productionDays: { min: 6, max: 10 },
    weightGrams: 40,
    package: { length: 14, width: 10, height: 2 },
    customizable: true,
    whatsappOnly: false,
  },

  // --------------------------- Só por WhatsApp (sob consulta) ---------------------------
  {
    slug: "tic-tac-bicho-do-bosque-sob-encomenda",
    name: "Tic tac Bichinho do Bosque (sob encomenda)",
    collection: "amigos-da-floresta",
    category: "tic-tacs",
    price: 4990,
    short: "Bichinho bordado à sua escolha — só pelo WhatsApp.",
    description:
      "Você escolhe o bichinho (raposa, coelho, ursinho…) e conversamos sobre cores e detalhes. Valor final combinado no WhatsApp.",
    material: "Veludo ou linho, linha de algodão e base metálica forrada (provisório).",
    details: ["Desenho exclusivo", "Orçamento e prazo combinados no WhatsApp", "Pagamento combinado no atendimento"],
    images: ["/colecao-4.jpeg", "/colecao-3.jpeg"],
    colors: [],
    sets: [],
    productionDays: { min: 12, max: 20 },
    weightGrams: 45,
    package: { length: 14, width: 10, height: 2 },
    customizable: true,
    whatsappOnly: true,
  },
  {
    slug: "faixa-cerimonia-sob-consulta",
    name: "Faixa Cerimônia (sob consulta)",
    collection: "lacos-de-flor",
    category: "faixas",
    price: 8900,
    short: "Peça especial para batizados e festas — só pelo WhatsApp.",
    description:
      "Faixa especial para batizado, aniversário ou ensaio fotográfico, feita sob medida e combinando com a roupinha. Valor e prazo combinados no WhatsApp.",
    material: "A combinar (provisório).",
    details: ["Feita sob medida", "Orçamento e prazo combinados no WhatsApp"],
    images: ["/hero-bows.png"],
    colors: [],
    sets: [],
    productionDays: { min: 15, max: 25 },
    weightGrams: 50,
    package: { length: 16, width: 12, height: 3 },
    customizable: true,
    whatsappOnly: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
