/*
 * ARMAZENAMENTO de pedidos e briefings atrás de interfaces.
 * Hoje: localStorage do navegador (cada pedido só existe no aparelho que o criou).
 * Depois: troque as duas constantes no fim do arquivo por implementações com banco
 * (ex.: Postgres/Supabase/Vercel Postgres) chamadas via Route Handlers. As telas só
 * conhecem as interfaces, então nada mais precisa mudar.
 */
import type { Order } from "@/lib/orders";
import type { Briefing } from "@/lib/briefing";
import { createLocalStore } from "./local-store";

export interface OrderRepository {
  create(order: Order): Promise<void>;
  get(id: string): Promise<Order | null>;
  list(): Promise<Order[]>;
  update(id: string, patch: Partial<Order>): Promise<Order | null>;
}

export interface BriefingRepository {
  create(briefing: Briefing): Promise<void>;
  list(): Promise<Briefing[]>;
}

const orderStore = createLocalStore<Order[]>("lulli-loja:orders", []);
const briefingStore = createLocalStore<Briefing[]>("lulli-loja:briefings", []);

export const localOrderRepository: OrderRepository = {
  async create(order) {
    orderStore.update((all) => [order, ...all]);
  },
  async get(id) {
    return orderStore.get().find((o) => o.id === id) ?? null;
  },
  async list() {
    return orderStore.get();
  },
  async update(id, patch) {
    let updated: Order | null = null;
    orderStore.update((all) =>
      all.map((o) => {
        if (o.id !== id) return o;
        updated = { ...o, ...patch };
        return updated;
      }),
    );
    return updated;
  },
};

export const localBriefingRepository: BriefingRepository = {
  async create(briefing) {
    briefingStore.update((all) => [briefing, ...all]);
  },
  async list() {
    return briefingStore.get();
  },
};

export const orderRepository: OrderRepository = localOrderRepository;
export const briefingRepository: BriefingRepository = localBriefingRepository;
/** Hook reativo usado só pela tela do pedido enquanto o armazenamento é local. */
export const useLocalOrders = orderStore.use;
