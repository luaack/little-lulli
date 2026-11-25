import type { Metadata } from "next";
import { CheckoutView } from "@/components/shop/checkout-view";
import { PageHeading } from "@/components/shop/page-heading";

export const metadata: Metadata = { title: "Finalizar compra · Little Lulli" };

export default function CheckoutPage() {
  return (
    <main id="conteudo" className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <PageHeading eyebrow="Checkout" id="checkout-title" segments={["Finalizar ", { text: "compra.", className: "italic text-rose-deep" }]}>
        Ambiente de testes: nenhum pagamento é cobrado e nenhum dado é enviado a ninguém.
      </PageHeading>
      <div className="mt-10">
        <CheckoutView />
      </div>
    </main>
  );
}
