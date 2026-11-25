import { onlyDigits, type ShippingOption, type ShippingProvider } from "./index";

/*
 * MOCK — valores e prazos INVENTADOS para testar a interface.
 * Regra fictícia: preço base por região (1º dígito do CEP) + valor por 100 g.
 */
const REGION_BASE: Record<string, { price: number; days: number }> = {
  "0": { price: 1590, days: 3 },
  "1": { price: 1590, days: 3 },
  "2": { price: 1790, days: 4 },
  "3": { price: 1790, days: 4 },
  "4": { price: 2190, days: 6 },
  "5": { price: 2190, days: 6 },
  "6": { price: 2590, days: 8 },
  "7": { price: 1990, days: 5 },
  "8": { price: 1990, days: 5 },
  "9": { price: 2290, days: 6 },
};

export const mockShippingProvider: ShippingProvider = {
  async quote({ cep, items }) {
    await new Promise((r) => setTimeout(r, 450)); // simula a latência da API
    const digits = onlyDigits(cep);
    if (digits.length !== 8) throw new Error("CEP inválido");
    const region = REGION_BASE[digits[0]] ?? REGION_BASE["7"];
    const grams = items.reduce((n, i) => n + i.weightGrams * i.quantity, 0);
    const extra = Math.ceil(grams / 100) * 60;
    const pac: ShippingOption = {
      id: "pac-mock",
      label: "PAC (simulado)",
      price: region.price + extra,
      days: { min: region.days, max: region.days + 3 },
    };
    const sedex: ShippingOption = {
      id: "sedex-mock",
      label: "SEDEX (simulado)",
      price: Math.round((region.price + extra) * 1.8),
      days: { min: Math.max(1, Math.ceil(region.days / 2)), max: Math.max(2, Math.ceil(region.days / 2) + 1) },
    };
    return [pac, sedex];
  },
};
