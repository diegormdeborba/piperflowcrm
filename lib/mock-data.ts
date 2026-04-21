import type { WorkspacePlan, Lead, Activity } from "@/types"

export const MOCK_USER = {
  id: "u1",
  name: "João Silva",
  email: "joao@acme.com",
  avatarFallback: "JS",
}

export const MOCK_WORKSPACES: Array<{
  id: string
  name: string
  slug: string
  plan: WorkspacePlan
}> = [
  { id: "w1", name: "Acme Vendas", slug: "acme", plan: "pro" },
  { id: "w2", name: "Projeto Pessoal", slug: "pessoal", plan: "free" },
]

export const MOCK_CURRENT_WORKSPACE = MOCK_WORKSPACES[0]

export const MOCK_LEADS: Lead[] = [
  { id: "l1",  workspace_id: "w1", name: "Ana Beatriz Lima",    email: "ana@techstart.com.br",   phone: "(11) 98765-4321", company: "TechStart",    role: "CEO",          status: "qualified", owner_id: "u1", created_at: "2026-04-21T10:00:00Z" },
  { id: "l2",  workspace_id: "w1", name: "Carlos Mendes",       email: "carlos@inovare.com",     phone: "(21) 99123-4567", company: "Inovare",      role: "Diretor",      status: "contacted", owner_id: "u1", created_at: "2026-04-20T14:30:00Z" },
  { id: "l3",  workspace_id: "w1", name: "Fernanda Costa",      email: "fernanda@grupobeta.com", phone: "(31) 97654-3210", company: "Grupo Beta",   role: "Gerente",      status: "new",       owner_id: "u1", created_at: "2026-04-19T09:15:00Z" },
  { id: "l4",  workspace_id: "w1", name: "Ricardo Souza",       email: "ricardo@deltatech.io",   phone: "(41) 98001-2345", company: "DeltaTech",    role: "CTO",          status: "lost",      owner_id: "u1", created_at: "2026-04-18T16:00:00Z" },
  { id: "l5",  workspace_id: "w1", name: "Juliana Andrade",     email: "juliana@nexus.com.br",   phone: "(11) 91234-5678", company: "Nexus Digital", role: "CMO",         status: "new",       owner_id: "u1", created_at: "2026-04-17T11:20:00Z" },
  { id: "l6",  workspace_id: "w1", name: "Marcos Oliveira",     email: "marcos@construtora.com", phone: "(51) 99876-5432", company: "Construtora A", role: "Sócio",       status: "qualified", owner_id: "u1", created_at: "2026-04-16T13:45:00Z" },
  { id: "l7",  workspace_id: "w1", name: "Patrícia Ferreira",   email: "patricia@logistica.net", phone: "(61) 98765-0001", company: "Logística FC", role: "Supervisora",  status: "contacted", owner_id: "u1", created_at: "2026-04-15T10:30:00Z" },
  { id: "l8",  workspace_id: "w1", name: "Diego Rocha",         email: "diego@softworks.dev",    phone: "(11) 97001-2233", company: "Softworks",    role: "Fundador",     status: "new",       owner_id: "u1", created_at: "2026-04-14T08:00:00Z" },
  { id: "l9",  workspace_id: "w1", name: "Camila Torres",       email: "camila@edutech.com",     phone: "(19) 98888-1122", company: "EduTech",      role: "Coordenadora", status: "lost",      owner_id: "u1", created_at: "2026-04-13T15:00:00Z" },
  { id: "l10", workspace_id: "w1", name: "Bruno Santana",       email: null,                     phone: "(71) 99111-3344", company: "Autônomo",     role: "Consultor",    status: "new",       owner_id: "u1", created_at: "2026-04-12T12:00:00Z" },
  { id: "l11", workspace_id: "w1", name: "Larissa Pinto",       email: "larissa@moda.com.br",    phone: "(11) 95432-1098", company: "Moda & Cia",   role: "Fundadora",    status: "qualified", owner_id: "u1", created_at: "2026-04-11T09:30:00Z" },
  { id: "l12", workspace_id: "w1", name: "Thiago Alves",        email: "thiago@engenharia.com",  phone: "(81) 98001-9876", company: "Engenharia S", role: "Engenheiro",   status: "contacted", owner_id: "u1", created_at: "2026-04-10T14:00:00Z" },
  { id: "l13", workspace_id: "w1", name: "Vanessa Correia",     email: "vanessa@clinica.med.br", phone: "(11) 97654-8765", company: "Clínica VitaS", role: "Diretora",    status: "new",       owner_id: "u1", created_at: "2026-04-09T10:00:00Z" },
  { id: "l14", workspace_id: "w1", name: "Gabriel Lopes",       email: "gabriel@startup.io",     phone: "(21) 99000-1111", company: "StartupIO",    role: "Product Lead", status: "contacted", owner_id: "u1", created_at: "2026-04-08T16:30:00Z" },
  { id: "l15", workspace_id: "w1", name: "Isabela Nascimento",  email: "isa@financeira.com",     phone: "(11) 98123-4567", company: "Financeira XP", role: "Analista",    status: "lost",      owner_id: "u1", created_at: "2026-04-07T11:00:00Z" },
]

