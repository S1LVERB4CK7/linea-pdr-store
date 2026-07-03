# LINEA — PDR & Automotive Tools Store

E-commerce global de ferramentas profissionais de PDR (Paintless Dent
Repair) e automotivas. Monorepo com frontend Next.js, backend Node/Express
e Postgres via Supabase.

## Estrutura

```
linea-pdr-store/
├── apps/
│   ├── web/                 # Next.js (App Router) — frontend, Vercel
│   │   ├── app/              # rotas e páginas
│   │   ├── components/       # componentes React
│   │   ├── lib/               # helpers do front
│   │   └── public/
│   └── api/                  # Express + TypeScript — backend, Render
│       ├── src/
│       │   ├── config/        # validação de env (Zod)
│       │   ├── middleware/    # cors, rate-limit, helmet, auth, errors
│       │   ├── controllers/   # lógica de cada rota
│       │   ├── routes/        # definição das rotas
│       │   ├── validators/    # schemas Zod de entrada
│       │   └── lib/           # prisma client, jwt, logger, etc.
│       └── prisma/
│           └── schema.prisma  # modelos: User, Product, Order, OrderItem
├── packages/
│   └── shared/                # tipos e schemas Zod compartilhados front/back
├── .github/
│   ├── workflows/
│   │   ├── ci.yml             # typecheck + lint + audit + build
│   │   └── codeql.yml         # scan de segurança automático
│   └── dependabot.yml         # updates automáticos de dependência
└── SECURITY.md                # práticas de segurança + checklist de produção
```

## Rodando local

Backend (PowerShell):
```
cd apps/api
copy .env.example .env
npm install
npm run prisma:generate
npm run dev
```

Frontend (PowerShell):
```
cd apps/web
copy .env.example .env
npm install
npm run dev
```

## Stack

- **Frontend**: Next.js 14, React 18, Tailwind, deploy na Vercel
- **Backend**: Node.js, Express, TypeScript, Prisma, deploy no Render
- **Banco**: PostgreSQL via Supabase
- **Segurança**: ver `SECURITY.md`

## Próximos passos do produto

- Portar `pdr-store-landing.html` (protótipo) para componentes em `apps/web`
- Endpoints de produto/carrinho/pedido em `apps/api`
- Integração Stripe (multi-moeda, parcelamento, webhook assinado)
- i18n (PT/EN/ES/FR/DE/IT) via `next-intl`
- Cálculo de imposto/frete por país (avaliar Stripe Tax antes de construir na unha)
