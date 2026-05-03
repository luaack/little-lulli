import { PrismaHero } from "@/components/ui/prisma-hero";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { CollectionsCarousel } from "@/components/collections-carousel";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <PrismaHero />
        <CollectionsCarousel />
        <TestimonialsSection />
        <Footer />
      </main>
    </>
  );
}
