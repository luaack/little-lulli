import type { Metadata } from "next";
import { CartView } from "@/components/shop/cart-view";
import { PageHeading } from "@/components/shop/page-heading";

export const metadata: Metadata = { title: "Sacola · Little Lulli" };

export default function CartPage() {
  return (
    <main id="conteudo" className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <PageHeading eyebrow="Sacola" id="carrinho-title" segments={["Sua ", { text: "sacola.", className: "italic text-rose-deep" }]} />
      <div className="mt-10">
        <CartView />
      </div>
    </main>
  );
}
