# sierralog-farma

Landing page Sierralog — segmento **Farmacêutico / Health**.

Parte da família de 3 LPs Sierralog (sellers, importadores, farma). Estrutura e
design system idênticos entre as 3; apenas `src/content/page.ts` muda por persona.

## Stack

- Next.js 14 (App Router) + TypeScript strict
- TailwindCSS com tokens em `globals.css` (paleta verde oficial)
- shadcn-style primitives + Radix (accordion, label)
- react-hook-form + zod
- lucide-react
- next/font (Inter + Space Grotesk)

## Setup

```bash
npm install
cp .env.local .env.local   # ajustar NEXT_PUBLIC_GTM_ID se necessário
npm run dev
```

Acesse http://localhost:3000

## Variáveis de ambiente

| Nome                   | Descrição                                      |
| ---------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_PERSONA`  | `farma` (já configurado)                       |
| `NEXT_PUBLIC_SITE_URL` | URL canônica do domínio                        |
| `NEXT_PUBLIC_GTM_ID`   | ID do Google Tag Manager (opcional)            |

## Estrutura

```
src/
├── app/
│   ├── layout.tsx          # fontes, metadata, GTM
│   ├── page.tsx            # consome content/page.ts
│   ├── obrigado/page.tsx   # confirmação pós-form
│   └── api/lead/route.ts   # endpoint do form (TODO: CRM)
├── components/
│   ├── sections/           # Hero, Benefits, Proof, HowItWorks, LeadForm, FAQ, Footer
│   ├── layout/             # Header, Container
│   └── ui/                 # button, input, textarea, select, label, card, accordion
├── content/page.ts         # CONTEÚDO DESTA LP (persona farma)
├── lib/                    # types, utils (cn, maskPhoneBR)
└── styles/globals.css      # tokens da paleta
```

## Integração do form

O endpoint `/api/lead` atualmente apenas valida via zod e loga o payload. Para
plugar no CRM (RD Station / HubSpot / etc.), edite o `TODO` em
`src/app/api/lead/route.ts`.

## Deploy

Pronto para Vercel. Configurar variáveis de ambiente no painel e apontar o
domínio `farma.sierralog.com.br`.
