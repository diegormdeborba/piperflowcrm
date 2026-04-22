# PipeFlow CRM — Plano de Execução

> **Estratégia:** Interface primeiro, backend depois. Cada milestone é um incremento entregável e testável.

---

## Milestone 0 — Setup & Fundação ✅

**Branch:** `main` (setup inicial)  
**Objetivo:** Repositório, tooling e estrutura base configurados e rodando localmente.

### Entregas
- [x] Criar projeto Next.js 14 com App Router + TypeScript
- [x] Configurar Tailwind CSS + shadcn/ui (tema, tokens, componentes base)
- [x] Configurar ESLint + Prettier + paths absolutos (`@/`)
- [x] Criar estrutura de pastas (`app/`, `components/`, `lib/`, `types/`, `docs/`)
- [x] Criar `CLAUDE.md` com contexto do projeto
- [x] Criar `docs/PRD.md` com o PRD completo
- [x] Criar `.env.example` com todas as variáveis necessárias
- [x] Configurar repositório Git + GitHub
- [x] Primeiro deploy funcional na Vercel (página em branco)

**Commit final:** `feat: project setup — Next.js 14, Tailwind, shadcn/ui, Vercel deploy`

---

## Milestone 1 — Landing Page ✅

**Branch:** `feat/landing-page`  
**Objetivo:** Página pública de apresentação do PipeFlow CRM, responsiva e com boa UX.

### Entregas
- [x] Layout público com Header e Footer
- [x] Seção Hero — headline, subtítulo, CTA (Começar grátis / Ver demo)
- [x] Seção Funcionalidades — 6 cards com ícones e descrições
- [x] Seção Pipeline — screenshot/mockup do Kanban
- [x] Seção Planos — tabela Free vs Pro com features e CTA
- [x] Seção Depoimentos (placeholder)
- [x] Seção CTA final — formulário de e-mail ou botão de cadastro
- [x] Página responsiva (mobile-first)
- [x] Animações de entrada suaves (Tailwind transitions)
- [x] Metatags SEO básicas (title, description, og:image)
- [x] Seção de stats numéricos no Hero (+47% conversão, 3.2x leads, -62% ciclo, 1200+ times)

**Commit final:** `feat: landing page — hero, features, pipeline preview, pricing, CTA sections`

---

## Milestone 2 — Autenticação (UI)

**Branch:** `feat/auth-ui`  
**Objetivo:** Telas de login, cadastro e recuperação de senha com layout e UX completos, ainda sem backend real.

### Entregas
- [x] Layout de autenticação (split screen ou centralizado)
- [x] Página `/login` — form email + senha + link para cadastro
- [x] Página `/register` — form nome + email + senha + confirmação
- [x] Página `/forgot-password` — form de recuperação por e-mail
- [x] Página `/reset-password` — form nova senha (com token na URL)
- [x] Validação client-side com react-hook-form + zod
- [x] Estados de loading, erro e sucesso nos formulários
- [x] Proteção de rotas: middleware mock redirecionando para `/login`
- [x] Fluxo de onboarding pós-cadastro (criar ou entrar em workspace)

**Commit final:** `feat: auth UI — login, register, password recovery flows`

---

## Milestone 3 — App Shell & Navegação

**Branch:** `feat/app-shell`  
**Objetivo:** Estrutura interna do app com sidebar, header, navegação e páginas esqueleto.

### Entregas
- [x] Layout autenticado `/app/` com sidebar fixa
- [x] Sidebar com navegação: Dashboard, Leads, Pipeline, Atividades, Configurações
- [x] Header com avatar do usuário, dropdown e seletor de workspace
- [x] Breadcrumbs dinâmicos
- [x] Páginas esqueleto vazias para todas as rotas internas
- [x] Componente de loading (skeleton screens)
- [x] Componente de estado vazio (empty state)
- [x] Responsividade: sidebar colapsável em mobile (sheet/drawer)
- [x] Tema claro/escuro via shadcn/ui `ThemeProvider`

