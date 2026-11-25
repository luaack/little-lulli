import type { Metadata } from "next";
import { PageHeading } from "@/components/shop/page-heading";
import { WHATSAPP_NUMBER } from "@/lib/site";

export const metadata: Metadata = { title: "Trocas e prazos · Little Lulli" };

// TEXTO PROVISÓRIO — as regras abaixo são exemplos e precisam ser revisadas pela Little Lulli.
export default function PoliciesPage() {
  const sections = [
    ["Prazo de produção", "Cada peça é bordada à mão sob demanda. O prazo aparece em cada produto (em dias úteis, contados a partir da confirmação do pagamento) e é somado ao prazo de entrega do frete."],
    ["Entrega", "Enviamos pelos Correios. O valor e o prazo do frete são calculados pelo CEP. Depois da postagem enviamos o código de rastreio por WhatsApp."],
    ["Peças personalizadas", "Peças personalizadas são feitas sob medida e, por isso, não têm troca por arrependimento depois que o bordado começa. Combinamos todos os detalhes e o orçamento antes."],
    ["Trocas e devoluções", "Se a peça chegar com defeito ou diferente do combinado, fale com a gente em até 7 dias corridos após o recebimento, com fotos, e resolvemos a troca. Peças de linha (não personalizadas) podem ser devolvidas em até 7 dias corridos, sem uso e na embalagem original."],
    ["Pagamento", "Pix e cartão de crédito. (Neste ambiente de testes o pagamento é simulado.)"],
  ];
  return (
    <main id="conteudo" className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <PageHeading eyebrow="Informações" id="politicas-title" segments={["Trocas e ", { text: "prazos.", className: "italic text-rose-deep" }]}>
        Texto provisório — será revisado antes de a loja abrir.
      </PageHeading>
      <div className="mt-12 space-y-10">
        {sections.map(([title, body]) => (
          <section key={title}>
            <h2 className="font-display text-2xl text-cocoa">{title}</h2>
            <p className="mt-3 leading-relaxed text-cocoa-soft">{body}</p>
          </section>
        ))}
        <p className="text-cocoa-soft">
          Dúvidas? Fale com a gente no WhatsApp:{" "}
          <a className="text-rose-ink underline underline-offset-4" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            clique aqui
          </a>
          .
        </p>
      </div>
    </main>
  );
}
