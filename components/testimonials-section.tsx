"use client";

import { Testimonial } from "@/components/ui/testimonial";

const testimonials = [
  {
    quote: "Eu amei demais. Esses laços são como jóias vão caminhar toda a infância dela com ela.",
    highlightedText: "jóias",
    authorName: "Mariane",
    authorPosition: "Mãe da Sara, 2 anos",
  },
  {
    quote: "Sem palavras. Vi ontem à noite, estou apaixonada. E o mimo? Que coisa linda e delicada... Tudo muito perfeito. Estou doida pra usar e já quero pedir mais",
    highlightedText: "E o mimo?",
    authorName: "Jéssica",
    authorPosition: "Mãe da Joana, 8 meses",
  },
  {
    quote: "Que bordados perfeitos, eu estou encantada. Tanto com os laços, bordados e o acabamento perfeito. Ficou a coisa mais linda na minha princesa, usamos ontem, super leves e delicados.",
    highlightedText: "estou encantada",
    authorName: "Ana Paula",
    authorPosition: "Mãe da Lívia, 1 ano",
  },
];

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            O que dizem nossas <span className="text-primary italic">mamães</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A alegria de ver cada pequena brilhando com nossos laços é o que nos move todos os dias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Testimonial
              key={index}
              quote={item.quote}
              highlightedText={item.highlightedText}
              authorName={item.authorName}
              authorPosition={item.authorPosition}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
