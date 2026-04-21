"use client"

import { Trash2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { DealForm, type DealFormData } from "@/components/pipeline/deal-form"
import type { Deal, Lead } from "@/types"

interface DealSheetProps {
  open: boolean
  deal: Deal | null
  leads: Lead[]
  defaultStage?: string
  onOpenChange: (open: boolean) => void
  onSave: (data: DealFormData) => Promise<void>
  onDelete?: () => void
}

export function DealSheet({ open, deal, leads, defaultStage, onOpenChange, onSave, onDelete }: DealSheetProps) {
  const isEdit = !!deal

  const defaultValues = deal
    ? {
        title:    deal.title,
        value:    deal.value,
        lead_id:  deal.lead_id,
        stage:    deal.stage,
        due_date: deal.due_date,
      }
    : { stage: (defaultStage as DealFormData["stage"]) ?? "new_lead" }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="flex-row items-center justify-between">
          <SheetTitle>{isEdit ? "Editar negócio" : "Novo negócio"}</SheetTitle>
          {isEdit && onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </SheetHeader>
        <div className="flex-1 overflow-hidden mt-4">
          <DealForm
            key={deal?.id ?? "new"}
            defaultValues={defaultValues}
            leads={leads}
            onSubmit={onSave}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
