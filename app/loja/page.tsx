import type { Metadata } from "next";
import { Catalog } from "@/components/shop/catalog";
import { PageHeading } from "@/components/shop/page-heading";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Loja · Little Lulli" };

export default function ShopPage() {
  return (
    <main id="conteudo" className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <PageHeading
        eyebrow="Loja"
        id="loja-title"
        segments={["Pequenas joias, ", { text: "uma a uma.", className: "italic text-rose-deep" }]}
      >
        Tic tacs bordados à mão, um a um. Escolha a peça, combine os detalhes pelo WhatsApp e receba em casa.
      </PageHeading>
      <div className="mt-10">
        <Catalog products={products} />
      </div>
    </main>
  );
}
