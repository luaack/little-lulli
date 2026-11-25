# Little Lulli — Loja (ambiente de testes)

Loja online da Little Lulli. **Projeto separado** do site oficial: não compartilha repositório, projeto Vercel nem domínio com ele.

> ⚠️ Ambiente de testes: catálogo, preços, frete e pagamento são **fictícios/simulados**. Tudo é `noindex`.

## Rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm run lint
```

> Esta versão do Next.js (16) tem particularidades: leia `AGENTS.md` e `node_modules/next/dist/docs/` antes de mexer.

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Número do WhatsApp, menu, coleções, categorias | `lib/site.ts` |
| Catálogo (preços, peso, medidas, prazo, flags) — **provisório** | `data/products.ts` |
| Pagamento (interface + mock; como plugar Mercado Pago/Asaas) | `lib/payments/` |
| Frete (interface + mock; como plugar Melhor Envio) | `lib/shipping/` |
| Pedidos e briefings (interface + localStorage; depois banco) | `lib/storage/index.ts` |
| Eventos Meta Pixel / API de Conversões (sem ID real) | `lib/analytics.ts` |

## Variáveis de ambiente (opcionais, nenhuma é obrigatória)

- `NEXT_PUBLIC_SITE_URL` — URL deste ambiente.
- `NEXT_PUBLIC_META_PIXEL_ID` — vazio por padrão: nenhum evento sai do navegador.
