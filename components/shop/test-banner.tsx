import { TEST_ENV_LABEL } from "@/lib/site";

/** Faixa fixa e discreta no rodapé da tela: deixa claro que é o ambiente de testes. */
export function TestBanner() {
  return (
    <div
      role="note"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex h-6 items-center justify-center bg-ink/90 px-3 text-center text-[0.68rem] leading-none tracking-wide text-linen/80"
    >
      <span className="truncate">{TEST_ENV_LABEL}</span>
    </div>
  );
}
