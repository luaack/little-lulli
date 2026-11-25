"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIntro } from "@/components/providers";
import { BowMark } from "@/components/decor";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { EASE_SILK } from "@/components/motion";
import { ScrollLink } from "@/components/scroll-link";
import { setScrollLocked } from "@/lib/smooth-scroll";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  navItems,
  whatsappLink,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { done } = useIntro();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > previous && y > 360);
  });

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    const onTop = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    setScrollLocked(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 md:px-6 md:pt-4"
        initial={{ y: "-130%" }}
        animate={{ y: done && (!hidden || open) ? "0%" : "-130%" }}
        transition={{ duration: 0.8, ease: EASE_SILK, delay: done && !scrolled ? 0.55 : 0 }}
      >
        <div
          className={cn(
            "mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full pl-4 pr-2 transition-[background-color,box-shadow,border-color] duration-500 md:h-16 md:pl-6",
            scrolled || open
              ? "border border-cocoa/10 bg-linen/80 shadow-[0_10px_40px_-18px_rgba(58,38,34,0.35)] backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}
        >
          <ScrollLink
            href="#"
            aria-label="Little Lulli — voltar ao início"
            className="group flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <BowMark className="w-9 transition-transform duration-500 ease-[var(--ease-bounce-soft)] group-hover:-rotate-12 group-hover:scale-110 md:w-10" />
            <span className="font-display text-xl italic tracking-tight text-cocoa md:text-[1.4rem]">
              Little Lulli
            </span>
          </ScrollLink>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id} className="relative">
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-blush/70"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <ScrollLink
                    href={item.href}
                    className="relative block rounded-full px-4 py-2 text-[0.92rem] text-cocoa/80 transition-colors hover:text-cocoa"
                    aria-current={active === item.id ? "true" : undefined}
                  >
                    {item.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hidden h-11 items-center gap-2 overflow-hidden rounded-full bg-cocoa pl-5 pr-1.5 text-sm font-medium text-linen sm:inline-flex md:h-12"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-rose-deep transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-y-0" />
              <span className="relative">Encomendar</span>
              <span className="relative grid size-8 place-items-center rounded-full bg-linen text-cocoa transition-transform duration-500 group-hover:rotate-[360deg] md:size-9">
                <WhatsAppIcon className="size-4" />
              </span>
            </a>

            <button
              ref={menuButton}
              type="button"
              className="relative grid size-11 place-items-center rounded-full bg-cocoa text-linen lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current"
                  animate={open ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE_SILK }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-current"
                  animate={open ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE_SILK }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="linen fixed inset-0 z-[90] flex touch-none flex-col px-6 pb-8 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 44px)" }}
            animate={{ clipPath: "circle(150% at 92% 44px)" }}
            exit={{ clipPath: "circle(0% at 92% 44px)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Menu mobile" className="flex-1">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <li key={item.id} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: EASE_SILK }}
                    >
                      <ScrollLink
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="font-display flex items-baseline gap-4 py-2 text-[2.9rem] leading-none text-cocoa"
                      >
                        <span className="font-sans text-xs tabular-nums text-rose-ink">0{i + 1}</span>
                        <span className={cn(active === item.id && "italic text-rose-deep")}>{item.label}</span>
                      </ScrollLink>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE_SILK }}
            >
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-between rounded-full bg-cocoa pl-6 pr-2 text-linen"
              >
                <span className="font-medium">Encomendar pelo WhatsApp</span>
                <span className="grid size-10 place-items-center rounded-full bg-linen text-cocoa">
                  <WhatsAppIcon className="size-5" />
                </span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-between rounded-full border border-cocoa/15 pl-6 pr-2 text-cocoa"
              >
                <span className="font-medium">{INSTAGRAM_HANDLE}</span>
                <span className="grid size-10 place-items-center rounded-full bg-blush">
                  <InstagramIcon className="size-5" />
                </span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
