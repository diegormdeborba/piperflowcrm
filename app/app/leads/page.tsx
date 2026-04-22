import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { getActiveWorkspace } from "@/lib/workspace"
import { LeadsClient } from "@/components/leads/leads-client"
import type { Lead, LeadStatus } from "@/types"

export const metadata: Metadata = {
  title: "Leads — PipeFlow CRM",
}

const PAGE_SIZE = 10

interface Props {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>
}

export default async function LeadsPage({ searchParams }: Props) {
  const { workspace } = await getActiveWorkspace()
  const supabase = await createClient()

  const { search = "", status = "all", page = "1" } = await searchParams
  const currentPage = Math.max(1, Number(page) || 1)
  const offset = (currentPage - 1) * PAGE_SIZE

  const validStatuses: LeadStatus[] = ["new", "contacted", "qualified", "lost"]
  const statusFilter = validStatuses.includes(status as LeadStatus) ? (status as LeadStatus) : null

  let query = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .eq("workspace_id", workspace.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1)

  if (search) {
    query = query.or(`name.ilike.%${search}%,company.ilike.%${search}%`)
  }
  if (statusFilter) {
    query = query.eq("status", statusFilter)
  }

  const { data, count } = await query

  return (
    <LeadsClient
      leads={(data ?? []) as Lead[]}
      totalCount={count ?? 0}
      pageSize={PAGE_SIZE}
      currentPage={currentPage}
      currentSearch={search}
      currentStatus={(statusFilter ?? "all") as LeadStatus | "all"}
    />
  )
}
