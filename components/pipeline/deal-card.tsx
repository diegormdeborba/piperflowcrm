"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { CalendarDays, CalendarClock, CalendarX, GripVertical, User } from "lucide-react"
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

function formatValue(value: number) {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}k`
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
}

const TODAY = new Date("2026-04-21")

function getDueDateInfo(due_date: string | null): { label: string; className: string; Icon: React.ElementType } | null {
  if (!due_date) return null
  const due = new Date(due_date)
  const days = Math.ceil((due.getTime() - TODAY.getTime()) / 86_400_000)
  if (days < 0)  return { label: formatDate(due_date), className: "text-red-500",   Icon: CalendarX }
  if (days <= 3) return { label: formatDate(due_date), className: "text-amber-500", Icon: CalendarClock }
  return           { label: formatDate(due_date), className: "text-muted-foreground", Icon: CalendarDays }
}

export function DealCard({ deal, lead, ownerFallback, onClick, isDragOverlay }: DealCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: deal.id })

  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined
  const dueDateInfo = getDueDateInfo(deal.due_date)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-xl border border-border/60 bg-card p-4 space-y-2.5 cursor-pointer select-none",
        "hover:border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-150",
        isDragging && "opacity-40 scale-[0.98] shadow-none",
        isDragOverlay && "shadow-2xl rotate-1 scale-[1.02] cursor-grabbing border-border",
      )}
      onClick={onClick}
    >
      {/* Title + drag handle */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug line-clamp-2 flex-1 text-foreground">
          {deal.title}
        </p>
        <button
          {...listeners}
          {...attributes}
          onClick={e => e.stopPropagation()}
          className="text-muted-foreground/30 hover:text-muted-foreground/60 cursor-grab active:cursor-grabbing mt-0.5 shrink-0 transition-colors"
          aria-label="Arrastar"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Value */}
      {deal.value != null && (
        <p className="text-lg font-bold tabular-nums text-foreground leading-none">
          {formatValue(deal.value)}
        </p>
      )}

      {/* Lead */}
      {lead && (
        <div className="flex items-center gap-1.5">
          <User className="h-3 w-3 text-muted-foreground/60 shrink-0" />
          <p className="text-xs text-muted-foreground truncate">
            {lead.name}{lead.company ? ` · ${lead.company}` : ""}
          </p>
        </div>
      )}

      {/* Footer: due date + avatar */}
      <div className="flex items-center justify-between pt-0.5">
        {dueDateInfo ? (
          <span className={cn("flex items-center gap-1 text-xs font-medium", dueDateInfo.className)}>
            <dueDateInfo.Icon className="h-3 w-3 shrink-0" />
            {dueDateInfo.label}
          </span>
        ) : (
          <span />
        )}
        <Avatar className="h-6 w-6 shrink-0">
          <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
            {ownerFallback}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
