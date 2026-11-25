"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { NeedleIcon } from "@/components/decor";
import { WhatsAppIcon } from "@/components/icons";
import { useBag } from "@/components/shop/bag-context";
import type { Product } from "@/data/products";
import { track } from "@/lib/analytics";
import { MAX_QTY, addToCart, unitPrice } from "@/lib/cart";
import { formatBRL } from "@/lib/money";
import { categories, collections, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ProductView({ product }: { product: Product }) {
  const { openBag } = useBag();
  const uid = useId();
  const [image, setImage] = useState(0);
  const [colorId, setColorId] = useState(product.colors[0]?.id);
  const [setId, setSetId] = useState<"par" | "unidade" | undefined>(product.sets[0]?.id);
  const [qty, setQty] = useState(1);

  const collection = collections.find((c) => c.slug === product.collection);
  const category = categories.find((c) => c.slug === product.category);
  const price = unitPrice(product, setId);
  const colorName = product.colors.find((c) => c.id === colorId)?.name;

  useEffect(() => {
    track("ViewContent", {
      content_ids: [product.slug],
      content_name: product.name,
      content_type: "product",
      value: product.price / 100,
      currency: "BRL",
    });
  }, [product]);

  const add = () => {
    addToCart({ slug: product.slug, colorId, setId, qty });
    track("AddToCart", {
      content_ids: [product.slug],
      content_name: product.name,
      content_type: "product",
      contents: [{ id: product.slug, quantity: qty }],
      value: (price * qty) / 100,
      currency: "BRL",
    });
    openBag();
  };

  const whatsappMessage = `Olá, Little Lulli! Tenho interesse na peça "${product.name}" (sob consulta). Podemos conversar sobre valor, prazo e personalização? 🎀`;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Galeria */}
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-blush shadow-[0_40px_70px_-45px_rgba(58,38,34,0.7)] md:aspect-[5/5]">
          <Image
            key={product.images[image]}
            src={product.images[image]}
            alt={`${product.name} — foto ${image + 1} de ${product.images.length} (ilustrativa)`}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
        {product.images.length > 1 && (
          <ul className="mt-4 flex gap-3" aria-label="Fotos do produto">
            {product.images.map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => setImage(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={i === image}
                  className={cn(
                    "relative block size-20 overflow-hidden rounded-2xl bg-blush ring-offset-2 ring-offset-linen transition-shadow md:size-24",
                    i === image ? "ring-2 ring-rose-deep" : "opacity-80 hover:opacity-100",
                  )}
                >
                  <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-sm text-cocoa-soft">Fotos ilustrativas — ainda não há foto individual de cada peça.</p>
      </div>

      {/* Informações */}
      <div className="lg:col-span-5">
        <nav aria-label="Você está em" className="text-sm text-cocoa-soft">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li>
              <Link href="/loja" className="underline-offset-4 hover:underline">Loja</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/loja/categoria/${product.category}`} className="underline-offset-4 hover:underline">
                {category?.title}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/loja/colecao/${product.collection}`} className="underline-offset-4 hover:underline">
                {collection?.title}
              </Link>
            </li>
          </ol>
        </nav>

        <h1 className="font-display mt-4 text-[clamp(2rem,4vw,3.2rem)] font-[380] leading-[1.02] tracking-[-0.02em] text-cocoa">
          {product.name}
        </h1>
        <p className="mt-4 flex items-baseline gap-3">
          <span className="font-display text-3xl text-cocoa" aria-live="polite">
            {product.whatsappOnly && "a partir de "}
            {formatBRL(price)}
          </span>
          {setId && <span className="text-cocoa-soft">/ {setId === "par" ? "par" : "unidade"}</span>}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-cocoa-soft">{product.short}</p>

        {!product.whatsappOnly && (
          <div className="mt-8 space-y-6">
            {product.colors.length > 0 && (
              <fieldset>
                <legend className="text-sm font-medium text-cocoa">
                  Cor: <span className="font-normal text-cocoa-soft">{colorName}</span>
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {product.colors.map((c) => (
                    <label key={c.id} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name={`${uid}-cor`}
                        value={c.id}
                        checked={colorId === c.id}
                        onChange={() => setColorId(c.id)}
                        className="peer sr-only"
                      />
                      <span
                        className="grid size-11 place-items-center rounded-full border border-cocoa/15 peer-checked:ring-2 peer-checked:ring-rose-deep peer-checked:ring-offset-2 peer-checked:ring-offset-linen peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-rose-deep"
                        style={{ backgroundColor: c.hex }}
                      >
                        {colorId === c.id && <Check className="size-4 text-cocoa/70" aria-hidden="true" />}
                      </span>
                      <span className="sr-only">{c.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {product.sets.length > 0 && (
              <fieldset>
                <legend className="text-sm font-medium text-cocoa">Quantidade na peça</legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {product.sets.map((s) => (
                    <label key={s.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name={`${uid}-set`}
                        value={s.id}
                        checked={setId === s.id}
                        onChange={() => setSetId(s.id)}
                        className="peer sr-only"
                      />
                      <span className="flex h-12 items-center gap-2 rounded-full border border-cocoa/15 px-5 text-sm peer-checked:border-cocoa peer-checked:bg-cocoa peer-checked:text-linen peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-rose-deep">
                        {s.label} <span className="opacity-70">{formatBRL(s.price)}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div>
              <p id={`${uid}-qty`} className="text-sm font-medium text-cocoa">Quantidade</p>
              <div className="mt-3 inline-flex items-center rounded-full border border-cocoa/15" role="group" aria-labelledby={`${uid}-qty`}>
                <button
                  type="button"
                  aria-label="Diminuir quantidade"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid size-12 place-items-center"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-8 text-center tabular-nums" aria-live="polite">{qty}</span>
                <button
                  type="button"
                  aria-label="Aumentar quantidade"
                  onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                  className="grid size-12 place-items-center"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-3">
          {product.whatsappOnly ? (
            <>
              <a
                href={whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-between rounded-full bg-cocoa pl-7 pr-2 font-medium text-linen"
              >
                Pedir pelo WhatsApp
                <span className="grid size-10 place-items-center rounded-full bg-linen text-cocoa">
                  <WhatsAppIcon className="size-5" />
                </span>
              </a>
              <p className="text-sm text-cocoa-soft">
                Esta peça é feita sob consulta: combinamos valor, prazo e pagamento pelo WhatsApp. Não há compra
                direta pelo site.
              </p>
            </>
          ) : (
            <button
              type="button"
              onClick={add}
              className="group relative flex h-14 w-full items-center justify-between overflow-hidden rounded-full bg-cocoa pl-7 pr-2 font-medium text-linen"
            >
              <span className="absolute inset-0 -translate-x-[101%] rounded-full bg-rose-deep transition-transform duration-700 ease-[var(--ease-silk)] group-hover:translate-x-0" />
              <span className="relative">Adicionar à sacola · {formatBRL(price * qty)}</span>
              <span className="relative grid size-10 place-items-center rounded-full bg-linen text-cocoa">
                <ShoppingBag className="size-5" />
              </span>
            </button>
          )}
          {product.customizable && (
            <Link
              href={`/personalizar?peca=${product.slug}`}
              className="flex h-14 items-center justify-between rounded-full border border-cocoa/20 pl-7 pr-2 font-medium text-cocoa transition-colors hover:bg-blush/50"
            >
              Personalizar esta peça
              <span className="grid size-10 place-items-center rounded-full bg-blush">
                <NeedleIcon className="size-5" />
              </span>
            </Link>
          )}
        </div>

        <dl className="mt-8 divide-y divide-dashed divide-cocoa/15 border-y border-dashed border-cocoa/15 text-[0.95rem]">
          <div className="grid grid-cols-[8rem_1fr] gap-4 py-4">
            <dt className="font-medium text-cocoa">Prazo de produção</dt>
            <dd className="text-cocoa-soft">
              {product.productionDays.min} a {product.productionDays.max} dias úteis, a partir da confirmação do
              pagamento. O prazo de entrega do frete é somado a isso.
            </dd>
          </div>
          <div className="grid grid-cols-[8rem_1fr] gap-4 py-4">
            <dt className="font-medium text-cocoa">Material</dt>
            <dd className="text-cocoa-soft">{product.material}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <h2 className="font-display text-2xl text-cocoa">Sobre a peça</h2>
          <p className="mt-3 leading-relaxed text-cocoa-soft">{product.description}</p>
          <ul className="mt-4 space-y-2 text-cocoa-soft">
            {product.details.map((d) => (
              <li key={d} className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-mint-deep" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
