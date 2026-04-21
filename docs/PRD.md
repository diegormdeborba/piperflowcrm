# PRD — PipeFlow CRM

## 1. Contexto & Problema

Pequenas e médias empresas, freelancers e times de vendas perdem oportunidades de negócio por falta de organização no processo comercial. Leads são gerenciados em planilhas, anotações soltas ou ferramentas genéricas que não oferecem visão clara do funil de vendas. Não há registro centralizado de interações com clientes, e quando a equipe cresce, os dados ficam espalhados sem controle de acesso por empresa/time. Soluções como HubSpot e Pipedrive existem, mas são caras ou complexas demais para quem está começando.

## 2. Solução Proposta

**PipeFlow CRM** — plataforma web SaaS de gestão de clientes e vendas, multi-empresa, com pipeline visual Kanban, gestão completa de leads e negócios, registro de interações e integração de pagamento para monetização.

### Funcionalidades principais
- CRM completo com cadastro de leads/contatos (nome, e-mail, telefone, empresa, cargo)
- Pipeline Kanban de vendas com drag-and-drop entre etapas
- Página de detalhe do lead com histórico completo de atividades (ligações, e-mails, reuniões, notas)
- Sistema multi-empresa: cada workspace isolado, com convite de colaboradores por e-mail
- Dashboard com métricas: total de leads, negócios abertos, valor do pipeline, taxa de conversão, gráfico de funil
- Planos Free e Pro via Stripe
- Landing page de apresentação

## 3. Requisitos Funcionais

### Autenticação
- Login e cadastro com e-mail + senha (Supabase Auth)
- Recuperação de senha por e-mail
- Confirmação de e-mail
- Onboarding pós-cadastro: criar ou entrar em workspace

### Gestão de Leads e Contatos
- Cadastro completo: nome, e-mail, telefone, empresa, cargo, status
- Listagem com busca e filtros (por status, responsável, data)
- Página de detalhe com perfil completo e timeline de atividades
- Ações: criar, editar, excluir

### Pipeline Kanban de Vendas
- Colunas por etapa: Novo Lead → Contato Realizado → Proposta Enviada → Negociação → Fechado Ganho → Fechado Perdido
- Cards de negócios com título, valor estimado (R$), lead vinculado, responsável e prazo
- Drag-and-drop entre etapas com persistência no banco
- Criação e edição de negócios

### Registro de Atividades
- Tipos: ligação, e-mail, reunião, nota
- Campos: autor, descrição, data
- Timeline cronológica vinculada ao lead

### Dashboard de Métricas
- Cards: total de leads, negócios abertos, valor total do pipeline, taxa de conversão
- Gráfico de funil de vendas (Recharts)
- Negócios com prazo próximo (próximos 7 dias)

### Multi-empresa e Colaboração
- Criar workspaces (empresa/time = workspace)
- Convite de colaboradores por e-mail (Resend)
- Papéis: Admin (acesso total) e Membro (leads e negócios)
- Troca de workspace via dropdown na sidebar
- Isolamento de dados via RLS no Supabase

### Monetização (Stripe)
- **Plano Free:** até 2 colaboradores, 50 leads
- **Plano Pro:** ilimitado, R$49/mês
- Checkout via Stripe Checkout Session
- Webhook para ativar/desativar plano (Supabase Edge Function)
- Customer Portal do Stripe para gerenciar assinatura
- Enforcement de limites nas Server Actions

### Landing Page
- Seções: hero, funcionalidades, pipeline preview, planos/preços, CTA
- Responsiva, com metatags SEO e og:image

## 4. Personas

### Dono do Negócio / Empreendedor (Admin)
Pequeno empresário que precisa organizar seu processo de vendas. Cria o workspace, convida o time, gerencia planos e tem acesso completo.

### Vendedor / Colaborador (Membro)
Profissional de vendas que usa o CRM no dia a dia. Cadastra leads, move negócios no pipeline, registra atividades.

### Freelancer / Consultor (Admin solo)
Profissional independente que atende vários clientes. Usa workspaces separados para cada cliente/projeto.

## 5. Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 14 (App Router) + React 18 + TypeScript 5 |
| Estilo | Tailwind CSS + shadcn/ui |
| Backend/API | Next.js Server Actions + API Routes |
| Banco + Auth | Supabase (PostgreSQL + RLS + Auth) |
| Pagamento | Stripe (Checkout + Webhooks) |
| E-mail | Resend |
| Drag-and-drop | @dnd-kit |
| Gráficos | Recharts |
| Deploy | Vercel + Supabase |

## 6. Referências de Design

- **HubSpot CRM** — ecossistema completo, mas simplificar a experiência focando só em vendas
- **Pipedrive** — pipeline Kanban referência; inspiração para UX de arrastar cards
- **Modelo de preços** — freemium acessível vs. o custo elevado de ambas as referências

## 7. Modelo de Dados (Resumo)

```sql
workspaces        (id, name, slug, plan, stripe_customer_id, created_at)
workspace_members (workspace_id, user_id, role: admin|member)
leads             (id, workspace_id, name, email, phone, company, role, status, owner_id, created_at)
deals             (id, workspace_id, lead_id, title, value, stage, owner_id, due_date, created_at)
activities        (id, workspace_id, lead_id, type, description, author_id, created_at)
invites           (id, workspace_id, email, role, token, accepted_at, expires_at)
```

## 8. Critérios de Aceite por MVP

- [ ] Usuário consegue se cadastrar, criar workspace e convidar membro
- [ ] Usuário consegue criar lead e movê-lo pelo Kanban
- [ ] Timeline de atividades funciona corretamente
- [ ] Dashboard mostra métricas reais do workspace
- [ ] Plano Pro é ativado após pagamento Stripe e limites do Free são enforçados
- [ ] Landing page pública converte visitantes para cadastro
