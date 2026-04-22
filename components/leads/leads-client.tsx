"use client"

import { useState, useTransition } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { LeadFilters } from "@/components/leads/lead-filters"
import { LeadsTable } from "@/components/leads/leads-table"
import { LeadSheet } from "@/components/leads/lead-sheet"
import { DeleteLeadDialog } from "@/components/leads/delete-lead-dialog"
import { LeadsPagination } from "@/components/leads/leads-pagination"
import { createLead, updateLead, deleteLead } from "@/app/app/leads/actions"
import type { Lead, LeadStatus } from "@/types"
import type { LeadFormData } from "@/components/leads/lead-form"

interface LeadsClientProps {
  leads: Lead[]
  totalCount: number
  pageSize: number
  currentPage: number
  currentSearch: string
  currentStatus: LeadStatus | "all"
}

export function LeadsClient({
  leads,
  totalCount,
  pageSize,
  currentPage,
  currentSearch,
  currentStatus,
}: LeadsClientProps) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null)
  const [isPending, startTransition] = useTransition()

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  function openCreate() {
    setEditingLead(null)
    setSheetOpen(true)
  }

  function openEdit(lead: Lead) {
    setEditingLead(lead)
    setSheetOpen(true)
  }

  async function handleSave(data: LeadFormData, id?: string) {
    const result = id ? await updateLead(id, data) : await createLead(data)
    if (result?.error) {
      toast.error(result.error)
      return
    }
    toast.success(id ? "Lead atualizado!" : "Lead criado com sucesso!")
    setSheetOpen(false)
    setEditingLead(null)
  }

  async function handleDelete(lead: Lead) {
    startTransition(async () => {
      const result = await deleteLead(lead.id)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Lead excluído.")
        setDeleteTarget(null)
      }
    })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description={`${totalCount} contato${totalCount !== 1 ? "s" : ""} no workspace`}
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Novo lead
          </Button>
        }
      />

      <LeadFilters currentSearch={currentSearch} currentStatus={currentStatus} />

      {(currentSearch || currentStatus !== "all") && (
        <p className="text-sm text-muted-foreground">
          {totalCount} resultado{totalCount !== 1 ? "s" : ""} encontrado{totalCount !== 1 ? "s" : ""}
        </p>
      )}

      <LeadsTable
        leads={leads}
        onEdit={openEdit}
        onDelete={(lead) => setDeleteTarget(lead)}
      />

      <LeadsPagination page={currentPage} totalPages={totalPages} />

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
