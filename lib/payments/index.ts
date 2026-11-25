/*
 * PAGAMENTOS — estrutura pronta para trocar o mock por Mercado Pago ou Asaas.
 *
 * Como plugar um provedor real (resumo):
 *  1. Crie `lib/payments/mercado-pago.ts` ou `asaas.ts` implementando `PaymentProvider`.
 *  2. Toda chamada ao provedor que usa a CHAVE SECRETA acontece no SERVIDOR (Route Handler,
 *     ex.: `app/api/pagamentos/route.ts`). O navegador só envia o pedido e recebe o QR Code
 *     do Pix / o resultado do cartão. A chave fica em variável de ambiente na Vercel
 *     (MERCADOPAGO_ACCESS_TOKEN ou ASAAS_API_KEY). Nunca no código.
 *  3. Cartão: use o componente/tokenização do próprio provedor (Card Brick, Asaas
 *     tokenização). O número do cartão NUNCA passa pelo nosso servidor nem é guardado.
 *  4. O valor cobrado é recalculado no servidor a partir do catálogo, nunca confiando no
 *     total vindo do navegador.
 *  5. WEBHOOK: crie `app/api/pagamentos/webhook/route.ts` para receber a confirmação do
 *     provedor (valide a assinatura!), marcar o pedido como "pago" no banco e disparar o
 *     evento Purchase (ver `lib/analytics.ts`). O navegador nunca decide que algo foi pago.
 */
export type PaymentMethod = "pix" | "card";

export type ChargeRequest = {
  orderId: string;
  /** centavos */
  amount: number;
  method: PaymentMethod;
  customer: { name: string; email: string };
  /** Só para o mock; um provedor real usa tokenização e este campo não existe. */
  card?: { installments: number };
};

export type ChargeResult = {
  status: "paid" | "pending" | "failed";
  providerId: string;
  /** Pix "copia e cola" (fictício no mock) */
  pixCode?: string;
  /** Validade do Pix, ISO */
  pixExpiresAt?: string;
  message?: string;
};

export interface PaymentProvider {
  createCharge(request: ChargeRequest): Promise<ChargeResult>;
  /** Consulta o status (no real: o webhook atualiza o pedido; isto serve de apoio). */
  getStatus(providerId: string): Promise<ChargeResult["status"]>;
}

import { mockPaymentProvider } from "./mock";
export const paymentProvider: PaymentProvider = mockPaymentProvider;
