import type { Metadata } from "next";
import { OrderView } from "@/components/shop/order-view";

export const metadata: Metadata = { title: "Seu pedido · Little Lulli" };

export default async function OrderPage({ params }: PageProps<"/pedido/[id]">) {
  const { id } = await params;
  return (
    <main id="conteudo" className="mx-auto max-w-5xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <OrderView id={id} />
    </main>
  );
}