**Commit final:** `feat: app shell — sidebar, header, workspace switcher, skeleton pages`

---

## Milestone 4 — Gestão de Leads (UI)

**Branch:** `feat/leads-ui`  
**Objetivo:** CRUD completo de leads com listagem, filtros, detalhes e timeline — com dados mock.

### Entregas
- [x] Página `/app/leads` — tabela de leads com colunas (nome, empresa, status, responsável, criado em)
- [x] Barra de busca e filtros (status, responsável, data range)
- [x] Paginação da listagem
- [x] Modal ou sheet lateral para criar novo lead
- [x] Formulário de lead: nome, e-mail, telefone, empresa, cargo, status, responsável
- [x] Validação com react-hook-form + zod
- [x] Página `/app/leads/[id]` — perfil completo do lead
- [x] Seção de informações de contato
- [x] Timeline de atividades (dados mock)
- [x] Botão para adicionar atividade (modal: tipo, descrição, data)
- [x] Badge de status colorido
- [x] Ação de editar/excluir lead

**Commit final:** `feat: leads UI — list, filters, detail page, activity timeline (mock data)`

---

## Milestone 5 — Pipeline Kanban (UI)

**Branch:** `feat/kanban-ui`  
**Objetivo:** Board Kanban visual e funcional com drag-and-drop, usando dados mock.

### Entregas
- [x] Página `/app/pipeline`
- [x] 6 colunas fixas: Novo Lead, Contato Realizado, Proposta Enviada, Negociação, Fechado Ganho, Fechado Perdido
- [x] Cards com: título do negócio, valor (R$), lead vinculado, avatar do responsável, prazo
- [x] Drag-and-drop entre colunas com `@dnd-kit`
- [x] Animação suave ao arrastar
- [x] Modal de criação de novo negócio (título, valor, lead, responsável, prazo, etapa)
- [x] Clique no card abre sheet lateral com detalhes e edição
- [x] Contador de cards e valor total por coluna
- [x] Estado vazio por coluna (empty state)
- [x] Filtro por responsável

**Commit final:** `feat: kanban UI — drag-and-drop pipeline with 6 stages (mock data)`

---

## Milestone 6 — Dashboard (UI)

**Branch:** `feat/dashboard-ui`  
**Objetivo:** Página de métricas e resumo executivo com gráficos e cards, dados mock.

### Entregas
- [x] Página `/app/dashboard`
- [x] Cards de métricas: total de leads, negócios abertos, valor do pipeline, taxa de conversão
- [x] Gráfico de funil de vendas (Recharts `FunnelChart`)
- [x] Gráfico de negócios por mês (Recharts `BarChart`)
- [x] Tabela de negócios com prazo próximo (próximos 7 dias)
- [x] Saudação personalizada com nome do usuário
- [x] Responsividade total (grid adaptativo)

**Commit final:** `feat: dashboard UI — metrics cards, funnel chart, deals summary (mock data)`

---

## Milestone 7 — Supabase: Schema & Auth

**Branch:** `feat/supabase-setup`  
**Objetivo:** Banco de dados configurado com schema completo, RLS e autenticação Supabase funcionando.

### Entregas
- [ ] Criar projeto Supabase
- [ ] Schema SQL completo:
  - [ ] `workspaces` (id, name, slug, plan, created_at)
  - [ ] `workspace_members` (workspace_id, user_id, role: admin|member)
  - [ ] `leads` (id, workspace_id, name, email, phone, company, role, status, owner_id, created_at)
  - [ ] `deals` (id, workspace_id, lead_id, title, value, stage, owner_id, due_date, created_at)
  - [ ] `activities` (id, workspace_id, lead_id, type, description, author_id, created_at)
  - [ ] `invites` (id, workspace_id, email, role, token, accepted_at, expires_at)
- [ ] Row Level Security (RLS) em todas as tabelas
- [ ] Policies: membros acessam apenas dados do seu workspace
- [ ] Configurar Supabase Auth (email + password)
- [ ] Criar `lib/supabase/server.ts` e `lib/supabase/client.ts`
- [ ] Variáveis de ambiente configuradas (local + Vercel)
- [ ] Seed SQL com dados de exemplo para desenvolvimento

