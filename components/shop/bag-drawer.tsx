"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { BowMark } from "@/components/decor";
import { EASE_SILK } from "@/components/motion";
import { useBag } from "@/components/shop/bag-context";
import { removeLine, setLineQty, useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/money";
import { setScrollLocked } from "@/lib/smooth-scroll";

export function BagDrawer() {
  const { open, closeBag } = useBag();
  const { lines, totals } = useCart();
  const panel = useRef<HTMLElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    setScrollLocked(true);
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeBag();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input,select,[tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
      previous?.focus?.();
    };
  }, [open, closeBag]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[140]">
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Fechar sacola"
            className="absolute inset-0 cursor-default bg-ink/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeBag}
          />
          <motion.aside
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Sacola de compras"
            className="linen absolute inset-y-0 right-0 flex w-full max-w-md flex-col shadow-[-30px_0_60px_-30px_rgba(58,38,34,0.5)]"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE_SILK }}
          >
            <div className="flex items-center justify-between border-b border-dashed border-cocoa/15 px-5 py-4">
              <h2 className="font-display flex items-center gap-2.5 text-2xl italic text-cocoa">
                <BowMark className="w-8" /> Sua sacola
              </h2>
              <button
                ref={closeButton}
                type="button"
                onClick={closeBag}
                aria-label="Fechar sacola"
                className="grid size-11 place-items-center rounded-full bg-cocoa text-linen"
              >
                <X className="size-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <BowMark tone="blush" className="w-20" />
                <p className="font-display text-2xl text-cocoa">Sua sacola está vazia</p>
                <p className="text-cocoa-soft">Que tal escolher um laço para a sua pequena?</p>
                <Link
                  href="/loja"
                  onClick={closeBag}
                  className="inline-flex h-12 items-center rounded-full bg-cocoa px-7 font-medium text-linen"
                >
                  Ver a loja
                </Link>
              </div>
            ) : (
              <>
                <ul data-lenis-prevent className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5">
                  {lines.map((line) => (
                    <li key={line.key} className="flex gap-4">
                      <Link
                        href={`/produto/${line.slug}`}
                        onClick={closeBag}
                        className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-blush"
                      >
                        <Image src={line.product.images[0]} alt="" fill sizes="96px" className="object-cover" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg leading-tight text-cocoa">{line.product.name}</p>
                        <p className="mt-1 text-sm text-cocoa-soft">
                          {[line.colorName, line.setLabel].filter(Boolean).join(" · ") || "Peça única"}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-cocoa/15">
                            <button
                              type="button"
                              aria-label={`Diminuir quantidade de ${line.product.name}`}
                              onClick={() => setLineQty(line.key, line.qty - 1)}
                              className="grid size-10 place-items-center"
                            >
                              <Minus className="size-4" />
                            </button>
                            <span className="min-w-6 text-center text-sm tabular-nums" aria-live="polite">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Aumentar quantidade de ${line.product.name}`}
                              onClick={() => setLineQty(line.key, line.qty + 1)}
                              className="grid size-10 place-items-center"
                            >
                              <Plus className="size-4" />
                            </button>
                          </div>
                          <span className="font-medium tabular-nums text-cocoa">{formatBRL(line.total)}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(line.key)}
                          className="mt-2 text-sm text-rose-ink underline underline-offset-4"
                        >
                          Remover
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 border-t border-dashed border-cocoa/15 px-5 pb-6 pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-cocoa-soft">Subtotal</span>
                    <span className="font-display text-2xl text-cocoa">{formatBRL(totals.subtotal)}</span>
                  </div>
                  <p className="text-sm text-cocoa-soft">
                    Prazo de produção: {totals.productionDays.min} a {totals.productionDays.max} dias úteis. Frete
                    calculado na sacola.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeBag}
                    className="flex h-14 items-center justify-center rounded-full bg-cocoa font-medium text-linen"
                  >
                    Finalizar compra
                  </Link>
                  <Link
                    href="/carrinho"
                    onClick={closeBag}
                    className="flex h-12 items-center justify-center rounded-full border border-cocoa/20 font-medium text-cocoa"
                  >
                    Ver sacola e calcular frete
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
