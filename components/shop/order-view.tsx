"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { PageHeading } from "@/components/shop/page-heading";
import { track } from "@/lib/analytics";
import { useHydrated } from "@/lib/hooks";
import { formatBRL } from "@/lib/money";
import { ORDER_STAGES, type Order } from "@/lib/orders";
import { orderRepository, useLocalOrders } from "@/lib/storage";
import { whatsappLink } from "@/lib/site";
import { deliveryWindow } from "@/lib/use-shipping";
import { cn } from "@/lib/utils";

export function OrderView({ id }: { id: string }) {
  const hydrated = useHydrated();
  const orders = useLocalOrders();
  const order = orders.find((o) => o.id === id);
  const [copied, setCopied] = useState(false);

  if (!hydrated) return <p role="status" className="text-cocoa-soft">Carregando pedido…</p>;

  if (!order) {
    return (
      <div className="rounded-[2rem] border border-dashed border-cocoa/20 p-12 text-center">
        <p className="font-display text-3xl text-cocoa">Pedido não encontrado</p>
        <p className="mx-auto mt-3 max-w-md text-cocoa-soft">
          Nesta versão de testes os pedidos ficam salvos só no navegador em que foram feitos.
        </p>
        <Link href="/loja" className="mt-6 inline-flex h-12 items-center rounded-full bg-cocoa px-7 font-medium text-linen">
          Ver a loja
        </Link>
      </div>
    );
  }

  const current = order;
  const paid = current.payment.status === "paid";

  async function simulatePixPaid() {
    await orderRepository.update(current.id, {
      payment: { ...current.payment, status: "paid" },
      stage: Math.max(current.stage, 1),
    });
    // No sistema real, quem dispara o Purchase é o webhook do provedor (servidor).
    track("Purchase", {
      content_ids: current.items.map((i) => i.slug),
      num_items: current.items.reduce((n, i) => n + i.qty, 0),
      value: current.total / 100,
      currency: "BRL",
    });
  }

  async function advance() {
    await orderRepository.update(current.id, { stage: Math.min(ORDER_STAGES.length - 1, current.stage + 1) });
  }

  async function copyPix() {
    try {
      await navigator.clipboard.writeText(current.payment.pixCode ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  const eta = deliveryWindow(order.productionDays, order.shipping.days);
  const waMessage = `Olá, Little Lulli! Quero falar sobre o pedido ${order.id} (pedido de teste).`;

  return (
    <div>
      <PageHeading eyebrow={`Pedido ${order.id}`} id="pedido-title" segments={["Obrigada, ", { text: order.customer.name.split(" ")[0] + "!", className: "italic text-rose-deep" }]}>
        Feito em {new Date(order.createdAt).toLocaleDateString("pt-BR")}. Este é um pedido de teste: nada foi cobrado.
      </PageHeading>

      {!paid && order.payment.method === "pix" && (
        <section aria-labelledby="pix-title" className="mt-10 rounded-[2rem] border border-cocoa/10 bg-cream/60 p-6 md:p-8">
          <h2 id="pix-title" className="font-display text-2xl text-cocoa">Pagamento via Pix (fictício)</h2>
          <p className="mt-2 text-cocoa-soft">
            Este código <strong>não é um Pix real</strong> — não pague. Use o botão abaixo para simular a confirmação.
          </p>
          <textarea
            readOnly
            aria-label="Código Pix fictício"
            value={order.payment.pixCode}
            rows={2}
            className="mt-4 w-full resize-none rounded-2xl border border-cocoa/20 bg-linen p-3 font-mono text-xs text-cocoa"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={copyPix} className="inline-flex h-12 items-center gap-2 rounded-full border border-cocoa/20 px-5 font-medium">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />} {copied ? "Copiado" : "Copiar código"}
            </button>
            <button type="button" onClick={simulatePixPaid} className="inline-flex h-12 items-center rounded-full bg-cocoa px-6 font-medium text-linen">
              Simular pagamento do Pix (teste)
            </button>
          </div>
        </section>
      )}

      <section aria-labelledby="etapas-title" className="mt-10">
        <h2 id="etapas-title" className="font-display text-2xl text-cocoa">Acompanhe seu pedido</h2>
        <ol className="mt-6 space-y-0">
          {ORDER_STAGES.map((stage, i) => {
            const done = i < order.stage || (i === order.stage && i === ORDER_STAGES.length - 1);
            const isCurrent = i === order.stage;
            return (
              <li key={stage.id} className="relative flex gap-4 pb-7 last:pb-0" aria-current={isCurrent ? "step" : undefined}>
                {i < ORDER_STAGES.length - 1 && (
                  <span aria-hidden="true" className={cn("absolute left-[1.15rem] top-10 h-[calc(100%-2.5rem)] border-l-2 border-dashed", done ? "border-rose-deep" : "border-cocoa/15")} />
                )}
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 text-sm",
                    done ? "border-rose-deep bg-rose-deep text-linen" : isCurrent ? "border-cocoa bg-linen text-cocoa" : "border-cocoa/15 bg-linen text-cocoa/40",
                  )}
                >
                  {done ? <Check className="size-4" /> : i + 1}
                </span>
                <div className={cn(!done && !isCurrent && "opacity-60")}>
                  <p className="font-medium text-cocoa">
                    {stage.label}
                    <span className="sr-only">{done ? " — concluído" : isCurrent ? " — etapa atual" : " — pendente"}</span>
                  </p>
                  <p className="text-sm text-cocoa-soft">
                    {stage.id === "pago" && !paid ? "Aguardando o pagamento do Pix." : stage.hint}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        {paid && order.stage < ORDER_STAGES.length - 1 && (
          <button type="button" onClick={advance} className="mt-6 inline-flex h-12 items-center rounded-full border border-dashed border-cocoa/40 px-6 text-sm font-medium text-cocoa">
            Simular próxima etapa (teste)
          </button>
        )}
      </section>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <section aria-labelledby="itens-title" className="rounded-[2rem] border border-cocoa/10 bg-cream/50 p-6">
          <h2 id="itens-title" className="font-display text-2xl text-cocoa">Itens</h2>
          <ul className="mt-4 space-y-4">
            {order.items.map((i) => (
              <li key={i.slug + i.colorName + i.setLabel} className="flex gap-3">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-blush">
                  <Image src={i.image} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="flex-1 text-sm">
                  <span className="block font-medium text-cocoa">{i.qty}× {i.name}</span>
                  <span className="text-cocoa-soft">{[i.colorName, i.setLabel].filter(Boolean).join(" · ")}</span>
                </span>
                <span className="text-sm tabular-nums">{formatBRL(i.unit * i.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-dashed border-cocoa/20 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-cocoa-soft">Subtotal</dt><dd className="tabular-nums">{formatBRL(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-cocoa-soft">Frete ({order.shipping.label})</dt><dd className="tabular-nums">{formatBRL(order.shipping.price)}</dd></div>
            <div className="flex items-baseline justify-between pt-1"><dt className="font-medium">Total</dt><dd className="font-display text-2xl">{formatBRL(order.total)}</dd></div>
          </dl>
        </section>

        <section aria-labelledby="entrega-title" className="rounded-[2rem] border border-cocoa/10 bg-cream/50 p-6">
          <h2 id="entrega-title" className="font-display text-2xl text-cocoa">Entrega e pagamento</h2>
          <p className="mt-4 text-sm leading-relaxed text-cocoa-soft">
            {order.address.street}, {order.address.number}
            {order.address.complement ? ` — ${order.address.complement}` : ""}
            <br />
            {order.address.district} · {order.address.city}/{order.address.state} · CEP {order.address.cep}
          </p>
          <p className="mt-4 text-sm text-cocoa-soft">
            Previsão: <strong className="text-cocoa">{eta.min} a {eta.max} dias úteis</strong> após a confirmação do
            pagamento (produção {order.productionDays.min}–{order.productionDays.max} + transporte{" "}
            {order.shipping.days.min}–{order.shipping.days.max}).
          </p>
          <p className="mt-4 text-sm text-cocoa-soft">
            Pagamento: {order.payment.method === "pix" ? "Pix" : `Cartão em ${order.payment.installments}x`} ·{" "}
            <strong className="text-cocoa">{paid ? "aprovado (simulado)" : "aguardando"}</strong>
          </p>
          <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-12 items-center rounded-full border border-cocoa/20 px-6 text-sm font-medium text-cocoa">
            Falar sobre este pedido no WhatsApp
          </a>
        </section>
      </div>

      <p className="mt-8 text-sm text-cocoa-soft">
        Ambiente de testes: este pedido existe só neste navegador e nenhuma mensagem é enviada automaticamente.
      </p>
    </div>
  );
}

export type { Order };
