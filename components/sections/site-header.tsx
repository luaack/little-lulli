"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useIntro } from "@/components/providers";
import { BowMark } from "@/components/decor";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { EASE_SILK } from "@/components/motion";
import { useBag } from "@/components/shop/bag-context";
import { useCart } from "@/lib/cart";
import { setScrollLocked } from "@/lib/smooth-scroll";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  categories,
  collections,
  navItems,
  whatsappLink,
} from "@/lib/site";
import { cn } from "@/lib/utils";

function BagButton() {
  const { openBag } = useBag();
  const { totals } = useCart();
  return (
    <button
      type="button"
      onClick={openBag}
      aria-label={totals.count ? `Abrir sacola, ${totals.count} ${totals.count === 1 ? "item" : "itens"}` : "Abrir sacola, vazia"}
      className="relative grid size-11 place-items-center rounded-full border border-cocoa/15 bg-linen/70 text-cocoa transition-colors hover:bg-blush md:size-12"
    >
      <ShoppingBag className="size-5" />
      {totals.count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-rose-deep px-1 text-[0.7rem] font-semibold leading-5 text-linen"
        >
          {totals.count}
        </span>
      )}
    </button>
  );
}

export function SiteHeader() {
  const { done } = useIntro();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > previous && y > 360);
  });

  // Congela a rolagem e fecha com Esc enquanto o menu mobile está aberto.
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

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => setOpen(false);
  // Na tela de checkout o cabeçalho transparente fica sobre conteúdo claro: sempre com fundo.
  const solid = scrolled || open || pathname !== "/";

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
            solid
              ? "border border-cocoa/10 bg-linen/85 shadow-[0_10px_40px_-18px_rgba(58,38,34,0.35)] backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}
        >
          <Link
            href="/"
            aria-label="Little Lulli — voltar ao início"
            className="group flex items-center gap-2.5"
            onClick={close}
          >
            <BowMark className="w-9 transition-transform duration-500 ease-[var(--ease-bounce-soft)] group-hover:-rotate-12 group-hover:scale-110 md:w-10" />
            <span className="font-display text-xl italic tracking-tight text-cocoa md:text-[1.4rem]">Little Lulli</span>
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const link = (
                  <Link
                    href={item.href}
                    className="relative flex items-center gap-1 rounded-full px-4 py-2 text-[0.92rem] text-cocoa/80 transition-colors hover:text-cocoa"
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    {item.id === "loja" && <ChevronDown className="size-3.5" aria-hidden="true" />}
                  </Link>
                );
                return (
                  <li key={item.id} className={cn("relative", item.id === "loja" && "group/loja")}>
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-blush/70"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link}
                    {item.id === "loja" && (
                      <div className="invisible absolute left-0 top-full z-10 pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within/loja:visible group-focus-within/loja:opacity-100 group-hover/loja:visible group-hover/loja:opacity-100">
                        <div className="grid w-[30rem] grid-cols-2 gap-6 rounded-[1.75rem] border border-cocoa/10 bg-linen p-6 shadow-[0_30px_60px_-30px_rgba(58,38,34,0.5)]">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-ink">Coleções</p>
                            <ul className="mt-3 space-y-1">
                              {collections.map((c) => (
                                <li key={c.slug}>
                                  <Link
                                    href={`/loja/colecao/${c.slug}`}
                                    className="block rounded-xl px-3 py-2 text-cocoa transition-colors hover:bg-blush/60"
                                  >
                                    {c.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-ink">Categorias</p>
                            <ul className="mt-3 space-y-1">
                              {categories.map((c) => (
                                <li key={c.slug}>
                                  <Link
                                    href={`/loja/categoria/${c.slug}`}
                                    className="block rounded-xl px-3 py-2 text-cocoa transition-colors hover:bg-blush/60"
                                  >
                                    {c.title}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  href="/loja"
                                  className="block rounded-xl px-3 py-2 font-medium text-rose-ink transition-colors hover:bg-blush/60"
                                >
                                  Ver tudo →
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <BagButton />
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
            data-lenis-prevent
            className="linen fixed inset-0 z-[90] flex flex-col overflow-y-auto overscroll-contain px-6 pb-8 pt-24 lg:hidden"
            initial={{ clipPath: "circle(0% at 82% 44px)" }}
            animate={{ clipPath: "circle(150% at 82% 44px)" }}
            exit={{ clipPath: "circle(0% at 82% 44px)" }}
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
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: EASE_SILK }}
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="font-display flex items-baseline gap-4 py-1.5 text-[2.5rem] leading-none text-cocoa"
                      >
                        <span className="font-sans text-xs tabular-nums text-rose-ink">0{i + 1}</span>
                        <span className={cn(isActive(item.href) && "italic text-rose-deep")}>{item.label}</span>
                      </Link>
                      {item.id === "loja" && (
                        <ul className="mb-3 mt-2 flex flex-wrap gap-2 pl-9">
                          {collections.map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={`/loja/colecao/${c.slug}`}
                                onClick={close}
                                className="inline-flex h-10 items-center rounded-full border border-cocoa/15 bg-linen/70 px-4 text-sm text-cocoa"
                              >
                                {c.title}
                              </Link>
                            </li>
                          ))}
                          {categories.map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={`/loja/categoria/${c.slug}`}
                                onClick={close}
                                className="inline-flex h-10 items-center rounded-full bg-blush px-4 text-sm text-cocoa"
                              >
                                {c.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="mt-8 space-y-3"
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
                <span className="font-medium">Falar no WhatsApp</span>
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
