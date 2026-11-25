import type { Metadata } from "next";
import { PageHeading } from "@/components/shop/page-heading";
import { Testimonials } from "@/components/sections/testimonials";

export const metadata: Metadata = { title: "Depoimentos · Little Lulli" };

export default function TestimonialsPage() {
  return (
    <main id="conteudo">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
        <PageHeading eyebrow="Depoimentos" id="depoimentos-pagina" segments={["Quem já ", { text: "usa.", className: "italic text-rose-deep" }]}>
          Palavras de quem já recebeu um laço da Little Lulli.
        </PageHeading>
      </div>
      <Testimonials />
    </main>
  );
}
