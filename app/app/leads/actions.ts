"use server"

import { revalidatePath } from "next/cache"

import { getActiveWorkspace } from "@/lib/workspace"
import type { LeadFormData } from "@/components/leads/lead-form"
import type { ActivityType } from "@/types"

export async function createLead(data: LeadFormData): Promise<{ error?: string }> {
  const { user, workspace, supabase } = await getActiveWorkspace()

  const { error } = await supabase.from("leads").insert({
    workspace_id: workspace.id,
    owner_id: user.id,
    name: data.name,
    email: data.email || null,
    phone: data.phone || null,
    company: data.company || null,
    role: data.role || null,
    status: data.status,
  })

  if (error) return { error: "Erro ao criar lead." }

  revalidatePath("/app/leads")
  return {}
}

export async function updateLead(leadId: string, data: LeadFormData): Promise<{ error?: string }> {
  const { workspace, supabase } = await getActiveWorkspace()

  const { error } = await supabase
    .from("leads")
    .update({
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      company: data.company || null,
      role: data.role || null,
      status: data.status,
    })
    .eq("id", leadId)
    .eq("workspace_id", workspace.id)

  if (error) return { error: "Erro ao atualizar lead." }

  revalidatePath("/app/leads")
  revalidatePath(`/app/leads/${leadId}`)
  return {}
}

export async function deleteLead(leadId: string): Promise<{ error?: string }> {
  const { workspace, supabase } = await getActiveWorkspace()

  const { error } = await supabase
    .from("leads")
    .delete()
    .eq("id", leadId)
    .eq("workspace_id", workspace.id)

  if (error) return { error: "Erro ao excluir lead." }

  revalidatePath("/app/leads")
  return {}
}

export async function createActivity(
  leadId: string,
  type: ActivityType,
  description: string
): Promise<{ error?: string }> {
  const { user, workspace, supabase } = await getActiveWorkspace()

  // Validate lead belongs to this workspace before inserting activity
  const { data: lead } = await supabase
    .from("leads")
    .select("id")
    .eq("id", leadId)
    .eq("workspace_id", workspace.id)
    .single()

  if (!lead) return { error: "Lead não encontrado." }

  const { error } = await supabase.from("activities").insert({
    workspace_id: workspace.id,
    lead_id: leadId,
    author_id: user.id,
    type,
    description,
  })

  if (error) return { error: "Erro ao registrar atividade." }

  revalidatePath(`/app/leads/${leadId}`)
  return {}
}
