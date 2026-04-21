"use client"

import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { DealBoard } from "@/components/pipeline/deal-board"
import { DealSheet } from "@/components/pipeline/deal-sheet"
import { DealFilters } from "@/components/pipeline/deal-filters"
import { DeleteDealDialog } from "@/components/pipeline/delete-deal-dialog"
import { MOCK_DEALS, MOCK_LEADS, MOCK_USER } from "@/lib/mock-data"
import type { Deal, DealStage } from "@/types"
import type { DealFormData } from "@/components/pipeline/deal-form"

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS)
  const [ownerFilter, setOwnerFilter] = useState("all")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Deal | null>(null)

  const filtered = useMemo(
    () => (ownerFilter === "all" ? deals : deals.filter((d) => d.owner_id === ownerFilter)),
    [deals, ownerFilter],
  )

  function handleMove(dealId: string, newStage: DealStage) {
    setDeals((prev) => prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d)))
    toast.success("Negócio movido!")
  }

  function handleCardClick(deal: Deal) {
    setEditingDeal(deal)
    setSheetOpen(true)
  }

  function handleNewDeal() {
    setEditingDeal(null)
    setSheetOpen(true)
  }

  async function handleSave(data: DealFormData) {
    await new Promise((r) => setTimeout(r, 600))
    if (editingDeal) {
      setDeals((prev) =>
        prev.map((d) =>
          d.id === editingDeal.id
            ? { ...d, ...data, value: data.value ?? null, lead_id: data.lead_id ?? null, due_date: data.due_date ?? null }
            : d,
        ),
      )
      toast.success("Negócio atualizado!")
    } else {
      const newDeal: Deal = {
        id: `d${Date.now()}`,
        workspace_id: "w1",
        owner_id: MOCK_USER.id,
        title:    data.title,
        value:    data.value ?? null,
        lead_id:  data.lead_id ?? null,
        stage:    data.stage,
        due_date: data.due_date ?? null,
        created_at: new Date().toISOString(),
      }
      setDeals((prev) => [newDeal, ...prev])
      toast.success("Negócio criado!")
    }
    setSheetOpen(false)
    setEditingDeal(null)
  }

  async function handleDelete(deal: Deal) {
    await new Promise((r) => setTimeout(r, 500))
    setDeals((prev) => prev.filter((d) => d.id !== deal.id))
    toast.success("Negócio excluído.")
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pipeline"
        description="Acompanhe seus negócios em cada etapa do funil."
        action={
          <div className="flex items-center gap-3">
            <DealFilters ownerFilter={ownerFilter} onOwnerFilterChange={setOwnerFilter} />
            <Button onClick={handleNewDeal}>
              <Plus className="h-4 w-4 mr-2" />
              Novo negócio
            </Button>
          </div>
        }
      />

      <DealBoard
        deals={filtered}
        leads={MOCK_LEADS}
        ownerFallback={MOCK_USER.avatarFallback}
        onMove={handleMove}
        onCardClick={handleCardClick}
      />

      <DealSheet
        open={sheetOpen}
        deal={editingDeal}
        leads={MOCK_LEADS}
        onOpenChange={(open) => {
          setSheetOpen(open)
          if (!open) setEditingDeal(null)
        }}
        onSave={handleSave}
        onDelete={editingDeal ? () => { setSheetOpen(false); setDeleteTarget(editingDeal) } : undefined}
      />

      <DeleteDealDialog
        deal={deleteTarget}
        onConfirm={handleDelete}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      />
    </div>
  )
}
