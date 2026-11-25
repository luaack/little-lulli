"use client";

import { useState } from "react";
import type { DetailedLine } from "@/lib/cart";
import { isValidCep, shippingProvider, type ShippingOption } from "@/lib/shipping";

/** Cotação de frete a partir das linhas da sacola (mock hoje; Melhor Envio depois). */
export function useShippingQuote(lines: DetailedLine[]) {
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function quote(cep: string) {
    setError(null);
    if (!isValidCep(cep)) {
      setError("Digite um CEP com 8 números.");
      return [];
    }
    setLoading(true);
    try {
      const result = await shippingProvider.quote({
        cep,
        items: lines.map((l) => ({
          weightGrams: l.product.weightGrams,
          package: l.product.package,
          quantity: l.qty,
        })),
      });
      setOptions(result);
      return result;
    } catch {
      setError("Não foi possível calcular o frete agora. Tente de novo.");
      setOptions([]);
      return [];
    } finally {
      setLoading(false);
    }
  }

  return { options, loading, error, quote, reset: () => setOptions([]) };
}

/** "5 a 8 dias úteis" somando produção + transporte. */
export function deliveryWindow(production: { min: number; max: number }, shipping: { min: number; max: number }) {
  return { min: production.min + shipping.min, max: production.max + shipping.max };
}
