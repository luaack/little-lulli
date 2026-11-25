"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { BowMark } from "@/components/decor";
import { ShippingOptions } from "@/components/shop/shipping-options";
import { removeLine, setCartShipping, setLineQty, useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/money";
import { formatCep } from "@/lib/shipping";
import { deliveryWindow, useShippingQuote } from "@/lib/use-shipping";

export function CartView() {
  const { state, lines, totals } = useCart();
  const [cepInput, setCepInput] = useState<string | null>(null);
  const { options, loading, error, quote } = useShippingQuote(lines);
  // Reaproveita o último CEP digitado (vem da sacola salva) até a pessoa editar.
  const cep = cepInput ?? formatCep(state.cep ?? "");
  const setCep = setCepInput;

  if (lines.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-cocoa/20 p-12 text-center">
        <BowMark tone="blush" className="mx-auto w-20" />
        <p className="font-display mt-5 text-3xl text-cocoa">Sua sacola está vazia</p>
        <Link href="/loja" className="mt-6 inline-flex h-12 items-center rounded-full bg-cocoa px-7 font-medium text-linen">
          Ver a loja
        </Link>
      </div>
    );
  }

  const shipping = state.shipping;
  const total = totals.subtotal + (shipping?.price ?? 0);
  const eta = shipping ? deliveryWindow(totals.productionDays, shipping.days) : null;

  async function calculate(e: React.FormEvent) {
    e.preventDefault();
    await quote(cep);
    // Frete anterior não vale mais para o novo CEP.
    setCartShipping(cep, undefined);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ul className="space-y-6 lg:col-span-7">
        {lines.map((line) => (
          <li key={line.key} className="flex gap-4 border-b border-dashed border-cocoa/15 pb-6">
            <Link href={`/produto/${line.slug}`} className="relative size-28 shrink-0 overflow-hidden rounded-2xl bg-blush md:size-32">
              <Image src={line.product.images[0]} alt="" fill sizes="128px" className="object-cover" />
            </Link>
            <div className="flex-1">
              <Link href={`/produto/${line.slug}`} className="font-display text-xl text-cocoa md:text-2xl">
                {line.product.name}
              </Link>
              <p className="mt-1 text-sm text-cocoa-soft">
                {[line.colorName, line.setLabel].filter(Boolean).join(" · ") || "Peça única"} · {formatBRL(line.unit)} cada
              </p>
              <p className="text-sm text-cocoa-soft">
                Produção: {line.product.productionDays.min} a {line.product.productionDays.max} dias úteis
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="inline-flex items-center rounded-full border border-cocoa/15">
                  <button type="button" aria-label={`Diminuir quantidade de ${line.product.name}`} onClick={() => setLineQty(line.key, line.qty - 1)} className="grid size-11 place-items-center">
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-7 text-center tabular-nums" aria-live="polite">{line.qty}</span>
                  <button type="button" aria-label={`Aumentar quantidade de ${line.product.name}`} onClick={() => setLineQty(line.key, line.qty + 1)} className="grid size-11 place-items-center">
                    <Plus className="size-4" />
                  </button>
                </div>
                <span className="font-medium tabular-nums text-cocoa">{formatBRL(line.total)}</span>
              </div>
              <button type="button" onClick={() => removeLine(line.key)} className="mt-3 text-sm text-rose-ink underline underline-offset-4">
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside className="lg:col-span-5">
        <div className="space-y-6 rounded-[2rem] border border-cocoa/10 bg-cream/60 p-6 md:p-8 lg:sticky lg:top-28">
          <form onSubmit={calculate} noValidate>
            <label htmlFor="cep" className="font-medium text-cocoa">Calcular frete</label>
            <div className="mt-2 flex gap-2">
              <input
                id="cep"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="00000-000"
                value={cep}
                onChange={(e) => setCep(formatCep(e.target.value))}
                aria-invalid={!!error}
                aria-describedby={error ? "cep-erro" : undefined}
                className="h-12 min-w-0 flex-1 rounded-full border border-cocoa/20 bg-linen px-5 text-cocoa"
              />
              <button type="submit" disabled={loading} className="h-12 rounded-full bg-cocoa px-6 font-medium text-linen disabled:opacity-60">
                {loading ? "Calculando…" : "Calcular"}
              </button>
            </div>
            {error && <p id="cep-erro" role="alert" className="mt-2 text-sm text-[#b4363c]">{error}</p>}
            <p className="mt-2 text-xs text-cocoa-soft">Frete simulado — os valores reais virão da transportadora.</p>
          </form>

          {options.length > 0 && (
            <ShippingOptions
              name="frete-carrinho"
              options={options}
              value={shipping?.id}
              onChange={(o) => setCartShipping(cep, o)}
              production={totals.productionDays}
            />
          )}

          <dl className="space-y-2 border-t border-dashed border-cocoa/20 pt-5">
            <div className="flex justify-between"><dt className="text-cocoa-soft">Subtotal</dt><dd className="tabular-nums">{formatBRL(totals.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-cocoa-soft">Frete</dt><dd className="tabular-nums">{shipping ? formatBRL(shipping.price) : "—"}</dd></div>
            <div className="flex items-baseline justify-between pt-2"><dt className="font-medium">Total</dt><dd className="font-display text-3xl text-cocoa">{formatBRL(total)}</dd></div>
          </dl>
          <p className="text-sm text-cocoa-soft">
            {eta
              ? `Previsão: pedido pronto e entregue em ${eta.min} a ${eta.max} dias úteis após o pagamento.`
              : `Produção: ${totals.productionDays.min} a ${totals.productionDays.max} dias úteis, mais o prazo do frete.`}
          </p>
          <Link href="/checkout" className="flex h-14 items-center justify-center rounded-full bg-cocoa font-medium text-linen">
            Finalizar compra
          </Link>
          <Link href="/loja" className="block text-center text-sm text-cocoa-soft underline underline-offset-4">
            Continuar comprando
          </Link>
        </div>
      </aside>
    </div>
  );
}
