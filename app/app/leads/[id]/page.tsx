import { notFound } from "next/navigation"
import { Suspense } from "react"
import type { Metadata } from "next"

import { getActiveWorkspace } from "@/lib/workspace"
import { LeadDetailClient } from "@/components/leads/detail/lead-detail-client"
import type { Lead, Activity } from "@/types"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const { workspace, supabase } = await getActiveWorkspace()
  const { data } = await supabase
    .from("leads")
    .select("name")
    .eq("id", id)
    .eq("workspace_id", workspace.id)
    .single()
  return { title: data ? `${data.name} — PipeFlow CRM` : "Lead — PipeFlow CRM" }
}

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params
  const { workspace, supabase } = await getActiveWorkspace()

  const [{ data: lead }, { data: activities }] = await Promise.all([
    supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .eq("workspace_id", workspace.id)
      .single(),
    supabase
      .from("activities")
      .select("*")
      .eq("lead_id", id)
      .eq("workspace_id", workspace.id)
      .order("created_at", { ascending: false }),
  ])

  if (!lead) notFound()

  return (
    <Suspense>
      <LeadDetailClient
        lead={lead as Lead}
        activities={(activities ?? []) as Activity[]}
      />
    </Suspense>
  )
}
