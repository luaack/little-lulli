import { PrismaHero } from "@/components/ui/prisma-hero";
import { TestimonialsSection } from "@/components/testimonials-section";
import { VelocityText } from "@/components/ui/parallax-scrolling-text-effect";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <PrismaHero />
        <VelocityText />
        <TestimonialsSection />
        <Footer />
      </main>
    </>
  );
}
