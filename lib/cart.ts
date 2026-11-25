"use client";

/*
 * Sacola salva no navegador (localStorage). Guarda só o que o cliente escolheu;
 * nome e preço são sempre lidos do catálogo na hora de exibir, então mudar o
 * catálogo atualiza a sacola. Quando houver backend, o preço deve ser
 * recalculado no servidor também (nunca confie no preço vindo do navegador).
 */
import { getProduct, type Product } from "@/data/products";
import { createLocalStore } from "@/lib/storage/local-store";
import type { ShippingOption } from "@/lib/shipping";

export type CartLine = {
  /** slug + cor + conjunto — identifica a linha */
  key: string;
  slug: string;
  colorId?: string;
  setId?: "par" | "unidade";
  qty: number;
};

export type CartState = {
  lines: CartLine[];
  /** Último CEP digitado (sobrevive a mudanças na sacola). */
  cep?: string;
  /** Opção de frete escolhida na sacola (simulado); some quando a sacola muda. */
  shipping?: ShippingOption;
};

const empty: CartState = { lines: [] };
export const cartStore = createLocalStore<CartState>("lulli-loja:cart", empty);
export const useCartState = cartStore.use;

export const MAX_QTY = 20;

export const lineKey = (slug: string, colorId?: string, setId?: string) =>
  [slug, colorId ?? "-", setId ?? "-"].join("|");

export function unitPrice(product: Product, setId?: string) {
  const set = product.sets.find((s) => s.id === setId);
  return set ? set.price : product.price;
}

export function addToCart(input: Omit<CartLine, "key">) {
  const key = lineKey(input.slug, input.colorId, input.setId);
  cartStore.update((state) => {
    const existing = state.lines.find((l) => l.key === key);
    const lines = existing
      ? state.lines.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + input.qty) } : l))
      : [...state.lines, { ...input, key }];
    // O frete depende do conteúdo da sacola: refaz a cotação.
    return { ...state, lines, shipping: undefined };
  });
}

export function setLineQty(key: string, qty: number) {
  cartStore.update((state) => ({
    ...state,
    lines: state.lines
      .map((l) => (l.key === key ? { ...l, qty: Math.max(0, Math.min(MAX_QTY, qty)) } : l))
      .filter((l) => l.qty > 0),
    shipping: undefined,
  }));
}

export const removeLine = (key: string) => setLineQty(key, 0);
export const clearCart = () => cartStore.set(empty);
export const setCartShipping = (cep: string, shipping?: ShippingOption) =>
  cartStore.update((state) => ({ ...state, cep, shipping }));

export type DetailedLine = CartLine & {
  product: Product;
  unit: number;
  total: number;
  colorName?: string;
  setLabel?: string;
};

export function detailLines(lines: CartLine[]): DetailedLine[] {
  return lines.flatMap((line) => {
    const product = getProduct(line.slug);
    if (!product || product.whatsappOnly) return [];
    const unit = unitPrice(product, line.setId);
    return [
      {
        ...line,
        product,
        unit,
        total: unit * line.qty,
        colorName: product.colors.find((c) => c.id === line.colorId)?.name,
        setLabel: product.sets.find((s) => s.id === line.setId)?.label,
      },
    ];
  });
}

export function cartTotals(lines: DetailedLine[]) {
  return {
    count: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((n, l) => n + l.total, 0),
    weightGrams: lines.reduce((n, l) => n + l.product.weightGrams * l.qty, 0),
    productionDays: lines.reduce(
      (acc, l) => ({
        min: Math.max(acc.min, l.product.productionDays.min),
        max: Math.max(acc.max, l.product.productionDays.max),
      }),
      { min: 0, max: 0 },
    ),
  };
}

/** Hook de leitura: linhas já detalhadas + totais. */
export function useCart() {
  const state = useCartState();
  const lines = detailLines(state.lines);
  return { state, lines, totals: cartTotals(lines) };
}
