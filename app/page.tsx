import { PrismaHero } from "@/components/ui/prisma-hero";
import { TestimonialsSection } from "@/components/testimonials-section";
import { VelocityText } from "@/components/ui/parallax-scrolling-text-effect";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <PrismaHero />
      <VelocityText />
      <TestimonialsSection />
    </main>
  );
}
