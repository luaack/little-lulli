import type { Metadata } from "next";
import { Atelier } from "@/components/sections/atelier";

export const metadata: Metadata = { title: "Ateliê · Little Lulli" };

export default function AtelierPage() {
  return (
    <main id="conteudo" className="pt-20 md:pt-24">
      <Atelier />
    </main>
  );
}