export const MOCK_ACTIVITIES: Activity[] = [
  { id: "a1",  workspace_id: "w1", lead_id: "l1", type: "call",    description: "Apresentei a solução PipeFlow. Cliente demonstrou interesse no plano Pro e pediu proposta.", author_id: "u1", created_at: "2026-04-21T14:00:00Z" },
  { id: "a2",  workspace_id: "w1", lead_id: "l1", type: "email",   description: "Enviei proposta comercial com detalhamento de planos e condições especiais.",               author_id: "u1", created_at: "2026-04-20T10:30:00Z" },
  { id: "a3",  workspace_id: "w1", lead_id: "l1", type: "meeting", description: "Reunião de demo via Google Meet. Mostrei o painel de leads e o Kanban ao time de vendas.",  author_id: "u1", created_at: "2026-04-18T15:00:00Z" },
  { id: "a4",  workspace_id: "w1", lead_id: "l2", type: "call",    description: "Primeira ligação de prospecção. Carlos ficou interessado, pediu para ver a demo.",           author_id: "u1", created_at: "2026-04-20T11:00:00Z" },
  { id: "a5",  workspace_id: "w1", lead_id: "l2", type: "note",    description: "Carlos mencionou que a empresa tem 5 vendedores. Potencial upgrade para plano Pro.",        author_id: "u1", created_at: "2026-04-20T11:30:00Z" },
  { id: "a6",  workspace_id: "w1", lead_id: "l3", type: "email",   description: "E-mail de boas-vindas e apresentação da ferramenta. Aguardando retorno.",                   author_id: "u1", created_at: "2026-04-19T09:30:00Z" },
  { id: "a7",  workspace_id: "w1", lead_id: "l6", type: "meeting", description: "Reunião de apresentação do produto. Marcos gostou do Kanban. Follow-up agendado.",          author_id: "u1", created_at: "2026-04-16T14:00:00Z" },
  { id: "a8",  workspace_id: "w1", lead_id: "l6", type: "call",    description: "Follow-up: Marcos confirmou interesse e pediu contrato para revisão jurídica.",             author_id: "u1", created_at: "2026-04-17T10:00:00Z" },
  { id: "a9",  workspace_id: "w1", lead_id: "l7", type: "call",    description: "Ligação inicial. Patrícia é a ponto de contato. Reunião marcada para próxima semana.",      author_id: "u1", created_at: "2026-04-15T10:30:00Z" },
  { id: "a10", workspace_id: "w1", lead_id: "l4", type: "note",    description: "Ricardo informou que já contrataram outro CRM. Lead perdido por agora.",                    author_id: "u1", created_at: "2026-04-18T17:00:00Z" },
]
