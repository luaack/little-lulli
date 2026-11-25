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
        Tic tacs, tiaras e faixas bordados à mão. Escolha a cor, a quantidade e receba em casa.
      </PageHeading>
      <div className="mt-10">
        <Catalog products={products} />
      </div>
    </main>
  );
}
