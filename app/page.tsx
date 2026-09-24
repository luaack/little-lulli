import { IntroCurtain } from "@/components/sections/intro-curtain";
import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { RibbonMarquee } from "@/components/sections/ribbon-marquee";
import { Collections } from "@/components/sections/collections";
import { Moments } from "@/components/sections/moments";
import { Atelier } from "@/components/sections/atelier";
import { Testimonials } from "@/components/sections/testimonials";
import { OrderCta } from "@/components/sections/order-cta";
import { SiteFooter } from "@/components/sections/site-footer";
import { CursorFollower, FloatingWhatsApp, ScrollProgress } from "@/components/sections/overlays";

export default function Home() {
  return (
    <>
      <IntroCurtain />
      <ScrollProgress />
      <SiteHeader />
      <main id="conteudo" className="relative">
        <Hero />
        <RibbonMarquee />
        <Collections />
        <Moments />
        <Atelier />
        <Testimonials />
        <div className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-linen md:-mt-16 md:rounded-t-[4rem]">
          <OrderCta />
        </div>
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
      <CursorFollower />
    </>
  );
}
