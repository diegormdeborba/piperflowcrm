# PipeFlow CRM — Contexto para Claude

## O que é este projeto

PipeFlow CRM é uma plataforma web SaaS de gestão de clientes e vendas para pequenas e médias empresas, freelancers e times de vendas. Multi-empresa, com pipeline visual Kanban, gestão de leads, registro de atividades e monetização via Stripe.

## Stack técnica

- **Frontend:** Next.js 14 (App Router) + React 18 + TypeScript 5
- **Estilo:** Tailwind CSS + shadcn/ui (componentes em `components/ui/`)
- **Backend:** Next.js Server Actions + API Routes
- **Banco de dados + Auth:** Supabase (PostgreSQL + RLS + Auth)
- **Pagamento:** Stripe (Checkout + Webhooks)
- **E-mail:** Resend
- **Drag-and-drop:** @dnd-kit
- **Gráficos:** Recharts
- **Deploy:** Vercel (frontend) + Supabase (backend/DB)

## Estrutura de pastas

```
piperflowcrm/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Rotas de autenticação (login, register, etc.)
│   ├── (app)/              # Rotas autenticadas (dashboard, leads, pipeline)
│   ├── (marketing)/        # Landing page e páginas públicas
│   └── api/                # API Routes (webhooks, etc.)
├── components/
│   ├── ui/                 # Componentes shadcn/ui base
│   └── [feature]/          # Componentes específicos por feature
├── lib/
│   ├── supabase/           # Clientes Supabase (server.ts, client.ts)
│   ├── stripe/             # Helpers Stripe
│   └── utils.ts            # Utilitários (cn, formatters)
├── hooks/                  # React hooks customizados
├── types/                  # TypeScript types e interfaces
└── docs/                   # Documentação do projeto
```

## Plano de execução

Ver `docs/PLAN.md` para os 16 milestones organizados por branch.

## Regras de desenvolvimento

- **Interface primeiro, backend depois** — milestones 1-6 são apenas UI com dados mock
- **Server Components por padrão** — só usar `"use client"` quando necessário (interatividade, hooks)
- **Server Actions para mutações** — não criar API routes para CRUD, usar Server Actions
- **RLS no Supabase** — todo isolamento de dados via Row Level Security, não na aplicação
- **Paths absolutos** — sempre usar `@/` (ex: `@/components/ui/button`)
- **Sem comentários óbvios** — comentar apenas o WHY não-óbvio
- **TypeScript strict** — sem `any`, sem `@ts-ignore`

## Convenções de código

- Componentes: PascalCase (`LeadCard.tsx`)
- Hooks: camelCase com prefixo `use` (`useLeads.ts`)
- Server Actions: camelCase com verbo (`createLead.ts`)
- Types: PascalCase com sufixo `Type` ou `Props` quando necessário
- Arquivos de rota: sempre `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`

## Multi-empresa

Cada workspace é isolado. O contexto atual do workspace é armazenado via cookie/session e validado em cada Server Action via RLS. Nunca confiar no `workspace_id` enviado pelo cliente — sempre inferir da sessão.

## Planos

- **Free:** até 2 colaboradores, 50 leads
- **Pro:** ilimitado, R$49/mês

Os limites são verificados em Server Actions antes de criar recursos.
