"use client"

import { useState, useTransition } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { DealBoard } from "@/components/pipeline/deal-board"
import { DealSheet } from "@/components/pipeline/deal-sheet"
import { DealFilters } from "@/components/pipeline/deal-filters"
import { DeleteDealDialog } from "@/components/pipeline/delete-deal-dialog"
import { createDeal, updateDeal, updateDealStage, deleteDeal } from "@/app/app/pipeline/actions"
import type { Deal, DealStage, Lead } from "@/types"
import type { DealFormData } from "@/components/pipeline/deal-form"

interface PipelineClientProps {
  initialDeals: Deal[]
  leads: Pick<Lead, "id" | "name" | "company">[]
  owners: { id: string; name: string }[]
}

export function PipelineClient({ initialDeals, leads, owners }: PipelineClientProps) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [ownerFilter, setOwnerFilter] = useState("all")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null)
  const [defaultStage, setDefaultStage] = useState<DealStage>("new_lead")
  const [deleteTarget, setDeleteTarget] = useState<Deal | null>(null)
  const [isPending, startTransition] = useTransition()

  const filtered =
    ownerFilter === "all" ? deals : deals.filter((d) => d.owner_id === ownerFilter)

  function handleMove(dealId: string, newStage: DealStage) {
    const prev = deals
    setDeals((d) => d.map((x) => (x.id === dealId ? { ...x, stage: newStage } : x)))
    startTransition(async () => {
      const result = await updateDealStage(dealId, newStage)
      if (result?.error) {
        setDeals(prev)
        toast.error(result.error)
      }
    })
  }

  function handleCardClick(deal: Deal) {
    setEditingDeal(deal)
    setSheetOpen(true)
  }

  function handleNewDeal() {
    setEditingDeal(null)
    setDefaultStage("new_lead")
    setSheetOpen(true)
  }

  function handleAddDeal(stage: DealStage) {
    setEditingDeal(null)
    setDefaultStage(stage)
    setSheetOpen(true)
  }

  async function handleSave(data: DealFormData) {
    if (editingDeal) {
      const result = await updateDeal(editingDeal.id, data)
      if (result?.error) { toast.error(result.error); return }
      setDeals((prev) =>
        prev.map((d) =>
          d.id === editingDeal.id
            ? { ...d, ...data, value: data.value ?? null, lead_id: data.lead_id ?? null, due_date: data.due_date ?? null }
            : d
        )
      )
      toast.success("Negócio atualizado!")
    } else {
      const result = await createDeal(data)
      if (result?.error) { toast.error(result.error); return }
      if (result.deal) setDeals((prev) => [result.deal!, ...prev])
      toast.success("Negócio criado!")
    }
    setSheetOpen(false)
    setEditingDeal(null)
  }

  async function handleDelete(deal: Deal) {
    startTransition(async () => {
      const result = await deleteDeal(deal.id)
      if (result?.error) {
        toast.error(result.error)
      } else {
        setDeals((prev) => prev.filter((d) => d.id !== deal.id))
        toast.success("Negócio excluído.")
        setDeleteTarget(null)
      }
    })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pipeline"
        description="Acompanhe seus negócios em cada etapa do funil."
        action={
          <div className="flex items-center gap-3">
            <DealFilters
              ownerFilter={ownerFilter}
              onOwnerFilterChange={setOwnerFilter}
              owners={owners}
            />
            <Button onClick={handleNewDeal} disabled={isPending}>
              <Plus className="h-4 w-4 mr-2" />
              Novo negócio
            </Button>
          </div>
        }
      />

      <DealBoard
        deals={filtered}
        leads={leads as Lead[]}
        ownerFallback="?"
        onMove={handleMove}
        onCardClick={handleCardClick}
        onAddDeal={handleAddDeal}
      />

      <DealSheet
        open={sheetOpen}
        deal={editingDeal}
        leads={leads as Lead[]}
        defaultStage={defaultStage}
        onOpenChange={(open) => {
          setSheetOpen(open)
          if (!open) setEditingDeal(null)
        }}
        onSave={handleSave}
        onDelete={
          editingDeal
            ? () => { setSheetOpen(false); setDeleteTarget(editingDeal) }
            : undefined
        }
      />

      <DeleteDealDialog
        deal={deleteTarget}
        onConfirm={handleDelete}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      />
    </div>
  )
}
