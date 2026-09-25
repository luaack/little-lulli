"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { useRange } from "@/components/motion";
import { useIsDesktop } from "@/lib/hooks";

export function Moments() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Arch → full-bleed. Side inset is in vw so the top radius can stay a perfect half-circle.
  const startSide = isDesktop ? 33 : 11; // vw
  const startTop = isDesktop ? 20 : 22; // % of height
  const side = useRange(scrollYProgress, [0, 0.62], [startSide, 0]);
  const vert = useRange(scrollYProgress, [0, 0.62], [startTop, 0]);
  const radius = useTransform(side, (s: number) => (50 - s) * (1 - (startSide - s) / startSide));
  const bottomRadius = useRange(scrollYProgress, [0, 0.62], [28, 0]);
  const clipPath = useMotionTemplate`inset(${vert}% ${side}vw ${vert}% ${side}vw round ${radius}vw ${radius}vw ${bottomRadius}px ${bottomRadius}px)`;

  const videoScale = useRange(scrollYProgress, [0, 0.7], [1.3, 1]);
  const leftX = useRange(scrollYProgress, [0, 0.5], ["0vw", "-40vw"]);
  const rightX = useRange(scrollYProgress, [0, 0.5], ["0vw", "40vw"]);
  const sideOpacity = useRange(scrollYProgress, [0, 0.4], [1, 0]);
  const captionOpacity = useRange(scrollYProgress, [0.62, 0.8], [0, 1]);
  const captionY = useRange(scrollYProgress, [0.62, 0.85], [40, 0]);
  const veil = useRange(scrollYProgress, [0.5, 0.8], [0, 1]);

  // Only play while visible — the file is small, but it's still a video.
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="momentos-title"
      className="relative h-[260vh] bg-linen [contain:paint]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Video in an arch that grows to full bleed */}
        <motion.div className="absolute inset-0 bg-blush" style={{ clipPath }}>
          <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
            <video
              ref={videoRef}
              className="size-full object-cover"
              muted
              loop
              playsInline
              preload="none"
              poster="/momentos-poster.jpg"
              aria-label="Bebê sorrindo, deitada em lençóis brancos, usando um laço rosado na cabeça"
            >
              {/* Phones get a 720p cut: half the bytes and a lighter decode while the frame scales. */}
              <source src="/momentos-720.webm" type="video/webm" media="(max-width: 767px)" />
              <source src="/momentos-720.mp4" type="video/mp4" media="(max-width: 767px)" />
              <source src="/momentos.webm" type="video/webm" />
              <source src="/momentos.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent"
            style={{ opacity: veil }}
          />
        </motion.div>

        {/* Split headline that parts as the frame grows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-[9vh] lg:flex-row lg:justify-between lg:px-[4vw] lg:py-0"
        >
          <motion.p
            style={{ x: isDesktop ? leftX : 0, opacity: sideOpacity }}
            className="font-display text-[clamp(2.4rem,6vw,6rem)] font-[380] leading-none tracking-[-0.03em] text-cocoa"
          >
            Feitos para
          </motion.p>
          <motion.p
            style={{ x: isDesktop ? rightX : 0, opacity: sideOpacity }}
            className="font-display text-[clamp(2.4rem,6vw,6rem)] font-[340] italic leading-none tracking-[-0.03em] text-rose-deep"
          >
            cada sorriso
          </motion.p>
        </div>

        {/* Caption once the video fills the screen */}
        <motion.div
          style={{ opacity: captionOpacity, y: captionY }}
          className="absolute inset-x-0 bottom-0 px-5 pb-12 md:px-8 md:pb-16"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-script text-5xl leading-none text-blush md:text-6xl">Momentos Lulli</p>
              <h2
                id="momentos-title"
                className="font-display mt-3 max-w-2xl text-[clamp(2rem,4.4vw,4rem)] font-[380] leading-[1.02] tracking-[-0.02em] text-linen"
              >
                Feitos para acompanhar <em className="text-blush">cada sorriso</em> da infância.
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-linen/85 md:text-lg">
              O carinho e o cuidado em forma de laço — para guardar na memória cada fase, cada
              descoberta, cada foto.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
