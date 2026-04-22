import type { Metadata } from "next"

import { getActiveWorkspace } from "@/lib/workspace"
import { PipelineClient } from "@/components/pipeline/pipeline-client"
import type { Deal, Lead } from "@/types"

export const metadata: Metadata = {
  title: "Pipeline — PipeFlow CRM",
}

export default async function PipelinePage() {
  const { workspace, supabase } = await getActiveWorkspace()

  const [{ data: deals, error: dealsError }, { data: leads }] = await Promise.all([
    supabase
      .from("deals")
      .select("*")
      .eq("workspace_id", workspace.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("leads")
      .select("id, name, company")
      .eq("workspace_id", workspace.id)
      .order("name"),
  ])

  if (dealsError) throw new Error("Falha ao carregar pipeline")

  // Owner filter uses user_ids present in deals; display names require a profiles table
  const ownerIds = Array.from(new Set((deals ?? []).map((d) => d.owner_id)))
  const owners: { id: string; name: string }[] = ownerIds.map((id) => ({
    id,
    name: id.slice(0, 8),
  }))

  return (
    <PipelineClient
      initialDeals={(deals ?? []) as Deal[]}
      leads={(leads ?? []) as Pick<Lead, "id" | "name" | "company">[]}
      owners={owners}
    />
  )
}
