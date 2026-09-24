"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Pause, Play } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { BowMark, Daisy } from "@/components/decor";
import { EASE_SILK, FadeIn, RevealText, useRange } from "@/components/motion";
import { testimonials, type Testimonial } from "@/lib/site";
import { cn } from "@/lib/utils";

const DURATION = 9;
const avatarTones = ["bg-blush text-rose-ink", "bg-mint text-ink", "bg-gold text-ink"];

type Piece = { text: string; hl: boolean };

/** Split a quote into words, keeping punctuation glued to the word before it. */
function splitQuote({ quote, highlight }: Testimonial): Piece[][] {
  const at = quote.indexOf(highlight);
  const parts: Piece[] =
    at === -1
      ? [{ text: quote, hl: false }]
      : [
          { text: quote.slice(0, at), hl: false },
          { text: highlight, hl: true },
          { text: quote.slice(at + highlight.length), hl: false },
        ];
  const words: Piece[][] = [];
  let previousEndsWithSpace = true;
  for (const part of parts) {
    if (!part.text) continue;
    part.text.split(" ").forEach((chunk, i) => {
      if (!chunk) return;
      if (i === 0 && !previousEndsWithSpace && words.length > 0) {
        words[words.length - 1].push({ text: chunk, hl: part.hl });
      } else {
        words.push([{ text: chunk, hl: part.hl }]);
      }
    });
    previousEndsWithSpace = part.text.endsWith(" ");
  }
  return words;
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const progress = useMotionValue(0);
  const paused = hovering || userPaused || !inView || Boolean(reduce);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const floatA = useRange(scrollYProgress, [0, 1], [120, -160]);
  const floatB = useRange(scrollYProgress, [0, 1], [-60, 140]);
  const floatC = useRange(scrollYProgress, [0, 1], [80, -80]);

  const go = (next: number) => {
    progress.set(0);
    setIndex((next + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (paused) return;
    const controls = animate(progress, 1, {
      duration: (1 - progress.get()) * DURATION,
      ease: "linear",
      onComplete: () => {
        progress.set(0);
        setIndex((i) => (i + 1) % testimonials.length);
      },
    });
    return () => controls.stop();
  }, [index, paused, progress]);

  const current = testimonials[index];
  const words = splitQuote(current);

  return (
    <section
      id="depoimentos"
      ref={sectionRef}
      aria-labelledby="depoimentos-title"
      className="relative isolate overflow-hidden rounded-t-[2.5rem] bg-ink py-24 text-linen md:rounded-t-[4rem] md:py-36"
    >
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-screen" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 -z-10 size-[40rem] rounded-full bg-rose-deep/25 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 -z-10 size-[30rem] rounded-full bg-mint/10 blur-[120px]" />

      {/* Drifting bows */}
      <motion.div aria-hidden="true" style={{ y: floatA }} className="pointer-events-none absolute right-[8%] top-[18%] hidden w-24 rotate-12 md:block">
        <BowMark tone="blush" className="w-full animate-float opacity-90" />
      </motion.div>
      <motion.div aria-hidden="true" style={{ y: floatB }} className="pointer-events-none absolute bottom-[14%] left-[5%] hidden w-16 -rotate-12 md:block">
        <BowMark tone="mint" className="w-full animate-float opacity-80" />
      </motion.div>
      <motion.div aria-hidden="true" style={{ y: floatC }} className="pointer-events-none absolute right-[26%] bottom-[10%] hidden w-12 md:block">
        <Daisy className="w-full animate-float" />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-rose">
          <BowMark tone="blush" className="w-8" />
          Depoimentos
        </FadeIn>
        <RevealText
          id="depoimentos-title"
          className="font-display mt-5 text-[clamp(2.4rem,5vw,4.6rem)] font-[380] leading-[1] tracking-[-0.03em]"
          segments={["O que dizem nossas ", { text: "mamães", className: "italic text-rose" }]}
        />

        <div
          className="mt-14 md:mt-20"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
        >
          <div className="relative min-h-[19.5rem] md:min-h-[12rem] lg:min-h-[18.5rem]">
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute -left-2 -top-16 select-none text-[12rem] leading-none text-rose/20 md:-left-10 md:-top-24 md:text-[18rem]"
            >
              “
            </span>

            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                id="depoimento-painel"
                role="tabpanel"
                aria-roledescription="depoimento"
                aria-label={`${current.name}, ${current.detail}`}
                className="relative cursor-grab active:cursor-grabbing"
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(index + 1);
                  else if (info.offset.x > 70) go(index - 1);
                }}
                exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: EASE_SILK }}
              >
                <blockquote className="font-display text-[clamp(1.65rem,3.4vw,3.1rem)] font-[360] leading-[1.18] tracking-[-0.015em]">
                  {words.map((pieces, i) => (
                    <Fragment key={i}>
                      <motion.span
                        className="inline-block"
                        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.7, delay: i * 0.028, ease: EASE_SILK }}
                      >
                        {pieces.map((piece, j) =>
                          piece.hl ? (
                            <motion.span
                              key={j}
                              className="bg-[repeating-linear-gradient(90deg,var(--color-rose)_0_7px,transparent_7px_12px)] bg-[position:0_92%] bg-no-repeat pb-1 italic text-rose"
                              initial={{ backgroundSize: "0% 2px" }}
                              animate={{ backgroundSize: "100% 2px" }}
                              transition={{ duration: 0.6, delay: 0.5 + i * 0.04, ease: EASE_SILK }}
                            >
                              {piece.text}
                            </motion.span>
                          ) : (
                            <Fragment key={j}>{piece.text}</Fragment>
                          ),
                        )}
                      </motion.span>{" "}
                    </Fragment>
                  ))}
                </blockquote>
                <motion.figcaption
                  className="mt-8 flex items-center gap-3 text-linen/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <span className="h-px w-10 bg-rose/60" />
                  <span>
                    <span className="font-medium text-linen">{current.name}</span> · {current.detail}
                  </span>
                </motion.figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Selector */}
          <div className="mt-14 flex flex-col gap-4 md:mt-16 md:flex-row md:items-stretch">
            <div
              role="tablist"
              aria-label="Escolher depoimento"
              className="grid flex-1 grid-cols-3 gap-2 sm:gap-3"
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const next = (index + (e.key === "ArrowRight" ? 1 : -1) + testimonials.length) % testimonials.length;
                go(next);
                e.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
              }}
            >
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-controls="depoimento-painel"
                  tabIndex={i === index ? 0 : -1}
                  onClick={() => go(i)}
                  className={cn(
                    "group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border px-2 py-3 text-center transition-colors duration-500 sm:flex-row sm:gap-3 sm:px-4 sm:py-3.5 sm:text-left",
                    i === index ? "border-rose/40 bg-linen/[0.07]" : "border-linen/10 hover:border-linen/25",
                  )}
                >
                  <span className={cn("font-display grid size-11 shrink-0 place-items-center rounded-full text-lg italic", avatarTones[i % 3])}>
                    {t.name[0]}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium sm:text-base">{t.name}</span>
                    <span className="hidden truncate text-sm text-linen/60 sm:block">{t.detail}</span>
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-linen/10">
                    {i === index && (
                      <motion.span className="absolute inset-0 origin-left bg-rose" style={{ scaleX: progress }} />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              className="inline-flex items-center justify-center gap-2 self-start rounded-2xl border border-linen/10 px-5 py-3.5 text-sm text-linen/70 transition-colors hover:border-linen/25 hover:text-linen md:self-auto"
              aria-label={userPaused ? "Retomar troca automática" : "Pausar troca automática"}
            >
              {userPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
              <span className="md:hidden">{userPaused ? "Retomar" : "Pausar"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
