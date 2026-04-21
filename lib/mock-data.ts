import type { WorkspacePlan } from "@/types"

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