**Commit final:** `feat: supabase schema — tables, RLS policies, auth setup, seed data`

---

## Milestone 8 — Auth Backend

**Branch:** `feat/auth-backend`  
**Objetivo:** Conectar telas de autenticação ao Supabase Auth real.

### Entregas
- [ ] Server Actions para login, register, logout
- [ ] Middleware Next.js com verificação de sessão Supabase
- [ ] Proteção real de rotas autenticadas
- [ ] Fluxo de e-mail de confirmação (Supabase built-in)
- [ ] Fluxo de recuperação de senha (Supabase built-in)
- [ ] Onboarding: criar workspace após primeiro login
- [ ] Cookie de sessão seguro (SSR-safe)
- [ ] Hook `useUser()` client-side via Context
- [ ] Remover dados mock de autenticação

**Commit final:** `feat: auth backend — Supabase Auth connected, session middleware, onboarding flow`

---

## Milestone 9 — Multi-empresa & Workspaces

**Branch:** `feat/workspaces`  
**Objetivo:** Sistema de workspace isolado com convites por e-mail e troca de contexto.

### Entregas
- [ ] CRUD de workspace via Server Actions
- [ ] Seletor de workspace funcional na sidebar (troca de contexto real)
- [ ] Página `/app/settings/workspace` — editar nome, ver membros, gerenciar papéis
- [ ] Página `/app/settings/members` — listar membros, remover, mudar papel
- [ ] Fluxo de convite por e-mail:
  - [ ] Admin envia convite → cria registro em `invites`
  - [ ] Resend dispara e-mail com link de aceite
  - [ ] Página `/invite/[token]` valida e adiciona ao workspace
- [ ] Limite de membros no plano Free (max 2)
- [ ] Dados isolados por workspace via RLS

**Commit final:** `feat: workspaces — multi-tenant isolation, member invites via Resend, role management`

---

## Milestone 10 — Leads & Atividades Backend

**Branch:** `feat/leads-backend`  
**Objetivo:** Substituir dados mock de leads e atividades por dados reais do Supabase.

### Entregas
- [ ] Server Actions: criar, editar, excluir lead
- [ ] Server Actions: criar, listar atividades por lead
- [ ] Busca e filtros server-side (URL search params)
- [ ] Paginação server-side
- [ ] Limite de leads no plano Free (max 50)
- [ ] Verificação de permissão por papel (admin vs membro)
- [ ] Otimistic updates no cliente para ações de edição

**Commit final:** `feat: leads backend — CRUD connected to Supabase, filters, pagination, plan limits`

---

## Milestone 11 — Pipeline Backend

**Branch:** `feat/pipeline-backend`  
**Objetivo:** Persistir movimentação do Kanban no banco de dados.

### Entregas
- [ ] Server Action para criar negócio
- [ ] Server Action para atualizar etapa do negócio (drag-and-drop persiste)
- [ ] Server Action para editar e excluir negócio
- [ ] Vinculação deal → lead funcional
- [ ] Revalidação de cache após mutações (`revalidatePath`)
- [ ] Filtro por responsável funcional (server-side)

**Commit final:** `feat: pipeline backend — deal CRUD, stage persistence, lead linking`

---

## Milestone 12 — Dashboard Backend

**Branch:** `feat/dashboard-backend`  
**Objetivo:** Métricas reais calculadas a partir dos dados do workspace.

### Entregas
- [ ] Query agregada: total de leads, negócios por etapa, valor do pipeline
- [ ] Cálculo de taxa de conversão (Fechado Ganho / total)
- [ ] Dados reais no gráfico de funil (Recharts)
- [ ] Dados reais no gráfico de negócios por mês
- [ ] Lista real de negócios com prazo próximo
- [ ] Cache com `unstable_cache` para queries pesadas

**Commit final:** `feat: dashboard backend — real metrics from Supabase, aggregations, funnel data`

---

