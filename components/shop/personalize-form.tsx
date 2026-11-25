"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { track } from "@/lib/analytics";
import { briefingMessage, briefingWhatsappLink, type Briefing } from "@/lib/briefing";
import { briefingRepository } from "@/lib/storage";
import { categories, collections } from "@/lib/site";
import { cn } from "@/lib/utils";

const inputClass =
  "h-12 w-full rounded-2xl border border-cocoa/20 bg-linen px-4 text-cocoa placeholder:text-cocoa/40";

const PIECES = ["Tic tac", "Laço", "Tiara", "Faixa", "Outra (conto no WhatsApp)"];
const OCCASIONS = ["Aniversário", "Batizado", "Ensaio fotográfico", "Presente", "Dia a dia", "Outra"];

function Field({ label, hint, className, children }: { label: string; hint?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-cocoa">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-cocoa-soft">{hint}</span>}
    </label>
  );
}

type Initial = { slug: string; name: string; category: string; collection?: string };

export function PersonalizeForm({ initial }: { initial?: Initial }) {
  const [sent, setSent] = useState<{ link: string; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>();

  const initialPiece = initial ? (categories.find((c) => c.slug === initial.category)?.title ?? "").replace(/s$/, "") : "";
  const initialCollection = initial ? (collections.find((c) => c.slug === initial.collection)?.title ?? "") : "";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const neededBy = get("data");
    if (neededBy) {
      const today = new Date();
      const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      if (neededBy < todayIso) {
        setError("A data em que você precisa já passou. Escolha uma data a partir de hoje.");
        return;
      }
    }

    const file = data.get("imagem");
    const briefing: Briefing = {
      id: `BR-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      piece: get("peca"),
      collection: get("colecao"),
      theme: get("tema"),
      embroideryText: get("texto"),
      colors: get("cores"),
      recipient: get("paraquem"),
      age: get("idade"),
      occasion: get("ocasiao"),
      neededBy,
      referenceImageName: file instanceof File && file.size > 0 ? file.name : undefined,
      referenceProduct: initial?.name,
      name: get("nome"),
      whatsapp: get("whatsapp"),
      city: get("cidade"),
    };

    void briefingRepository.create(briefing); // hoje: localStorage; depois: banco.
    track("Lead", { content_name: "briefing-personalizado" });
    const link = briefingWhatsappLink(briefing);
    setSent({ link, message: briefingMessage(briefing) });
    // Abre no mesmo gesto do clique (evita bloqueio de pop-up). O botão abaixo é o plano B.
    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (sent) {
    return (
      <section aria-labelledby="enviado-title" className="rounded-[2rem] border border-cocoa/10 bg-cream/60 p-6 md:p-10">
        <h2 id="enviado-title" className="font-display text-3xl text-cocoa">Quase lá! Falta enviar no WhatsApp.</h2>
        <p className="mt-3 max-w-xl text-cocoa-soft">
          Abrimos o WhatsApp com a sua mensagem pronta. Se ele não abriu, use o botão abaixo. Se você tem uma imagem
          de referência, anexe na conversa (o link não leva a imagem junto).
        </p>
        <pre className="mt-5 max-h-72 overflow-auto whitespace-pre-wrap rounded-2xl bg-linen p-4 text-sm text-cocoa-soft">{sent.message}</pre>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={sent.link} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center gap-3 rounded-full bg-cocoa pl-7 pr-2 font-medium text-linen">
            Abrir o WhatsApp
            <span className="grid size-10 place-items-center rounded-full bg-linen text-cocoa"><WhatsAppIcon className="size-5" /></span>
          </a>
          <button type="button" onClick={() => setSent(null)} className="inline-flex h-14 items-center rounded-full border border-cocoa/20 px-6 font-medium">
            Voltar e editar
          </button>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[2rem] border border-cocoa/10 bg-cream/50 p-6 sm:grid-cols-2 md:p-10">
      {initial && (
        <p className="rounded-2xl bg-blush/60 px-4 py-3 text-sm text-cocoa sm:col-span-2">
          Personalizando a partir de <strong>{initial.name}</strong>.
        </p>
      )}

      <Field label="Qual peça?">
        <select name="peca" required defaultValue={PIECES.includes(initialPiece) ? initialPiece : ""} className={inputClass}>
          <option value="" disabled>Escolha</option>
          {PIECES.map((p) => <option key={p}>{p}</option>)}
        </select>
      </Field>
      <Field label="Coleção de referência">
        <select name="colecao" defaultValue={initialCollection} className={inputClass}>
          <option value="">Nenhuma / ainda não sei</option>
          {collections.map((c) => <option key={c.slug}>{c.title}</option>)}
        </select>
      </Field>

      <Field label="Tema ou desenho" hint="Ex.: raposinha, margaridas, coelho, flores do campo…" className="sm:col-span-2">
        <input name="tema" required className={inputClass} />
      </Field>
      <Field label="Nome ou palavra a bordar" hint="Deixe em branco se não quiser texto.">
        <input name="texto" className={inputClass} />
      </Field>
      <Field label="Cores" hint="Cores da peça e do bordado.">
        <input name="cores" className={inputClass} />
      </Field>

      <Field label="Imagem de referência (opcional)" hint="Você anexa a imagem na conversa do WhatsApp." className="sm:col-span-2">
        <input
          name="imagem"
          type="file"
          accept="image/*"
          onChange={(e) => setFileName(e.target.files?.[0]?.name)}
          className="block w-full rounded-2xl border border-dashed border-cocoa/30 bg-linen px-4 py-3 text-sm text-cocoa file:mr-4 file:rounded-full file:border-0 file:bg-cocoa file:px-4 file:py-2 file:text-linen"
        />
        {fileName && <span className="mt-1 block text-xs text-cocoa-soft">Selecionada: {fileName}</span>}
      </Field>

      <Field label="Para quem é?" hint="Nome ou parentesco (ex.: minha filha Sara).">
        <input name="paraquem" className={inputClass} />
      </Field>
      <Field label="Idade">
        <input name="idade" placeholder="Ex.: 2 anos" className={inputClass} />
      </Field>
      <Field label="Ocasião">
        <select name="ocasiao" defaultValue="" className={inputClass}>
          <option value="">Escolha</option>
          {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </Field>
      <Field label="Data em que você precisa" hint="Peças personalizadas costumam levar de 12 a 20 dias úteis (provisório).">
        <input name="data" type="date" className={inputClass} />
      </Field>

      <hr className="border-dashed border-cocoa/20 sm:col-span-2" />

      <Field label="Seu nome">
        <input name="nome" required autoComplete="name" className={inputClass} />
      </Field>
      <Field label="Seu WhatsApp">
        <input name="whatsapp" type="tel" required autoComplete="tel" inputMode="tel" placeholder="(61) 90000-0000"
          pattern="\(?\d{2}\)?\s?9?\d{4}-?\d{4}" title="DDD + número, ex.: (61) 99999-9999" className={inputClass} />
      </Field>
      <Field label="Cidade" className="sm:col-span-2">
        <input name="cidade" required autoComplete="address-level2" className={inputClass} />
      </Field>

      {error && <p role="alert" className="rounded-2xl bg-[#b4363c]/10 px-4 py-3 text-sm text-[#8f2a2f] sm:col-span-2">{error}</p>}

      <div className="sm:col-span-2">
        <button type="submit" className="group relative inline-flex h-16 items-center gap-3 overflow-hidden rounded-full bg-cocoa pl-8 pr-2 text-lg font-medium text-linen">
          <span className="absolute inset-0 -translate-x-[101%] rounded-full bg-rose-deep transition-transform duration-700 ease-[var(--ease-silk)] group-hover:translate-x-0" />
          <span className="relative">Enviar pelo WhatsApp</span>
          <span className="relative grid size-12 place-items-center rounded-full bg-linen text-cocoa"><WhatsAppIcon className="size-6" /></span>
        </button>
        <p className="mt-3 text-sm text-cocoa-soft">Ao enviar, abrimos o WhatsApp com a mensagem pronta. Nada é enviado sem você confirmar lá.</p>
      </div>
    </form>
  );
}
