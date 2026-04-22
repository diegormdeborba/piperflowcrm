import { Suspense } from "react"
import type { Metadata } from "next"

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
  const { workspace, supabase } = await getActiveWorkspace()

  const { search = "", status = "all", page = "1" } = await searchParams
  const currentPage = Math.max(1, Number(page) || 1)
  const offset = (currentPage - 1) * PAGE_SIZE

  const validStatuses: LeadStatus[] = ["new", "contacted", "qualified", "lost"]
  const statusFilter = validStatuses.includes(status as LeadStatus) ? (status as LeadStatus) : null

  // Sanitize search to prevent PostgREST filter injection
  const safeSearch = search.replace(/[%_\\,()]/g, "")

  let query = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .eq("workspace_id", workspace.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1)

  if (safeSearch) {
    query = query.or(`name.ilike.%${safeSearch}%,company.ilike.%${safeSearch}%`)
  }
  if (statusFilter) {
    query = query.eq("status", statusFilter)
  }

  const { data, count, error } = await query

  if (error) throw new Error("Falha ao carregar leads")

  return (
    <Suspense>
      <LeadsClient
        leads={(data ?? []) as Lead[]}
        totalCount={count ?? 0}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        currentSearch={search}
        currentStatus={(statusFilter ?? "all") as LeadStatus | "all"}
      />
    </Suspense>
  )
}
