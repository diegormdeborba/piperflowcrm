import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

export const FREE_LIMITS = {
  leads: 50,
  members: 2,
} as const

type Client = SupabaseClient<Database>

export async function canAddLead(
  workspaceId: string,
  plan: string,
  supabase: Client
): Promise<{ allowed: boolean; error?: string }> {
  if (plan !== "free") return { allowed: true }

  const { count } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("workspace_id", workspaceId)

  if ((count ?? 0) >= FREE_LIMITS.leads) {
    return {
      allowed: false,
      error: `Limite de ${FREE_LIMITS.leads} leads atingido no plano Free. Faça upgrade para Pro.`,
    }
  }
  return { allowed: true }
}

export async function canAddMember(
  workspaceId: string,
  plan: string,
  supabase: Client
): Promise<{ allowed: boolean; error?: string }> {
  if (plan !== "free") return { allowed: true }

  const { count } = await supabase
    .from("workspace_members")
    .select("*", { count: "exact", head: true })
    .eq("workspace_id", workspaceId)

  if ((count ?? 0) >= FREE_LIMITS.members) {
    return {
      allowed: false,
      error: `Limite de ${FREE_LIMITS.members} membros atingido no plano Free. Faça upgrade para Pro.`,
    }
  }
  return { allowed: true }
}
