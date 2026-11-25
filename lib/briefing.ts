import { whatsappLink } from "@/lib/site";

export type Briefing = {
  id: string;
  createdAt: string;
  piece: string;
  collection: string;
  theme: string;
  embroideryText: string;
  colors: string;
  recipient: string;
  age: string;
  occasion: string;
  neededBy: string; // yyyy-mm-dd
  referenceImageName?: string;
  referenceProduct?: string;
  name: string;
  whatsapp: string;
  city: string;
};

const dash = (v?: string) => (v && v.trim() ? v.trim() : "—");

function formatDate(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/** Mensagem organizada que abre no WhatsApp (o número fica em lib/site.ts). */
export function briefingMessage(b: Briefing) {
  const lines = [
    "Olá, Little Lulli! Quero uma peça personalizada 🎀",
    "",
    `*Peça:* ${dash(b.piece)}${b.referenceProduct ? ` (base: ${b.referenceProduct})` : ""}`,
    `*Coleção de referência:* ${dash(b.collection)}`,
    `*Tema / desenho:* ${dash(b.theme)}`,
    `*Nome ou palavra a bordar:* ${dash(b.embroideryText)}`,
    `*Cores:* ${dash(b.colors)}`,
    `*Para quem:* ${dash(b.recipient)}${b.age ? `, ${b.age}` : ""}`,
    `*Ocasião:* ${dash(b.occasion)}`,
    `*Preciso até:* ${formatDate(b.neededBy)}`,
    b.referenceImageName
      ? `*Imagem de referência:* ${b.referenceImageName} (vou enviar aqui na conversa)`
      : "*Imagem de referência:* —",
    "",
    `*Meu nome:* ${b.name}`,
    `*WhatsApp:* ${b.whatsapp}`,
    `*Cidade:* ${b.city}`,
    "",
    `(Briefing ${b.id})`,
  ];
  return lines.join("\n");
}

export const briefingWhatsappLink = (b: Briefing) => whatsappLink(briefingMessage(b));
