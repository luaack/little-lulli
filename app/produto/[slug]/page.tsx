import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/shop/product-card";
import { ProductView } from "@/components/shop/product-view";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? `${product.name} · Little Lulli` : "Produto" };
}

export default async function ProductPage({ params }: PageProps<"/produto/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  return (
    <main id="conteudo" className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <ProductView product={product} />
      {related.length > 0 && (
        <section aria-labelledby="relacionados" className="mt-24">
          <h2 id="relacionados" className="font-display text-3xl text-cocoa md:text-4xl">
            Combina com <em className="text-rose-deep">essa peça</em>
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-6">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