## Milestone 13 — Monetização com Stripe

**Branch:** `feat/stripe`  
**Objetivo:** Planos Free/Pro funcionando com checkout, webhook e portal do cliente.

### Entregas
- [ ] Criar produtos e preços no Stripe Dashboard
- [ ] Página `/app/settings/billing` — plano atual, uso, botão de upgrade
- [ ] Integração Stripe Checkout (Session) para upgrade para Pro
- [ ] Supabase Edge Function para webhook Stripe:
  - [ ] `checkout.session.completed` → ativar plano Pro
  - [ ] `customer.subscription.deleted` → rebaixar para Free
- [ ] Coluna `plan` e `stripe_customer_id` na tabela `workspaces`
- [ ] Customer Portal do Stripe para gerenciar assinatura
- [ ] Enforcement de limites Free em Server Actions (leads, membros)
- [ ] UI de "upgrade required" quando limite atingido

**Commit final:** `feat: stripe — checkout, webhooks, plan enforcement, customer portal`

---

## Milestone 14 — Qualidade & Produção

**Branch:** `feat/polish`  
**Objetivo:** App estável, seguro e pronto para usuários reais.

### Entregas
- [ ] Error boundaries em todas as páginas
- [ ] Loading states consistentes (Suspense + skeleton)
- [ ] Toasts de feedback para todas as ações (sonner)
- [ ] Tratamento de erros de rede e validação server-side
- [ ] Testes de smoke manual (fluxos críticos: cadastro → workspace → lead → deal → upgrade)
- [ ] Variáveis de ambiente auditadas (nenhum segredo exposto no cliente)
- [ ] Headers de segurança (CSP, X-Frame-Options) via `next.config.ts`
- [ ] Rate limiting em Server Actions sensíveis
- [ ] `robots.txt` e `sitemap.xml` para SEO
- [ ] Favicon e og:image da landing page

**Commit final:** `feat: production polish — error handling, security headers, SEO, smoke tests`

---

## Milestone 15 — Deploy Final

**Branch:** `main` (merge de tudo)  
**Objetivo:** App em produção, monitorado e documentado.

### Entregas
- [ ] Merge de todas as branches em `main`
- [ ] Variáveis de ambiente de produção configuradas na Vercel
- [ ] Supabase em produção (não staging)
- [ ] Stripe em modo live (não test)
- [ ] Domínio customizado configurado na Vercel
- [ ] Analytics básico (Vercel Analytics)
- [ ] Monitoramento de erros (Sentry ou Vercel Logs)
- [ ] `README.md` atualizado com setup local
- [ ] Checklist de segurança final

**Commit final:** `chore: production deploy — all systems live, domain configured, monitoring active`

---

## Resumo dos Milestones

| # | Milestone | Branch | Tipo |
|---|-----------|--------|------|
| 0 | Setup & Fundação | `main` | Infra |
| 1 | Landing Page | `feat/landing-page` | Frontend |
| 2 | Autenticação (UI) | `feat/auth-ui` | Frontend |
| 3 | App Shell & Navegação | `feat/app-shell` | Frontend |
| 4 | Gestão de Leads (UI) | `feat/leads-ui` | Frontend |
| 5 | Pipeline Kanban (UI) | `feat/kanban-ui` | Frontend |
| 6 | Dashboard (UI) | `feat/dashboard-ui` | Frontend |
| 7 | Supabase: Schema & Auth | `feat/supabase-setup` | Backend |
| 8 | Auth Backend | `feat/auth-backend` | Backend |
| 9 | Multi-empresa & Workspaces | `feat/workspaces` | Backend |
| 10 | Leads & Atividades Backend | `feat/leads-backend` | Backend |
| 11 | Pipeline Backend | `feat/pipeline-backend` | Backend |
| 12 | Dashboard Backend | `feat/dashboard-backend` | Backend |
| 13 | Monetização com Stripe | `feat/stripe` | Backend |
| 14 | Qualidade & Produção | `feat/polish` | QA |
| 15 | Deploy Final | `main` | Deploy |
