"use client"

import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { LeadFilters } from "@/components/leads/lead-filters"
import { LeadsTable } from "@/components/leads/leads-table"
import { LeadSheet } from "@/components/leads/lead-sheet"
import { DeleteLeadDialog } from "@/components/leads/delete-lead-dialog"
import { LeadsPagination } from "@/components/leads/leads-pagination"
import { MOCK_LEADS } from "@/lib/mock-data"
import type { Lead, LeadStatus } from "@/types"
import type { LeadFormData } from "@/components/leads/lead-form"

const PAGE_SIZE = 10

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all")
  const [page, setPage] = useState(1)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false
      if (q && !l.name.toLowerCase().includes(q) && !l.company?.toLowerCase().includes(q)) return false
      return true
    })
  }, [leads, search, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleStatusChange(value: LeadStatus | "all") {
    setStatusFilter(value)
    setPage(1)
  }

  function openCreate() {
    setEditingLead(null)
    setSheetOpen(true)
  }

  function openEdit(lead: Lead) {
    setEditingLead(lead)
    setSheetOpen(true)
  }

  async function handleSave(data: LeadFormData, id?: string) {
    await new Promise((r) => setTimeout(r, 600))
    if (id) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...data } : l)))
      toast.success("Lead atualizado!")
    } else {
      const newLead: Lead = {
        id: `l${Date.now()}`,
        workspace_id: "w1",
        owner_id: "u1",
        created_at: new Date().toISOString(),
        email: data.email || null,
        phone: data.phone || null,
        company: data.company || null,
        role: data.role || null,
        name: data.name,
        status: data.status,
      }
      setLeads((prev) => [newLead, ...prev])
      toast.success("Lead criado com sucesso!")
    }
  }

  async function handleDelete(lead: Lead) {
    await new Promise((r) => setTimeout(r, 500))
    setLeads((prev) => prev.filter((l) => l.id !== lead.id))
    setDeleteTarget(null)
    toast.success("Lead excluído.")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description={`${leads.length} contato${leads.length !== 1 ? "s" : ""} no workspace`}
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Novo lead
          </Button>
        }
      />

      <LeadFilters
        search={search}
        status={statusFilter}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />

      {filtered.length !== leads.length && (
        <p className="text-sm text-muted-foreground">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      <LeadsTable
        leads={paginated}
        onEdit={openEdit}
        onDelete={(lead) => setDeleteTarget(lead)}
      />

      <LeadsPagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <LeadSheet
        open={sheetOpen}
        lead={editingLead}
        onOpenChange={setSheetOpen}
        onSave={handleSave}
      />

      <DeleteLeadDialog
        lead={deleteTarget}
        onConfirm={handleDelete}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      />
    </div>
  )
}
