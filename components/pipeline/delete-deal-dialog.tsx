"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Deal } from "@/types"

interface DeleteDealDialogProps {
  deal: Deal | null
  onConfirm: (deal: Deal) => Promise<void>
  onOpenChange: (open: boolean) => void
}

export function DeleteDealDialog({ deal, onConfirm, onOpenChange }: DeleteDealDialogProps) {
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    if (!deal) return
    setLoading(true)
    try {
      await onConfirm(deal)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={!!deal} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Excluir negócio</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir{" "}
            <span className="font-medium text-foreground">{deal?.title}</span>?
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
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
