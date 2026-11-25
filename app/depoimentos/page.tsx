import type { Metadata } from "next";
import { Testimonials } from "@/components/sections/testimonials";

export const metadata: Metadata = { title: "Depoimentos · Little Lulli" };

export default function TestimonialsPage() {
  return (
    <main id="conteudo" className="pt-24 md:pt-28">
      <h1 className="sr-only">Depoimentos</h1>
      <Testimonials />
    </main>
  );
}
