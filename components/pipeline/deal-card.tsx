"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { CalendarDays, GripVertical } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Deal, Lead } from "@/types"

interface DealCardProps {
  deal: Deal
  lead: Lead | null
  ownerFallback: string
  onClick: () => void
  isDragOverlay?: boolean
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
}

export function DealCard({ deal, lead, ownerFallback, onClick, isDragOverlay }: DealCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: deal.id })

  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-lg border bg-card p-3 space-y-2 cursor-pointer select-none",
        "hover:border-primary/50 hover:shadow-sm transition-all",
        isDragging && "opacity-40",
        isDragOverlay && "shadow-lg rotate-1 opacity-100 cursor-grabbing",
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug line-clamp-2 flex-1">{deal.title}</p>
        <button
          {...listeners}
          {...attributes}
          onClick={e => e.stopPropagation()}
          className="text-muted-foreground/40 hover:text-muted-foreground cursor-grab active:cursor-grabbing mt-0.5 shrink-0"
          aria-label="Arrastar"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>

      {deal.value != null && (
        <p className="text-sm font-semibold text-foreground">{formatCurrency(deal.value)}</p>
      )}

      {lead && (
        <p className="text-xs text-muted-foreground truncate">{lead.name}</p>
      )}

      <div className="flex items-center justify-between pt-1">
        {deal.due_date ? (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            {formatDate(deal.due_date)}
          </span>
        ) : (
          <span />
        )}
        <Avatar className="h-5 w-5">
          <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{ownerFallback}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
