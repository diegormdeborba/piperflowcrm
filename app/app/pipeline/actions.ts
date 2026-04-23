"use server"

import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"
import { getActiveWorkspace } from "@/lib/workspace"
import type { DealFormData } from "@/components/pipeline/deal-form"
import type { Deal, DealStage } from "@/types"

export async function createDeal(data: DealFormData): Promise<{ error?: string; deal?: Deal }> {
  const { user, workspace, supabase } = await getActiveWorkspace()

  const { data: deal, error } = await supabase.from("deals").insert({
    workspace_id: workspace.id,
    owner_id: user.id,
    title: data.title,
    value: data.value ?? null,
    lead_id: data.lead_id ?? null,
    stage: data.stage,
    due_date: data.due_date ?? null,
  }).select().single()

  if (error) return { error: "Erro ao criar negócio." }

  revalidatePath("/app/dashboard")
  return { deal: deal as Deal }
}

export async function updateDeal(dealId: string, data: DealFormData): Promise<{ error?: string }> {
  const { workspace, supabase } = await getActiveWorkspace()

  const { error } = await supabase
    .from("deals")
    .update({
      title: data.title,
      value: data.value ?? null,
      lead_id: data.lead_id ?? null,
      stage: data.stage,
      due_date: data.due_date ?? null,
    })
    .eq("id", dealId)
    .eq("workspace_id", workspace.id)

  if (error) return { error: "Erro ao atualizar negócio." }

  revalidatePath("/app/pipeline")
  revalidatePath("/app/dashboard")
  return {}
}

export async function updateDealStage(dealId: string, stage: DealStage): Promise<{ error?: string }> {
  const { workspace, supabase } = await getActiveWorkspace()

  const { error } = await supabase
    .from("deals")
    .update({ stage })
    .eq("id", dealId)
    .eq("workspace_id", workspace.id)

  if (error) return { error: "Erro ao mover negócio." }

  revalidatePath("/app/pipeline")
  revalidatePath("/app/dashboard")
  return {}
}

export async function deleteDeal(dealId: string): Promise<{ error?: string }> {
  const { workspace, supabase } = await getActiveWorkspace()

  const { error } = await supabase
    .from("deals")
    .delete()
    .eq("id", dealId)
    .eq("workspace_id", workspace.id)

  if (error) return { error: "Erro ao excluir negócio." }

  revalidatePath("/app/pipeline")
  revalidatePath("/app/dashboard")
  return {}
}
