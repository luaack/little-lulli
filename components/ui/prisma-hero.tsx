"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Heart, MessageCircle } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Nav Items ---------------- */
const navItems = [
  { label: "Home", href: "/" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

/* ---------------- Hero ---------------- */
const PrismaHero = () => {
  return (
    <section className="relative z-20 h-screen w-full">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/cutebaby.mp4"
        />

        {/* Noise overlay */}
        <div
          className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay"
          aria-hidden="true"
        />

        {/* Gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(0,0,0,0.65) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Subtle pink tint on the sides */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% 50%, rgba(220,152,170,0.15) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Navbar */}
        <nav className="fixed left-1/2 top-0 z-50 -translate-x-1/2">
          <div className="flex items-center gap-4 rounded-b-2xl bg-black/80 backdrop-blur-sm px-6 py-2 sm:gap-8 md:gap-10 md:rounded-b-3xl md:px-10 lg:gap-12">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] transition-colors sm:text-xs md:text-sm tracking-wide"
                style={{ color: "rgba(245, 208, 218, 0.75)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#f5d0da")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(245, 208, 218, 0.75)")
                }
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-2 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">
            {/* Brand name — large display */}
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-['Playfair_Display'] italic font-bold leading-[0.85] tracking-[-0.04em] text-[17vw] sm:text-[15vw] md:text-[14vw] lg:text-[12vw] xl:text-[11vw] 2xl:text-[11vw]"
                style={{ color: "#f5d0da" }}
              >
                <WordsPullUp text="Little Lulli" showAsterisk />
              </h1>
            </div>

            {/* Tagline + CTAs */}
            <div className="col-span-12 flex flex-col gap-4 pb-6 lg:col-span-4 lg:pb-10">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-xs sm:text-sm md:text-base"
                style={{ color: "rgba(245, 208, 218, 0.85)", lineHeight: 1.3 }}
              >
                Laços artesanais feitos com amor e cuidado para deixar sua
                princesa ainda mais linda. Cada detalhe pensado para encantar.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col gap-2 sm:flex-row"
              >
                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/5561991557493"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 self-start rounded-full py-1 pl-4 pr-1 text-sm font-medium transition-all hover:gap-3 sm:text-base"
                  style={{ backgroundColor: "#f5d0da", color: "#1a1a1a" }}
                >
                  Pedir pelo WhatsApp
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <MessageCircle
                      className="h-4 w-4"
                      style={{ color: "#f5d0da" }}
                    />
                  </span>
                </a>

                {/* Instagram CTA */}
                <a
                  href="https://www.instagram.com/uselittlelulli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 self-start rounded-full border py-1 pl-4 pr-1 text-sm font-medium transition-all hover:gap-3 sm:text-base"
                  style={{
                    borderColor: "rgba(245,208,218,0.4)",
                    color: "rgba(245,208,218,0.85)",
                  }}
                >
                  Ver no Instagram
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-110 sm:h-10 sm:w-10"
                    style={{ backgroundColor: "rgba(245,208,218,0.15)" }}
                  >
                    <Heart
                      className="h-4 w-4"
                      style={{ color: "#f5d0da" }}
                    />
                  </span>
                </a>
              </motion.div>

              {/* Scroll hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="hidden lg:flex items-center gap-2 pb-2"
                style={{ color: "rgba(245,208,218,0.5)" }}
              >
                <ArrowRight className="h-3 w-3 rotate-90" />
                <span className="text-[10px] tracking-widest uppercase">
                  Role para explorar
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-20 right-6 z-10 hidden md:flex flex-col items-center justify-center rounded-full text-center"
          style={{
            width: 80,
            height: 80,
            background: "rgba(245,208,218,0.15)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(245,208,218,0.25)",
            color: "#f5d0da",
          }}
        >
          <span className="text-[9px] tracking-widest uppercase leading-tight">
            feito
            <br />
            com
            <br />
            amor
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export { PrismaHero };
