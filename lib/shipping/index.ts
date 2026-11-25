/*
 * FRETE — estrutura pronta para trocar o mock pelo Melhor Envio (Correios).
 *
 * Como plugar o Melhor Envio:
 *  1. Crie `lib/shipping/melhor-envio.ts` com uma classe que implemente `ShippingProvider`.
 *  2. A cotação (POST /api/v2/me/shipment/calculate) usa token privado: faça a chamada
 *     num Route Handler (`app/api/frete/route.ts`) — NUNCA no navegador — e envie
 *     { from: { postal_code }, to: { postal_code }, products: [{ width, height, length, weight, quantity }] }.
 *     Peso (kg) e medidas (cm) vêm de `data/products.ts` (weightGrams / package).
 *  3. Guarde o token em variável de ambiente na Vercel (ex.: MELHOR_ENVIO_TOKEN). Nunca no código.
 *  4. Troque `shippingProvider` abaixo pela nova implementação.
 */
export type ShippingItem = {
  weightGrams: number;
  package: { length: number; width: number; height: number };
  quantity: number;
};

export type ShippingOption = {
  id: string;
  label: string;
  /** centavos */
  price: number;
  /** prazo de transporte em dias úteis, depois de postado */
  days: { min: number; max: number };
};

export interface ShippingProvider {
  quote(input: { cep: string; items: ShippingItem[] }): Promise<ShippingOption[]>;
}

export const onlyDigits = (value: string) => value.replace(/\D/g, "");
export const isValidCep = (value: string) => onlyDigits(value).length === 8;
export const formatCep = (value: string) => {
  const d = onlyDigits(value).slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
};

import { mockShippingProvider } from "./mock";
export const shippingProvider: ShippingProvider = mockShippingProvider;
