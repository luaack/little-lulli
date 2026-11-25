import type { PaymentMethod } from "@/lib/payments";
import type { ShippingOption } from "@/lib/shipping";

export const ORDER_STAGES = [
  { id: "recebido", label: "Pedido recebido", hint: "Recebemos o seu pedido." },
  { id: "pago", label: "Pagamento confirmado", hint: "Pagamento aprovado." },
  { id: "bordado", label: "Em bordado", hint: "Suas peças estão sendo bordadas à mão." },
  { id: "acabamento", label: "Em acabamento", hint: "Revisão e acabamento final." },
  { id: "embalado", label: "Embalado", hint: "Embalado com carinho para envio." },
  { id: "postado", label: "Postado", hint: "A caminho! O código de rastreio chega por WhatsApp." },
] as const;

export type OrderItem = {
  slug: string;
  name: string;
  image: string;
  colorName?: string;
  setLabel?: string;
  qty: number;
  unit: number; // centavos
  productionDays: { min: number; max: number };
};

export type Order = {
  id: string;
  createdAt: string;
  customer: { name: string; email: string; whatsapp: string };
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
  };
  items: OrderItem[];
  shipping: ShippingOption;
  payment: {
    method: PaymentMethod;
    status: "paid" | "pending" | "failed";
    providerId: string;
    pixCode?: string;
    pixExpiresAt?: string;
    installments?: number;
  };
  subtotal: number;
  total: number;
  productionDays: { min: number; max: number };
  /** índice em ORDER_STAGES */
  stage: number;
};

export function newOrderId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `LL-${code}`;
}
