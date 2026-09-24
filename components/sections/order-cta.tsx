"use client";

import { motion } from "motion/react";
import { Gift, Heart, MessageCircleHeart } from "lucide-react";
import { BowMark, Daisy, Rosette, RotatingBadge } from "@/components/decor";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { EASE_SILK, FadeIn, Magnetic, RevealText, StitchPath } from "@/components/motion";
import { DEFAULT_WHATSAPP_MESSAGE, INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappLink } from "@/lib/site";

const steps = [
  {
    icon: Heart,
    title: "Escolha seu favorito",
    text: "Passeie pelas coleções aqui no site ou no nosso Instagram e separe os laços que mais combinam com a sua pequena.",
  },
  {
    icon: MessageCircleHeart,
    title: "Chame no WhatsApp",
    text: "Tiramos todas as suas dúvidas e confirmamos com você os detalhes e a disponibilidade de cada peça.",
  },
  {
    icon: Gift,
    title: "Receba com carinho",
    text: "Seu pedido é preparado e embalado com todo o cuidado, pronto para encantar desde a abertura.",
  },
];

const floating = [
  { className: "left-[5%] top-[12%] w-16 md:w-24", tone: "rose" as const, r: "-14deg", delay: "0s" },
  { className: "right-[6%] top-[18%] w-12 md:w-20", tone: "mint" as const, r: "16deg", delay: "-2s" },
  { className: "left-[12%] bottom-[10%] w-10 md:w-14", tone: "gold" as const, r: "10deg", delay: "-4s" },
  { className: "right-[14%] bottom-[14%] w-14 md:w-16", tone: "blush" as const, r: "-8deg", delay: "-1s" },
];

export function OrderCta() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* How to order */}
        <div className="text-center">
          <FadeIn className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-rose-ink">
            <BowMark className="w-8" />
            Como encomendar
          </FadeIn>
          <RevealText
            className="font-display mx-auto mt-5 max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] font-[380] leading-[1] tracking-[-0.03em] text-cocoa"
            segments={["Três passos até o\n", { text: "laço perfeito.", className: "italic text-rose-deep" }]}
          />
        </div>

        <div className="relative mt-16 md:mt-24">
          <StitchPath
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            className="absolute left-[16%] right-[16%] top-4 hidden h-14 w-[68%] text-rose/80 md:block"
            d="M5 30 C 120 -10, 230 70, 330 30 S 540 -10, 660 30 S 880 70, 995 30"
            strokeWidth={2}
            duration={2.4}
          />
          <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
            {steps.map((step, i) => (
              <FadeIn as="li" key={step.title} delay={i * 0.15} className="relative text-center">
                <div className="relative mx-auto grid size-[5.5rem] place-items-center rounded-full border border-cocoa/10 bg-linen shadow-[0_20px_40px_-25px_rgba(58,38,34,0.6)]">
                  <step.icon className="size-8 text-rose-deep" strokeWidth={1.4} />
                  <span className="font-display absolute -right-1 -top-1 grid size-8 place-items-center rounded-full bg-cocoa text-sm italic text-linen">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-[1.7rem] text-cocoa">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-cocoa-soft">{step.text}</p>
              </FadeIn>
            ))}
          </ol>
        </div>

        {/* Final CTA */}
        <motion.div
          className="relative isolate mt-24 overflow-hidden rounded-[2.5rem] bg-blush px-6 py-20 text-center md:mt-32 md:rounded-[3.5rem] md:px-16 md:py-28"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.2, ease: EASE_SILK }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-20 -top-24 size-96 rounded-full bg-petal blur-3xl" />
            <div className="absolute -bottom-32 -right-16 size-[28rem] rounded-full bg-mint/40 blur-3xl" />
            <div className="stitch-border absolute inset-3 rounded-[2rem] text-rose-deep/40 md:inset-4 md:rounded-[3rem]" />
          </div>

          {floating.map((f) => (
            <div
              key={f.className}
              aria-hidden="true"
              className={`pointer-events-none absolute ${f.className} animate-float`}
              style={{ "--r": f.r, animationDelay: f.delay } as React.CSSProperties}
            >
              <BowMark tone={f.tone} className="w-full drop-shadow-[0_10px_14px_rgba(58,38,34,0.18)]" />
            </div>
          ))}
          <Daisy className="pointer-events-none absolute left-[26%] top-[8%] hidden w-10 animate-float md:block" />
          <Rosette className="pointer-events-none absolute bottom-[26%] right-[28%] hidden w-5 md:block" color="#B4636C" />

          <RotatingBadge
            text="encomende ✿ bordado à mão ✿ little lulli ✿ "
            className="mx-auto mb-8 size-24 rounded-full bg-cocoa text-linen md:size-28"
            textClassName="text-[15px]"
          >
            <WhatsAppIcon className="size-7 text-blush md:size-8" />
          </RotatingBadge>

          <RevealText
            id="contato-title"
            className="font-display mx-auto max-w-4xl text-[clamp(2.3rem,5.4vw,5rem)] font-[380] leading-[1] tracking-[-0.03em] text-cocoa"
            segments={["Vamos encontrar o laço perfeito para a sua ", { text: "pequena?", className: "italic text-rose-deep" }]}
          />
          <FadeIn delay={0.2} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cocoa/75">
            Chame a gente no WhatsApp: tiramos suas dúvidas, mostramos as opções disponíveis e cuidamos
            de cada detalhe do seu pedido.
          </FadeIn>

          <FadeIn delay={0.3} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic strength={0.4}>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-16 items-center gap-3 overflow-hidden whitespace-nowrap rounded-full bg-cocoa pl-6 pr-2 text-base font-medium text-linen shadow-[0_24px_50px_-20px_rgba(58,38,34,0.8)] md:h-[4.25rem] md:pl-8 md:text-lg"
              >
                <span className="absolute inset-0 -translate-x-[101%] rounded-full bg-rose-deep transition-transform duration-700 ease-[var(--ease-silk)] group-hover:translate-x-0" />
                <span className="relative">Encomendar pelo WhatsApp</span>
                <span className="relative grid size-12 place-items-center rounded-full bg-linen text-cocoa md:size-[3.25rem]">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-linen" />
                  <WhatsAppIcon className="relative size-6" />
                </span>
              </a>
            </Magnetic>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-[4.25rem] items-center gap-3 rounded-full border border-cocoa/20 bg-linen/40 pl-6 pr-2 font-medium text-cocoa backdrop-blur transition-colors duration-500 hover:bg-linen"
            >
              {INSTAGRAM_HANDLE}
              <span className="grid size-[3.25rem] place-items-center rounded-full bg-linen transition-transform duration-500 group-hover:rotate-12">
                <InstagramIcon className="size-5" />
              </span>
            </a>
          </FadeIn>
        </motion.div>
      </div>
    </section>
  );
}
