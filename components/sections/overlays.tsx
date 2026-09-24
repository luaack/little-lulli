"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";
import { useIntro } from "@/components/providers";
import { WhatsAppIcon } from "@/components/icons";
import { EASE_SILK } from "@/components/motion";
import { useFinePointer } from "@/lib/hooks";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/site";

/* Thin stitched thread across the top that follows reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[120] h-[3px] origin-left bg-[repeating-linear-gradient(90deg,var(--color-rose-deep)_0_9px,transparent_9px_14px)]"
      style={{ scaleX }}
    />
  );
}

/* Floating WhatsApp button — shows after the hero, hides near the final CTA. */
export function FloatingWhatsApp() {
  const { done } = useIntro();
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [nearContact, setNearContact] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > window.innerHeight * 0.85));

  useEffect(() => {
    const targets = [document.getElementById("contato"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el !== null,
    );
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setNearContact(visible.size > 0);
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const show = done && pastHero && !nearContact;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Encomendar pelo WhatsApp"
          className="group fixed bottom-5 right-5 z-[95] flex h-14 items-center gap-0 rounded-full bg-cocoa p-1.5 pl-1.5 text-linen shadow-[0_20px_40px_-15px_rgba(58,38,34,0.8)] md:bottom-8 md:right-8"
          initial={{ scale: 0, opacity: 0, rotate: -40 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.6, ease: EASE_SILK }}
        >
          <span className="relative grid size-11 place-items-center rounded-full bg-rose-deep">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-rose-deep" />
            <WhatsAppIcon className="relative size-5" />
          </span>
          <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[var(--ease-silk)] group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
            <span className="overflow-hidden whitespace-nowrap text-sm font-medium">
              <span className="block px-4">Encomendar</span>
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* Contextual cursor bubble over elements marked with data-cursor (desktop only). */
export function CursorFollower() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 });
  const [label, setLabel] = useState<string | null>(null);
  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : null);
    };
    const onLeave = () => setLabel(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[130]"
      style={{ x: sx, y: sy }}
    >
      <AnimatePresence>
        {label && (
          <motion.div
            key="bubble"
            className="-translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_SILK }}
          >
            <div className="grid size-24 place-items-center rounded-full bg-cocoa/90 text-[0.8rem] font-medium tracking-wide text-linen shadow-2xl backdrop-blur">
              {label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
