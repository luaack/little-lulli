"use client";

/*
 * MEDIÇÃO — pontos de evento do Meta Pixel (navegador) + API de Conversões (servidor).
 * Nenhum ID real configurado: sem NEXT_PUBLIC_META_PIXEL_ID nada é enviado a lugar nenhum
 * (os eventos só aparecem no console em desenvolvimento).
 *
 * Para ativar:
 *  1. Defina NEXT_PUBLIC_META_PIXEL_ID na Vercel e carregue o script do Pixel (fbevents.js)
 *     num componente <MetaPixel /> no layout — só depois de o ambiente deixar de ser de testes.
 *  2. API de Conversões: crie `app/api/meta-capi/route.ts` que recebe { event, eventId, data },
 *     adiciona IP/user-agent/fbp/fbc, faz hash (SHA-256) de e-mail e telefone e envia a
 *     https://graph.facebook.com/<versão>/<PIXEL_ID>/events com o token em variável de ambiente
 *     (META_CAPI_TOKEN). Use o MESMO `eventId` no Pixel e na API para deduplicar.
 *  3. Purchase deve vir do servidor (webhook de pagamento confirmado), não do navegador.
 */
export type MetaEvent =
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase"
  | "Lead";

export type MetaEventData = {
  content_ids?: string[];
  content_name?: string;
  content_type?: "product";
  contents?: { id: string; quantity: number }[];
  value?: number; // em reais
  currency?: "BRL";
  num_items?: number;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export function track(event: MetaEvent, data: MetaEventData = {}) {
  if (typeof window === "undefined") return;
  const eventId = `${event}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  if (META_PIXEL_ID && window.fbq) window.fbq("track", event, data, { eventID: eventId });
  // TODO(API de Conversões): fetch("/api/meta-capi", { method: "POST", body: JSON.stringify({ event, eventId, data }) })
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, data);
}
