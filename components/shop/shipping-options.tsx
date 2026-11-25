"use client";

import { formatBRL } from "@/lib/money";
import type { ShippingOption } from "@/lib/shipping";
import { deliveryWindow } from "@/lib/use-shipping";

export function ShippingOptions({
  name,
  options,
  value,
  onChange,
  production,
}: {
  name: string;
  options: ShippingOption[];
  value?: string;
  onChange: (option: ShippingOption) => void;
  production: { min: number; max: number };
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">Opções de entrega</legend>
      {options.map((o) => {
        const total = deliveryWindow(production, o.days);
        return (
          <label key={o.id} className="block cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={value === o.id}
              onChange={() => onChange(o)}
              className="peer sr-only"
            />
            <span className="flex items-center justify-between gap-4 rounded-2xl border border-cocoa/15 bg-linen/70 px-4 py-3.5 peer-checked:border-cocoa peer-checked:bg-blush/40 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose-deep">
              <span>
                <span className="block font-medium text-cocoa">{o.label}</span>
                <span className="block text-sm text-cocoa-soft">
                  Transporte {o.days.min} a {o.days.max} dias úteis · pedido pronto em ~{total.min} a {total.max} dias
                  úteis
                </span>
              </span>
              <span className="font-medium tabular-nums text-cocoa">{formatBRL(o.price)}</span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
