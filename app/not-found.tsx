import Link from "next/link";
import { BowMark } from "@/components/decor";

export default function NotFound() {
  return (
    <main id="conteudo" className="mx-auto max-w-xl px-5 py-40 text-center">
      <BowMark tone="blush" className="mx-auto w-20" />
      <h1 className="font-display mt-6 text-4xl text-cocoa">Página não encontrada</h1>
      <p className="mt-3 text-cocoa-soft">O laço que você procura não está por aqui.</p>
      <Link href="/loja" className="mt-8 inline-flex h-12 items-center rounded-full bg-cocoa px-7 font-medium text-linen">
        Ver a loja
      </Link>
    </main>
  );
}
