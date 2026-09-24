"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useIntro } from "@/components/providers";
import { BowMark, Daisy, NeedleIcon, Rosette, RotatingBadge } from "@/components/decor";
import { WhatsAppIcon } from "@/components/icons";
import { EASE_SILK, Magnetic, RevealText, StitchPath, useRange } from "@/components/motion";
import { ScrollLink } from "@/components/scroll-link";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/site";

function useDepth(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return { x, y };
}

export function Hero() {
  const { done } = useIntro();
  const ref = useRef<HTMLElement>(null);

  // Pointer parallax (desktop).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.8 });
  const my = useSpring(py, { stiffness: 60, damping: 18, mass: 0.8 });

  // Scroll parallax.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useRange(scrollYProgress, [0, 1], ["0%", "18%"]);
  const copyOpacity = useRange(scrollYProgress, [0, 0.75], [1, 0]);
  const archY = useRange(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const circleY = useRange(scrollYProgress, [0, 1], ["0%", "-32%"]);
  const cardY = useRange(scrollYProgress, [0, 1], ["0%", "-48%"]);
  const imageScale = useRange(scrollYProgress, [0, 1], [1, 1.14]);

  const deep = useDepth(mx, my, -34);
  const mid = useDepth(mx, my, -18);
  const near = useDepth(mx, my, 26);
  const nearer = useDepth(mx, my, 42);

  const show = done;

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        px.set(e.clientX / window.innerWidth - 0.5);
        py.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      {/* Soft washes of colour */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[10%] -top-[20%] size-[60vw] max-h-[900px] max-w-[900px] rounded-full bg-blush/70 blur-[120px]" />
        <div className="absolute -bottom-[25%] -left-[15%] size-[50vw] max-h-[760px] max-w-[760px] rounded-full bg-mint/25 blur-[120px]" />
        <div className="absolute left-[35%] top-[30%] size-[30vw] rounded-full bg-gold/10 blur-[100px]" />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-y-12 px-5 pb-16 pt-28 md:px-8 lg:grid-cols-12 lg:gap-x-6 lg:pb-24 lg:pt-28">
        {/* ------------------------------------------------------------ */}
        {/* Copy                                                          */}
        {/* ------------------------------------------------------------ */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10 lg:col-span-7">
          <motion.p
            className="inline-flex items-center gap-2.5 rounded-full border border-cocoa/10 bg-linen/70 py-1.5 pl-2 pr-4 text-[0.78rem] font-medium tracking-wide text-cocoa-soft backdrop-blur"
            initial={{ opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE_SILK }}
          >
            <span className="grid size-7 place-items-center rounded-full bg-blush text-rose-ink">
              <NeedleIcon className="size-4" />
            </span>
            Ateliê de laços infantis · bordados à mão
          </motion.p>

          <RevealText
            as="h1"
            id="hero-title"
            play={show}
            delay={0.35}
            stagger={0.075}
            className="font-display mt-6 text-[clamp(3.1rem,6.1vw,6.5rem)] font-[380] leading-[0.92] tracking-[-0.035em] text-cocoa"
            segments={[
              "Pequenas joias\n",
              { text: "bordadas", className: "italic font-[340] text-rose-deep" },
              " à mão.",
            ]}
          />

          <motion.p
            className="mt-7 max-w-[34rem] text-[1.05rem] leading-relaxed text-cocoa-soft md:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.85, ease: EASE_SILK }}
          >
            Laços artesanais bordados ponto a ponto, com amor e cuidado, para deixar sua princesa
            ainda mais linda. Cada detalhe pensado para encantar — e para acompanhar toda a infância.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            initial={{ opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 1, ease: EASE_SILK }}
          >
            <Magnetic>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-16 items-center gap-3 overflow-hidden rounded-full bg-cocoa pl-7 pr-2 text-[1.02rem] font-medium text-linen shadow-[0_18px_40px_-18px_rgba(58,38,34,0.7)]"
              >
                <span className="absolute inset-0 -translate-x-[101%] rounded-full bg-rose-deep transition-transform duration-700 ease-[var(--ease-silk)] group-hover:translate-x-0" />
                <span className="relative">Encomendar pelo WhatsApp</span>
                <span className="relative grid size-12 place-items-center rounded-full bg-linen text-cocoa transition-transform duration-500 group-hover:scale-105">
                  <WhatsAppIcon className="size-5" />
                </span>
              </a>
            </Magnetic>

            <ScrollLink
              href="#colecoes"
              className="group inline-flex items-center gap-2 text-[1.02rem] font-medium text-cocoa"
            >
              <span className="relative">
                Ver coleções
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-cocoa/40 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-0" />
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rose-deep transition-transform delay-150 duration-500 group-hover:scale-x-100" />
              </span>
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
            </ScrollLink>
          </motion.div>

          <motion.figure
            className="mt-10 flex items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 1.15, ease: EASE_SILK }}
          >
            <div className="flex -space-x-2.5" aria-hidden="true">
              {[
                ["M", "bg-blush text-rose-ink"],
                ["J", "bg-mint/60 text-mint-deep"],
                ["A", "bg-gold/40 text-cocoa"],
              ].map(([letter, tone]) => (
                <span
                  key={letter}
                  className={`font-display grid size-10 place-items-center rounded-full border-2 border-linen text-base italic ${tone}`}
                >
                  {letter}
                </span>
              ))}
            </div>
            <div className="text-sm leading-snug">
              <blockquote className="font-display text-base italic text-cocoa">
                “Esses laços são como jóias.”
              </blockquote>
              <figcaption className="text-cocoa-soft">Mariane, mãe da Sara · e muitas outras mamães</figcaption>
            </div>
          </motion.figure>
        </motion.div>

        {/* ------------------------------------------------------------ */}
        {/* Collage                                                       */}
        {/* ------------------------------------------------------------ */}
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[36rem]">
            {/* Stitched thread weaving behind the photos */}
            <motion.div style={deep} className="absolute -inset-[6%]">
              <StitchPath
                play={show}
                delay={0.9}
                duration={2.6}
                viewBox="0 0 600 600"
                className="size-full text-rose-deep/70"
                strokeWidth={2.2}
                d="M20 470 C 90 560, 210 590, 250 500 C 290 410, 170 380, 190 300 C 215 200, 330 250, 360 170 C 390 90, 330 40, 420 30 C 520 20, 590 110, 560 190"
              />
            </motion.div>

            {/* Main arch */}
            <motion.div style={{ ...mid, y: archY }} className="absolute left-[21%] top-0 w-[58%]">
              <motion.div
                className="arch relative aspect-[3/4.1] overflow-hidden bg-blush shadow-[0_40px_80px_-40px_rgba(58,38,34,0.55)]"
                initial={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 28px 28px)" }}
                animate={show ? { clipPath: "inset(0% 0% 0% 0% round 999px 999px 28px 28px)" } : undefined}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.35 }}
                  animate={show ? { scale: 1 } : undefined}
                  transition={{ duration: 2, delay: 0.3, ease: EASE_SILK }}
                >
                  <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
                  <Image
                    src="/colecao-1.jpeg"
                    alt="Laços e presilhas rosa bordados à mão com flores, sobre uma tábua de madeira em formato de coração"
                    fill
                    sizes="(min-width: 1024px) 34vw, 70vw"
                    className="object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Circle — fox clips */}
            <motion.div style={{ ...near, y: circleY }} className="absolute bottom-[3%] left-0 w-[38%]">
              <motion.div
                className="relative"
                initial={{ scale: 0.4, opacity: 0, rotate: -25 }}
                animate={show ? { scale: 1, opacity: 1, rotate: 0 } : undefined}
                transition={{ duration: 1.3, delay: 0.75, ease: EASE_SILK }}
              >
                <svg viewBox="0 0 100 100" className="absolute -inset-[7%] size-[114%] animate-spin-slow text-mint-deep" aria-hidden="true">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2.2 2.2" />
                </svg>
                <div className="relative aspect-square overflow-hidden rounded-full border-[6px] border-linen shadow-[0_30px_60px_-30px_rgba(58,38,34,0.6)]">
                  <Image
                    src="/colecao-3.jpeg"
                    alt="Presilhas bordadas com raposinha e flores no cabelo de uma menina"
                    fill
                    sizes="(min-width: 1024px) 18vw, 38vw"
                    className="scale-125 object-cover object-[50%_40%]"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Hanging tag — daisy clips */}
            <motion.div style={{ ...nearer, y: cardY }} className="absolute bottom-[-2%] right-[-1%] w-[33%]">
              <motion.div
                initial={{ y: -80, opacity: 0, rotate: 18 }}
                animate={show ? { y: 0, opacity: 1, rotate: 6 } : undefined}
                transition={{ type: "spring", stiffness: 70, damping: 9, delay: 1.05 }}
                className="origin-top"
              >
                <div className="animate-sway origin-top rounded-[1.4rem] bg-[#fffdf9] p-2 pb-3 shadow-[0_30px_50px_-25px_rgba(58,38,34,0.55)]">
                  <div className="mx-auto mb-2 size-3 rounded-full border border-cocoa/20 bg-linen" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem]">
                    <Image
                      src="/colecao-2.jpeg"
                      alt="Par de presilhas terracota bordadas com margaridas, em cartela com recorte de coração"
                      fill
                      sizes="(min-width: 1024px) 15vw, 33vw"
                      className="object-cover object-[50%_45%]"
                    />
                  </div>
                  <p className="font-script mt-1 text-center text-[clamp(1.1rem,2.2vw,1.7rem)] leading-none text-rose-deep">
                    feito à mão
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Rotating badge */}
            <motion.div style={near} className="absolute right-[2%] top-[6%] w-[24%] min-w-20">
              <motion.div
                initial={{ scale: 0, rotate: -120 }}
                animate={show ? { scale: 1, rotate: 0 } : undefined}
                transition={{ duration: 1.2, delay: 1.1, ease: EASE_SILK }}
              >
                <RotatingBadge className="aspect-square w-full rounded-full bg-cocoa text-linen shadow-xl" textClassName="text-[14px]">
                  <BowMark tone="blush" className="w-[2.4rem] md:w-12" />
                </RotatingBadge>
              </motion.div>
            </motion.div>

            {/* Embroidered details */}
            {[
              { className: "left-[4%] top-[12%] w-[13%]", depth: near, delay: 1.3, r: "-8deg" },
              { className: "right-[30%] bottom-[30%] w-[8%]", depth: nearer, delay: 1.45, r: "12deg" },
            ].map((d) => (
              <motion.div key={d.className} style={d.depth} className={`absolute ${d.className}`}>
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={show ? { scale: 1, rotate: 0 } : undefined}
                  transition={{ duration: 1, delay: d.delay, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <Daisy className="w-full animate-float drop-shadow-sm" />
                </motion.div>
              </motion.div>
            ))}
            {[
              { className: "left-[16%] top-[4%] w-[4%]", color: "#8ECFC1", delay: 1.5 },
              { className: "left-[12%] bottom-[44%] w-[3.4%]", color: "#D49A9C", delay: 1.6 },
              { className: "right-[6%] top-[42%] w-[3.6%]", color: "#E6C07F", delay: 1.7 },
            ].map((r) => (
              <motion.div key={r.className} style={mid} className={`absolute ${r.className}`}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={show ? { scale: 1 } : undefined}
                  transition={{ duration: 0.8, delay: r.delay, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <Rosette className="w-full" color={r.color} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-cocoa-soft lg:[@media(min-height:860px)]:flex"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 1.8 }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Role para explorar</span>
        <span className="relative h-12 w-px overflow-hidden bg-cocoa/15">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-px bg-rose-deep"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          />
        </span>
        <ArrowDown className="size-3.5" />
      </motion.div>
    </section>
  );
}
