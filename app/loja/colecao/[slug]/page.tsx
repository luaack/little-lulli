import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Catalog } from "@/components/shop/catalog";
import { PageHeading } from "@/components/shop/page-heading";
import { products } from "@/data/products";
import { collections } from "@/lib/site";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/loja/colecao/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  return { title: collection ? `${collection.title} · Little Lulli` : "Coleção" };
}

export default async function CollectionPage({ params }: PageProps<"/loja/colecao/[slug]">) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  return (
    <main id="conteudo" className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <div className="grid items-end gap-8 md:grid-cols-12">
        <PageHeading eyebrow="Coleção" id="colecao-title" segments={[collection.title]} className="md:col-span-8">
          {collection.description}
        </PageHeading>
        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[2rem] bg-blush md:col-span-4 md:block">
          <Image src={collection.image} alt={`Coleção ${collection.title}`} fill sizes="30vw" className="object-cover" />
        </div>
      </div>
      <div className="mt-10">
        <Catalog products={products} fixedCollection={collection.slug} />
      </div>
    </main>
  );
}
