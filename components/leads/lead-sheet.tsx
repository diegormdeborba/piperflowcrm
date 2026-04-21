"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { LeadForm, type LeadFormData } from "@/components/leads/lead-form"
import type { Lead } from "@/types"

interface LeadSheetProps {
  open: boolean
  lead?: Lead | null
  onOpenChange: (open: boolean) => void
  onSave: (data: LeadFormData, id?: string) => Promise<void>
}

export function LeadSheet({ open, lead, onOpenChange, onSave }: LeadSheetProps) {
  const isEditing = !!lead

  async function handleSubmit(data: LeadFormData) {
    await onSave(data, lead?.id)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col gap-0 p-0">
        <SheetHeader className="px-6 py-5 border-b">
          <SheetTitle>{isEditing ? "Editar lead" : "Novo lead"}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 px-6 py-5 overflow-hidden flex flex-col">
          <LeadForm
            defaultValues={
              isEditing
                ? {
                    name:    lead.name,
                    email:   lead.email ?? "",
                    phone:   lead.phone ?? "",
                    company: lead.company ?? "",
                    role:    lead.role ?? "",
                    status:  lead.status,
                  }
                : undefined
            }
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
