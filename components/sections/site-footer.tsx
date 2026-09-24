import { ArrowUp } from "lucide-react";
import { BowMark } from "@/components/decor";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { ScrollLink } from "@/components/scroll-link";
import { FooterWordmark } from "@/components/sections/footer-wordmark";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_NUMBER,
  navItems,
  whatsappLink,
} from "@/lib/site";

const phoneLabel = WHATSAPP_NUMBER.replace(/^55(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-linen">
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-screen" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-rose-deep/20 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <BowMark tone="blush" className="w-14" />
            <p className="font-display mt-6 max-w-sm text-[1.9rem] leading-tight">
              Laços artesanais feitos com amor para{" "}
              <em className="text-rose">momentos inesquecíveis.</em>
            </p>
          </div>

          <nav aria-label="Rodapé" className="md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-linen/50">Navegar</p>
            <ul className="mt-5 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <ScrollLink
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-lg text-linen/85 transition-colors hover:text-linen"
                  >
                    <span className="h-px w-0 bg-rose transition-all duration-500 group-hover:w-5" />
                    {item.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-linen/50">Fale com a gente</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg text-linen/85 transition-colors hover:text-linen"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-linen/10 transition-colors group-hover:bg-rose group-hover:text-ink">
                    <WhatsAppIcon className="size-[1.1rem]" />
                  </span>
                  {phoneLabel}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg text-linen/85 transition-colors hover:text-linen"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-linen/10 transition-colors group-hover:bg-rose group-hover:text-ink">
                    <InstagramIcon className="size-[1.1rem]" />
                  </span>
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
            <ScrollLink
              href="#"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-linen/15 py-2 pl-5 pr-2 text-sm text-linen/80 transition-colors hover:border-linen/40 hover:text-linen"
            >
              Voltar ao topo
              <span className="relative grid size-8 place-items-center overflow-hidden rounded-full bg-linen text-ink">
                <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-8" />
                <ArrowUp className="absolute size-4 translate-y-8 transition-transform duration-500 group-hover:translate-y-0" />
              </span>
            </ScrollLink>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-dashed border-linen/15 pt-6 text-sm text-linen/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Little Lulli. Todos os direitos reservados.</p>
          <p className="font-script text-4xl leading-none text-rose/90">bordado à mão, com amor</p>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}
