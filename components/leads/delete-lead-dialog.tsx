"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Lead } from "@/types"

interface DeleteLeadDialogProps {
  lead: Lead | null
  onConfirm: (lead: Lead) => Promise<void>
  onOpenChange: (open: boolean) => void
}

export function DeleteLeadDialog({ lead, onConfirm, onOpenChange }: DeleteLeadDialogProps) {
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    if (!lead) return
    setLoading(true)
    await onConfirm(lead)
    setLoading(false)
  }

  return (
    <Dialog open={!!lead} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir lead</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir <strong>{lead?.name}</strong>? Esta ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {loading ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
