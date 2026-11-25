"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Daisy } from "@/components/decor";
import { RotatingBadge } from "@/components/rotating-badge";
import { EASE_SILK, FadeIn, RevealText } from "@/components/motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Tecidos escolhidos a dedo",
    text: "Tecidos macios e delicados, selecionados pensando no conforto e no charme de cada pequena.",
    image: "/colecao-1.jpeg",
    alt: "Laços e presilhas em tecido rosa com bordados florais",
    position: "object-[50%_55%]",
  },
  {
    title: "Bordado ponto a ponto",
    text: "Flores, folhinhas e bichinhos ganham vida em bordados feitos à mão, com linhas coloridas e muita paciência. Por isso, nenhum laço é exatamente igual ao outro.",
    image: "/colecao-2.jpeg",
    alt: "Detalhe de bordado de margarida e rosinhas em presilhas terracota",
    position: "object-[50%_45%]",
  },
  {
    title: "Acabamento impecável",
    text: "Cada peça é revisada nos mínimos detalhes para ficar leve, delicada e pronta para acompanhar o dia a dia.",
    image: "/colecao-3.jpeg",
    alt: "Presilhas de veludo bordadas com raposinha presas no cabelo",
    position: "object-[50%_40%]",
  },
  {
    title: "Embalado com carinho",
    text: "Seu pedido é preparado com todo o cuidado para encantar desde o primeiro olhar — do jeitinho que as mamães amam.",
    image: "/colecao-4.jpeg",
    alt: "Menina sorrindo usando presilhas bordadas Little Lulli",
    position: "object-[50%_30%]",
    quote: { text: "“E o mimo? Que coisa linda e delicada...”", author: "Jéssica, mãe da Joana" },
  },
];

export function Atelier() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 60%", "end 55%"],
  });
  const threadClip = useTransform(scrollYProgress, (p) => `inset(0% 0% ${(1 - p) * 100}% 0%)`);

  return (
    <section id="atelie" aria-labelledby="atelie-title" className="relative overflow-clip py-24 [contain:paint] md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-40 size-[36rem] rounded-full bg-blush/50 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <FadeIn className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-rose-ink">
              <Daisy className="w-7" />
              O ateliê
            </FadeIn>
            <RevealText
              id="atelie-title"
              className="font-display mt-5 text-[clamp(2.6rem,5.6vw,5.2rem)] font-[380] leading-[0.98] tracking-[-0.03em] text-cocoa"
              segments={["Do fio ao ", { text: "laço,", className: "italic text-rose-deep" }, "\nsem pressa."]}
            />
          </div>
          <FadeIn delay={0.15} className="lg:col-span-5 lg:pb-3">
            <p className="font-display text-2xl leading-snug text-cocoa md:text-[1.7rem]">
              No ateliê Little Lulli, os laços são feitos por mãos de quem entende que{" "}
              <em className="text-rose-deep">cada nascimento é único.</em>
            </p>
          </FadeIn>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Sticky image (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[14vh]">
              <div className="arch relative h-[72vh] max-h-[720px] overflow-hidden bg-blush shadow-[0_50px_90px_-50px_rgba(58,38,34,0.7)]">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.image}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                    transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      initial={false}
                      animate={{ scale: i === active ? 1 : 1.18 }}
                      transition={{ duration: 1.6, ease: EASE_SILK }}
                    >
                      <Image src={step.image} alt={step.alt} fill sizes="40vw" className={cn("object-cover", step.position)} />
                    </motion.div>
                  </motion.div>
                ))}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/50 to-transparent" />
                <div className="absolute bottom-6 left-7 flex items-end gap-3 text-linen">
                  <span className="font-display relative block h-[5.5rem] overflow-hidden text-[5.5rem] italic leading-none">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={active}
                        className="block"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.8, ease: EASE_SILK }}
                      >
                        0{active + 1}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="pb-3 text-sm text-linen/80">/ 0{steps.length}</span>
                </div>
              </div>
              <RotatingBadge
                text="feito à mão ✿ ponto a ponto ✿ com amor ✿ "
                className="absolute -right-8 top-10 size-32 rounded-full bg-linen text-cocoa shadow-xl"
              >
                <Daisy className="w-12" />
              </RotatingBadge>
            </div>
          </div>

          {/* Step list */}
          <ol ref={listRef} className="relative lg:col-span-6 lg:col-start-7">
            {/* Stitched thread */}
            <div
              aria-hidden="true"
              className="absolute bottom-3 left-[calc(1.375rem-1px)] top-3 w-0 border-l-2 border-dashed border-cocoa/15 md:left-[calc(1.625rem-1px)]"
            />
            <motion.div
              aria-hidden="true"
              className="absolute bottom-3 left-[calc(1.375rem-1px)] top-3 w-[2px] bg-[repeating-linear-gradient(180deg,var(--color-rose-deep)_0_8px,transparent_8px_14px)] md:left-[calc(1.625rem-1px)]"
              style={{ clipPath: threadClip }}
            />

            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                className="relative pb-16 pl-16 last:pb-0 md:pl-20 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:pb-0"
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-48% 0px -48% 0px" }}
              >
                <span
                  className={cn(
                    "font-display absolute left-0 top-0 grid size-11 place-items-center rounded-full border text-base italic transition-all duration-700 md:size-[3.25rem] md:text-lg lg:top-1/2 lg:-translate-y-1/2",
                    i <= active
                      ? "border-rose-deep bg-rose-deep text-linen shadow-[0_0_0_8px_var(--color-blush)]"
                      : "border-cocoa/15 bg-linen text-cocoa-soft",
                  )}
                >
                  0{i + 1}
                </span>

                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[1.8rem] lg:hidden">
                  <Image src={step.image} alt={step.alt} fill sizes="90vw" className={cn("object-cover", step.position)} />
                </div>

                <FadeIn>
                  <h3 className="font-display text-[2rem] leading-tight text-cocoa md:text-[2.6rem]">{step.title}</h3>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-cocoa-soft">{step.text}</p>
                  {step.quote ? (
                    <figure className="mt-6 inline-flex max-w-lg flex-col gap-1 rounded-2xl border border-rose/40 bg-blush/40 px-5 py-4">
                      <blockquote className="font-display text-lg italic text-cocoa">{step.quote.text}</blockquote>
                      <figcaption className="text-sm text-cocoa-soft">— {step.quote.author}</figcaption>
                    </figure>
                  ) : null}
                </FadeIn>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
