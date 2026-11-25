import type { Metadata } from "next";
import { OrderCta } from "@/components/sections/order-cta";

export const metadata: Metadata = { title: "Contato · Little Lulli" };

export default function ContactPage() {
  return (
    <main id="conteudo" className="pt-16 md:pt-20">
      <OrderCta />
    </main>
  );
}
