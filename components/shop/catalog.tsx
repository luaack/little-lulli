"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/shop/product-card";
import { categories, collections, type CategorySlug, type CollectionSlug } from "@/lib/site";
import { cn } from "@/lib/utils";

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-11 shrink-0 items-center rounded-full border px-5 text-sm font-medium transition-colors",
        active
          ? "border-cocoa bg-cocoa text-linen"
          : "border-cocoa/15 bg-linen/60 text-cocoa hover:border-cocoa/40 hover:bg-blush/50",
      )}
    >
      {children}
    </button>
  );
}

/**
 * Catálogo com filtros por coleção e categoria. Em páginas de coleção/categoria,
 * o eixo "fixo" some dos filtros e o outro continua filtrável.
 */
export function Catalog({
  products,
  fixedCollection,
  fixedCategory,
}: {
  products: Product[];
  fixedCollection?: CollectionSlug;
  fixedCategory?: CategorySlug;
}) {
  const [collection, setCollection] = useState<CollectionSlug | "todas">("todas");
  const [category, setCategory] = useState<CategorySlug | "todas">("todas");

  const visible = products.filter(
    (p) =>
      (!fixedCollection || p.collection === fixedCollection) &&
      (!fixedCategory || p.category === fixedCategory) &&
      (collection === "todas" || p.collection === collection) &&
      (category === "todas" || p.category === category),
  );

  return (
    <div>
      <div className="space-y-4">
        {!fixedCollection && (
          <div role="group" aria-label="Filtrar por coleção">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-cocoa-soft">Coleção</p>
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
              <Chip active={collection === "todas"} onClick={() => setCollection("todas")}>
                Todas
              </Chip>
              {collections.map((c) => (
                <Chip key={c.slug} active={collection === c.slug} onClick={() => setCollection(c.slug)}>
                  {c.title}
                </Chip>
              ))}
            </div>
          </div>
        )}
        {!fixedCategory && (
          <div role="group" aria-label="Filtrar por categoria">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-cocoa-soft">Categoria</p>
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
              <Chip active={category === "todas"} onClick={() => setCategory("todas")}>
                Todas
              </Chip>
              {categories.map((c) => (
                <Chip key={c.slug} active={category === c.slug} onClick={() => setCategory(c.slug)}>
                  {c.title}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </div>

      <p role="status" className="mt-6 text-sm text-cocoa-soft">
        {visible.length === 1 ? "1 peça" : `${visible.length} peças`}
      </p>

      {visible.length ? (
        <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-12">
          {visible.map((p, i) => (
            <li key={p.slug}>
              <ProductCard product={p} priority={i < 2} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-[2rem] border border-dashed border-cocoa/20 p-10 text-center">
          <p className="font-display text-2xl text-cocoa">Nenhuma peça com esses filtros</p>
          <button
            type="button"
            onClick={() => {
              setCollection("todas");
              setCategory("todas");
            }}
            className="mt-4 text-rose-ink underline underline-offset-4"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
