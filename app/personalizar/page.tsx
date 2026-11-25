import type { Metadata } from "next";
import { PersonalizeForm } from "@/components/shop/personalize-form";
import { PageHeading } from "@/components/shop/page-heading";
import { getProduct } from "@/data/products";

export const metadata: Metadata = { title: "Personalizar · Little Lulli" };

export default async function PersonalizePage({ searchParams }: PageProps<"/personalizar">) {
  const { peca } = await searchParams;
  const product = typeof peca === "string" ? getProduct(peca) : undefined;

  return (
    <main id="conteudo" className="mx-auto max-w-5xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <PageHeading
        eyebrow="Personalizar"
        id="personalizar-title"
        segments={["Uma peça só ", { text: "sua.", className: "italic text-rose-deep" }]}
      >
        Conte o que você imagina — nome, desenho, cores — e a gente responde pelo WhatsApp com o orçamento e o
        prazo. Quanto mais detalhes, melhor.
      </PageHeading>
      <div className="mt-10">
        <PersonalizeForm
          initial={
            product
              ? { slug: product.slug, name: product.name, category: product.category, collection: product.collection }
              : undefined
          }
        />
      </div>
    </main>
  );
}
