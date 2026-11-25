import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatBRL } from "@/lib/money";
import { categories, collections } from "@/lib/site";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const collection = collections.find((c) => c.slug === product.collection);
  const category = categories.find((c) => c.slug === product.category);
  const hasRange = product.sets.length > 1;

  return (
    <article className="group relative">
      <Link href={`/produto/${product.slug}`} className="block" aria-label={`${product.name}, ${formatBRL(product.price)}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-blush shadow-[0_30px_50px_-38px_rgba(58,38,34,0.7)]">
          <Image
            src={product.images[0]}
            alt={`${product.name} — foto ilustrativa`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 30vw, 50vw"
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-silk)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/35 to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.whatsappOnly && (
              <span className="rounded-full bg-cocoa px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-linen">
                Só no WhatsApp
              </span>
            )}
            {product.customizable && !product.whatsappOnly && (
              <span className="rounded-full bg-linen/90 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-cocoa backdrop-blur">
                Personalizável
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 px-1">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-rose-ink">
            {category?.title} · {collection?.title}
          </p>
          <h3 className="font-display mt-1.5 text-[1.3rem] leading-tight text-cocoa md:text-[1.45rem]">{product.name}</h3>
          <p className="mt-1.5 text-cocoa-soft">
            {hasRange || product.whatsappOnly ? "a partir de " : ""}
            <span className="font-medium text-cocoa">{formatBRL(product.price)}</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
