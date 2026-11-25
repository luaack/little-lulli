import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Catalog } from "@/components/shop/catalog";
import { PageHeading } from "@/components/shop/page-heading";
import { products } from "@/data/products";
import { categories } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/loja/categoria/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  return { title: category ? `${category.title} · Little Lulli` : "Categoria" };
}

export default async function CategoryPage({ params }: PageProps<"/loja/categoria/[slug]">) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <main id="conteudo" className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <PageHeading eyebrow="Categoria" id="categoria-title" segments={[category.title]}>
        {category.description}
      </PageHeading>
      <div className="mt-10">
        <Catalog products={products} fixedCategory={category.slug} />
      </div>
    </main>
  );
}
