"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BowMark } from "@/components/decor";
import { InstagramIcon } from "@/components/icons";
import { EASE_SILK, FadeIn, RevealText, useRange } from "@/components/motion";
import { useIsDesktop } from "@/lib/hooks";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  collections,
  whatsappLink,
  type Collection,
} from "@/lib/site";
import { cn } from "@/lib/utils";

function CollectionCard({
  item,
  index,
  progress,
}: {
  item: Collection;
  index: number;
  progress: MotionValue<number>;
}) {
  const imageX = useRange(progress, [0, 1], ["-7%", "7%"]);
  const message = `Olá, Little Lulli! Me apaixonei pela coleção ${item.title} e gostaria de saber mais 🎀`;

  return (
    <motion.article
      className={cn(
        "group relative w-[82vw] shrink-0 snap-center sm:w-[60vw] lg:w-[clamp(340px,27vw,440px)]",
        index % 2 === 1 && "lg:translate-y-[7vh]",
      )}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px -5% -10% 0px" }}
      transition={{ duration: 1.1, delay: index * 0.08, ease: EASE_SILK }}
    >
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Encomendar"
        className="block"
        aria-label={`Encomendar a coleção ${item.title} pelo WhatsApp`}
      >
        <div
          className={cn(
            "relative aspect-[4/5] overflow-hidden bg-blush shadow-[0_40px_70px_-45px_rgba(58,38,34,0.7)] lg:aspect-[4/5.1]",
            index % 2 === 0 ? "arch" : "rounded-[2.2rem]",
          )}
        >
          <motion.div className="absolute inset-y-0 -left-[8%] w-[116%]" style={{ x: imageX }}>
            <Image
              src={item.image}
              alt={`Coleção ${item.title} — ${item.description}`}
              fill
              sizes="(min-width: 1024px) 30vw, 82vw"
              className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.06]"
            />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/45 to-transparent" />
          <span className="font-display absolute bottom-5 left-5 grid size-12 place-items-center rounded-full bg-linen/85 text-lg italic text-cocoa backdrop-blur md:bottom-6 md:left-6">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute bottom-5 right-5 inline-flex translate-y-3 items-center gap-2 rounded-full bg-linen py-2 pl-4 pr-2 text-sm font-medium text-cocoa opacity-0 transition-all duration-500 ease-[var(--ease-silk)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
            Encomendar
            <span className="grid size-7 place-items-center rounded-full bg-cocoa text-linen">
              <ArrowUpRight className="size-3.5" />
            </span>
          </span>
        </div>
      </a>

      <div className="mt-6 px-1">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-cocoa/12 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-cocoa-soft"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display mt-4 text-[1.9rem] leading-tight text-cocoa md:text-[2.1rem]">
          {item.title}
        </h3>
        <p className="mt-2 max-w-[34ch] leading-relaxed text-cocoa-soft">{item.description}</p>
      </div>
    </motion.article>
  );
}

export function Collections() {
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const distanceValue = useMotionValue(0);

  // Measure how far the track needs to travel horizontally.
  useEffect(() => {
    if (!isDesktop) {
      distanceValue.set(0);
      return;
    }
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const viewport = track.parentElement?.clientWidth ?? window.innerWidth;
      const d = Math.max(0, Math.round(track.scrollWidth - viewport));
      distanceValue.set(d);
      setDistance(d);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isDesktop, distanceValue]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform([scrollYProgress, distanceValue], ([p, d]: number[]) => -p * d);
  const needleLeft = useTransform(scrollYProgress, (p) => `${p * 100}%`);
  const counter = useTransform(scrollYProgress, (p) =>
    String(Math.min(collections.length, Math.floor(p * (collections.length + 0.999)) + 1)).padStart(2, "0"),
  );

  return (
    <section
      id="colecoes"
      ref={sectionRef}
      aria-labelledby="colecoes-title"
      className="relative py-20 [contain:paint] lg:py-0"
      style={isDesktop && distance > 0 ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex flex-col lg:w-max lg:flex-row lg:items-center lg:gap-[5vw] lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-[8vw]"
        >
          {/* Intro panel */}
          <div className="px-5 md:px-8 lg:w-[34vw] lg:max-w-[34rem] lg:shrink-0 lg:px-0">
            <FadeIn className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-rose-ink">
              <BowMark className="w-8" />
              Coleções
            </FadeIn>
            <RevealText
              id="colecoes-title"
              className="font-display mt-5 text-[clamp(2.6rem,5vw,4.6rem)] font-[380] leading-[0.98] tracking-[-0.03em] text-cocoa"
              segments={[
                "Cada laço,\numa ",
                { text: "pequena", className: "italic text-rose-deep" },
                "\n",
                { text: "história.", className: "italic text-rose-deep" },
              ]}
            />
            <FadeIn delay={0.15} className="mt-6 max-w-md text-lg leading-relaxed text-cocoa-soft">
              Descubra a magia de cada detalhe em nossas linhas exclusivas, pensadas para a sua pequena.
              Toque em uma coleção para encomendar direto pelo WhatsApp.
            </FadeIn>

            <FadeIn delay={0.25} className="mt-10 hidden items-center gap-4 text-cocoa-soft lg:flex">
              <span className="font-display text-5xl italic text-cocoa">
                <motion.span>{counter}</motion.span>
              </span>
              <span className="text-sm">
                / {String(collections.length).padStart(2, "0")}
                <br />
                Role para passear pelas coleções
              </span>
            </FadeIn>
          </div>

          {/* Cards */}
          <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 md:px-8 lg:mt-0 lg:gap-[4vw] lg:overflow-visible lg:px-0 lg:pb-0">
            {collections.map((item, i) => (
              <CollectionCard key={item.slug} item={item} index={i} progress={scrollYProgress} />
            ))}

            {/* Instagram card */}
            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Seguir"
              className="group relative flex w-[82vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[2.2rem] bg-cocoa p-8 text-linen sm:w-[60vw] lg:aspect-[4/5.6] lg:w-[clamp(320px,24vw,400px)] lg:translate-y-[-4vh]"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE_SILK }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-rose-deep/40 blur-3xl transition-transform duration-1000 group-hover:scale-150" />
              <div className="relative flex items-center justify-between">
                <BowMark tone="blush" className="w-14 transition-transform duration-700 group-hover:-rotate-12" />
                <span className="grid size-12 place-items-center rounded-full border border-linen/25 transition-colors duration-500 group-hover:bg-linen group-hover:text-cocoa">
                  <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </div>
              <div className="relative mt-16">
                <p className="font-script text-4xl text-blush">e tem muito mais...</p>
                <p className="font-display mt-3 text-3xl leading-tight md:text-[2.2rem]">
                  Novidades, bastidores e lançamentos no nosso Instagram.
                </p>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-linen/10 px-4 py-2 text-sm">
                  <InstagramIcon className="size-4" />
                  {INSTAGRAM_HANDLE}
                </p>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Thread progress (desktop) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 hidden px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:block">
          <div className="relative h-6">
            <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-cocoa/15" />
            <motion.div
              className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-[repeating-linear-gradient(90deg,var(--color-rose-deep)_0_7px,transparent_7px_14px)]"
              style={{ width: needleLeft }}
            />
            <motion.div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: needleLeft }}>
              <BowMark className="w-9 drop-shadow-[0_4px_6px_rgba(58,38,34,0.2)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
