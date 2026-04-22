import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { getActiveWorkspace } from "@/lib/workspace"
import { PipelineClient } from "@/components/pipeline/pipeline-client"
import type { Deal, Lead } from "@/types"

export const metadata: Metadata = {
  title: "Pipeline — PipeFlow CRM",
}

export default async function PipelinePage() {
  const { workspace } = await getActiveWorkspace()
  const supabase = await createClient()

  const [{ data: deals }, { data: leads }, { data: members }] = await Promise.all([
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
    supabase
      .from("workspace_members")
      .select("user_id")
      .eq("workspace_id", workspace.id),
  ])

  // Fetch display names for members via auth metadata stored in workspace_members isn't available,
  // so we simplify owners to user_ids present in deals
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
