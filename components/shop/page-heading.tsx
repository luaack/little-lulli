import { BowMark } from "@/components/decor";
import { FadeIn, RevealText } from "@/components/motion";

type Segment = string | { text: string; className?: string };

/** Cabeçalho padrão das páginas internas (mesma tipografia e ritmo da home). */
export function PageHeading({
  eyebrow,
  id,
  segments,
  children,
  className = "",
}: {
  eyebrow: string;
  id: string;
  segments: Segment[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={className}>
      <FadeIn className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-rose-ink">
        <BowMark className="w-8" />
        {eyebrow}
      </FadeIn>
      <RevealText
        id={id}
        as="h1"
        className="font-display mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] font-[380] leading-[1] tracking-[-0.03em] text-cocoa"
        segments={segments}
      />
      {children && (
        <FadeIn delay={0.15} className="mt-5 max-w-xl text-lg leading-relaxed text-cocoa-soft">
          {children}
        </FadeIn>
      )}
    </header>
  );
}
