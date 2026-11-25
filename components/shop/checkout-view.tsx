"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ShippingOptions } from "@/components/shop/shipping-options";
import { track } from "@/lib/analytics";
import { cartTotals, clearCart, setCartShipping, useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/money";
import { newOrderId, type Order } from "@/lib/orders";
import { paymentProvider, type PaymentMethod } from "@/lib/payments";
import { formatCep, isValidCep, onlyDigits } from "@/lib/shipping";
import { orderRepository } from "@/lib/storage";
import { deliveryWindow, useShippingQuote } from "@/lib/use-shipping";
import { cn } from "@/lib/utils";

const UFS = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" ");

const inputClass =
  "h-12 w-full rounded-2xl border border-cocoa/20 bg-linen px-4 text-cocoa placeholder:text-cocoa/40";

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-cocoa">{label}</span>
      {children}
    </label>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-cocoa/10 bg-cream/50 p-6 md:p-8">
      <h2 className="font-display flex items-baseline gap-3 text-2xl text-cocoa">
        <span className="font-sans text-xs tabular-nums text-rose-ink">0{n}</span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function CheckoutView() {
  const router = useRouter();
  const { state, lines, totals } = useCart();
  const { options, loading, error: cepError, quote } = useShippingQuote(lines);

  const [cepInput, setCepInput] = useState<string | null>(null);
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [method, setMethod] = useState<PaymentMethod>("pix");
  const [installments, setInstallments] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [finished, setFinished] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const cep = cepInput ?? formatCep(state.cep ?? "");
  // Mostra o frete escolhido na sacola enquanto o CEP não for recotado aqui.
  const shippingOptions = options.length ? options : state.shipping ? [state.shipping] : [];
  const selectedId = chosenId ?? state.shipping?.id;
  const shipping = shippingOptions.find((o) => o.id === selectedId);
  const total = totals.subtotal + (shipping?.price ?? 0);

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current || lines.length === 0) return;
    tracked.current = true;
    track("InitiateCheckout", {
      content_ids: lines.map((l) => l.slug),
      contents: lines.map((l) => ({ id: l.slug, quantity: l.qty })),
      num_items: totals.count,
      value: totals.subtotal / 100,
      currency: "BRL",
    });
  }, [lines, totals.count, totals.subtotal]);

  if (finished) return <p role="status" className="text-lg text-cocoa-soft">Pedido criado! Abrindo o acompanhamento…</p>;

  if (lines.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-cocoa/20 p-12 text-center">
        <p className="font-display text-3xl text-cocoa">Sua sacola está vazia</p>
        <Link href="/loja" className="mt-6 inline-flex h-12 items-center rounded-full bg-cocoa px-7 font-medium text-linen">
          Ver a loja
        </Link>
      </div>
    );
  }

  function onCepChange(value: string) {
    const formatted = formatCep(value);
    setCepInput(formatted);
    if (isValidCep(formatted)) {
      setChosenId(null);
      void quote(formatted).then((result) => {
        // Se a opção escolhida antes continua existindo, mantém; senão deixa escolher de novo.
        if (!result.some((o) => o.id === state.shipping?.id)) setChosenId("");
        setCartShipping(formatted, undefined);
      });
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    if (!shipping) {
      setFormError("Informe o CEP e escolha uma opção de entrega.");
      return;
    }
    setSubmitting(true);
    const id = newOrderId();
    try {
      const charge = await paymentProvider.createCharge({
        orderId: id,
        amount: total,
        method,
        customer: { name: get("nome"), email: get("email") },
        card: method === "card" ? { installments } : undefined,
      });
      if (charge.status === "failed") {
        setFormError(charge.message ?? "Pagamento não aprovado. Tente outro meio de pagamento.");
        setSubmitting(false);
        return;
      }
      const order: Order = {
        id,
        createdAt: new Date().toISOString(),
        customer: { name: get("nome"), email: get("email"), whatsapp: get("whatsapp") },
        address: {
          cep,
          street: get("rua"),
          number: get("numero"),
          complement: get("complemento") || undefined,
          district: get("bairro"),
          city: get("cidade"),
          state: get("uf"),
        },
        items: lines.map((l) => ({
          slug: l.slug,
          name: l.product.name,
          image: l.product.images[0],
          colorName: l.colorName,
          setLabel: l.setLabel,
          qty: l.qty,
          unit: l.unit,
          productionDays: l.product.productionDays,
        })),
        shipping,
        payment: {
          method,
          status: charge.status,
          providerId: charge.providerId,
          pixCode: charge.pixCode,
          pixExpiresAt: charge.pixExpiresAt,
          installments: method === "card" ? installments : undefined,
        },
        subtotal: cartTotals(lines).subtotal,
        total,
        productionDays: totals.productionDays,
        stage: charge.status === "paid" ? 1 : 0,
      };
      await orderRepository.create(order);
      // Compra por cartão aprovada. (No sistema real, o Purchase vem do webhook do provedor.)
      if (charge.status === "paid") {
        track("Purchase", {
          content_ids: order.items.map((i) => i.slug),
          num_items: totals.count,
          value: total / 100,
          currency: "BRL",
        });
      }
      setFinished(true);
      clearCart();
      router.push(`/pedido/${id}`);
    } catch {
      setFormError("Algo deu errado ao criar o pedido de teste. Tente novamente.");
      setSubmitting(false);
    }
  }

  const eta = shipping ? deliveryWindow(totals.productionDays, shipping.days) : null;

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-7">
        <Section n={1} title="Seus dados">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome completo" className="sm:col-span-2">
              <input name="nome" required autoComplete="name" className={inputClass} />
            </Field>
            <Field label="E-mail">
              <input name="email" type="email" required autoComplete="email" className={inputClass} />
            </Field>
            <Field label="WhatsApp">
              <input name="whatsapp" type="tel" required autoComplete="tel" inputMode="tel" placeholder="(61) 90000-0000"
                pattern="\(?\d{2}\)?\s?9?\d{4}-?\d{4}" title="DDD + número, ex.: (61) 99999-9999" className={inputClass} />
            </Field>
          </div>
        </Section>

        <Section n={2} title="Endereço de entrega">
          <div className="grid gap-4 sm:grid-cols-6">
            <Field label="CEP" className="sm:col-span-2">
              <input name="cep" required inputMode="numeric" autoComplete="postal-code" placeholder="00000-000"
                value={cep} onChange={(e) => onCepChange(e.target.value)} pattern="\d{5}-?\d{3}" className={inputClass} />
            </Field>
            <Field label="Rua" className="sm:col-span-4">
              <input name="rua" required autoComplete="address-line1" className={inputClass} />
            </Field>
            <Field label="Número" className="sm:col-span-2">
              <input name="numero" required inputMode="numeric" className={inputClass} />
            </Field>
            <Field label="Complemento (opcional)" className="sm:col-span-4">
              <input name="complemento" autoComplete="address-line2" className={inputClass} />
            </Field>
            <Field label="Bairro" className="sm:col-span-3">
              <input name="bairro" required className={inputClass} />
            </Field>
            <Field label="Cidade" className="sm:col-span-2">
              <input name="cidade" required autoComplete="address-level2" className={inputClass} />
            </Field>
            <Field label="UF" className="sm:col-span-1">
              <select name="uf" required defaultValue="" className={inputClass}>
                <option value="" disabled>UF</option>
                {UFS.map((u) => <option key={u}>{u}</option>)}
              </select>
            </Field>
          </div>
        </Section>

        <Section n={3} title="Entrega">
          {loading && <p role="status" className="text-cocoa-soft">Calculando frete…</p>}
          {cepError && <p role="alert" className="text-[#b4363c]">{cepError}</p>}
          {shippingOptions.length > 0 ? (
            <ShippingOptions
              name="frete"
              options={shippingOptions}
              value={selectedId}
              onChange={(o) => {
                setChosenId(o.id);
                setCartShipping(cep, o);
              }}
              production={totals.productionDays}
            />
          ) : (
            !loading && <p className="text-cocoa-soft">Digite o CEP acima para ver as opções de entrega.</p>
          )}
          <p className="mt-3 text-xs text-cocoa-soft">Frete simulado — valores e prazos fictícios.</p>
        </Section>

        <Section n={4} title="Pagamento (simulado)">
          <fieldset>
            <legend className="sr-only">Forma de pagamento</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {([["pix", "Pix", "Aprovação na hora"], ["card", "Cartão de crédito", "Até 3x sem juros"]] as const).map(([id, label, hint]) => (
                <label key={id} className="cursor-pointer">
                  <input type="radio" name="metodo" value={id} checked={method === id} onChange={() => setMethod(id)} className="peer sr-only" />
                  <span className="block rounded-2xl border border-cocoa/15 bg-linen px-4 py-3.5 peer-checked:border-cocoa peer-checked:bg-blush/40 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose-deep">
                    <span className="block font-medium text-cocoa">{label}</span>
                    <span className="text-sm text-cocoa-soft">{hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {method === "card" ? (
            <div className="mt-5 space-y-4">
              <p className="rounded-2xl bg-gold/20 px-4 py-3 text-sm text-cocoa">
                <strong>Não digite dados reais de cartão.</strong> Esta etapa é simulada: use qualquer número de teste
                (ex.: 4111 1111 1111 1111). Nada é enviado nem guardado.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Número do cartão" className="sm:col-span-2">
                  <input required inputMode="numeric" autoComplete="off" placeholder="4111 1111 1111 1111" pattern="[\d\s]{13,23}" className={inputClass} />
                </Field>
                <Field label="Nome no cartão" className="sm:col-span-2">
                  <input required autoComplete="off" className={inputClass} />
                </Field>
                <Field label="Validade">
                  <input required inputMode="numeric" autoComplete="off" placeholder="MM/AA" pattern="\d{2}/\d{2}" className={inputClass} />
                </Field>
                <Field label="CVV">
                  <input required inputMode="numeric" autoComplete="off" placeholder="123" pattern="\d{3,4}" className={inputClass} />
                </Field>
                <Field label="Parcelas" className="sm:col-span-2">
                  <select value={installments} onChange={(e) => setInstallments(Number(e.target.value))} className={inputClass}>
                    {[1, 2, 3].map((n) => (
                      <option key={n} value={n}>{n}x de {formatBRL(Math.ceil(total / n))} sem juros</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          ) : (
            <p className="mt-5 text-sm text-cocoa-soft">
              Ao finalizar, mostramos um código Pix <strong>fictício</strong>. Na tela do pedido você poderá simular a
              confirmação.
            </p>
          )}
        </Section>
      </div>

      <aside className="lg:col-span-5">
        <div className="space-y-5 rounded-[2rem] border border-cocoa/10 bg-cream/60 p-6 md:p-8 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl text-cocoa">Resumo</h2>
          <ul className="space-y-4">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-3">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-blush">
                  <Image src={l.product.images[0]} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="flex-1 text-sm">
                  <span className="block font-medium text-cocoa">{l.qty}× {l.product.name}</span>
                  <span className="text-cocoa-soft">{[l.colorName, l.setLabel].filter(Boolean).join(" · ")}</span>
                </span>
                <span className="text-sm tabular-nums">{formatBRL(l.total)}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 border-t border-dashed border-cocoa/20 pt-4">
            <div className="flex justify-between"><dt className="text-cocoa-soft">Subtotal</dt><dd className="tabular-nums">{formatBRL(totals.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-cocoa-soft">Frete</dt><dd className="tabular-nums">{shipping ? formatBRL(shipping.price) : "—"}</dd></div>
            <div className="flex items-baseline justify-between pt-2"><dt className="font-medium">Total</dt><dd className="font-display text-3xl text-cocoa">{formatBRL(total)}</dd></div>
          </dl>
          <p className="text-sm text-cocoa-soft">
            {eta
              ? `Previsão: ${eta.min} a ${eta.max} dias úteis após o pagamento (produção + entrega).`
              : `Produção: ${totals.productionDays.min} a ${totals.productionDays.max} dias úteis, mais o frete.`}
          </p>
          {formError && <p role="alert" className="rounded-2xl bg-[#b4363c]/10 px-4 py-3 text-sm text-[#8f2a2f]">{formError}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="flex h-14 w-full items-center justify-center rounded-full bg-cocoa font-medium text-linen disabled:opacity-60"
          >
            {submitting ? "Processando…" : method === "pix" ? "Gerar Pix de teste" : "Pagar (simulado)"}
          </button>
          <Link href="/carrinho" className="block text-center text-sm text-cocoa-soft underline underline-offset-4">Voltar à sacola</Link>
        </div>
      </aside>
    </form>
  );
}
